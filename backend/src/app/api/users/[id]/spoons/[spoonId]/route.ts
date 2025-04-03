import { getSupabaseClient } from '@/lib/supabase';
import { Params } from '@/lib/type';
import { NextRequest} from 'next/server'

export async function GET(request: NextRequest, {params}: {params: Params}) {
    const spoonId = params.spoonId;
    const supabase = getSupabaseClient();

    const { data, error} = await supabase
        .from('spoons')
        .select('*')
        .eq('id', spoonId)
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
    const spoonId = params.spoonId

    const supabase = getSupabaseClient();
    
    const body = await request.json();

    const { error } = await supabase
        .from('spoons')
        .update({ total: body.total })
        .eq('id', spoonId)
    if (error) {
        return new Response(error.message, {
            status: 500
        })
    }
    const spoon = JSON.stringify('Spoon updated'); 
    return new Response(spoon, {
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}