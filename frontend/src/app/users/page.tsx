"use client"

import { getData } from '@/lib/api'
import { User } from '@/lib/type'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

export default function UsersPage() {
    const base_url = '/api/users/'
    const [users, setUsers] = useState<Array<User>>([])

    useEffect(() => {
        getData(base_url).then((data) => (setUsers(data)))
    }, [])
    console.log(users)
  return (
    <div>
        {users.map((user: User) => (
            <Link href={'/users/connect/' + user.id } key={user.id}>
                <h1>{user.username}</h1>
            </Link>
        ))}
    </div>
  )
}
