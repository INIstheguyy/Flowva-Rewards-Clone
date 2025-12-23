import { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'

// Page metadata for dynamic headers
const pageConfig = {
  '/dashboard/rewards': {
    title: 'Rewards Hub',
    subtitle: 'Earn points, unlock rewards, and celebrate your progress!',
  },
  '/dashboard/home': {
    title: 'Home',
    subtitle: 'Welcome back!',
  },
  '/dashboard/discover': {
    title: 'Discover',
    subtitle: 'Find new tools and resources',
  },
  '/dashboard/library': {
    title: 'Library',
    subtitle: 'Your saved tools and collections',
  },
  '/dashboard/tech-stack': {
    title: 'Tech Stack',
    subtitle: 'Manage your technology stack',
  },
  '/dashboard/subscriptions': {
    title: 'Subscriptions',
    subtitle: 'Manage your subscriptions',
  },
  '/dashboard/settings': {
    title: 'Settings',
    subtitle: 'Customize your experience',
  },
}

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()
  
  // Get current page config
  const currentPage = pageConfig[location.pathname] || {
    title: 'Dashboard',
    subtitle: '',
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="lg:pl-64">
        <Header 
          onMenuClick={() => setSidebarOpen(true)}
          title={currentPage.title}
          subtitle={currentPage.subtitle}
        />

        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}