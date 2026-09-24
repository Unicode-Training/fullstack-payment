"use server";

import { api } from "@/lib/axios";
import { getUser } from "@/services/auth.service";
import { cookies } from "next/headers";

export const login = async (formData: FormData) => {
    const email = formData.get('email');
    const password = formData.get('password');
    const cookieStore = await cookies();
    try {
        const response = await api.post('/auth/login', { email, password });
        const { accessToken, user } = response.data.data;
        cookieStore.set('accessToken', accessToken, {
            httpOnly: true,
            maxAge: 3600
        });
        return {
            success: true,
            type: user.type
        }
    } catch {
        return {
            success: false
        }
    }
}

export const getCurrentUser = async () => {
    return getUser();
}

export const logout = async () => {
    const cookieStore = await cookies();
    cookieStore.delete('accessToken');
}