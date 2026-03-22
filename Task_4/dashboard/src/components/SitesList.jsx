import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const SitesList = ({ report }) => {
  if (!report) return null;

  const { byDomain } = report;

  const formatTime = (seconds) => {
    if (seconds < 60) return `${Math.round(seconds)}s`;
    if (seconds < 3600) return `${Math.round(seconds / 60)}m`;
    return `${(seconds / 3600).toFixed(1)}h`;
  };

  const sortedDomains = Object.entries(byDomain).sort(
    (a, b) => b[1].timeSpent - a[1].timeSpent
  );

  const getCategoryStyle = (category) => {
    if (category === "productive")
      return "bg-green-500/20 text-green-400 border-green-500/30";
    if (category === "unproductive")
      return "bg-[#E11D48]/20 text-[#E11D48] border-[#E11D48]/30";
    return "bg-[#3F3F46]/50 text-[#A1A1AA] border-[#3F3F46]";
  };

  return (
    <Card className="bg-[#27272A] border-[#3F3F46]">
      <CardHeader>
        <CardTitle className="text-[#A1A1AA] text-sm font-semibold uppercase tracking-wider">
          Top Sites This Week
        </CardTitle>
      </CardHeader>
      <CardContent>
        {sortedDomains.length === 0 ? (
          <p className="text-[#71717A] text-sm">No data yet</p>
        ) : (
          <div className="flex flex-col gap-2">
            {sortedDomains.map(([domain, data]) => (
              <div
                key={domain}
                className="flex items-center justify-between bg-[#18181B] rounded-lg px-4 py-3 border border-[#3F3F46]"
              >
                <div className="flex items-center gap-3">
                  <span className="text-[#FAFAFA] text-sm font-medium">
                    {domain}
                  </span>
                  <Badge className={getCategoryStyle(data.category)}>
                    {data.category}
                  </Badge>
                </div>
                <span className="text-[#A1A1AA] text-sm font-mono">
                  {formatTime(data.timeSpent)}
                </span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SitesList;