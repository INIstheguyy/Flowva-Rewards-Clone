import { Star } from "lucide-react";

export default function ReferralCard({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-white rounded-lg shadow-sm border border-slate-200 hover:border-purple-500 transition-colors w-full text-left overflow-hidden"
    >
      <div className="bg-white p-4 max-h-[100px]">
        <div className="flex items-start gap-3">
          <div className="bg-purple-100 rounded-lg p-2 flex-shrink-0">
            <Star className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="font-semibold text-slate-900">
            Refer and win 10,000 points!
          </h3>
        </div>
      </div>
      <div className="bg-slate-50 px-4 py-3 max-h-[150px]">
        <p className="text-sm text-slate-600 leading-relaxed">
          Invite 3 friends by Nov 20 and earn a chance to be one of 5
          winners of <span className="text-purple-600 font-medium">10,000 points</span>. Friends must complete onboarding to
          qualify.
        </p>
      </div>
    </button>
  );
}