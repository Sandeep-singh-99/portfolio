import { NextRequest, NextResponse } from "next/server";
import { ConnectDB } from "../../../../../../lib/db";
import ContactModel from "../../../../../../models/contact-model";
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
    const contact = await ContactModel.findById(id);
    if (!contact) {
      return NextResponse.json({ error: "Contact section not found" }, { status: 404 });
    }
    await ContactModel.findByIdAndDelete(id);
    return NextResponse.json({ message: "Contact section deleted successfully" }, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
  }
}

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
      const contactImage = await UploadImage(image, "contact");
      updatedData.image = contactImage.secure_url;
      updatedData.cloudinaryId = contactImage.public_id;
    }
    await ContactModel.findByIdAndUpdate(id, updatedData);
    return NextResponse.json({ message: "Contact section updated successfully" }, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
  }
}