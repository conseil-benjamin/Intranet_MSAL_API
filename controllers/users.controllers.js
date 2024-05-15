const connection = require('../config/db');

module.exports.getUsers = async (req, res) => {
    try {
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

module.exports.getUserByEmail = async (req, res) => {
    try {
      const email = req.params.email;
        connection.query('SELECT * FROM users WHERE email = ?',[email], (err, results, fields) => {
            if (err) {
                console.error('Erreur lors de l\'exécution de la requête :', err.stack);
                res.status(500).json('Erreur lors de l\'exécution de la requête');
                return;
            }
            if (results.length === 0) {
                res.status(404).json('Utilisateur non trouvé');
                return;
            }
            console.log('Résultats de la requête :', results);
            res.json(results);
        });
    } catch (error) {
        console.error('Erreur lors de l\'exécution de la requête :', error.message);
        res.status(500).send('Erreur lors de l\'exécution de la requête');
    }
};

module.exports.createAnewUser = async (req, res) => {
    try {
      const email = req.body.email;
      const role = req.body.role;
      const username = req.body.username;
      const sql = 'INSERT INTO users (username, email, role) VALUES (?, ?, ?)';
        connection.query(sql, [username, email, role], (err, results, fields) => {
            if (err) {
                console.error('Erreur lors de l\'exécution de la requête :', err.stack);
                res.status(500).json('Erreur lors de l\'exécution de la requête');
                return;
            }
            if (results.length === 0) {
                res.status(404).json('Utilisateur non créé');
                return;
            }
            const createdUser = {
                id: results.insertId,
                username: username,
                email: email,
                role: role
            };
            res.json([createdUser]);
        });
    } catch (error) {
        console.error('Erreur lors de l\'exécution de la requête :', error.message);
        res.status(500).json('Erreur lors de l\'exécution de la requête');
    }
};