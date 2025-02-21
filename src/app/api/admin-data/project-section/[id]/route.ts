import { NextRequest, NextResponse } from "next/server";
import { ConnectDB } from "../../../../../../lib/db";
import ProjectModel from "../../../../../../models/project-model";
import { UploadImage } from "../../../../../../lib/upload_image";

export async function DELETE(req: NextRequest, {params}: {params: {id: string}}) {
    await ConnectDB();
    try {
        const id  = params?.id;

        if (!id) {
            return NextResponse.json({ error: "Missing project ID" }, { status: 400 });
        }

        const project = await ProjectModel.findById(id);
        if (!project) {
            return NextResponse.json({ error: "Project not found" }, { status: 404 });
        }

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

        const existingData = await ProjectModel.findById(id);
        if (!existingData) {
            return NextResponse.json({ error: "Project not found" }, { status: 404 });
        }

        let projectImageUrl = existingData.projectImage;

        if (projectImage) {
            if (!projectImage.type.includes("projectImage")) {
                return NextResponse.json({ error: "Invalid file type" }, { status: 400 });
            }

            const projectImageResult: any = await UploadImage(projectImage, "project");
            projectImageUrl = projectImageResult.secure_url;
        }

        await ProjectModel.findByIdAndUpdate(id, {
            projectName,
            projectDescription,
            projectImage: projectImageUrl,
            technologyUsed,
            cloudinaryId: projectImageUrl.public_id,
            projectUrl,
        }, { new: true });

        return NextResponse.json({ message: "Project updated successfully" }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}