"use client";
import { login } from "@/actions/auth.action";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function Login() {
  const router = useRouter();

  return (
    <form
      action={async (formData: FormData) => {
        const response = await login(formData);
        if (response.success) {
          const type = response.type;
          if (type === "CLIENT") {
            router.push("/");
          } else {
            router.push("/admin");
          }
        } else {
          toast.error("Email hoặc mật không chính xác");
        }
      }}
    >
      <div className="mb-3">
        <label>Email</label>
        <Input type="email" name="email" placeholder="Email..." />
      </div>
      <div className="mb-3">
        <label>Password</label>
        <Input type="password" name="password" placeholder="Password..." />
      </div>
      <Button>Login</Button>
    </form>
  );
}
