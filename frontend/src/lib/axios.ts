import axios from "axios";
import { cookies } from "next/headers";
export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_SERVER
})

api.interceptors.request.use(async (config) => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken')?.value;
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config;
})