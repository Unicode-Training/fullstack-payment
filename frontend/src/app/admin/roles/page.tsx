import RoleTable from "@/components/admin/roles/RoleTable";
import { getRoleList } from "@/services/role.service";

export default async function RolesPage() {
  const roles = await getRoleList();
  return (
    <div>
      <h1 className="mb-3 font-medium text-3xl">Roles & Permissions</h1>
      <RoleTable roles={roles} />
    </div>
  );
}
