import { getSupabaseClient } from "@/lib/supabase";
import { Params } from "@/lib/type";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest,{params}: {params: Params}) {
    const userId = params.id;
    const supabase = getSupabaseClient();

    const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single()

    if (error) {
        return new Response(error.message, {
            status: 500
        })
    }
    if (data.length === 0) {
        return new Response('User not found', {
            status: 404
        })
    }

    const user = JSON.stringify(data);
    
    return new Response(user, {
        status: 200,
        headers: {
            'Content-Type' : 'application/json'
        }
    })
}


export async function PUT(request: NextRequest, {params}: {params: Params}) {
    const userId =  params.id;
    const supabase = getSupabaseClient();
    const body = await request.json();

    const { error } = await supabase
        .from('users')
        .update({ username: body.username, profile_picture: body?.profile_picture })
        .eq('id', userId)
    if (error) {
        return new Response(error.message, {
            status: 500
        })
    }

    const user = JSON.stringify('User updated');
    return new Response(user, {
        status: 201,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}