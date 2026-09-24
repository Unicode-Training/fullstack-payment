import { getCurrentUser } from "@/actions/auth.action";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react"

export const useUser = <T>() => {
    const [user, setUser] = useState<null | T>(null);
    const [isLoading, setLoading] = useState(true);
    const [isAuthenticated, setAuthenticated] = useState(false);
    const pathname = usePathname();
    useEffect(() => {
        const fetchCurrentUser = async () => {
            const user = await getCurrentUser();
            if (user) {
                setUser(user);
                setAuthenticated(true);
            } else {
                setUser(null);
                setAuthenticated(false);
            }
            setLoading(false);
        }
        fetchCurrentUser();
    }, [pathname]);

    return {
        user, isLoading, isAuthenticated
    }
}