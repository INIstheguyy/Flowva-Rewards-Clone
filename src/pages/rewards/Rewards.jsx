import { useState } from "react";
import { useProfile } from "@/hooks/useProfile";
import { useRewards } from "@/hooks/useRewards";
import { useDailyStreak } from "@/hooks/useDailyStreak";
import { useClaimReward } from "@/hooks/useClaimReward";
import { useClaimFeaturedReward } from "@/hooks/useClaimFeaturedReward";
import ClaimFeaturedRewardModal from "@/components/rewards/ClaimFeaturedRewardModal";
import VerificationPendingModal from "@/components/rewards/VerificationPendingModal";
import PointsBalanceCard from "@/components/rewards/PointsBalanceCard";
import DailyStreakCard from "@/components/rewards/DailyStreakCard";
import FeaturedToolCard from "@/components/rewards/FeaturedToolCard";
import ReferralCard from "@/components/rewards/ReferralCard";
import ShareStackCard from "@/components/rewards/ShareStackCard";
import RewardCard from "@/components/rewards/RewardCard";
import ClaimRewardModal from "@/components/rewards/ClaimRewardModal";
import { Users2 } from "lucide-react";
import {
  FaFacebook,
  FaXTwitter,
  FaLinkedin,
  FaWhatsapp,
} from "react-icons/fa6";

