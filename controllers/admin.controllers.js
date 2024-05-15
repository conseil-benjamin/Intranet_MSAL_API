const connection = require('../config/db');

module.exports.getAllUsers = async (req, res) => {
    try {
        const userRole = req.userRole;
        if (userRole !== 'admin') {
            res.status(403).json('Accès non autorisé');
            return;
        }
        connection.query('SELECT * FROM users', (err, results, fields) => {
            if (err) {
                console.error('Erreur lors de l\'exécution de la requête :', err.stack);
                res.status(500).json('Erreur lors de l\'exécution de la requête');
                return;
            }
            console.log('Résultats de la requête :', results);
            res.json(results);
        });
    } catch (error) {
        console.error('Erreur lors de l\'exécution de la requête :', error.message);
        res.status(500).json('Erreur lors de l\'exécution de la requête');
    }
};