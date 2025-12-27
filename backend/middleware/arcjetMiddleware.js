import aj from "../config/arcjet.js";

const arcjetMiddleware = async (req, res, next) => {
    try {
        // 🔑 Render / Proxy safe IP extraction
        const clientIp =
            req.headers["x-forwarded-for"]?.split(",")[0] ||
            req.socket?.remoteAddress ||
            "127.0.0.1";

        const decision = await aj.protect(req, {
            ip: clientIp, // 👈 IMPORTANT
        });

        if (decision.isDenied()) {
            return res.status(403).json({
                success: false,
                message: "Request blocked by ArcJet",
            });
        }

        next();
    } catch (err) {
        console.error("ArcJet error:", err);
        next(); // fail-open
    }
};

export default arcjetMiddleware;
