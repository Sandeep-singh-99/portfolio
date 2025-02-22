import { NextRequest, NextResponse } from "next/server";
import { ConnectDB } from "../../../../../lib/db";
import { UploadImage } from "../../../../../lib/upload_image";
import HomeModel from "../../../../../models/home-model";

export async function POST(req: NextRequest) {
  await ConnectDB();

  try {
    const formData = await req.formData();

    // Extract fields from formData
    const name = formData.get("name") as string;
    const techStack = formData.get("techStack") as string;
    const description = formData.get("description") as string;
    const profileImage = formData.get("image") as File;
    const resumeFile = formData.get("resumeFile") as File;

    if (!name || !techStack || !description || !profileImage || !resumeFile) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate file types
    if (!resumeFile.type.includes("pdf")) {
      return NextResponse.json(
        { error: "Resume file must be a PDF" },
        { status: 400 }
      );
    }

    // Upload profile image
    const profileImageResult = await UploadImage(
      profileImage,
      "home-section"
    );

    // Upload resume file
    const resumeFileResult = await UploadImage(resumeFile, "home-section");

    console.log("Profile Image Upload:", profileImageResult);
    console.log("Resume File Upload:", resumeFileResult);

    // Save to DB
    await HomeModel.create({
      name,
      techStack,
      description,
      resumeFile: resumeFileResult.secure_url, // PDF URL
      profileImage: profileImageResult.secure_url, // Image URL
      cloudinaryId: profileImageResult.public_id,
    });

    return NextResponse.json(
      { message: "Home section created successfully" },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "An unknown error occurred" }, { status: 500 });
  }
}

export async function GET() {
  await ConnectDB();
  try {
    const homeData = await HomeModel.find();

    return NextResponse.json(homeData, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "An unknown error occurred" }, { status: 500 });
  }
}
