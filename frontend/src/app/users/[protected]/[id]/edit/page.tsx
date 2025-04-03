"use client"
import { Params, User } from '@/lib/type'
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { handleInput, handleEdit } from '@/lib/service'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { checkSession, getData } from '@/lib/api'
export default function EditUserPage({params}: {params: Params}) {
    params = useParams()
    const userId = params.id
    const base_url = '/api/users/'
    const [user, setUser] = useState<User>()
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
        getData(base_url + userId).then((data) => (setUser(data[0]))
        )
    }, [userId])

    const [userName, setUserName] = useState<string>(user?.username || '')
    const [profilePicture, setProfilePicture] = useState<string>(user?.profile_picture || '')


    const handleButton = () => handleEdit(base_url + userId, {username: userName, profilePicture: profilePicture})
  return (
    <div>
        <h1>Edit User</h1>
        <h3>Username</h3>
            <Input type="text" value={userName} onChange={(e) => handleInput(setUserName, e)} placeholder={user?.username} />
        <h3>Profile Picture</h3>
        <Input type="text" value={profilePicture} onChange={(e) => handleInput(setProfilePicture, e)} placeholder={user?.profile_picture} />
        <Button onClick={handleButton}>Submit</Button>
    </div>
  )
}
