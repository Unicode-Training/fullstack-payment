"use client";
import { useUser } from "@/hooks/use-user";
import { User } from "@/types/user.type";
import { can } from "@/utils/permission";
import Link from "next/link";
import { Button } from "../ui/button";
import { logout } from "@/actions/auth.action";
import { redirect } from "next/navigation";

export default function Nav() {
  const { user } = useUser<User>();
  const handleLogout = async () => {
    await logout();
    redirect("/login");
  };
  return (
    <nav className="bg-gray-200 p-3 w-62.5 h-screen overflow-auto">
      <h3 className="mb-3 text-xl">Admin Panel</h3>
      <ul>
        <li className="py-3">
          <Link href={"/admin"}>Dashboard</Link>
        </li>
        {can(user, "products.read") && (
          <li className="py-3">
            <Link href={"/admin/products"}>Products</Link>
          </li>
        )}

        {can(user, "posts.read") && (
          <li className="py-3">
            <Link href={"/admin/posts"}>Posts</Link>
          </li>
        )}

        {can(user, "users.read") && (
          <li className="py-3">
            <Link href={"/admin/users"}>Users</Link>
          </li>
        )}

        {can(user, "ADMIN") && (
          <li className="py-3">
            <Link href={"/admin/roles"}>Roles</Link>
          </li>
        )}
      </ul>
      <div className="bg-white my-3 w-full h-px"></div>
      <ul>
        <li className="py-3">Hi: {user?.name}</li>
        <li>
          <Button onClick={handleLogout} variant={"destructive"}>
            Logout
          </Button>
        </li>
      </ul>
    </nav>
  );
}
