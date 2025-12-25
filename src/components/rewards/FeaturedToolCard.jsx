import { Button } from "@/components/ui/button";
import reclaim from "@/assets/images/reclaim (1).png";
import { Calendar1Icon, Gift, User, UserPlus } from "lucide-react";

export default function FeaturedToolCard({ onClaim, hasClaimed }) {
  return (
    <div className=" rounded-2xl shadow-md  text-slate-600 relative overflow-hidden">
      <div className="bg-gradient-to-br flex justify-between align-middle gap-4 from-purple-600 to-blue-400 text-white p-3">
        <div className="flex flex-col gap-4">
          <div className="w-fit top-4  bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium">
            Featured
          </div>
          <div className="flex justify-between mb-2">
            <h3 className="text-xl font-bold ">Top Tool Spotlight</h3>
            {/* <img className="w-16 h-16 rounded-full" src={reclaim} alt="Reclaim" /> */}
          </div>
          <p className="text-xl font-bold ">Reclaim</p>
        </div>
        <div className="h-full my-auto">
          <img className="rounded-full w-[64px] h-full" src={reclaim} alt="" />
        </div>
      </div>

      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 mb-6 ">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
            <Calendar1Icon className="text-purple-500" />
          </div>
          <div>
            <h4 className="font-semibold mb-1">
              Automate and Optimize Your Schedule
            </h4>
            <p className="text-sm ">
              Reclaim.ai is an AI-powered calendar assistant that automatically
              schedules your tasks, meetings, and breaks to boost productivity.
              Free to try — earn Flowva Points when you sign up!
            </p>
          </div>
        </div>
      </div>
      <hr />
      <div className="flex justify-between gap-3 px-3 py-1">
        <Button 
        onClick={() => window.open('https://reclaim.ai/', '_blank')}
        className="w-fit bg-purple-600 hover:bg-purple-700 rounded-3xl">
          <UserPlus size={18} /> <span className="ml-4"></span> Sign up
        </Button>
        <Button  
          onClick={onClaim}
          disabled={hasClaimed}
        className="w-fit bg-gradient-to-br from-purple-600 to-pink-400 rounded-3xl">
          {hasClaimed ? (
            <span className="flex items-center">
              <Gift size={18} /> Claimed
            </span>
          ) : (
            <span className="flex items-center">
              <Gift size={18} /> Claim 50 pts
            </span>
          )}
        </Button>
      </div>
    </div>
  );
}
