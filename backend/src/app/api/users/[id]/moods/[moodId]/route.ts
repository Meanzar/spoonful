import { NextRequest} from 'next/server'
import { Params } from '@/lib/type';
import { getSupabaseClient } from '@/lib/supabase';

export async function GET(request: NextRequest, {params}: {params: Params}) {
    const moodId = params.moodId;
    const supabase = getSupabaseClient();

    const { data, error} = await supabase
        .from('moods')
        .select('*')
        .eq('id', moodId)
    if (error) {
        return new Response(error.message, {
            status: 500
        })
    }
    if (data.length === 0) {
        return new Response('Mood not found', {
            status: 404
        })
    }

    const mood = JSON.stringify(data);
    return new Response(mood, {
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        }   
    })

}

export async function PUT(request: NextRequest, {params}: {params: Params}) {
    const userId = params.id;
    const moodId = params.moodId;
    const supabase = getSupabaseClient();
    const body = await request.json();

    const { error } = await supabase
        .from('moods')  
        .update({ note: body.note, user_id: userId })
        .eq('id', moodId)
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