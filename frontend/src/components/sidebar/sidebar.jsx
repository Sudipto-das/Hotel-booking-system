import { NavLink } from "react-router";
import { useSidebar } from "./sidebarContext";
import icons from "./icons";
import NAV_SECTIONS from "./navConfig";
import styles from "./sidebar.module.scss";

// Place <MobileMenuButton /> inside your Navbar/Header to open the drawer on mobile
export function MobileMenuButton() {
  const { toggleMobile } = useSidebar();
  return (
    <button
      className={styles.mobileMenuBtn}
      onClick={toggleMobile}
      aria-label="Open navigation menu"
    >
      {icons.menu}
    </button>
  );
}

export default function Sidebar({ onLogout }) {
  const { isCollapsed, isMobileOpen, toggleSidebar, closeMobile } = useSidebar();

  const handleToggleClick = () => {
    if (isMobileOpen) {
      closeMobile();
    } else {
      toggleSidebar();
    }
  };

  return (
    <>
      {isMobileOpen && (
        <div className={styles.mobileOverlay} onClick={closeMobile} />
      )}

      <aside
        className={styles.sidebar}
        data-collapsed={isCollapsed}
        data-mobile-open={isMobileOpen}
      >
        {/* Header / Logo */}
        <div className={styles.sidebar__header}>
          <div className={styles.sidebar__logo}>
            <div className={styles.sidebar__logoIcon}>{icons.hotel}</div>
            <div className={styles.sidebar__logoText}>
              <span>LuxeStay</span>
              <span>Grand Hotel</span>
            </div>
          </div>
          <button
            className={styles.sidebar__toggle}
            onClick={handleToggleClick}
            aria-label={isMobileOpen ? "Close sidebar" : (isCollapsed ? "Expand sidebar" : "Collapse sidebar")}
          >
            {isMobileOpen ? icons.close : icons.chevrons}
          </button>
        </div>

        {/* Navigation */}
        <nav className={styles.sidebar__nav}>
          {NAV_SECTIONS.map((section, si) => (
            <div key={section.label}>
              {si > 0 && <div className={styles.sidebar__divider} />}
              <div className={styles.sidebar__sectionLabel}>{section.label}</div>

              {section.items.map(item => (
                <NavLink
                  key={item.id}
                  to={item.path}
                  className={({ isActive }) =>
                    [styles.navItem, isActive ? styles.active : ""].filter(Boolean).join(" ")
                  }
                  data-tooltip={item.label}
                  onClick={closeMobile}
                >
                  <span className={styles.navItem__icon}>{icons[item.icon]}</span>
                  <span className={styles.navItem__label}>{item.label}</span>
                  {item.badge && (
                    <span className={styles.navItem__badge}>{item.badge}</span>
                  )}
                </NavLink>
              ))}
            </div>
          ))}
        </nav>

        {/* Footer / Logout */}
        <div className={styles.sidebar__footer}>
          <button
            className={styles.sidebar__logout}
            onClick={onLogout}
            data-tooltip="Logout"
          >
            <span className={styles.sidebar__logoutIcon}>{icons.logout}</span>
            <span className={styles.sidebar__logoutText}>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}