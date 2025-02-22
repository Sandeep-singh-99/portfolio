import { NextRequest, NextResponse } from "next/server";
import { ConnectDB } from "../../../../../lib/db";
import SkillModel from "../../../../../models/skill-model";
import { UploadImage } from "../../../../../lib/upload_image";

export async function POST(req: NextRequest) {
  await ConnectDB();
  try {
    const formData = await req.formData();
    const imageFiles = formData.getAll("images") as File[];

    if (!imageFiles || imageFiles.length === 0) {
      return NextResponse.json(
        { error: "At least one image is required." },
        { status: 400 }
      );
    }

    // Upload images to Cloudinary
    const uploadedImages = await Promise.all(
      imageFiles.map(async (file) => {
        const result = await UploadImage(file, "skill");
        return {
          skillImage: result.secure_url,
          cloudinaryId: result.public_id,
        };
      })
    );

    // Save images in the database
    const newSkill = await SkillModel.create({ skillImages: uploadedImages });

    return NextResponse.json(
      { message: "Skill section created successfully", data: newSkill },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { error: "An unknown error occurred" },
      { status: 500 }
    );
  }
}

export async function GET() {
  await ConnectDB();
  try {
    const skillSections = await SkillModel.find();
    return NextResponse.json(skillSections, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { error: "An unknown error occurred" },
      { status: 500 }
    );
  }
}
