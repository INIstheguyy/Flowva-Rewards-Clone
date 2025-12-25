import { Share2 } from "lucide-react";

export default function ShareStackCard() {
  return (
    <div className="bg-white rounded-lg shadow-sm border hover:border-purple-500 border-slate-200 overflow-hidden">
      <div className="bg-white p-4 max-h-[100px]">
        <div className="flex items-start gap-3">
          <div className="bg-purple-100 rounded-lg p-2 flex-shrink-0">
            <Share2 className="w-6 h-6 text-purple-600" />
          </div>
          <div className="flex-1">
            <div className="inline-block bg-purple-50 text-purple-600 text-xs font-medium px-2 py-1 rounded mb-1">
              Earn +25 pts
            </div>
            <h3 className="font-semibold text-slate-900">Share Your Stack</h3>
          </div>
        </div>
      </div>
      <div className="bg-slate-50 px-4 py-3 flex items-center justify-between max-h-[150px]">
        <p className="text-sm text-slate-600">Share your tool stack</p>
        <button className="  text-purple-600 hover:text-purple-700 font-medium text-sm transition-colors">
          Share
          <span>→</span>
        </button>
      </div>
    </div>
  );
}