"use client";
import { logout } from "@/actions/auth.action";
import { useUser } from "@/hooks/use-user";
import { User } from "@/types/user.type";
import Link from "next/link";
import { Button } from "../ui/button";

export default function Profile() {
  const { user, isLoading, isAuthenticated } = useUser<User>();
  const handleLogout = async () => {
    await logout();
    window.location.reload();
  };

  if (isLoading) {
    return;
  }
  return (
    <ul className="flex items-center gap-3">
      {isAuthenticated ? (
        <>
          <li>Chào: {user?.name}</li>
          <li>
            <span className="block bg-amber-100 px-3 py-1 rounded-xl">
              {user?.plan}
            </span>
          </li>
          <li>
            <Button size={"sm"} onClick={handleLogout}>
              Logout
            </Button>
          </li>
        </>
      ) : (
        <>
          <li>
            <Link href={"/login"}>Login</Link>
          </li>
        </>
      )}
    </ul>
  );
}
