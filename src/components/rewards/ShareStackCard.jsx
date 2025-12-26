import { Share2 } from "lucide-react";

export default function ShareStackCard() {
  return (
    <div className="bg-white rounded-lg shadow-sm border hover:border-purple-500 border-slate-200 overflow-hidden">
      <div className="bg-white p-4 min-h-[100px]">
        <div className="flex items-start gap-3">
          <div className="bg-purple-100 rounded-lg p-2 flex-shrink-0">
            <Share2 className="w-6 h-6 text-purple-600" />
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-slate-900">
              Share Your Stack
            </span>
            <span className="inline-block  text-slate-600 text-xs font-medium  rounded mb-1">
              Earn +25 pts
            </span>
          </div>
        </div>
      </div>
      <div className="bg-slate-50 px-4 py-3 flex items-center justify-between max-h-[150px]">
        <p className="text-sm text-slate-600">Share your tool stack</p>
        <button className="  text-purple-600 hover:text-purple-700 font-medium text-sm transition-colors flex items-center gap-2 bg-violet-100 py-2 px-4 rounded-3xl">
          <Share2 className="w-6 h-6" />
          <span>Share</span>
        </button>
      </div>
    </div>
  );
}
