"use client"
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { Button } from './button';
import { checkSession, getData, logout } from '@/lib/api';
import { User } from '@/lib/type';
import Image from "next/image";

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
    <header className="bg-gray-800 text-white py-4">
      <div className="max-w-screen-xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Image
            className="dark:invert"
            src="/spoonfitLogo.svg"
            alt="SpoonFit Logo"
            width={40}
            height={40}
          />
          <span className="text-xl font-bold">SpoonFit</span>
        </div>

        <nav className="flex items-center space-x-4">
          {session ? (
            <>
              <Link
                href={`/users/info/${user?.id}`}
                className="px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                {user?.username}
              </Link>
              <Button
                onClick={handleLogout}
                className="bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link
                href="/auth/login"
                className="px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Login
              </Link>
              <Link
                href="/auth/register"
                className="px-4 py-2 ml-4 rounded-md hover:bg-blue-700 transition-colors"
              >
                Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}