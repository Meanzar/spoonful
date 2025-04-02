"use client"
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
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
        const token = sessionStorage.getItem('token');
        if (token) {
          const sessionData = await getData('/api/auth/session', token);
          console.log('sessiondata', sessionData);
          if (sessionData?.user.email) {
            const users: User[] = await getData(user_url);
            console.log('users', users);
            const loggedUser = users.find(user => user.email === sessionData.user.email);

            if (loggedUser) {
              setUser(loggedUser);  
            }
          }
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des données utilisateur :", error);
      }
    }

    fetchUserData();
  }, [session]);  // Le hook se déclenche une seule fois au montage du composant
  
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
                href={`/users/connect/${user?.id}/dashboard`}
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
  );
}
