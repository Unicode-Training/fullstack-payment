"use client";

import { Button } from "@/components/ui/button";
import { useUser } from "@/hooks/use-user";
import { User } from "@/types/user.type";
import { redirect, useParams, useRouter } from "next/navigation";
import plans from "@/data/plan.json";
import CheckoutModal from "@/components/modal/checkout-modal";
import { useEffect, useState } from "react";
import { createOrder, getOrder } from "@/actions/order.action";
import { toast } from "sonner";
import { Order } from "@/types/order.type";
const getPlan = (plan: string) => {
  return plans.find((val) => val.name === plan);
};
export default function OrderPage() {
  const [openModal, setOpenModal] = useState(false);
  const { plan: planName } = useParams<{ plan: string }>();
  const plan = getPlan(planName);
  const [isCheckout, setCheckout] = useState(false);
  const [order, setOrder] = useState({} as Order);

  const { user, isLoading, isAuthenticated } = useUser<User>();
  const router = useRouter();
  const handleCheckout = async () => {
    setCheckout(true);

    const order = await createOrder(planName);
    if (!order) {
      toast.error("Create order failed");
    } else {
      setOrder(order);
      setOpenModal(true);
    }

    setCheckout(true);
  };

  useEffect(() => {
    let inverId: NodeJS.Timeout;
    const pollingCheckOrder = () => {
      inverId = setInterval(async () => {
        const orderData = await getOrder(order.id);
        if (orderData && orderData.status === "COMPLETED") {
          toast.success("Upgrade success");
          setOpenModal(false);
          setCheckout(false);
          clearInterval(inverId);
        }
      }, 5000);
    };
    if (order.id) {
      pollingCheckOrder();
    }
    return () => clearInterval(inverId);
  }, [order]);

  if (isLoading) {
    return;
  }
  if (!isAuthenticated) {
    return (
      <div>
        <p className="mb-3 text-xl text-center">Please login to continue</p>
        <div className="flex justify-center gap-3">
          <Button onClick={() => router.push("/login")}>Login</Button>
          <Button variant={"outline"} onClick={() => router.push("/")}>
            home
          </Button>
        </div>
      </div>
    );
  }
  if (!plan?.price || user?.plan === planName) {
    return redirect(`/plan`);
  }

  return (
    <div className="mx-auto w-2/3">
      <h1 className="mb-3 text-3xl">Upgrade to plan: {planName}</h1>
      <p className="mb-3">Price: {plan?.price.toLocaleString()}đ</p>
      <p className="mb-3">{plan?.description}</p>
      <Button onClick={handleCheckout}>
        {isCheckout ? "Loading..." : "Checkout"}
      </Button>
      <CheckoutModal
        order={order}
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          setCheckout(false);
        }}
      />
    </div>
  );
}
