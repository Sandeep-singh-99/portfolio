import { NextRequest, NextResponse } from "next/server";
import { ConnectDB } from "../../../../../lib/db";
import { UploadImage } from "../../../../../lib/upload_image";
import ProjectModel from "../../../../../models/project-model";

export async function post(req: NextRequest) {
  await ConnectDB();
  try {
    const formData = await req.formData();

    const projectName = formData.get("projectName") as string;
    const projectDescription = formData.get("projectDescription") as string;
    const projectImage = formData.get("projectImage") as File;
    const technologyUsed = formData.getAll("technologyUsed") as string[];
    const projectUrl = formData.get("projectUrl") as string;

    const productImageResult: any = await UploadImage(projectImage, "project");

    await ProjectModel.create({
      projectName,
      projectDescription,
      projectImage: productImageResult.secure_url,
      technologyUsed,
      cloudinaryId: productImageResult.public_id,
      projectUrl,
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function GET() {
  await ConnectDB();
  try {
    const projects = await ProjectModel.find();

    return NextResponse.json({ projects }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
