import express from "express";
import qstashClient from "../config/upstash.js";

const router = express.Router();

/**
 * 👉 Ye route tum subscription create hone ke baad call karogi
 * 👉 Ye hi QStash ko job schedule karega
 */
router.post("/subscription-reminder", async (req, res) => {
    const { subscription } = req.body;

    console.log("🟡 Reminder request received");
    console.log("📦 Subscription:", subscription);

    if (!subscription) {
        console.log("❌ Subscription missing");
        return res.status(400).json({ success: false });
    }

    try {
        const response = await qstashClient.publishJSON({
            url: `${process.env.BASE_URL}/api/workflows/subscription-reminder`,
            body: { subscription },
            delay: "10s", // test ke liye
        });

        console.log("🟢 QStash scheduled:", response.messageId);

        res.json({
            success: true,
            message: "Reminder scheduled",
            qstashId: response.messageId,
        });
    } catch (err) {
        console.error("❌ QStash publish error:", err);
        res.status(500).json({ success: false });
    }
});

export default router;
