import { getSupabaseClient } from "@/lib/supabase";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    const supabase = getSupabaseClient();
    const { data, error} = await supabase
        .from('users')
        .select('*')
    if (error) {
        return {
            status: 500,
            body: error.message
        }
    }
    const users = JSON.stringify(data);
    return new Response(users, {
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        }
})
}