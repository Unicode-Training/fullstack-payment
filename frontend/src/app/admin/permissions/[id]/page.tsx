import PermissionTable from "@/components/admin/permissions/PermissionTable";
import { getRole } from "@/services/role.service";
import React from "react";
type PermissionPageProps = {
  params: Promise<{ id: string }>;
};
export default async function PermissionPage({ params }: PermissionPageProps) {
  const { id } = await params;
  const role = await getRole(+id!);
  return (
    <div>
      <h1 className="mb-3 font-medium text-3xl">Permission for: {role.name}</h1>
      <PermissionTable role={role} />
    </div>
  );
}
