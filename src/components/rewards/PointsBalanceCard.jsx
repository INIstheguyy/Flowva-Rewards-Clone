import { AwardIcon, LucideAward } from "lucide-react";
import gold from '@/assets/images/gold-coin.png';

export default function PointsBalanceCard({ points = 0 }) {
  const nextMilestone = 5000;
  const progress = (points / nextMilestone) * 100;

  return (
    <div className="bg-white rounded-2xl  shadow-sm border border-slate-100">
      <div className="bg-[#eef2ff] rounded-[12px_12px_0px_0px] p-3 flex items-center gap-2 mb-4">
        <div className=" w-8 h-8  rounded-full flex items-center justify-center">
          <span className="text-purple-600">
            <LucideAward />
          </span>
        </div>
        <h3 className="font-semibold text-slate-900">Points Balance</h3>
      </div>

      <div className="p-3">
        <div className="flex py-3 items-baseline justify-between gap-2 mb-4">
          <span className="text-5xl font-bold text-purple-600">{points}</span>
          {/* <span className="text-2xl text-yellow-500">🪙</span> */}
          <img className='w-12 h-12 mr-7' src={gold} alt="Gold Coin" />
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
