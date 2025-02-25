import { NextRequest, NextResponse } from "next/server";
import { ConnectDB } from "../../../../../lib/db";
import AboutModel from "../../../../../models/about-model";

export async function POST(req: NextRequest) {
    await ConnectDB();
    try {
        const formData = await req.formData();
        const description = formData.get("description") as string;

        if (!description) {
            throw new Error("Description is required");
        }

        const addAbout = await AboutModel.create({ description });

        return NextResponse.json(
            { success: "Successfully created", addAbout },
            { status: 201 }
        );
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
        const about = await AboutModel.find();
        return NextResponse.json(about, { status: 200 });
    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
    }
}
