import { Link, useLocation } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '@/context/AuthContext'
import { Home, Compass, BookOpen, Layers, CreditCard, Gift, Settings } from 'lucide-react'
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
        <div className="flex items-center gap-3 p-6 ">
          <div className="w-[65%]  flex items-center justify-center">
            {/* <span className="text-white text-xl">🌊</span> */}
            <img src={flowva} alt="" />
          </div>
          {/* <span className="text-xl font-bold text-purple-600">Flowva</span> */}
          
          {/* Close button (mobile only) */}
          <button
            onClick={onClose}
            className="ml-auto lg:hidden text-slate-400 hover:text-slate-600"
          >
            ✕
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.path
            
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                  ${isActive 
                    ? 'bg-purple-50 text-purple-600' 
                    : 'text-slate-600 hover:bg-slate-50'
                  }
                `}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
              </Link>
            )
          })}
        </nav>

        {/* User Profile (bottom) */}
        <div className="border-t border-slate-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center">
              <span className="text-slate-600 font-medium">
                {user?.email?.[0].toUpperCase()}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-900 truncate">
                {user?.email?.split('@')[0]}
              </p>
              <p className="text-xs text-slate-500 truncate">
                {user?.email}
              </p>
            </div>
          </div>
          
          <button
            onClick={signOut}
            className="w-full mt-3 px-4 py-2 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors"
          >
            Sign Out
          </button>
        </div>
      </aside>
    </>
  )
}