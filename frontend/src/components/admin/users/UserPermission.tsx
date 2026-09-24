"use client";
import { Permission } from "@/types/permission.type";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { MODULES } from "@/constants/module.constant";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { updateUserPermission } from "@/actions/permission.action";
type UserPermissionProps = {
  permissions: Permission[];
  userId: number;
};
export default function UserPermission({
  permissions,
  userId,
}: UserPermissionProps) {
  const router = useRouter();
  return (
    <form
      action={async (formData: FormData) => {
        const response = await updateUserPermission(formData, userId);
        if (response.success) {
          toast.success("Update permission success");
        } else {
          toast.error("Update permission failed");
        }
        router.refresh();
      }}
    >
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[20%]">Module</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {MODULES.map((module, index) => (
            <TableRow key={index}>
              <TableHead>{module.title}</TableHead>
              <TableCell>
                <div className="grid grid-cols-4">
                  {module.actions.map((action) => {
                    const key = `${module.name}.${action}`;
                    const checked = permissions.find(
                      (val) => val.value === key,
                    );
                    return (
                      <label key={action} className="flex items-center gap-1">
                        <Checkbox
                          name="permissions"
                          defaultChecked={checked ? true : false}
                          value={key}
                          key={checked ? 1 : 0}
                        />
                        <span>
                          {action.charAt(0).toUpperCase() + action.slice(1)}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button className="mt-3">Save</Button>
    </form>
  );
}
