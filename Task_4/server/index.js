const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// ── Connect to MongoDB ──
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.error("MongoDB connection error:", err));

// ── Schema & Model ──
const timeEntrySchema = new mongoose.Schema({
  domain: { type: String, required: true },
  timeSpent: { type: Number, required: true }, // in seconds
  category: {
    type: String,
    enum: ["productive", "unproductive", "neutral"],
    default: "neutral",
  },
  date: { type: String, required: true }, // YYYY-MM-DD format
  createdAt: { type: Date, default: Date.now },
});

const TimeEntry = mongoose.model("TimeEntry", timeEntrySchema);

// ── Productive/Unproductive Classification ──
const PRODUCTIVE_SITES = [
  "github.com",
  "stackoverflow.com",
  "developer.mozilla.org",
  "leetcode.com",
  "hackerrank.com",
  "codepen.io",
  "vercel.com",
  "netlify.com",
  "npmjs.com",
  "docs.google.com",
  "notion.so",
  "linear.app",
  "figma.com",
  "medium.com",
  "dev.to",
  "freecodecamp.org",
  "udemy.com",
  "coursera.org",
];

const UNPRODUCTIVE_SITES = [
  "youtube.com",
  "twitter.com",
  "x.com",
  "instagram.com",
  "facebook.com",
  "reddit.com",
  "netflix.com",
  "tiktok.com",
  "snapchat.com",
  "twitch.tv",
  "discord.com",
];

const classifySite = (domain) => {
  const cleanDomain = domain.replace("www.", "");
  if (PRODUCTIVE_SITES.some((s) => cleanDomain.includes(s)))
    return "productive";
  if (UNPRODUCTIVE_SITES.some((s) => cleanDomain.includes(s)))
    return "unproductive";
  return "neutral";
};

// ── API Routes ──

// Save time entry from extension
app.post("/api/track", async (req, res) => {
  try {
    const { domain, timeSpent, date } = req.body;
    const category = classifySite(domain);

    // Check if entry exists for this domain and date
    const existing = await TimeEntry.findOne({ domain, date });

    if (existing) {
      existing.timeSpent += timeSpent;
      await existing.save();
      return res.json(existing);
    }

    const entry = await TimeEntry.create({
      domain,
      timeSpent,
      category,
      date,
    });

    res.json(entry);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all entries for dashboard
app.get("/api/stats", async (req, res) => {
  try {
    const { days = 7 } = req.query;
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - parseInt(days));
    const startDateStr = startDate.toISOString().split("T")[0];

    const entries = await TimeEntry.find({
      date: { $gte: startDateStr },
    }).sort({ date: -1 });

    res.json(entries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get weekly report
app.get("/api/report", async (req, res) => {
  try {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const startDateStr = sevenDaysAgo.toISOString().split("T")[0];

    const entries = await TimeEntry.find({
      date: { $gte: startDateStr },
    });

    // Aggregate by category
    const summary = { productive: 0, unproductive: 0, neutral: 0 };
    const byDomain = {};

    entries.forEach((entry) => {
      summary[entry.category] += entry.timeSpent;
      if (!byDomain[entry.domain]) {
        byDomain[entry.domain] = {
          timeSpent: 0,
          category: entry.category,
        };
      }
      byDomain[entry.domain].timeSpent += entry.timeSpent;
    });

    const totalTime = summary.productive + summary.unproductive + summary.neutral;
    const productivityScore =
      totalTime > 0 ? Math.round((summary.productive / totalTime) * 100) : 0;

    res.json({
      summary,
      byDomain,
      productivityScore,
      totalTime,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});