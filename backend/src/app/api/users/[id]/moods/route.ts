import { getSupabaseClient } from '@/lib/supabase'
import { Params } from '@/lib/type'
import { NextRequest} from 'next/server'

export async function GET(request: NextRequest, {params}: {params: Params}) {
    const userId = params.id;
    const supabase = getSupabaseClient();
    
    const { data, error } = await supabase
        .from('moods')
        .select('*')
        .eq('user_id', userId)

    if (error) {
        return new Response(error.message, {
            status: 500
        })
    }
    if (data.length === 0) {
        return new Response('Moods not found', {
            status: 404
        })
    }

    const moods = JSON.stringify(data);
    return new Response(moods, {
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}
export async function POST(request: NextRequest, {params}: {params: Params}) {
    const userId = params.id;
    const supabase = getSupabaseClient();
    const body = await request.json();

    const { error } = await supabase
        .from('moods')  
        .insert({ note: body.note, user_id: userId })
        .eq('user_id', userId)
    if (error) {
        return new Response(error.message, {
            status: 500
        })
    }

    const mood = JSON.stringify('Mood register');
    return new Response(mood, {
        status: 201,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

