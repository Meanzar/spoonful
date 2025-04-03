"use client"
import { Params, Mood } from '@/lib/type'
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { handleInput, handleEdit } from '@/lib/service'
import { checkSession, getData } from '@/lib/api'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function EditUserMoodPage({params}: {params: Params}) {
    params = useParams();
    const userId = params.id;
    const moodId = params.dataId;
    const base_url = '/api/users/';
    const router = useRouter();

    const [mood, setMood] = useState<Mood | null>(null);
    const [note, setNote] = useState<number>(0);
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
        if (!userId || !moodId) return;

        const fetchMood = async () => {
            try {
                const data = await getData(`${base_url}${userId}/moods/${moodId}`);
                if (data && data.length > 0) {
                    setMood(data[0]);
                    setNote(data[0].note); // Initialiser la note de l'humeur
                }
            } catch (error) {
                console.error("Erreur lors de la récupération de l'humeur :", error);
            }
        };
        fetchMood();
    }, [userId, moodId]);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (loading) return;
        setLoading(true);

        try {
            await handleEdit(`${base_url}${userId}/moods/${moodId}`, { note });
            router.push(`/users/connect/${userId}/dashboard`);
        } catch (error) {
            console.error("Erreur lors de la mise à jour de l'humeur :", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-4">
            <h1 className="text-xl font-bold">Modifier l'humeur</h1>
            {mood ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label>Note de l'humeur :</label>
                        <Input
                            type="number"
                            value={note}
                            onChange={(e) => handleInput(setNote, e)}
                            min={1}
                            max={5}
                            required
                        />
                    </div>
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
