import { NextRequest, NextResponse } from "next/server";
import SkillModel from "../../../../../../models/skill-model";
import { ConnectDB } from "../../../../../../lib/db";
import { UploadImage } from "../../../../../../lib/upload_image";

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  await ConnectDB();
  try {
    const { id } = params;
    const { imageUrl } = await req.json();  // Get the image URL from request body

    const skill = await SkillModel.findById(id);
    if (!skill) {
      return NextResponse.json({ message: "Skill section not found" }, { status: 404 });
    }

    // Filter out the image from skillImages
    skill.skillImages = skill.skillImages.filter(img => img.skillImage !== imageUrl);

    if (skill.skillImages.length === 0) {
      // If no images are left, delete the entire document
      await SkillModel.findByIdAndDelete(id);
      return NextResponse.json(
        { message: "Skill section deleted since no images were left" },
        { status: 200 }
      );
    }

    await skill.save(); // Save updated document with remaining images
    return NextResponse.json(
      { message: "Image deleted successfully" },
      { status: 200 }
    );

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}



