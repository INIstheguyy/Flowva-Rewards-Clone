import { Share2 } from "lucide-react";

export default function ShareStackCard() {
  return (
    <div className="bg-white rounded-lg shadow-md border hover:border-purple-500 border-slate-200 overflow-hidden card-hover">
      <div className="bg-white px-4 py-3">
        <div className="flex items-start gap-2">
          <div className="bg-purple-100 rounded-lg p-1.5 flex-shrink-0">
            <Share2 className="w-5 h-5 text-purple-600" />
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-sm text-slate-900">
              Share Your Stack
            </span>
            <span className="inline-block text-slate-600 text-xs font-medium">
              Earn +25 pts
            </span>
          </div>
        </div>
      </div>
      <div className="bg-slate-50 px-4 py-2.5 flex items-center justify-between">
        <p className="text-xs text-slate-600">Share your tool stack</p>
        <button className="text-purple-600 hover:text-purple-700 font-medium text-xs transition-colors flex items-center gap-1.5 bg-violet-100 py-1.5 px-3 rounded-full">
          <Share2 className="w-4 h-4" />
          <span>Share</span>
        </button>
      </div>
    </div>
  );
}
