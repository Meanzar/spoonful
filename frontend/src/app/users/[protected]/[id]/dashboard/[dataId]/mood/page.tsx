"use client"
import { checkSession, getData } from '@/lib/api'
import { Params, Mood } from '@/lib/type'
import React, { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function MoodPage({params}: {params: Params}) {
    const base_url = '/api/users/'
    params = useParams();
    const userId = params.id;
    const moodId = params.dataId;  // Modification de taskId en dataId pour plus de flexibilité
    const [mood, setMood] = useState<Mood | null>(null);
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
        getData(`${base_url}${userId}/moods/${moodId}`).then((data) => {
            setMood(data[0]);  // Récupération de la donnée Mood depuis l'API
        });
    }, [moodId, userId]);

    // Fonction pour afficher la note sous forme d'emoji
    const renderEmoji = (note: number) => {
        if (note <= 2) {
            return "😞";  // triste
        } else if (note <= 4) {
            return "😐";  // neutre
        } else {
            return "😊";  // heureux
        }
    };

    return (
        <div>
            {mood ? (
                <>
                    <h1>Note de l'humeur : {renderEmoji(mood.note)}</h1>
                    <p><strong>Note :</strong> {mood.note}</p>
                    <p><strong>Créée le :</strong> {new Date(mood.created_at).toLocaleString()}</p>
                    <p><strong>Modifiée le :</strong> {new Date(mood.updated_at).toLocaleString()}</p>
                    <Link href={"mood/edit/"}>
                        Modifier l'humeur
                    </Link>
                </>
            ) : (
                <p>Chargement...</p>
            )}
        </div>
    )
}
