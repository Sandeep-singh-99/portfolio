import { NextRequest, NextResponse } from "next/server";
import SkillModel from "../../../../../../models/skill-model";
import { ConnectDB } from "../../../../../../lib/db";
import { UploadImage } from "../../../../../../lib/upload_image";

export async function DELETE({ params }: { params: { id: string } }) {
    await ConnectDB();
  try {
    const { id } = params;
    await SkillModel.findByIdAndDelete(id);

    return NextResponse.json(
      { message: "Skill section deleted successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


export async function PUT(req: NextRequest, {params}: { params: { id: string } }) {
    await ConnectDB();
    try {
        const { id } = params;

        const formData = await req.formData();

        const skillImage = formData.get("skillImage") as File;

        const skillImageResult: any = await UploadImage(skillImage, "skill");

        await SkillModel.findByIdAndUpdate(id, {skillImage: skillImageResult.secure_url, cloudinaryId: skillImageResult.public_id});

        return NextResponse.json({ message: "Skill section updated successfully" }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}