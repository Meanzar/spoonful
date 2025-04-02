import { getSupabaseClient } from "@/lib/supabase";
import { NextRequest } from "next/server";
import { faker } from '@faker-js/faker'
import bcrypt from 'bcrypt'

export async function POST(request: NextRequest) {
    const supabase = getSupabaseClient();
    
    try {
        const body = await request.json(); 
        const { email, password } = body;

        if (!email || !password) {
            return new Response(JSON.stringify({ error: "Missing required fields" }), { 
                status: 400,
                headers: { "Content-Type": "application/json" }
            });
        }

        const { data: authData, error: authError } = await supabase.auth.signUp({ email, password });

        if (authError || !authData?.user) {
            return new Response(JSON.stringify({ error: authError?.message || "Unknown error" }), {
                status: 500,
                headers: { "Content-Type": "application/json" }
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const randomName = faker.person.firstName();
        const randomAvatar = faker.image.avatar();
        const randomBanner = faker.image.urlLoremFlickr()
        const { error } = await supabase
            .from('users')
            .insert({ 
                email: email, 
                password: hashedPassword,
                username: randomName, 
                profile_picture: randomAvatar, 
                banner_image: randomBanner,
                role: 'member'
            });

        if (error) {
            return new Response(JSON.stringify({ error: error.message }), {
                status: 500,
                headers: { "Content-Type": "application/json" }
            });
        }

        return new Response(JSON.stringify("create bitch"), {
            status: 201,
            headers: { "Content-Type": "application/json" }
        });

    } catch (error) {
        console.error("Error in POST /register:", error);
        return new Response(JSON.stringify({ error: "Internal server error" }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
}
