"use client";

import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";

export default function NotFoundActions() {
  const router = useRouter();

  return (
    <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
      <Button variant="secondary" onClick={() => router.push("/")}>Về trang chủ</Button>
      <Button onClick={() => router.push("/offers")}>Xem ưu đãi</Button>
    </div>
  );
}
