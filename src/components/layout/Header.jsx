import { Menu, Bell } from "lucide-react";

export default function Header({ onMenuClick, title, subtitle }) {
  return (
    <header className="sticky top-0 z-30  border-slate-200">
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
          <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 truncate">
            {title}
          </h1>
          {subtitle && (
            <p className="text-sm lg:text-base text-slate-600 mt-1 truncate">
              {subtitle}
            </p>
          )}
        </div>

        {/* Notification Bell */}
        <button className="relative text-slate-600 hover:text-slate-900 flex-shrink-0">
          <Bell className="w-6 h-6" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
            1
          </span>
        </button>
      </div>
    </header>
  );
}