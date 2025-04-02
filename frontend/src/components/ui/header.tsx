"use client"
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { Button } from './button';
import { checkSession, getData, logout } from '@/lib/api';
import { User } from '@/lib/type';

export default function Header() {
const user_url = "/api/users";
const [session, setSession] = useState<boolean>(false);
const [user, setUser] = useState<User | null>(null);

useEffect(() => {
  async function fetchUserData() {
    const isAuthenticated = await checkSession();
    setSession(isAuthenticated);
    if (!isAuthenticated) return;

    try {
      const data: User[] = await getData(user_url);
      if (data.length === 0) return;

      const userIds = [...new Set(data.map(user => user.id))];
      if (userIds.length > 0) {
        const userData: User[] = await getData(`${user_url}/?ids=${userIds.join(",")}`);
        setUser(userData[0] || null);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des utilisateurs :", error);
    }
  }

  fetchUserData();
}, [session]);

async function handleLogout() {
  if (!session) return console.error("No session to log out of");
  await logout();
  setSession(false);
  setUser(null);
}

return (
  
<header className="bg-blue-600 text-white py-8">
        <div className="max-w-screen-xl mx-auto px-8 flex justify-between items-center">
          <h1 className="text-4xl font-semibold bg-black p-2"><span className='text-white'>Porn</span><span className='text-orange-400'>Hub</span></h1>
          {session ? (
            <div>
              <Link href={`/users/info/${user?.id}`} className="text-white px-4 py-2 rounded-md hover:bg-blue-700">
                {user?.username}
              </Link>
              <Button onClick={handleLogout} className="text-white px-4 py-2 rounded-md hover:bg-blue-700">
                Logout
              </Button>
            </div>
          ) : (
            <div>
              <Link href="/auth/login" className="text-white px-4 py-2 rounded-md hover:bg-blue-700">
                Login
              </Link>
              <Link href="/auth/register" className="ml-4 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                Register
              </Link>
            </div>
          )}
        </div>
      </header>
      )
    }