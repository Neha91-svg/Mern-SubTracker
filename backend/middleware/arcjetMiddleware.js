import aj from "../config/arcjet.js";

const arcjetMiddleware = async (req, res, next) => {
    try {
        const decision = await aj.protect(req, {
            // 🔑 THIS IS THE KEY FIX
            ip: req.ip || req.headers["x-forwarded-for"]?.split(",")[0],
        });

        if (decision.isDenied()) {
            return res.status(403).json({
                success: false,
                message: "Request blocked by ArcJet",
                reason: decision.reason,
            });
        }

        next();
    } catch (err) {
        console.error("ArcJet error:", err);
        next();
    }
};

export default arcjetMiddleware;
