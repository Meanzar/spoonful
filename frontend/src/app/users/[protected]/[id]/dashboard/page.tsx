"use client"

import { checkSession, getData } from '@/lib/api';
import { Mood, Params, Spoon, Task } from '@/lib/type';
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Frown, Meh, Smile, Laugh } from 'lucide-react';
import Image from "next/image";


export default function DashboardPage({ params }: { params: Params }) {
  const base_url = '/api/users/';
  params = useParams();
  const userId = params.id;
  const [tasks, setTasks] = useState<Array<Task>>([]);
  const [mood, setMood] = useState<Mood | null>(null);
  const [spoons, setSpoons] = useState<Array<Spoon>>([]);
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tasksData, moodData, spoonsData] = await Promise.all([
          getData(base_url + userId + "/tasks/").catch(() => []),
          getData(base_url + userId + "/moods/").catch(() => null),
          getData(base_url + userId + "/spoons/").catch(() => []),
        ]);

        setTasks(tasksData);
        setMood(moodData ? moodData[0] : null);
        setSpoons(spoonsData);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    };
    fetchData();
  }, [userId]);

  return (
    <div className="p-6 space-y-6 bg-gray-100 min-h-screen">
      <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-4">How are you feeling today?</h2>
        <div className="flex justify-around w-full">
          <button className="text-gray-600 hover:text-red-500">
            <Frown className="h-8 w-8" /> <p className="text-sm mt-1">Very Bad</p>
          </button>
          <button className="text-gray-600 hover:text-orange-400">
            <Meh className="h-8 w-8" /> <p className="text-sm mt-1">Bad</p>
          </button>
          <button className="text-gray-600 hover:text-gray-400">
            <Meh className="h-8 w-8" /> <p className="text-sm mt-1">Neutral</p>
          </button>
          <button className="text-gray-600 hover:text-green-500">
            <Smile className="h-8 w-8" /> <p className="text-sm mt-1">Happy</p>
          </button>
          <button className="text-gray-600 hover:text-blue-500">
            <Laugh className="h-8 w-8" /> <p className="text-sm mt-1">Very Happy</p>
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/2 bg-white p-4 shadow-md rounded-lg">
          <h2 className="text-lg font-semibold mb-4">My Tasks</h2>
          <Link href="dashboard/create/task/" className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            Add Task
          </Link>
          <ul className="mb-4">
            {tasks.length > 0 ? tasks.map(task => (
              <li key={task.id} className="mb-2">
                <Link href={`dashboard/${task.id}/task`} className="font-medium text-blue-500 underline">
                  {task.title}
                </Link>
                <p>{task.content}</p>
                <p className="text-sm text-gray-500">Completed: {task.done ? 'Yes' : 'No'}</p>
              </li>
            )) : <p>No tasks save.</p>}
          </ul>
        </div>

        <div className="w-full md:w-1/2 bg-white p-4 shadow-md rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Each day has 15 SPOONS</h2>
          {spoons.length > 0 ? spoons.map((spoon) => (
            <div key={spoon.id} className="mt-2">
              <Link href={`dashboard/${spoon.id}/spoon`} className="text-blue-500 underline">
                {Array(spoon.total).fill('🥄').join(' ')}
              </Link>
            </div>
          )) : (
            <p>No spoons save.</p>
          )}
            <Link href="dashboard/create/spoon" className="text-blue-500 underline">
              Add spoons
            </Link>
          </div>
          <p>An activity costs a different number of spoons like:</p>
          <Image
            className="dark:invert"
            src="/spoonsTasks.svg"
            alt="Spoonful tasks"
            width={1000}
            height={4200}
          />
        </div>
      </div>
    </div>
  );
}
