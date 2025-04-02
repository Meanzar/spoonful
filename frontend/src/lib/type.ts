export type User = {
    id: string; // donnée backend
    username: string; // montrable
    email: string; // montrable
    profile_picture: string; // montrable
    banner_image: string; // montrable
    badges: string[]; // montrable
    favorites_public: boolean; // montrable
    role: 'admin' | 'member' | 'viewer'; // donnée backend
    banned: boolean; // donnée backend
    created_at: string; // montrable
    updated_at: string; // montrable
}
export type Task = {
    id: string; // donnée backend
    user_id: string; // donnée backend
    title: string; // montrable
    content: string; // montrable
    done: boolean; // montrable
    created_at: string; // montrable
    updated_at: string; // montrable
}

export type Spoon = {
    id: string; // donnée backend
    user_id: string; // donnée backend
    total: number; // montrable
}
export type Mood = {
    id: string; // donnée backend
    user_id: string; // donnée backend 
    note: number; // montrable
    created_at: string; // montrable
    updated_at: string; // montrable
}

export type Params = {
    id: string; // donnée backend
    taskId?: string; // donnée backend
}