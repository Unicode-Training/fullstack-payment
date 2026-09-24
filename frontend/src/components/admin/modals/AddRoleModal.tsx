"use client";
import { createRole } from "@/actions/role.action";
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
import { useRouter } from "next/navigation";
import { DialogClose } from "radix-ui/dialog";
import React, { useState } from "react";
import { toast } from "sonner";
type AddRoleModalProps = {
  children: Readonly<React.ReactNode>;
};
export default function AddRoleModal({ children }: AddRoleModalProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>New Role</DialogTitle>
        </DialogHeader>
        <form
          action={async (formdata: FormData) => {
            const response = await createRole(formdata);
            if (!response.success) {
              toast.error("Create role failed");
            } else {
              toast.error("Create role success");
              setOpen(false);
              router.push("/admin/roles");
            }
          }}
        >
          <div className="mb-3">
            <label>Name</label>
            <Input type="text" placeholder="Name..." name="name" required />
          </div>
          <div className="mb-3">
            <label>Active</label>
            <Checkbox name="status" defaultChecked />
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
