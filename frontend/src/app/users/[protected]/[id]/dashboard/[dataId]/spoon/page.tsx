"use client"
import { checkSession, getData } from '@/lib/api'
import { Params, Spoon } from '@/lib/type'
import React, { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'

export default function SpoonPage({ params }: { params: Params }) {
    const base_url = '/api/users/'
    params = useParams();
    const userId = params.id;
    const spoonId = params.dataId; 
    const [spoons, setSpoons] = useState<Spoon | null>(null);
    const router = useRouter();

    // Vérification de session utilisateur
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

    // Récupération des cuillères pour l'utilisateur
    useEffect(() => {
        if (!userId || !spoonId) return;

        const fetchData = async () => {
            try {
                const spoonData = await getData(`${base_url}${userId}/spoons/${spoonId}`);
                setSpoons(spoonData);
            } catch (error) {
                console.error("Erreur lors de la récupération des données des cuillères :", error);
            }
        };
        fetchData();
    }, [userId, spoonId]);

    // Affichage des cuillères restantes
    const displayedSpoons = spoons ? "🥄".repeat(spoons.total) : "Chargement...";

    return (
        <div className="space-y-4">
            {spoons ? (
                <>
                    <h1 className="text-xl font-bold">Détail de la cuillère</h1>
                    <p className="text-lg">Total de cuillères restantes : {displayedSpoons}</p>
                    <p className="text-sm text-gray-600">ID de la cuillère : {spoons.id}</p>
                </>
            ) : (
                <p>Chargement...</p>
            )}
        </div>
    );
}
