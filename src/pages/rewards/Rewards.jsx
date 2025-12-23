export default function Rewards() {
  return (
    <div>
      {/* <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900">Rewards Hub</h1>
        <p className="text-slate-600 mt-1">
          Earn points, unlock rewards, and celebrate your progress!
        </p>
      </div> */}

      {/* Tabs */}
      <div className="border-b border-slate-200 mb-6">
        <div className="flex gap-8">
          <button className="pb-3 border-b-2 border-purple-600 text-purple-600 font-medium">
            Earn Points
          </button>
          <button className="pb-3 text-slate-600 hover:text-slate-900">
            Redeem Rewards
          </button>
        </div>
      </div>

      {/* Content placeholder */}
      <div className="text-center py-12 text-slate-500">
        Rewards content coming soon...
      </div>
    </div>
  )
}