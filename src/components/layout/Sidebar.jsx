import { Link, useLocation } from 'react-router-dom'
import { useContext, useState, useRef, useEffect } from 'react'
import { AuthContext } from '@/context/AuthContext'
import { Home, Compass, BookOpen, Layers, CreditCard, Gift, Settings, ChevronDown, LogOut, User, HelpCircle } from 'lucide-react'
import flowva from '@/assets/images/flowva_logo-xVpZI3-U.png';

const navItems = [
  { name: 'Home', path: '/dashboard/home', icon: Home },
  { name: 'Discover', path: '/dashboard/discover', icon: Compass },
  { name: 'Library', path: '/dashboard/library', icon: BookOpen },
  { name: 'Tech Stack', path: '/dashboard/tech-stack', icon: Layers },
  { name: 'Subscriptions', path: '/dashboard/subscriptions', icon: CreditCard },
  { name: 'Rewards Hub', path: '/dashboard/rewards', icon: Gift },
  { name: 'Settings', path: '/dashboard/settings', icon: Settings },
]

export default function Sidebar({ isOpen, onClose }) {
  const location = useLocation()
  const { user, signOut } = useContext(AuthContext)
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const menuRef = useRef(null)

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowProfileMenu(false)
      }
    }

    if (showProfileMenu) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showProfileMenu])

  return (
    <>
      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-full w-64 bg-white border-r border-slate-200
          transition-transform duration-300 ease-in-out flex flex-col 
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
        `}
      >
        
        {/* Logo */}
        <div className="flex items-center gap-3 p-6 border-b border-slate-100">
          <div className="w-[65%] flex items-center justify-center">
            <img src={flowva} alt="Flowva Logo" />
          </div>
          
          {/* Close button (mobile only) */}
          <button
            onClick={onClose}
            className="ml-auto lg:hidden text-slate-400 hover:text-slate-600"
          >
            ✕
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.path
            
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
                  ${isActive 
                    ? 'bg-purple-50 text-purple-600 font-semibold' 
                    : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                  }
                `}
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm">{item.name}</span>
              </Link>
            )
          })}
        </nav>

        {/* User Profile (bottom) */}
        <div className="border-t border-slate-100 p-4 relative" ref={menuRef}>
          {/* Profile Button */}
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="w-full flex items-center gap-3 hover:bg-slate-50 p-2 rounded-lg transition-all duration-200"
          >
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-purple-600 font-bold text-lg">
                {user?.email?.[0].toUpperCase()}
              </span>
            </div>
            <div className="flex-1 min-w-0 text-left">
              <p className="text-sm font-medium text-slate-900 truncate">
                {user?.email?.split('@')[0]}
              </p>
              <p className="text-xs text-slate-500 truncate">
                {user?.email}
              </p>
            </div>
            <ChevronDown 
              className={`w-4 h-4 text-slate-400 transition-transform ${
                showProfileMenu ? 'rotate-180' : ''
              }`}
            />
          </button>

          {/* Dropdown Menu */}
          {showProfileMenu && (
            <div className="absolute bottom-full left-4 right-4 mb-2 bg-white border border-slate-200 rounded-lg shadow-lg overflow-hidden">
              {/* Menu Items */}
              <div className="py-1">
                <button
                  onClick={() => {
                    setShowProfileMenu(false)
                    // Navigate to settings or profile
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  <User className="w-4 h-4" />
                  <span>View Profile</span>
                </button>

                <button
                  onClick={() => {
                    setShowProfileMenu(false)
                    // Navigate to settings
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  <Settings className="w-4 h-4" />
                  <span>Settings</span>
                </button>

                <button
                  onClick={() => {
                    setShowProfileMenu(false)
                    // Open support/feedback
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  <HelpCircle className="w-4 h-4" />
                  <span>Help & Support</span>
                </button>

                {/* Divider */}
                <div className="border-t border-slate-200 my-1"></div>

                {/* Sign Out */}
                <button
                  onClick={() => {
                    setShowProfileMenu(false)
                    signOut()
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  )
}
