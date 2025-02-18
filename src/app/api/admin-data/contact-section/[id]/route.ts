import { NextRequest, NextResponse } from "next/server";
import { ConnectDB } from "../../../../../../lib/db";
import ContactModel from "../../../../../../models/contact-model";
import { UploadImage } from "../../../../../../lib/upload_image";

export async function DELETE({params}: {params: {id: string}}) {
    await ConnectDB();
    try {
        const { id } = params;
        await ContactModel.findByIdAndDelete(id);

        return NextResponse.json({ message: 'Contact section deleted successfully' }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}


export async function PUT(req: NextRequest, {params}: {params: {id: string}}) {
    await ConnectDB();
    try {
        const { id } = params;

        const formData = await req.formData();

        const url = formData.get('url') as string;
        const image = formData.get('image') as File;
       

        if (!url || !image) {
            return NextResponse.json({ error: 'Please fill all fields' }, { status: 400 });
        }

        const contactImage: any = await UploadImage(image, "contact");

        await ContactModel.findByIdAndUpdate(id, { url, image: contactImage.secure_url, cloudinaryId: contactImage.public_id });

        return NextResponse.json({ message: 'Contact section updated successfully' }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}