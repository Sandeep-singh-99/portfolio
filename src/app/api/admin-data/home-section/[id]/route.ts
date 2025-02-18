import { NextRequest, NextResponse } from "next/server";
import { ConnectDB } from "../../../../../../lib/db";
import HomeModel from "../../../../../../models/home-model";
import { UploadImage } from "../../../../../../lib/upload_image";
import cloudinary from "../../../../../../lib/cloudinary";

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    await ConnectDB();
    try {
        const { id } = params;

        // Find existing data
        const existingData = await HomeModel.findById(id);
        if (!existingData) {
            return NextResponse.json({ error: "Data not found" }, { status: 404 });
        }

        // Delete the record
        await HomeModel.findByIdAndDelete(id);

        return NextResponse.json({ message: "Data deleted successfully" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete data" }, { status: 500 });
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

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    await ConnectDB();
  
    try {
      const { id } = params;
      const formData = await req.formData();
  
      // Extract fields from formData
      const name = formData.get("name") as string;
      const techStack = formData.get("techStack") as string;
      const description = formData.get("description") as string;
      const profileImage = formData.get("image") as File | null;
      const resumeFile = formData.get("resumeFile") as File | null;
  
      // Find existing data
      const existingData = await HomeModel.findById(id);
      if (!existingData) {
        return NextResponse.json({ error: "Data not found" }, { status: 404 });
      }
  
      let profileImageUrl = existingData.profileImage;
      let resumeFileUrl = existingData.resumeFile;
  
      // Upload new profile image if provided
      if (profileImage) {
        if (!profileImage.type.includes("image")) {
          return NextResponse.json({ error: "Profile image must be an image file" }, { status: 400 });
        }
        const profileImageResult: any = await UploadImage(profileImage, "home-section");
        profileImageUrl = profileImageResult.secure_url;
      }
  
      // Upload new resume file if provided
      if (resumeFile) {
        if (!resumeFile.type.includes("pdf")) {
          return NextResponse.json({ error: "Resume file must be a PDF" }, { status: 400 });
        }
        const resumeFileResult: any = await UploadImage(resumeFile, "home-section");
        resumeFileUrl = resumeFileResult.secure_url;
      }
  
      // Update the database entry
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
  
      return NextResponse.json({ message: "Data updated successfully", data: updateData }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: "Failed to update data" }, { status: 500 });
    }
  }
  