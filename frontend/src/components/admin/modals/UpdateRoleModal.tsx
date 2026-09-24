"use client";
import { updateRole } from "@/actions/role.action";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Role } from "@/types/role.type";
import { useRouter } from "next/navigation";
import { DialogClose } from "radix-ui/dialog";
import React, { useState } from "react";
import { toast } from "sonner";
type AddRoleModalProps = {
  children: Readonly<React.ReactNode>;
  role: Role;
};
export default function UpdateRoleModal({ children, role }: AddRoleModalProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Update Role</DialogTitle>
        </DialogHeader>
        <form
          action={async (formdata: FormData) => {
            const response = await updateRole(formdata, role.id);
            if (!response.success) {
              toast.error("Update role failed");
            } else {
              toast.error("Update role success");
              setOpen(false);
              router.push("/admin/roles");
            }
          }}
        >
          <div className="mb-3">
            <label>Name</label>
            <Input
              type="text"
              placeholder="Name..."
              name="name"
              defaultValue={role.name}
              required
            />
          </div>
          <div className="mb-3">
            <label>Active</label>
            <Checkbox name="status" defaultChecked={role.status === "ACTIVE"} />
          </div>
          <div className="flex gap-2">
            <Button>Save</Button>
            <DialogClose asChild>
              <Button type="button" variant={"destructive"}>
                Close
              </Button>
            </DialogClose>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
