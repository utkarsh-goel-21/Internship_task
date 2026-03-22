import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useStats from "./hooks/useStats";
import ScoreCard from "./components/ScoreCard";
import SitesList from "./components/SitesList";
import ActivityChart from "./components/ActivityChart";

const App = () => {
  const [days, setDays] = useState(7);
  const { stats, report, loading, error } = useStats(days);

  return (
    <div className="min-h-screen bg-[#18181B] text-white">
      {/* Header */}
      <header className="bg-[#27272A] border-b border-[#3F3F46] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl">⏱</span>
          <div>
            <h1 className="text-lg font-bold text-[#FAFAFA]">ProductivityTracker</h1>
            <p className="text-xs text-[#A1A1AA]">Your weekly productivity dashboard</p>
          </div>
        </div>

        <Tabs value={String(days)} onValueChange={(v) => setDays(Number(v))}>
          <TabsList className="bg-[#18181B] border border-[#3F3F46]">
            <TabsTrigger value="7" className="text-xs text-[#A1A1AA] data-[state=active]:bg-[#E11D48] data-[state=active]:text-white">7 Days</TabsTrigger>
            <TabsTrigger value="14" className="text-xs text-[#A1A1AA] data-[state=active]:bg-[#E11D48] data-[state=active]:text-white">14 Days</TabsTrigger>
            <TabsTrigger value="30" className="text-xs text-[#A1A1AA] data-[state=active]:bg-[#E11D48] data-[state=active]:text-white">30 Days</TabsTrigger>
          </TabsList>
        </Tabs>
      </header>

      {/* Main */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <p className="text-[#A1A1AA]">Loading your stats...</p>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center h-64">
            <p className="text-[#E11D48]">Failed to load stats. Is the server running?</p>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            <ScoreCard report={report} />
            <ActivityChart stats={stats} />
            <SitesList report={report} />
          </div>
        )}
      </main>
    </div>
  );
};

export default App;