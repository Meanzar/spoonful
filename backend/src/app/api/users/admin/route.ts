import { NextResponse } from "next/server";
import { getSupabaseClient } from "@/lib/supabase";

export async function GET() {
    const supabase = getSupabaseClient();
    const { data: users, error } = await supabase
        .from("users")
        .select("id, username, email, role, banned");

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(users, { status: 200 });
}


export async function PATCH(req: Request) {
    let body;
    try {
        body = await req.json();
    } catch (error) {
        return NextResponse.json({ error: "Invalid JSON format" }, { status: 400 });
    }

    if (!body.id || typeof body.banned !== "boolean") {
        return NextResponse.json({ error: "Missing or invalid 'id' or 'banned' field" }, { status: 400 });
    }

    const supabase = getSupabaseClient();
    const { error } = await supabase
        .from("users")
        .update({ banned: body.banned })
        .eq("id", body.id);

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: "User updated successfully" }, { status: 200 });
}


export async function DELETE(req: Request) {
    const body = await req.json();
    const supabase = getSupabaseClient();

    const { error } = await supabase
        .from("users")
        .delete()
        .eq("id", body.id);

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ message: "User deleted successfully" }, { status: 200 });
}

