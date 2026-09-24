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
import { Pen, Trash } from "lucide-react";
import Link from "next/link";
export default function PostTable() {
  const { user } = useUser<User>();
  return (
    <>
      {can(user, "posts.create") && (
        <Button>
          <Link href={"/admin/posts/create"}>Add new</Link>
        </Button>
      )}

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Content</TableHead>
            {(can(user, "posts.update") || can(user, "posts.delete")) && (
              <TableHead className="w-[10%]">Action</TableHead>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Title 1</TableCell>
            <TableCell>Content 1</TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                {can(user, "posts.update") && (
                  <Button size={"sm"}>
                    <Link href={`/admin/posts/edit/1`}>
                      <Pen />
                    </Link>
                  </Button>
                )}
                {can(user, "posts.delete") && (
                  <Button variant={"destructive"} size={"sm"}>
                    <Trash />
                  </Button>
                )}
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
}
