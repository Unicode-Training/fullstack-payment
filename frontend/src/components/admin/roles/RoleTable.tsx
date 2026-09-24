"use client";
import { Role } from "@/types/role.type";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pen, Trash, UserPlus, UserShield } from "lucide-react";
import AddRoleModal from "../modals/AddRoleModal";
import UpdateRoleModal from "../modals/UpdateRoleModal";
import ConfirmModal from "../modals/ConfirmModal";
import { deleteRole } from "@/actions/role.action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AddUserRoleModal from "../modals/AddUserRoleModal";
type RoleTableProps = {
  roles: Role[];
};
export default function RoleTable({ roles }: RoleTableProps) {
  const router = useRouter();
  return (
    <>
      <AddRoleModal>
        <Button className="mb-3">Add new</Button>
      </AddRoleModal>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Role</TableHead>
            <TableHead className="w-[20%]">Status</TableHead>
            <TableHead className="w-[10%]">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {roles.length ? (
            roles.map((role) => (
              <TableRow key={role.id}>
                <TableCell>{role.name}</TableCell>
                <TableCell>{role.status}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <AddUserRoleModal role={role}>
                      <Button>
                        <UserPlus />
                      </Button>
                    </AddUserRoleModal>

                    <Button>
                      <Link href={`/admin/permissions/${role.id}`}>
                        <UserShield />
                      </Link>
                    </Button>
                    <UpdateRoleModal role={role}>
                      <Button size={"sm"}>
                        <Pen />
                      </Button>
                    </UpdateRoleModal>
                    <ConfirmModal
                      onConfirm={async () => {
                        const response = await deleteRole(role.id);
                        if (response.success) {
                          toast.success("Delete role success");
                        } else {
                          toast.error("Delete role failed");
                        }
                        router.push("/admin/roles");
                      }}
                    >
                      <Button variant={"destructive"} size={"sm"}>
                        <Trash />
                      </Button>
                    </ConfirmModal>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3} className="text-center">
                No roles
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}
