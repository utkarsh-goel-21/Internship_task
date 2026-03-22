import { useState, useEffect } from "react";
import { getStats, getReport } from "../services/api";

const useStats = (days = 7) => {
  const [stats, setStats] = useState([]);
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [statsData, reportData] = await Promise.all([
          getStats(days),
          getReport(),
        ]);
        setStats(statsData);
        setReport(reportData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [days]);

  return { stats, report, loading, error };
};

export default useStats;