const jwt = require('jsonwebtoken');

module.exports.login = async (req, res) => {
    try {
        const user = req.body.data;
        console.log('user', user);
        console.log(user[0].username, user[0].email, user[0].role);
        const token = jwt.sign({
            id: user[0].id,
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

module.exports.isAdmin = async (req, res, next) => {
    if (!req.userRole) {
        res.status(401).json('Accès non autorisé. Token invalide.');
        return;
    } else if (req.userRole !== 'admin') {
        res.status(403).json('Accès non autorisé');
        return;
    }
    res.json('Accès autorisé');
};