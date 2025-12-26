import { AwardIcon, LucideAward } from "lucide-react";
import gold from '@/assets/images/gold-coin.png';

export default function PointsBalanceCard({ points = 0 }) {
  const nextMilestone = 5000;
  const progress = (points / nextMilestone) * 100;

  return (
    <div className="bg-white rounded-xl shadow-md border border-slate-100 card-hover">
      <div className="bg-[#eef2ff] rounded-t-xl px-4 py-3 flex items-center gap-2">
        <div className="w-6 h-6 rounded-full flex items-center justify-center">
          <span className="text-purple-600">
            <LucideAward size={20} />
          </span>
        </div>
        <h3 className="font-semibold text-sm text-slate-900">Points Balance</h3>
      </div>

      <div className="px-4 py-3">
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-4xl font-bold text-purple-600">{points}</span>
          <img className='w-10 h-10' src={gold} alt="Gold Coin" />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-slate-600">Progress to $5 Gift Card</span>
            <span className="font-medium text-slate-900">
              {points}/{nextMilestone}
            </span>
          </div>

          <div className="w-full bg-slate-100 rounded-full h-2">
            <div
              className="bg-purple-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>

          <p className="text-xs text-slate-500 flex items-center gap-1">
            <span>🚀</span>
            Just getting started — keep earning points!
          </p>
        </div>
      </div>
    </div>
  );
}
