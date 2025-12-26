import { X } from "lucide-react";
import {
  FaFacebook,
  FaXTwitter,
  FaLinkedin,
  FaWhatsapp,
} from "react-icons/fa6";
import { Button } from "@/components/ui/button";

export default function NotificationDetailModal({ notification, onClose }) {
  const shareUrl = `https://flowvahub.com/rewards`;
  const shareText = `${notification.title} - ${notification.message}`;

  const socialLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      shareUrl
    )}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      shareText
    )}&url=${encodeURIComponent(shareUrl)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      shareUrl
    )}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(
      shareText + " " + shareUrl
    )}`,
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-2xl">
            {notification.icon}
          </div>
          <h2 className="text-xl font-bold text-slate-900">
            {notification.title}
          </h2>
        </div>

        <p className="text-slate-600 mb-6">{notification.message}</p>

        {notification.metadata?.points && (
          <div className="bg-purple-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-slate-700">
              <strong>Points:</strong> {notification.metadata.points}
            </p>
          </div>
        )}

        <div className="mb-6">
          <p className="text-center text-sm text-purple-600 font-medium mb-3">
            🎁 Share your win and earn 50 Flowva points!
          </p>
          <p className="text-center text-xs text-slate-500 mb-4">
            Let others know about your reward:
          </p>

          <div className="flex gap-3 justify-center">
            <a
              href={socialLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center transition-colors"
            >
              <FaFacebook className="text-white" size={20} />
            </a>

            <a
              href={socialLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center transition-colors"
            ></a>
                
            <a
              href={socialLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center transition-colors"
            >
              <FaLinkedin className="text-white" size={20} />
            </a>
            <a
              href={socialLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center transition-colors"
            >
              <FaWhatsapp className="text-white" size={20} />
            </a>
          </div>
        </div>

        <Button
          onClick={onClose}
          className="w-full bg-purple-600 hover:bg-purple-700"
        >
          Close
        </Button>
      </div>
    </div>
  );
}
