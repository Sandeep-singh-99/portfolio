import { NextRequest, NextResponse } from "next/server";
import { ConnectDB } from "../../../../../lib/db";
import { UploadImage } from "../../../../../lib/upload_image";
import ContactModel from "../../../../../models/contact-model";


export async function POST(req: NextRequest) {
    await ConnectDB();
    try {
        const formData = await req.formData();

        const url = formData.get("url") as string;
        const image = formData.get("image") as File;

        if (!url || !image) {
            return NextResponse.json({ error: "Please fill all fields" }, { status: 400 });
        }

        const contactImage = await UploadImage(image, "contact");

        await ContactModel.create({
            url,
            image: contactImage.secure_url,
            cloudinaryId: contactImage.public_id,
        });

        return NextResponse.json({ message: "Contact section added successfully" }, { status: 200 });
    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
    }
}

export async function GET() {
    await ConnectDB();
    try {
        const contactData = await ContactModel.find();

        return NextResponse.json({ data: contactData }, { status: 200 });
    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
    }
}
