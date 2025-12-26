import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

const daysOfWeek = ["M", "T", "W", "T", "F", "S", "S"];

export default function DailyStreakCard({
  streak,
  onClaim,
  isClaiming,
  canClaim,
}) {
  return (
    <div className="bg-white rounded-xl shadow-md border border-slate-100 card-hover">
      <div className="bg-[#eef2ff] rounded-t-xl px-4 py-3 flex items-center gap-2">
        <div className="w-6 h-6 rounded-full flex items-center justify-center">
          <span className="text-blue-600">
            <Calendar size={20} />
          </span>
        </div>
        <h3 className="font-semibold text-sm text-slate-900">Daily Streak</h3>
      </div>

      <div className="px-4 py-3 flex flex-col">
        <div className="text-center mb-4">
          <div className="text-3xl font-bold text-purple-600 mb-1">
            {streak?.current_streak || 0} day
            {streak?.current_streak !== 1 ? "s" : ""}
          </div>
          {/* <p className="text-sm text-slate-600">Check in daily to earn +5 points</p> */}
        </div>

        {/* Days of week */}
        <div className="flex justify-center gap-1.5 mb-3">
          {daysOfWeek.map((day, index) => {
            const isToday = index + 1 === new Date().getDay();

            return (
              <div
                key={day}
                className={`
                w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium bg-slate-100
                ${isToday ? " ring-2 ring-purple-600" : " text-slate-400"}
              `}
              >
                {day}
              </div>
            );
          })}
        </div>
        <p className="text-xs text-slate-600 text-center mb-3">
          Check in daily to earn +5 points
        </p>
        <Button
          onClick={onClaim}
          disabled={!canClaim || isClaiming}
          className="w-full"
          variant={canClaim ? "default" : "secondary"}
        >
          {isClaiming
            ? "Claiming..."
            : canClaim
            ? "+ 5 points"
            : "Claimed Today"}
        </Button>
      </div>
    </div>
  );
}
