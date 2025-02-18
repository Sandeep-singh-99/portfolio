import { NextRequest, NextResponse } from "next/server";
import { ConnectDB } from "../../../../lib/db";
import AdminAuth from "../../../../models/admin-auth";

export async function POST(req: NextRequest) {
    try {
        const { username, password } = await req.json();

        if (!username || !password) {
            return NextResponse.json({ error: "Please provide username and password" }, { status: 400 });
        }

        await ConnectDB();

        const adminExists = await AdminAuth.findOne({ username });

        if (!adminExists) {
            return NextResponse.json({ error: "Invalid username or password" }, { status: 400 });
        }

        if (adminExists.password !== password) {
            return NextResponse.json({ error: "Invalid username or password" }, { status: 400 });
        }

        return NextResponse.json({ message: "Admin logged in successfully" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Faild to login admin" }, { status: 500 });
    }
}