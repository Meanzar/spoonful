import { getSupabaseClient } from '@/lib/supabase'
import { Params } from '@/lib/type'
import { NextRequest} from 'next/server'

export async function GET(request: NextRequest, {params}: {params: Params}) {
    const userId = params.id;
    const supabase = getSupabaseClient();
    
    const { data, error } = await supabase
        .from('spoons')
        .select('*')
        .eq('user_id', userId)

    if (error) {
        return new Response(error.message, {
            status: 500
        })
    }
    if (data.length === 0) {
        return new Response('Spoons not found', {
            status: 404
        })
    }

    const spoons = JSON.stringify(data);
    return new Response(spoons, {
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        }
    })

}