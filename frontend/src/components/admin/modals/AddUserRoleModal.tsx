"use client";
import {
  createRole,
  getUsersByRole,
  updateUserRole,
} from "@/actions/role.action";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
} from "@/components/ui/combobox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getStaffList } from "@/actions/user.action";
import { User } from "@/types/user.type";
import { useRouter } from "next/navigation";
import { DialogClose } from "radix-ui/dialog";
import React, { Fragment, useEffect, useState } from "react";
import { toast } from "sonner";
import { useUser } from "@/hooks/use-user";
import { Role } from "@/types/role.type";
type AddRoleModalProps = {
  children: Readonly<React.ReactNode>;
  role: Role;
};

export default function AddUserRoleModal({
  children,
  role,
}: AddRoleModalProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [value, setValue] = React.useState<{ id: number; email: string }[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await getStaffList();
      if (users) {
        setUsers(users);
      }
      const usersRoles = await getUsersByRole(role.id);
      setValue(
        usersRoles.map((val: { userId: number; user: User }) => ({
          id: val.userId,
          email: val.user.email,
        })),
      );
    };
    if (open) {
      fetchUsers();
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Add User To Role</DialogTitle>
        </DialogHeader>
        <form
          action={async (formdata: FormData) => {
            const response = await updateUserRole(formdata, role.id);
            if (!response.success) {
              toast.error("Update user role failed");
            } else {
              toast.error("Update useer role success");
              setOpen(false);
              router.push("/admin/roles");
            }
          }}
        >
          <div className="mb-3">
            <label>Users</label>
            <Combobox
              items={users}
              multiple
              value={value.map((val) => val.email)}
              onValueChange={(val) => {
                setValue(val as unknown as { id: number; email: string }[]);
              }}
            >
              <ComboboxChips>
                <ComboboxValue>
                  {value.map((item) => (
                    <Fragment key={item.id}>
                      <ComboboxChip key={item.id}>{item.email}</ComboboxChip>
                      <input type="hidden" name="users" value={item.id} />
                    </Fragment>
                  ))}
                </ComboboxValue>
                <ComboboxChipsInput placeholder="Add framework" />
              </ComboboxChips>
              <ComboboxContent style={{ pointerEvents: "auto" }}>
                <ComboboxEmpty>No items found.</ComboboxEmpty>
                <ComboboxList>
                  {(item) => (
                    <ComboboxItem
                      key={item.id}
                      value={{
                        id: item.id,
                        email: item.email,
                      }}
                    >
                      {item.email}
                    </ComboboxItem>
                  )}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
          </div>
          <div className="flex gap-2 mt-3">
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
