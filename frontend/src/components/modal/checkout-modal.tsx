"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Order } from "@/types/order.type";
import Image from "next/image";
type CheckoutModalProps = {
  open: boolean;
  onClose: () => void;
  order: Order;
};
export default function CheckoutModal({
  open,
  onClose,
  order,
}: CheckoutModalProps) {
  console.log(order);
  return (
    <Dialog
      open={open}
      onOpenChange={(status) => {
        if (!status) {
          onClose();
        }
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Order Payment</DialogTitle>
        </DialogHeader>
        <div>
          <Image src={order.paymentUrl} width={400} height={300} alt="QR" />
          <p className="text-center">
            Amout: {order?.total?.toLocaleString()}đ
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
