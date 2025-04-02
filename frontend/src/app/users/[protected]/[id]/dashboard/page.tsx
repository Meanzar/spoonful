"use client"
import { checkSession, getData } from '@/lib/api'
import { Mood, Params, Spoon, Task } from '@/lib/type'
import React, { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'

export default function TasksPage({params}: {params: Params}) {
    const base_url = '/api/users/'
    params = useParams()
    const userId = params.id;
    const [tasks, setTasks] = useState<Array<Task>>([])
    const [mood, setMood] = useState<Mood>()
    const [spoons, setSpoons] = useState<Array<Spoon>>([])
    const router = useRouter();

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
        getData(base_url + userId + "/tasks/").then((data) => (setTasks(data)))
        getData(base_url + userId + "/moods/").then((data) => (setMood(data)))
        getData(base_url + userId + "/spoons/").then((data) => (setSpoons(data)))
    }, [userId])
    console.log(tasks)
    console.log('mood :',mood)
    console.log('spoons :',spoons)
  return (
    <div>
        {tasks?.map((task: Task) => (
            <div key={task.id}>
                <h1>{task.title}</h1>
                <p>{task.content}</p>
                <p>{task.done}</p>
            </div>
        ))}
        <p>{mood?.note}</p>
        {spoons?.map((spoon: Spoon) => (
            <div key={spoon.id}>
                <h1>{spoon.total}</h1>
            </div>
        ))}
    </div>
  )
}
