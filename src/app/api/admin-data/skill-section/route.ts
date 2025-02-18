import { NextRequest, NextResponse } from "next/server";
import { ConnectDB } from "../../../../../lib/db";
import SkillModel from "../../../../../models/skill-model";
import { UploadImage } from "../../../../../lib/upload_image";

export async function POST(req: NextRequest) {
    await ConnectDB();
    try {
        const formData = await req.formData();

        const skillImage = formData.get("skillImage") as File;
        
        const skillImageResult: any = await UploadImage(skillImage, "skill");

        await SkillModel.create({skillImage: skillImageResult.secure_url, cloudinaryId: skillImageResult.public_id});

        return NextResponse.json({ message: "Skill section created successfully" }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function GET() {
    await ConnectDB();
    try {
        const skillSections = await SkillModel.find();

        return NextResponse.json(skillSections, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}