"use client"
import { Params, Task } from '@/lib/type'
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { handleInput, handleEdit } from '@/lib/service'
import { checkSession, getData } from '@/lib/api'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function EditUserTaskPage({params}: {params: Params}) {
    params = useParams()
    const userId = params.id
    const taskId = params.taskId;
    const base_url = '/api/users/'
    const [task, setTask] = useState<Task>()
    const router = useRouter()

    useEffect(() => {
        const verifySession = async () => {
          const session = await checkSession();
          if (!session) {
            router.push("/auth/login");
            return;
          }
        };
    
        verifySession();
      }, [userId]);
    useEffect(() => {
        getData(base_url + userId + taskId).then((data) => (setTask(data[0]))
        )
    }, [userId])

    const [title, setTitle] = useState<string>( task?.title ||'')
    const [content, setContent] = useState<string>( task?.content || '')
    const [done, setDone] = useState<boolean>( task?.done || false)

    const handleButton = () => handleEdit(base_url + userId + taskId, {title: title, content: content, done: done})

  return (
    <div>
        <h1>Edit Task</h1>
        <Input type="text" value={title} onChange={(e) => handleInput(setTitle, e)} placeholder={task?.title} />
        <Input type="text" value={content} onChange={(e) => handleInput(setContent, e)} placeholder={task?.content}/>
        <Input type="checkbox" onChange={(e) => handleInput(e, setDone)} />
        <Button onClick={handleButton}>Submit</Button>
    </div>
  )
}
