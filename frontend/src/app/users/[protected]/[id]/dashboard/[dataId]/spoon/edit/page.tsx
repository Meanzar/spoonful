"use client"
import { Params, Task, Spoon } from '@/lib/type'
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { handleInput, handleEdit } from '@/lib/service'
import { checkSession, getData } from '@/lib/api'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function EditSpoonPage({params}: {params: Params}) {
    params = useParams();  
    const userId = params.id;  
    const spoonId = params.dataId;  
    const base_url = '/api/users/';
    const router = useRouter();

    const [task, setTask] = useState<Task | null>(null);  
    const [spoons, setSpoons] = useState<Spoon | null>(null);  
    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [done, setDone] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    // Vérification de la session utilisateur
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

    // Récupérer les données de la tâche et des cuillères
    useEffect(() => {
        if (!userId || !spoonId) return;

        const fetchData = async () => {
            try {
                const taskData = await getData(`${base_url}${userId}/tasks/`);
                const spoonData = await getData(`${base_url}${userId}/spoons`);

                if (taskData?.length > 0) setTask(taskData[0]);
                if (spoonData) setSpoons(spoonData);
            } catch (error) {
                console.error("Erreur lors de la récupération des données :", error);
            }
        };

        fetchData();
    }, [userId, spoonId]);
    
    useEffect(() => {
        if (task) {
            setTitle(task.title);
            setContent(task.content);
            setDone(task.done);
        }
    }, [task]);

    // Calcul du nombre de cuillères restant
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (loading) return;
        setLoading(true);

        try {
            // Si la tâche est marquée comme terminée, on réduit le nombre de cuillères
            if (done && spoons) {
                const updatedSpoons = {
                    ...spoons,
                    total: Math.max(spoons.total - 1, 0),  // Décrémenter le nombre de cuillères
                };
                setSpoons(updatedSpoons);  // Mettre à jour l'état des cuillères
                await handleEdit(`${base_url}${userId}/spoons/${spoonId}`, updatedSpoons);
            }

            // Mettre à jour la tâche
            await handleEdit(`${base_url}${userId}/tasks/${spoonId}`, { title, content, done });
            router.push(`/users/connect/${userId}/dashboard`);  // Rediriger vers le dashboard

        } catch (error) {
            console.error("Erreur lors de la mise à jour des données :", error);
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
                    <p className="font-semibold">Cuillères restantes : 🥄 {spoons ? spoons.total : 'Chargement...'}</p>
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
