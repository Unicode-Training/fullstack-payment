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
export default function ProductTable() {
  const { user } = useUser<User>();
  return (
    <>
      {can(user, "products.create") && (
        <Button>
          <Link href={"/admin/products/create"}>Add new</Link>
        </Button>
      )}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Price</TableHead>
            {(can(user, "products.update") || can(user, "products.delete")) && (
              <TableHead className="w-[10%]">Action</TableHead>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Product 1</TableCell>
            <TableCell>123</TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                {can(user, "products.update") && (
                  <Button size={"sm"}>
                    <Link href={`/admin/products/edit/1`}>
                      <Pen />
                    </Link>
                  </Button>
                )}

                {can(user, "products.delete") && (
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
