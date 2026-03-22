import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const ScoreCard = ({ report }) => {
  if (!report) return null;

  const { productivityScore, summary, totalTime } = report;

  const formatTime = (seconds) => {
    if (seconds < 60) return `${Math.round(seconds)}s`;
    if (seconds < 3600) return `${Math.round(seconds / 60)}m`;
    return `${(seconds / 3600).toFixed(1)}h`;
  };

  const getScoreColor = (score) => {
    if (score >= 70) return "text-green-500";
    if (score >= 40) return "text-yellow-500";
    return "text-[#E11D48]";
  };

  return (
    <Card className="bg-[#27272A] border-[#3F3F46]">
      <CardHeader>
        <CardTitle className="text-[#A1A1AA] text-sm font-semibold uppercase tracking-wider">
          Weekly Productivity Score
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex items-end gap-3">
          <span className={`text-6xl font-bold ${getScoreColor(productivityScore)}`}>
            {productivityScore}%
          </span>
          <Badge
            className={
              productivityScore >= 70
                ? "bg-green-500/20 text-green-400 border-green-500/30"
                : productivityScore >= 40
                ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                : "bg-[#E11D48]/20 text-[#E11D48] border-[#E11D48]/30"
            }
          >
            {productivityScore >= 70
              ? "Great"
              : productivityScore >= 40
              ? "Average"
              : "Needs Work"}
          </Badge>
        </div>

        <Progress value={productivityScore} className="h-2 bg-[#18181B]" />

        <div className="grid grid-cols-3 gap-3">
          <div className="bg-[#18181B] rounded-lg p-3 text-center border border-[#3F3F46]">
            <p className="text-xs text-[#A1A1AA] uppercase tracking-wider mb-1">
              Productive
            </p>
            <p className="text-green-400 font-bold text-lg">
              {formatTime(summary.productive)}
            </p>
          </div>
          <div className="bg-[#18181B] rounded-lg p-3 text-center border border-[#3F3F46]">
            <p className="text-xs text-[#A1A1AA] uppercase tracking-wider mb-1">
              Unproductive
            </p>
            <p className="text-[#E11D48] font-bold text-lg">
              {formatTime(summary.unproductive)}
            </p>
          </div>
          <div className="bg-[#18181B] rounded-lg p-3 text-center border border-[#3F3F46]">
            <p className="text-xs text-[#A1A1AA] uppercase tracking-wider mb-1">
              Neutral
            </p>
            <p className="text-[#71717A] font-bold text-lg">
              {formatTime(summary.neutral)}
            </p>
          </div>
        </div>

        <p className="text-xs text-[#71717A]">
          Total tracked: {formatTime(totalTime)} this week
        </p>
      </CardContent>
    </Card>
  );
};

export default ScoreCard;