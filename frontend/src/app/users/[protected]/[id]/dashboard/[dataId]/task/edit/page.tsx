"use client"
import { Params, Task } from '@/lib/type'
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { handleInput, handleEdit } from '@/lib/service'
import { checkSession, getData } from '@/lib/api'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function EditUserTaskPage({ params }: { params: Params }) {
    params = useParams();
    const userId = params.id;
    const taskId = params.dataId;
    const base_url = '/api/users/';
    const router = useRouter();

    const [task, setTask] = useState<Task | null>(null);
    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [done, setDone] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

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
        if (!userId || !taskId) return;

        const fetchTask = async () => {
            try {
                const data = await getData(`${base_url}${userId}/tasks/${taskId}`);
                if (data && data.length > 0) {
                    setTask(data[0]);
                }
            } catch (error) {
                console.error("Erreur lors de la récupération de la tâche :", error);
            }
        };
        fetchTask();
    }, [taskId]);

    useEffect(() => {
        if (task) {
            setTitle(task.title);
            setContent(task.content);
            setDone(task.done);
        }
    }, [task]);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (loading) return;
        setLoading(true);

        try {
            await handleEdit(`${base_url}${userId}/tasks/${taskId}`, { title, content, done });
            router.push(`/users/connect/${userId}/dashboard`);
        } catch (error) {
            console.error("Erreur lors de la mise à jour de la tâche :", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-4">
            <h1 className="text-xl font-bold">Modifier la tâche</h1>
            {task ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input 
                        type="text" 
                        value={title} 
                        onChange={(e) => handleInput(setTitle, e)} 
                        placeholder="Titre"
                        required 
                    />
                    <textarea 
                        value={content} 
                        onChange={(e) => handleInput(setContent, e)} 
                        placeholder="Contenu" 
                        required 
                    />
                    <label className="flex items-center space-x-2">
                        <input 
                            type="checkbox" 
                            checked={done} 
                            onChange={() => setDone(!done)} 
                        />
                        <span>Marquer comme terminée</span>
                    </label>
                    <Button type="submit" disabled={loading}>
                        {loading ? "Mise à jour..." : "Mettre à jour"}
                    </Button>
                </form>
            ) : (
                <p>Chargement...</p>
            )}
        </div>
    );
}
