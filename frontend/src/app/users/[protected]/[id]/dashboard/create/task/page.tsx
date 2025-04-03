"use client"
import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { handleInput, handleCreate } from '@/lib/service';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Params } from '@/lib/type';

export default function TaskForm({params}: {params: Params}) {
    params = useParams();
    const base_url = '/api/users/';
    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const userId = params.id;
    const router = useRouter();

    const handleForm = async (event: React.FormEvent) => {
        event.preventDefault(); // Empêche le rechargement de la page
        setLoading(true);
        try {
            await handleCreate(`${base_url}${userId}/tasks`, { title, content, userId });
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
                type="text" 
                placeholder="Titre" 
                value={title} 
                onChange={(e) => handleInput(setTitle, e)} 
                required 
            />
            <textarea 
                placeholder="Contenu" 
                value={content} 
                onChange={(e) => handleInput(setContent, e)} 
                required 
            />
            <Button type="submit" disabled={loading}>
                {loading ? "Création..." : "Créer"}
            </Button>
        </form>
    );
}
