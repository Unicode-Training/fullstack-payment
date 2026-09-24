import UsersTable from "@/components/admin/users/UserTable";
import { getUsersList } from "@/services/user.service";

export default async function UsersPage() {
  const users = await getUsersList();
  return (
    <div>
      <h1 className="mb-3 font-medium text-3xl">Users</h1>
      <UsersTable users={users} />
    </div>
  );
}
