import { Button } from "@/components/ui/button";
import reclaim from "@/assets/images/reclaim (1).png";
import { Calendar1Icon, Gift, User, UserPlus } from "lucide-react";

export default function FeaturedToolCard({ onClaim, hasClaimed }) {
  return (
    <div className="rounded-xl shadow-md text-slate-600 relative overflow-hidden card-hover">
      <div className="bg-gradient-to-br flex justify-between items-start gap-3 from-purple-600 to-blue-400 text-white p-4">
        <div className="flex flex-col gap-2">
          <div className="w-fit bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded-full text-xs font-medium">
            Featured
          </div>
          <div className="flex justify-between">
            <h3 className="text-lg font-bold">Top Tool Spotlight</h3>
          </div>
          <p className="text-base font-semibold">Reclaim</p>
        </div>
        <div className="h-full my-auto">
          <img className="rounded-full w-14 h-14" src={reclaim} alt="" />
        </div>
      </div>

      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
        <div className="flex items-start gap-2">
          <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
            <Calendar1Icon size={18} className="text-purple-500" />
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-1">
              Automate and Optimize Your Schedule
            </h4>
            <p className="text-xs leading-relaxed">
              Reclaim.ai is an AI-powered calendar assistant that automatically
              schedules your tasks, meetings, and breaks to boost productivity.
              Free to try — earn Flowva Points when you sign up!
            </p>
          </div>
        </div>
      </div>
      <div className="border-t border-white/20 mt-3"></div>
      <div className="flex justify-between gap-2 p-3">
        <Button 
        onClick={() => window.open('https://reclaim.ai/', '_blank')}
        className="text-xs px-3 py-1.5 h-auto bg-purple-600 hover:bg-purple-700 rounded-full">
          <UserPlus size={14} className="mr-1" /> Sign up
        </Button>
        <Button  
          onClick={onClaim}
          disabled={hasClaimed}
        className="text-xs px-3 py-1.5 h-auto bg-gradient-to-br from-purple-600 to-pink-400 rounded-full">
          {hasClaimed ? (
            <span className="flex items-center gap-1">
              <Gift size={14} /> Claimed
            </span>
          ) : (
            <span className="flex items-center gap-1">
              <Gift size={14} /> Claim 50 pts
            </span>
          )}
        </Button>
      </div>
    </div>
  );
}
