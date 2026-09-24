import Nav from "@/components/admin/Nav";

export default function AdminLayout({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) {
  return (
    <div className="flex gap-5">
      <Nav />
      <div className="flex-1 py-3">{children}</div>
    </div>
  );
}
