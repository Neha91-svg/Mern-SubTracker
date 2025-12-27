import aj from "../config/arcjet.js";
import { isSpoofedBot } from "@arcjet/inspect";

const arcjetMiddleware = async (req, res, next) => {

    // ✅ 1️⃣ DEV MODE → Arcjet completely skip
    if (process.env.NODE_ENV === "development") {
        return next();
    }

    // ✅ 2️⃣ Workflow routes → Arcjet skip
    if (req.originalUrl.startsWith("/api/workflows")) {
        return next();
    }

    try {
        const decision = await aj.protect(req);

        // ❌ Blocked requests
        if (decision.isDenied()) {
            if (decision.reason.isRateLimit()) {
                return res.status(429).json({
                    success: false,
                    message: "Too Many Requests",
                });
            }

            if (decision.reason.isBot()) {
                return res.status(403).json({
                    success: false,
                    message: "Bots not allowed",
                });
            }

            return res.status(403).json({
                success: false,
                message: "Forbidden",
            });
        }

        // ❌ Extra bot / hosting checks (prod only)
        if (
            decision.ip?.isHosting?.() ||
            decision.results?.some(isSpoofedBot)
        ) {
            return res.status(403).json({
                success: false,
                message: "Forbidden",
            });
        }

        next();
    } catch (error) {
        console.error("Arcjet error:", error);

        // ✅ FAIL-OPEN (very important)
        next();
    }
};

export default arcjetMiddleware;
