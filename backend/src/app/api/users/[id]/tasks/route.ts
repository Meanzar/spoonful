import { getSupabaseClient } from '@/lib/supabase';
import { Params } from '@/lib/type';
import { NextRequest} from 'next/server'

export async function GET(request: NextRequest, {params}: {params: Params}) {
    const userId = params.id;
    const supabase = getSupabaseClient();

    const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('user_id', userId)

    if (error) {
        return new Response(error.message, {
            status: 500
        })
    }
    if (data.length === 0) {
        return new Response('Tasks not found', {
            status: 404
        })
    }
    const tasks = JSON.stringify(data);
    
    return new Response(tasks, {
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

    const {  error } = await supabase
        .from('tasks')  
        .insert({ title: body.title, content: body.content, done: false, user_id: userId })
    if (error) {
        return new Response(error.message, {
            status: 500
        })
    }

    const task = JSON.stringify('Task created');
    return new Response(task, {
        status: 201,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}