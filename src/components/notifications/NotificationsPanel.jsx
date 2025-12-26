import { useState } from 'react'
import { X, MoreVertical, Trash2 } from 'lucide-react'
import { useNotifications } from '@/hooks/useNotifications'
import NotificationDetailModal from './NotificationsDetailModal'

export default function NotificationsPanel({ onClose }) {
  // eslint-disable-next-line no-unused-vars
  const { notifications, unreadCount, markAsRead, markAllAsRead, deleteAll, deleteOne } = useNotifications()
  const [selectedNotification, setSelectedNotification] = useState(null)

  const handleNotificationClick = (notification) => {
    if (!notification.is_read) {
      markAsRead(notification.id)
    }
    setSelectedNotification(notification)
  }

  const getTimeAgo = (timestamp) => {
    const now = new Date()
    const then = new Date(timestamp)
    const seconds = Math.floor((now - then) / 1000)
    
    if (seconds < 60) return 'Just now'
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`
    return `${Math.floor(seconds / 86400)}d ago`
  }

  return (
    <>
      <div className="fixed inset-0 bg-black/30 z-40" onClick={onClose} />
      
      <div className="fixed top-16 right-4 w-[400px] max-h-[600px] bg-white rounded-lg shadow-xl z-50 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-200 bg-gradient-to-br from-purple-600 to-pink-400 text-white rounded-t-lg">
          <h2 className="text-lg font-semibold">Notifications</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={() => markAllAsRead()}
              className="text-slate-100 text-sm hover:underline"
            >
              Mark all as read
            </button>
            <button
              onClick={() => {
                if (confirm('Delete all notifications?')) {
                  deleteAll()
                }
              }}
              className="text-sm hover:underline"
            >
              Delete All
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-slate-400">
              <span className="text-4xl mb-2">🔔</span>
              <p>No notifications yet</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  onClick={() => handleNotificationClick(notification)}
                  className={`p-4 hover:bg-slate-50 cursor-pointer transition-colors relative ${
                    !notification.is_read ? 'bg-purple-50' : ''
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                      !notification.is_read ? 'bg-purple-100' : 'bg-slate-100'
                    }`}>
                      <span className="text-xl">{notification.icon}</span>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-slate-900 text-sm mb-1">
                        {notification.title}
                      </h3>
                      <p className="text-sm text-slate-600 line-clamp-2">
                        {notification.message}
                      </p>
                      <p className="text-xs text-slate-400 mt-1">
                        {getTimeAgo(notification.created_at)}
                      </p>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        if (confirm('Delete this notification?')) {
                          deleteOne(notification.id)
                        }
                      }}
                      className="text-slate-400 hover:text-slate-600"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>

                  {!notification.is_read && (
                    <div className="absolute top-4 right-4 w-2 h-2 bg-purple-600 rounded-full" />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {notifications.length > 0 && (
          <div className="p-3 border-t border-slate-200 text-center">
            <button className="text-sm text-purple-600 hover:underline">
              View all notifications ({notifications.length})
            </button>
          </div>
        )}
      </div>

      {/* Notification Detail Modal */}
      {selectedNotification && (
        <NotificationDetailModal
          notification={selectedNotification}
          onClose={() => setSelectedNotification(null)}
        />
      )}
    </>
  )
}