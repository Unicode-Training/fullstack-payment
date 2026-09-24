import Profile from "@/components/auth/Profile";
import Link from "next/link";

export default function MainLayout({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) {
  return (
    <>
      <header className="shadow py-3">
        <div className="flex mx-auto max-w-300">
          <div className="text-3xl">
            <Link href={"/"}>Logo</Link>
          </div>
          <nav className="flex items-center gap-10 ml-auto">
            <ul className="flex items-center gap-3">
              <li>
                <Link href={"/"}>Home</Link>
              </li>
              <li>
                <Link href={"/about"}>About</Link>
              </li>
              <li>
                <Link href={"/plan"}>Plan</Link>
              </li>
            </ul>
            <Profile />
          </nav>
        </div>
      </header>
      <main>
        <div className="mx-auto py-3 max-w-300">{children}</div>
      </main>
      <footer> </footer>
    </>
  );
}
