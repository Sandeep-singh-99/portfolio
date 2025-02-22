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
      return NextResponse.json({ error: "Missing contact ID" }, { status: 400 });
    }

    const contact = await HomeModel.findById(id);
    if (!contact) {
      return NextResponse.json({ error: "Contact section not found" }, { status: 404 });
    }

    await HomeModel.findByIdAndDelete(id);
    return NextResponse.json({ message: "Contact section deleted successfully" }, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "An unknown error occurred" }, { status: 500 });
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
    const url = formData.get("url") as string;
    const image = formData.get("image") as File | null;

    if (!url) {
      return NextResponse.json({ error: "Please fill all fields" }, { status: 400 });
    }

    const updatedData: Partial<{ url: string; image?: string; cloudinaryId?: string }> = { url };

    if (image) {
      if (!image.type.includes("image")) {
        return NextResponse.json({ error: "Profile image must be an image file" }, { status: 400 });
      }
      const contactImage = await UploadImage(image, "home-section");
      updatedData.image = contactImage.secure_url;
      updatedData.cloudinaryId = contactImage.public_id;
    }

    await HomeModel.findByIdAndUpdate(id, updatedData);
    return NextResponse.json({ message: "Data updated successfully" }, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "An unknown error occurred" }, { status: 500 });
  }
}
