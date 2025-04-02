import { getSupabaseClient } from "@/lib/supabase";
import { NextRequest } from "next/server";


export async function GET(request: NextRequest) {
    const supabase = getSupabaseClient();
    
    return new Response(JSON.stringify(supabase), {
        status: 200,
        headers: { "Content-Type": "application/json" }
    })
}
export async function POST(request: NextRequest) {
    const supabase = getSupabaseClient();
    
    try {
        const body = await request.json(); 
        const { email, password } = body;

        if (!email || !password) {
            return new Response(JSON.stringify({ error: "Missing required fields" }), { 
                status: 400,
                headers: { "Content-Type": "application/json" }
            });
        }

        const { data: authData, error: authError } = await supabase.auth.signUp({ email, password });

        if (authError || !authData?.user) {
            return new Response(JSON.stringify({ error: authError?.message || "Unknown error" }), {
                status: 500,
                headers: { "Content-Type": "application/json" }
            });
        }


        return new Response(JSON.stringify("create bitch"), {
            status: 201,
            headers: { "Content-Type": "application/json" }
        });

    } catch (error) {
        console.error("Error in POST /register:", error);
        return new Response(JSON.stringify({ error: "Internal server error" }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
}
