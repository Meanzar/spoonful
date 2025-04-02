"use client"
import React, { useState, useEffect } from 'react'
import { useParams, useRouter } from "next/navigation"
import { Params, User } from '@/lib/type'
import { checkSession, getData } from '@/lib/api'
import Link from 'next/link'

export default function UserPage({params}: {params: Params}) {
    const [user, setUser] = useState<User>()
    const base_url = '/api/users/'
    params = useParams()
    const userId = params.id;
    console.log(userId)
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
        const session =  checkSession();
        if (!session) {
          
        }
        getData(base_url + userId).then((data) => (setUser(data[0])))
    }, [userId])
    console.log('user', user)
  return (
    <div>
      <Link href={'/users/connect/' + user?.id + "/dashboard"}>
        <h1>Dashboard</ h1>
      </Link>
        <h2>{user?.username}</h2>
      <Link href={'/users/connect/' + user?.id + "/edit"}>
        Edit
      </Link>
    </div>
  )
}

"http:3000/users/1"