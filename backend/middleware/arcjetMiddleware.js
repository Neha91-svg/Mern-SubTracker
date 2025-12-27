import aj from "../config/arcjet.js";

const arcjetMiddleware = async (req, res, next) => {
  try {
    // ❌ DO NOT pass ip manually
    const decision = await aj.protect(req);

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
