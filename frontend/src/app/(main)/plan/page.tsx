"use client";
import { Button } from "@/components/ui/button";
import { useUser } from "@/hooks/use-user";
import { User } from "@/types/user.type";
import { useRouter } from "next/navigation";
import plans from "@/data/plan.json";
export default function PlanPage() {
  const { user, isLoading, isAuthenticated } = useUser<User>();
  const router = useRouter();
  if (isLoading) {
    return;
  }
  return (
    <div>
      <h1 className="font-medium text-3xl">Plan</h1>
      <div className="gap-3 space-y-3 grid grid-cols-2 mx-auto w-2/3">
        {plans.map((plan) => (
          <div key={plan.name} className="p-3 border border-border">
            <h2 className="mb-3 font-medium text-2xl">{plan.name}</h2>
            <p className="mb-3">{plan.description}</p>
            <p className="mb-3">Price: {plan.price.toLocaleString()}đ</p>
            {isAuthenticated ? (
              user?.plan === plan.name ? (
                <Button variant={"outline"}>Current</Button>
              ) : (
                <Button onClick={() => router.push(`/order/${plan.name}`)}>
                  Subscription
                </Button>
              )
            ) : (
              <Button onClick={() => router.push("/login")}>
                Subscription
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
