import { NextRequest, NextResponse } from "next/server";
import { ConnectDB } from "../../../../../../lib/db";
import HomeModel from "../../../../../../models/home-model";
import { UploadImage } from "../../../../../../lib/upload_image";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await ConnectDB();
  try {
    const resolvedParams = await params;
    const id = resolvedParams.id;

    if (!id) {
      return NextResponse.json(
        { error: "Missing contact ID" },
        { status: 400 }
      );
    }

    const contact = await HomeModel.findById(id);
    if (!contact) {
      return NextResponse.json(
        { error: "Contact section not found" },
        { status: 404 }
      );
    }

    await HomeModel.findByIdAndDelete(id);
    return NextResponse.json(
      { message: "Contact section deleted successfully" },
      { status: 200 }
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { error: "An unknown error occurred" },
      { status: 500 }
    );
  }
}

// export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
//     await ConnectDB();
//     try {
//         const { id } = params;

//         // Find existing data
//         const existingData = await HomeModel.findById(id);
//         if (!existingData) {
//             return NextResponse.json({ error: "Data not found" }, { status: 404 });
//         }

//         // Extract Cloudinary public ID from URLs
//         const getPublicId = (url: string) => {
//             const parts = url.split("/");
//             return parts[parts.length - 1].split(".")[0]; // Extract public ID without extension
//         };

//         if (existingData.profileImage) {
//             const profileImageId = getPublicId(existingData.profileImage);
//             await cloudinary.uploader.destroy(profileImageId);
//         }

//         if (existingData.resumeFile) {
//             const resumeFileId = getPublicId(existingData.resumeFile);
//             await cloudinary.uploader.destroy(resumeFileId, { resource_type: "raw" });
//         }

//         // Delete the record
//         await HomeModel.findByIdAndDelete(id);

//         return NextResponse.json({ message: "Data deleted successfully" }, { status: 200 });
//     } catch (error) {
//         console.error("Error deleting data:", error);
//         return NextResponse.json({ error: "Failed to delete data" }, { status: 500 });
//     }
// }

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await ConnectDB();
  try {
    const resolvedParams = await params;
    const id = resolvedParams.id;
    if (!id) {
      return NextResponse.json({ error: "Missing ID" }, { status: 400 });
    }

    const formData = await req.formData();

    const name = formData.get("name") as string;
    const techStack = formData.get("techStack") as string;
    const description = formData.get("description") as string;
    const profileImage = formData.get("image") as File | null;
    const resumeFile = formData.get("resumeFile") as File | null;

    const existingData = await HomeModel.findById(id);
    if (!existingData) {
      return NextResponse.json({ error: "Data not found" }, { status: 404 });
    }

    let profileImageUrl = existingData.profileImage;
    let resumeFileUrl = existingData.resumeFile;

    if (profileImage) {
      if (!profileImage.type.includes("image")) {
        return NextResponse.json(
          { error: "Profile image must be an image file" },
          { status: 400 }
        );
      }
      const profileImageResult = await UploadImage(
        profileImage,
        "home-section"
      );
      profileImageUrl = profileImageResult.secure_url;
    }

    if (resumeFile) {
      if (!resumeFile.type.includes("pdf")) {
        return NextResponse.json(
          { error: "Resume file must be a PDF" },
          { status: 400 }
        );
      }
      const resumeFileResult = await UploadImage(resumeFile, "home-section");
      resumeFileUrl = resumeFileResult.secure_url;
    }

    const updateData = await HomeModel.findByIdAndUpdate(
      id,
      {
        name,
        techStack,
        description,
        profileImage: profileImageUrl,
        resumeFile: resumeFileUrl,
      },
      { new: true }
    );

    return NextResponse.json(
      { message: "Data updated successfully", data: updateData },
      { status: 200 }
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { error: "An unknown error occurred" },
      { status: 500 }
    );
  }
}
