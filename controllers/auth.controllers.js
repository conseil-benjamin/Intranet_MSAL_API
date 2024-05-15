const jwt = require('jsonwebtoken');

module.exports.login = async (req, res) => {
    try {
        const user = req.body.data;
        console.log('user', user);
        console.log(user[0].username, user[0].email, user[0].role);
        const token = jwt.sign({
            username: user[0].username,
            email: user[0].email,
            role: user[0].role, 
        }, process.env.TOKEN_SECRET_JWT);
        res.json({ token });
    } catch (error) {
        console.error('Erreur lors de l\'exécution de la requête :', error.message);
        res.status(500).json('Erreur lors de l\'exécution de la requête');
    }
};

module.exports.checkJwtToken = async (req, res, next) => {
try {
  const token = req.header("Authorization").replace("Bearer ", "");

if (!token) {
    return res
      .status(401)
      .json({ message: "Accès non autorisé. Token manquant." });
  }

    try {
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET_JWT); 
            if (!decoded) {
               return res.status(401).json({ message: "Accès non autorisé. Token invalide." });
            }
            next();
        } catch (error) {
            console.error("Erreur de vérification du token:", error);
            return res
            .status(401)
            .json({ message: "Accès non autorisé. Token invalide." });
            }
} catch (error) {
    console.error('Erreur lors de l\'exécution de la requête :', error.message);
    res.status(500).json('Erreur lors de l\'exécution de la requête');
}
};