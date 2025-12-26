import { useState } from "react";
import { Menu, Bell } from "lucide-react";
import { useNotifications } from "@/hooks/useNotifications";
import NotificationsPanel from "@/components/notifications/NotificationsPanel";

export default function Header({ onMenuClick, title, subtitle }) {
  const [showNotifications, setShowNotifications] = useState(false);
  const { unreadCount } = useNotifications();
  return (
    <header className="sticky top-0 z-30 bg-slate-50 pt-6  border-slate-200">
      <div className="flex items-center gap-6 px-6 py-4">
        {/* Hamburger (mobile only) */}
        <button
          onClick={onMenuClick}
          className="lg:hidden text-slate-600 hover:text-slate-900 flex-shrink-0"
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Title & Subtitle */}
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl lg:text-3xl font-[400] text-slate-900 truncate">
            {title}
          </h1>
          {subtitle && (
            <p className="text-sm lg:text-base text-slate-600 mt-1 truncate">
              {subtitle}
            </p>
          )}
        </div>

        {/* Notification Bell */}
        <button
          onClick={() => setShowNotifications(!showNotifications)}
          className="relative text-slate-600 hover:text-slate-900 flex-shrink-0"
        >
          <Bell className="w-6 h-6" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs text-white flex items-center justify-center font-medium">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </button>
      </div>
      {showNotifications && (
        <NotificationsPanel onClose={() => setShowNotifications(false)} />
      )}
    </header>
  );
}
