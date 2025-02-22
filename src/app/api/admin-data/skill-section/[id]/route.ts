import { NextRequest, NextResponse } from "next/server";
import SkillModel from "../../../../../../models/skill-model";
import { ConnectDB } from "../../../../../../lib/db";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await ConnectDB();
  try {
    const resolvedParams = await params;
    const  id  = resolvedParams.id;
    const { imageUrl } = await req.json();

    const skill = await SkillModel.findById(id);
    if (!skill) {
      return NextResponse.json(
        { message: "Skill section not found" },
        { status: 404 }
      );
    }

    skill.skillImages = skill.skillImages.filter(
      (img: string) => img !== imageUrl
    );
    

    if (skill.skillImages.length === 0) {
      await SkillModel.findByIdAndDelete(id);
      return NextResponse.json(
        { message: "Skill section deleted since no images were left" },
        { status: 200 }
      );
    }

    await skill.save();
    return NextResponse.json(
      { message: "Image deleted successfully" },
      { status: 200 }
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
