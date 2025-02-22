import { NextRequest, NextResponse } from "next/server";
import { ConnectDB } from "../../../../../../lib/db";
import ProjectModel from "../../../../../../models/project-model";
import { UploadImage } from "../../../../../../lib/upload_image";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise< {id: string}> }
) {
  await ConnectDB();
  try {
    const resolvedParams = await params;
    const id = resolvedParams?.id;

    if (!id) {
      return NextResponse.json(
        { error: "Missing project ID" },
        { status: 400 }
      );
    }

    const project = await ProjectModel.findById(id);
    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    await ProjectModel.findByIdAndDelete(id);

    return NextResponse.json(
      { message: "Project deleted successfully" },
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

// export async function PUT(
//   req: NextRequest,
//   { params }: { params: Promise<{ id: string }> }
// ) {
//   await ConnectDB();
//   try {
//     const resolvedParams = await params;
//     const id = resolvedParams.id;
//     const formData = await req.formData();

//     const projectName = formData.get("projectName") as string;
//     const projectDescription = formData.get("projectDescription") as string;
//     const projectImage = formData.get("projectImage") as File;
//     const technologyUsed = formData.getAll("technologyUsed") as string[];
//     const projectUrl = formData.get("projectUrl") as string;

//     const existingData = await ProjectModel.findById(id);
//     if (!existingData) {
//       return NextResponse.json({ error: "Project not found" }, { status: 404 });
//     }

//     let projectImageUrl = existingData.projectImage;

//     if (projectImage) {
//       if (!projectImage.type.includes("projectImage")) {
//         return NextResponse.json(
//           { error: "Invalid file type" },
//           { status: 400 }
//         );
//       }

//       const projectImageResult = await UploadImage(projectImage, "project");
//       projectImageUrl = projectImageResult.secure_url;
//     }

//     await ProjectModel.findByIdAndUpdate(
//       id,
//       {
//         projectName,
//         projectDescription,
//         projectImage: projectImageUrl,
//         technologyUsed,
//         cloudinaryId: projectImageUrl.public_id,
//         projectUrl,
//       },
//       { new: true }
//     );

//     return NextResponse.json(
//       { message: "Project updated successfully" },
//       { status: 200 }
//     );
//   } catch (error) {
//     if (error instanceof Error) {
//       return NextResponse.json({ error: error.message }, { status: 500 });
//     }
//     return NextResponse.json(
//       { error: "An unknown error occurred" },
//       { status: 500 }
//     );
//   }
// }


export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await ConnectDB();
  try {
    const resolvedParams = await params;
    const id = resolvedParams.id;
    const formData = await req.formData();

    const projectName = formData.get("projectName") as string;
    const projectDescription = formData.get("projectDescription") as string;
    const projectImage = formData.get("projectImage") as File | null;
    const technologyUsed = formData.getAll("technologyUsed") as string[];
    const projectUrl = formData.get("projectUrl") as string;

    const existingData = await ProjectModel.findById(id);
    if (!existingData) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    let projectImageUrl = existingData.projectImage;
    let cloudinaryId = existingData.cloudinaryId;

    // Handle Image Upload if a New Image is Provided
    if (projectImage) {
      if (!projectImage.type.startsWith("image/")) {
        return NextResponse.json(
          { error: "Invalid file type. Only image files are allowed." },
          { status: 400 }
        );
      }

      // Upload Image to Cloudinary
      const projectImageResult = await UploadImage(projectImage, "project");
      projectImageUrl = projectImageResult.secure_url;
      cloudinaryId = projectImageResult.public_id;
    }

    // Update Project Data
    await ProjectModel.findByIdAndUpdate(
      id,
      {
        projectName,
        projectDescription,
        projectImage: projectImageUrl,
        technologyUsed,
        cloudinaryId,
        projectUrl,
      },
      { new: true }
    );

    return NextResponse.json(
      { message: "Project updated successfully" },
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
