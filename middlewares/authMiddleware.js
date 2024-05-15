const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization").replace("Bearer ", "");
  console.log("Token:", token);
  if (!token) {
    return res
      .status(401)
      .json({ message: "Accès non autorisé. Token manquant." });
  }

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET_JWT);
    if (!decoded) {
      return res
        .status(401)
        .json({ message: "Accès non autorisé. Token invalide." });
    }
    console.log("decoded:", decoded);
    console.log("decoded.role:", decoded.role);
    req.userRole = decoded.role;
    next();
  } catch (error) {

    console.error("Erreur de vérification du token:", error);
    return res
      .status(401)
      .json({ message: "Accès non autorisé. Token invalide." });
  }
};

module.exports = authMiddleware;