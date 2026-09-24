import UserPermission from "@/components/admin/users/UserPermission";
import { getUserPermissions } from "@/services/user.service";

type UserPermissionPageProps = {
  params: Promise<{ id: string }>;
};
export default async function UserPermissionPage({
  params,
}: UserPermissionPageProps) {
  const { id } = await params;
  const permissions = await getUserPermissions(+id!);
  return (
    <div>
      <h1 className="mb-3 font-medium text-3xl">Add Permission</h1>
      <UserPermission permissions={permissions} userId={+id!} />
    </div>
  );
}
