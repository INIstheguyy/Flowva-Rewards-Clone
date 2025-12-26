import { Star } from "lucide-react";

export default function ReferralCard({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-white rounded-lg shadow-md border border-slate-200 hover:border-purple-500 card-hover w-full text-left overflow-hidden"
    >
      <div className="bg-white px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="bg-purple-100 rounded-lg p-1.5 flex-shrink-0">
            <Star className="w-5 h-5 text-purple-600" />
          </div>
          <h3 className="font-semibold text-sm text-slate-900">
            Refer and win 10,000 points!
          </h3>
        </div>
      </div>
      <div className="bg-slate-50 px-4 py-2.5">
        <p className="text-xs text-slate-600 leading-relaxed">
          Invite 3 friends by Nov 20 and earn a chance to be one of 5
          winners of <span className="text-purple-600 font-medium">10,000 points</span>. Friends must complete onboarding to
          qualify.
        </p>
      </div>
    </button>
  );
}