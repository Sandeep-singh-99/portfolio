import { NextRequest, NextResponse } from "next/server";
import { ConnectDB } from "../../../../../../lib/db";
import AboutModel from "../../../../../../models/about-model";

export async function DELETE({ params }: { params: { id: string } }) {
    await ConnectDB();
    try {
        const { id } = params;
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
        const { description } = await req.json()

        if (!description) {
            throw new Error('Description is required');
        }

        const about = await AboutModel.findByIdAndUpdate(id, { description }, { new: true });

        return NextResponse.json({ success: "successfully updated", about }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}