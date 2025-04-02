import { getSupabaseClient } from '@/lib/supabase';
import { Params } from '@/lib/type';
import { NextRequest} from 'next/server'


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