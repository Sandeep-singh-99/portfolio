import { NextRequest, NextResponse } from "next/server";
import { ConnectDB } from "../../../../../../lib/db";
import AboutModel from "../../../../../../models/about-model";

export async function DELETE({ params }: { params: { id: string } }) {
    await ConnectDB();
    try {
        const { id } = params;

        const existingData = await AboutModel.findById(id);

        if (!existingData) {
            return NextResponse.json({ error: "Data not found" }, { status: 404 });
        }
        await AboutModel.findByIdAndDelete(id)

        return NextResponse.json({ success: "successfully deleted" }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PUT(req: NextRequest, {params}: {params: {id: string}}) {
    await ConnectDB();
    try {
        const { id } = params;
        const formData = await req.formData();

        const description = formData.get('description') as string;

        if (!description) {
            throw new Error('Description is required');
        }

        const about = await AboutModel.findByIdAndUpdate(id, { description }, { new: true });

        return NextResponse.json({ success: "successfully updated", about }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}