import { Outlet, useNavigate } from "react-router";
import { useAuth } from "../../feat/auth/hooks/useAuth";
import { SidebarProvider, useSidebar } from "../sidebar/sidebarContext";
import { Sidebar } from "../sidebar";

function LayoutContent({ onLogout }) {
  const { isCollapsed } = useSidebar();

  return (
    <div className={`app-layout${isCollapsed ? " sidebar-collapsed" : ""}`}>
      <Sidebar onLogout={onLogout} />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}

export default function MainLayout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <SidebarProvider>
      <LayoutContent onLogout={handleLogout} />
    </SidebarProvider>
  );
}
