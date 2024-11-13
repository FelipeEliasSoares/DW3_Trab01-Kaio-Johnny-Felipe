//* Importando icones do lucide-react
import { LogOut, CreditCard } from "lucide-react";

//* Importando componentes do shacdn/ui/sidebar
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

//* Importando o hook useAuth
import { useAuth } from "@/context/AuthContext";

export function AppSidebar() {
  const { logout } = useAuth();

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>ERP Modulo Financeiro</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {/* Item único "Conta de Pagamento" */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a
                    href="/dashboard/conta-pagamento"
                    className="flex items-center space-x-2"
                  >
                    <CreditCard />
                    <span>Conta de Pagamento</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Botão de Logout no Footer */}
      <SidebarFooter className="p-4 border-t border-gray-200">
        <button
          onClick={logout}
          className="flex items-center space-x-2 text-red-600 hover:text-red-800"
        >
          <LogOut />
          <span>Logout</span>
        </button>
      </SidebarFooter>
    </Sidebar>
  );
}
