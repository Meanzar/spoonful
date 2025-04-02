"use client";
import { checkSession } from "@/lib/api";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProtectedPage({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const verifySession = async () => {

      const session = await checkSession();

      if (!session) {
        router.push("/auth/login");
        return;
      }
    };

    verifySession();
  }, []);

  return <>{children}</>;
}
