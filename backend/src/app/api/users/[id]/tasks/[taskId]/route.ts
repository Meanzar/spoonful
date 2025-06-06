import { getSupabaseClient } from '@/lib/supabase';
import { Params } from '@/lib/type';
import { NextRequest} from 'next/server'

export async function GET(request: NextRequest, {params}: {params: Params}) {
    const taskId = params.dataId;
    const supabase = getSupabaseClient();

    const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('id', taskId)

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

export async function PUT(request: NextRequest, {params}: {params: Params}) {
    const taskId = params.taskId;
    const supabase = getSupabaseClient();
    const body = await request.json();

    const { error } = await supabase
        .from('tasks')
        .update({ title: body.title, content: body.content, done: body.done })
        .eq('id', taskId)
    if (error) {
        return new Response(error.message, {
            status: 500
        })
    }

    const task = JSON.stringify('Task updated');
    return new Response(task, {
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        }
    })
} 