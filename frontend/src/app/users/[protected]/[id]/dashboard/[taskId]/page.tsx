"use client"
import { getData } from '@/lib/api'
import { Params, Task } from '@/lib/type'
import React, { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'

export default function TaskPage({params}: {params: Params}) {
    const base_url = '/api/users/'
    params = useParams()
    const userId = params.id;
    const taskId = params.taskId;
    const [task, setTask] = useState<Task>()

    useEffect(()=> {
        getData(base_url + userId + "/tasks/" + taskId).then((data) => (setTask(data[0])))
    })
    console.log(task)
  return (
    <div>
        <h1>{task?.title}</h1>
        <p>{task?.content}</p>
        <p>{task?.done}</p>

    </div>
  )
}
