"use client";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useUser } from "@/hooks/use-user";
import { User } from "@/types/user.type";
import { can } from "@/utils/permission";
import { Pen, Trash, UserShield } from "lucide-react";
import Link from "next/link";
type UsersTableProps = {
  users: User[];
};
export default function UsersTable({ users }: UsersTableProps) {
  const { user } = useUser<User>();

  return (
    <>
      {can(user, "users.create") && (
        <Button>
          <Link href={"/admin/users/create"}>Add new</Link>
        </Button>
      )}

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Type</TableHead>
            {(can(user, "users.update") ||
              can(user, "users.delete") ||
              can(user, "ADMIN")) && (
              <TableHead className="w-[10%]">Action</TableHead>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.email}</TableCell>
              <TableCell>{item.type}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  {can(user, "ADMIN") && (
                    <Button size={"sm"}>
                      <Link href={`/admin/users/permissions/${item.id}`}>
                        <UserShield />
                      </Link>
                    </Button>
                  )}
                  {can(user, "users.update") && (
                    <Button size={"sm"}>
                      <Link href={`/admin/users/edit/1`}>
                        <Pen />
                      </Link>
                    </Button>
                  )}
                  {can(user, "users.delete") && (
                    <Button variant={"destructive"} size={"sm"}>
                      <Trash />
                    </Button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
