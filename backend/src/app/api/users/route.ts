import { getSupabaseClient } from "@/lib/supabase";

export async function GET() {
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