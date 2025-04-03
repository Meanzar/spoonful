"use client"
import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { handleInput, handleCreate } from '@/lib/service';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Params } from '@/lib/type';

export default function SpoonForm({params}: {params: Params}) {
    params = useParams();
    const base_url = '/api/users/';
    const [total, setTotal] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const userId = params.id;
    const router = useRouter();

    const handleForm = async (event: React.FormEvent) => {
        event.preventDefault(); // Empêche le rechargement de la page
        setLoading(true);
        try {
            await handleCreate(`${base_url}${userId}/spoons`, { total});
            router.push(`/users/connect/${userId}/dashboard`);
        } catch (error) {
            console.error("Erreur lors de la création de la tâche :", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleForm} className="space-y-4">
            <Input 
                type="number" 
                placeholder="Titre" 
                value={total} 
                onChange={(e) => handleInput(setTotal, e)} 
                required 
            />
            <Button type="submit" disabled={loading}>
                {loading ? "Création..." : "Créer"}
            </Button>
        </form>
    );
}
