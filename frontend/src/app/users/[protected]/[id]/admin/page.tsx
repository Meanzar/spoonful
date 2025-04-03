"use client";
import { useEffect, useState } from "react";
import { getData, banUser, deleteUser } from "@/lib/api";
import { User } from "@/lib/type";

export default function AdminDashboard() {
    const [users, setUsers] = useState<Array<User>>([]);

    useEffect(() => {
        async function fetchUsers() {
            const data = await getData("/api/admin");
            setUsers(data);
        }
        fetchUsers();
    }, []);

    async function handleBan(userId: string, banned: boolean) {
        await banUser({id: userId, banned: !banned});
        setUsers(users.map(user => user.id === userId ? { ...user, banned: !banned } : user));
    }

    async function handleDelete(userId: string) {
        await deleteUser(userId);
        setUsers(users.filter(user => user.id !== userId));
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <table className="w-full mt-4">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Banned</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>{user.banned ? "Yes" : "No"}</td>
                            <td>
                                <button onClick={() => handleBan(user.id, user.banned)}>Toggle Ban</button>
                                <button onClick={() => handleDelete(user.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
