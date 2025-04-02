export type User = {
    id: string;
    username: string;
    email: string;
    password: string;
    profile_picture: string;
    banner_image: string;
    badges: string[];
    favorites_public: boolean;
    role: 'admin' | 'member' | 'viewer';
    banned: boolean;
    created_at: string;
    updated_at: string;
}
export type Spoons = {
    id: string;
    user_id: string;
    total: number;
}
export type Mood = {
    id: string;
    user_id: string;
    note: number;
    created_at: string;
    updated_at: string;
}