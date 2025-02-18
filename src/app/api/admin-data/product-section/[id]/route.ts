import { NextRequest, NextResponse } from "next/server";
import { ConnectDB } from "../../../../../../lib/db";
import ProjectModel from "../../../../../../models/project-model";
import { UploadImage } from "../../../../../../lib/upload_image";

export async function DELETE({params}: {params: {id: string}}) {
    await ConnectDB();
    try {
        const { id } = params;
        await ProjectModel.findByIdAndDelete(id);

        return NextResponse.json({ message: "Project deleted successfully" }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}


export async function PUT(req: NextRequest, {params}: {params: {id: string}}) {
    await ConnectDB();
    try {
        const { id } = params;
        const formData = await req.formData();

        const projectName = formData.get("projectName") as string;
        const projectDescription = formData.get("projectDescription") as string;
        const projectImage = formData.get("projectImage") as File;
        const technologyUsed = formData.getAll("technologyUsed") as string[];
        const projectUrl = formData.get("projectUrl") as string;

        const projectImageResult: any = await UploadImage(projectImage, "project");

        await ProjectModel.findByIdAndUpdate(id, {
            projectName,
            projectDescription,
            projectImage: projectImageResult.secure_url,
            technologyUsed,
            cloudinaryId: projectImageResult.public_id,
            projectUrl,
        }, { new: true });

        return NextResponse.json({ message: "Project updated successfully" }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}