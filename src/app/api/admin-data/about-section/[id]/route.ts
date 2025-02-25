import { NextRequest, NextResponse } from "next/server";
import { ConnectDB } from "../../../../../../lib/db";
import AboutModel from "../../../../../../models/about-model";

export async function DELETE(
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

    const existingData = await AboutModel.findById(id);
    if (!existingData) {
      return NextResponse.json({ error: "Data not found" }, { status: 404 });
    }

    await AboutModel.findByIdAndDelete(id);
    return NextResponse.json({ success: "Successfully deleted" }, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
  }
}


// export async function PUT(req: NextRequest, context: RouteContext) {
//     await ConnectDB();
//     try {
//         const id = context.params.id;
//         const formData = await req.formData();

//         const description = formData.get("description") as string;

//         if (!description) {
//             throw new Error("Description is required");
//         }

//         const about = await AboutModel.findByIdAndUpdate(id, { description }, { new: true });

//         return NextResponse.json({ success: "Successfully updated", about }, { status: 200 });

//     } catch (error: unknown) {
//         if (error instanceof Error) {
//             return NextResponse.json({ error: error.message }, { status: 500 });
//         }
//         return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
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
    const description = formData.get("description")?.toString();
    if (!description) {
      return NextResponse.json({ error: "Description is required" }, { status: 400 });
    }
    const about = await AboutModel.findByIdAndUpdate(
      id,
      { description },
      { new: true }
    );
    if (!about) {
      return NextResponse.json({ error: "Data not found" }, { status: 404 });
    }
    return NextResponse.json({ success: "Successfully updated", about }, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
  }
}