export default function Rewards() {
  const [activeTab, setActiveTab] = useState("earn");
  const [rewardFilter, setRewardFilter] = useState("all");
  const [selectedReward, setSelectedReward] = useState(null);
  const [showClaimModal, setShowClaimModal] = useState(false);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [hasClaimed, setHasClaimed] = useState(false);

  const { data: profile, isLoading: profileLoading } = useProfile();
  // eslint-disable-next-line no-unused-vars
  const { data: rewards, isLoading: rewardsLoading } = useRewards();
  const { data: streak, claimStreak, isClaiming } = useDailyStreak();
  const { mutate: claimReward, isPending: isClaimingReward } = useClaimReward();
  const { mutate: claimFeaturedReward, isPending: isClaimingFeatured } = useClaimFeaturedReward();

  const canClaimStreak = () => {
    if (!streak?.last_claimed_at) return true;
    const lastClaimed = new Date(streak.last_claimed_at);
    const today = new Date();
    return (
      lastClaimed.getDate() !== today.getDate() ||
      lastClaimed.getMonth() !== today.getMonth() ||
      lastClaimed.getFullYear() !== today.getFullYear()
    );
  };

  const getFilteredRewards = () => {
    if (!rewards) return [];
    const userPoints = profile?.points_balance || 0;
    switch (rewardFilter) {
      case "unlocked":
        return rewards.filter((r) => r.status === "locked" && userPoints >= r.cost_points);
      case "locked":
        return rewards.filter((r) => r.status === "locked" && userPoints < r.cost_points);
      case "coming_soon":
        return rewards.filter((r) => r.status === "coming_soon");
      default:
        return rewards;
    }
  };

  const filteredRewards = getFilteredRewards();

  const rewardCounts = {
    all: rewards?.length || 0,
    unlocked: rewards?.filter((r) => r.status === "locked" && (profile?.points_balance || 0) >= r.cost_points).length || 0,
    locked: rewards?.filter((r) => r.status === "locked" && (profile?.points_balance || 0) < r.cost_points).length || 0,
    coming_soon: rewards?.filter((r) => r.status === "coming_soon").length || 0,
  };

  const handleClaimReward = (reward) => {
    setSelectedReward(reward);
  };

  const confirmClaimReward = () => {
    if (!selectedReward) return;
    claimReward(
      { rewardId: selectedReward.id, rewardCost: selectedReward.cost_points },
      {
        onSuccess: () => {
          setSelectedReward(null);
          alert("Reward claimed successfully! Check your email for details.");
        },
        onError: (error) => {
          alert(`Failed to claim reward: ${error.message}`);
        },
      }
    );
  };

  const handleClaimFeatured = () => {
    setShowClaimModal(true);
  };

  const handleSubmitClaim = ({ email, screenshot }) => {
    claimFeaturedReward(
      { email, screenshot, toolName: "Reclaim", pointsAmount: 50 },
      {
        onSuccess: () => {
          setShowClaimModal(false);
          setShowVerificationModal(true);
          setHasClaimed(true);
        },
        onError: (error) => {
          alert(error.message);
        },
      }
    );
  };

  if (profileLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-slate-500">Loading...</div>
      </div>
    );
  }

  return (
    <div>
      {/* Tabs */}
      <div className="border-b border-slate-200 mb-6">
        <div className="flex gap-8">
          <button
            onClick={() => setActiveTab("earn")}
            className={`pb-3 font-medium transition-colors ${
              activeTab === "earn"
                ? "border-b-2 border-purple-600 text-purple-600"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Earn Points
          </button>
          <button
            onClick={() => setActiveTab("redeem")}
            className={`pb-3 font-medium transition-colors ${
              activeTab === "redeem"
                ? "border-b-2 border-purple-600 text-purple-600"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Redeem Rewards
          </button>
        </div>
      </div>

      {/* Earn Points Tab */}
      {activeTab === "earn" && (
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4 border-l-4 border-purple-600 pl-4">
              Your Rewards Journey
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <PointsBalanceCard points={profile?.points_balance || 0} />
              <DailyStreakCard
                streak={streak}
                onClaim={claimStreak}
                isClaiming={isClaiming}
                canClaim={canClaimStreak()}
              />
              <FeaturedToolCard onClaim={handleClaimFeatured} hasClaimed={hasClaimed} />
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4 border-l-4 border-purple-600 pl-4">
              Earn More Points
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <ReferralCard  />
              <ShareStackCard />
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4 border-l-4 border-purple-600 pl-4">
              Refer & Earn
            </h2>
            <div className="bg-white rounded-lg shadow-sm border border-slate-200">
              <div className="bg-violet-50 flex items-center gap-4 p-4">
                <Users2 size={24} className="text-purple-600" />
                <div>
                  <h3 className="font-semibold text-lg text-slate-900">Share Your Link</h3>
                  <p className="text-sm text-slate-600">
                    Invite friends and earn 25 points when they join!
                  </p>
                </div>
              </div>

              <div className="flex gap-4 p-6 ">
                <div className="flex-1 text-center">
                  <div className="text-3xl font-bold text-purple-600">
                    {profile?.total_referrals || 0}
                  </div>
                  <div className="text-sm text-slate-600">Referrals</div>
                </div>
                <div className="flex-1 text-center">
                  <div className="text-3xl font-bold text-purple-600">0</div>
                  <div className="text-sm text-slate-600">Points Earned</div>
                </div>
              </div>

              <div className="p-6 space-y-3 bg-purple-50 mx-4 rounded-xl">
                <p className="text-sm font-medium  text-slate-700">
                  Your personal referral link:
                </p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    readOnly
                    value={`https://app.flowvahub.com/signup?ref=${profile?.referral_code}`}
                    className="flex-1 px-3 py-2  rounded-md text-sm bg-white border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(
                        `https://app.flowvahub.com/signup?ref=${profile?.referral_code}`
                      );
                      alert("Link copied!");
                    }}
                    className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
                  >
                    Copy
                  </button>
                </div>
              </div>

              <div className="flex gap-4 p-2 justify-center ">
                <button className="w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center transition-colors">
                  <FaFacebook className="text-white" size={20} />
                </button>
                <button className="w-10 h-10 rounded-full bg-black hover:bg-slate-800 flex items-center justify-center transition-colors">
                  <FaXTwitter className="text-white" size={20} />
                </button>
                <button className="w-10 h-10 rounded-full bg-blue-700 hover:bg-blue-800 flex items-center justify-center transition-colors">
                  <FaLinkedin className="text-white" size={20} />
                </button>
                <button className="w-10 h-10 rounded-full bg-green-500 hover:bg-green-600 flex items-center justify-center transition-colors">
                  <FaWhatsapp className="text-white" size={20} />
                </button>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* Redeem Rewards Tab */}
      {activeTab === "redeem" && (
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-4 border-l-4 border-purple-600 pl-4">
            Redeem Your Points
          </h2>

          <div className="border-b border-slate-200 mb-6">
            <div className="flex gap-6">
              {["all", "unlocked", "locked", "coming_soon"].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setRewardFilter(filter)}
                  className={`pb-3 text-sm font-medium transition-colors ${
                    rewardFilter === filter
                      ? "border-b-2 border-purple-600 text-purple-600"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {filter === "coming_soon" ? "Coming Soon" : filter.charAt(0).toUpperCase() + filter.slice(1)}{" "}
                  <span className="text-slate-400">({rewardCounts[filter]})</span>
                </button>
              ))}
            </div>
          </div>

          {filteredRewards.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-500">No rewards in this category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRewards.map((reward) => (
                <RewardCard
                  key={reward.id}
                  reward={reward}
                  userPoints={profile?.points_balance || 0}
                  onClaim={handleClaimReward}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Modals */}
      {showClaimModal && (
        <ClaimFeaturedRewardModal
          onSubmit={handleSubmitClaim}
          onClose={() => setShowClaimModal(false)}
          isLoading={isClaimingFeatured}
        />
      )}

      {showVerificationModal && (
        <VerificationPendingModal onClose={() => setShowVerificationModal(false)} />
      )}

      {selectedReward && (
        <ClaimRewardModal
          reward={selectedReward}
          userPoints={profile?.points_balance || 0}
          onConfirm={confirmClaimReward}
          onClose={() => setSelectedReward(null)}
          isLoading={isClaimingReward}
        />
      )}
    </div>
  );
}