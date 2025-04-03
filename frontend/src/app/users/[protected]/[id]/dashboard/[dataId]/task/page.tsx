"use client"
import { checkSession, getData } from '@/lib/api'
import { Params, Task } from '@/lib/type'
import React, { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function TaskPage({params}: {params: Params}) {
    const base_url = '/api/users/'
    params = useParams()
    const userId = params.id;
    const taskId = params.dataId;
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
    
    useEffect(()=> {
        getData(base_url + userId + "/tasks/" + taskId).then((data) => (setTask(data[0])))
    }, [taskId])
  return (
    <div>
        <h1>{task?.title}</h1>
        <p>{task?.content}</p>
        <p>{task?.done}</p>
        <Link href={`task/edit/`}>
            Edit
        </Link>
    </div>
  )
}
