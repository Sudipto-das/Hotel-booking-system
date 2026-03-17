import { NavLink, useNavigate } from "react-router";
import { useSidebar } from "./sidebarContext";   // reads from context
import icons from "./icons";
import NAV_SECTIONS from "./navConfig";
import styles from "./sidebar.module.scss";

export default function Sidebar({ onLogout }) {
  const { isCollapsed, toggleSidebar } = useSidebar(); 

  return (
    <aside className={`${styles.sidebar}${isCollapsed ? ` ${styles.collapsed}` : ""}`}>

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
          onClick={toggleSidebar}
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {icons.chevrons}
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
                className={({ isActive }) => `${styles.navItem}${isActive ? ` ${styles.active}` : ""}`}
                data-tooltip={item.label}
              >
                <span className={styles.navItem__icon}>{icons[item.icon]}</span>
                <span className={styles.navItem__label}>{item.label}</span>
                {item.badge && <span className={styles.navItem__badge}>{item.badge}</span>}
              </NavLink>
            ))}
          </div>
        ))}
      </nav>

      {/* Footer / Logout */}
      <div className={styles.sidebar__footer}>
        <button className={styles.sidebar__logout} onClick={onLogout} data-tooltip="Logout">
          <span className={styles.sidebar__logoutIcon}>{icons.logout}</span>
          <span className={styles.sidebar__logoutText}>Logout</span>
        </button>
      </div>

    </aside>
  );
}