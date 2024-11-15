"use client";

//* Importando o componente SidebarProvider AppSidebar
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";

//* Importando o hook useAuth
import { useAuth } from "@/context/AuthContext";

//* Importando o hook useRouter
import { useRouter } from "next/navigation";

//* Importando o hook useEffect
import { useEffect } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/");
    }
  }, [loading, user, router]);

  if (loading) return <p>Carregand</p>;

  if (!user) return null;

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <AppSidebar /> {/* Sidebar que permanece fixa */}
        <main className="flex-1 ">{children}</main>
      </div>
    </SidebarProvider>
  );
}
