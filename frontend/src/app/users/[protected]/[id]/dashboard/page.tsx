"use client"
import { checkSession, getData } from '@/lib/api'
import { Mood, Params, Spoon, Task } from '@/lib/type'
import React, { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'

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
                    getData(base_url + userId + "/tasks/").catch(() => []), // Retourne un tableau vide en cas d'erreur
                    getData(base_url + userId + "/moods/").catch(() => null), // Retourne null si aucune humeur n'est trouvée
                    getData(base_url + userId + "/spoons/").catch(() => []), // Retourne un tableau vide en cas d'erreur
                ]);
                
                setTasks(tasksData);
                setMood(moodData[0]);
                setSpoons(spoonsData);
            } catch (error) {
                console.error("Erreur lors de la récupération des données :", error);
            }
        };

        fetchData();
    }, [userId]);

    const renderMoodEmoji = (note: number) => {
        // Retourner un emoji selon la note de l'humeur
        if (note <= 2) return '😞'; // Mauvaise humeur
        if (note === 3) return '😐'; // Humeur neutre
        if (note >= 4) return '😊'; // Bonne humeur
        return '🙂'; // Par défaut
    }

    const renderSpoons = (total: number) => {
        // Afficher des emojis de cuillère en fonction du total
        return '🥄'.repeat(total); // Par exemple, 5 cuillères → 🥄🥄🥄🥄🥄
    }

    return (
        <div>
            <h1>Dashboard</h1>
            {/* Affichage des tâches */}
            {tasks.length > 0 ? (
                tasks.map((task: Task) => (
                    <div key={task.id}>
                        <Link href={`dashboard/${task.id}/task`}>
                            <h1>{task.title}</h1>
                        </Link>
                        <p>{task.content}</p>
                        <p>{task.done ? "Terminée" : "En cours"}</p>
                    </div>
                ))
            ) : (
                <div>
                    <p>Aucune tâche trouvée.</p>
                </div>
            )}
            <Link href={`dashboard/create/task/`} className="text-blue-500 underline">Créer une nouvelle tâche</Link>

            <h2>Humeur </h2>
            {mood ? (
                <div>
                    <p>Humeur du jour : {renderMoodEmoji(mood.note)} ({mood.note})</p>
                    <Link href={`dashboard/${mood.id}/mood`} className="text-blue-500 underline">Voir les détails sur l'humeur</Link>
                </div>
            ) : (
                <div>
                    <p>Aucune humeur enregistrée.</p>
                    <Link href={`dashboard/create/mood`} className="text-blue-500 underline">Ajouter une humeur</Link>
                </div>
            )}

            <h2> Nombre de cueillères restantes</h2>
            {spoons.length > 0 ? (
                spoons.map((spoon: Spoon) => (
                    <div key={spoon.id}>
                        <Link href={`dashboard/${spoon.id}/spoon`}>
                            <h1>Cuillères : {renderSpoons(spoon.total)}</h1>
                        </Link>
                    </div>
                ))
            ) : (
                <div>
                    <p>Aucune cuillère enregistrée.</p>
                    <Link href={`dashboard/create/spoon`} className="text-blue-500 underline">Ajouter des cuillères</Link>
                </div>
            )}
        </div>
    );
}
