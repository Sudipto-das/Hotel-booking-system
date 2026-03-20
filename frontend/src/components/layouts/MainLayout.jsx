import { Outlet, useNavigate } from "react-router";
import { useAuth } from "../../feat/auth/hooks/useAuth";
import { SidebarProvider, useSidebar } from "../sidebar/sidebarContext";
import { Sidebar } from "../sidebar";
import sidebarIcons from "../sidebar/icons";
import styles from "./MainLayout.module.scss";

function LayoutContent({ onLogout }) {
  const { isCollapsed, toggleMobile } = useSidebar();

  return (
    <div className={`app-layout${isCollapsed ? " sidebar-collapsed" : ""}`}>
      <Sidebar onLogout={onLogout} />
      <main className="main-content">
        <button className={styles.mobileMenuBtn} onClick={toggleMobile} aria-label="Open menu">
          {sidebarIcons.menu}
        </button>
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
