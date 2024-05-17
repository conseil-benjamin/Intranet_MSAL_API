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

module.exports.getOneApplication = async (req, res) => {
    try {
        const userRole = req.userRole;
        if (userRole !== 'admin') {
            res.status(403).json('Accès non autorisé');
            return;
        }
        const idApplication = req.params.id;
        connection.query('SELECT * FROM applications where id_application = ?', [idApplication], (err, results, fields) => {
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

module.exports.updateApplication = async (req, res) => {
    try {
        const userRole = req.userRole;
        if (userRole !== 'admin') {
            res.status(403).json('Accès non autorisé');
            return;
        }
        const idApplication = req.params.id;
        const urlApplication = req.body.url_application;
        const name = req.body.name;
        const enLigne = req.body.en_ligne;
        const categorie = req.body.categorie;
        const urlIcone = req.body.url_icone;
        connection.query('UPDATE applications set url_application = ?, name = ?, en_ligne = ?, categorie = ?, url_icone = ? WHERE id_application = ?', [urlApplication, name, enLigne, categorie, urlIcone, idApplication], (err, results, fields) => {
            if (err) {
                console.error('Erreur lors de l\'exécution de la requête :', err.stack);
                res.status(500).json('Erreur lors de l\'exécution de la requête');
                return;
            }
            console.log('Résultats de la requête :', results);
            res.json(results);
        });
    } catch (error) {
        console.error('Erreur :', error.message);
        res.status(500).json('Erreur lors de l\'exécution de la requête');
    }
};

module.exports.addApplication = async (req, res) => {
    try {
        const userRole = req.userRole;
        if (userRole !== 'admin') {
            res.status(403).json('Accès non autorisé');
            return;
        }
        const urlApplication = req.body.url_application;
        const name = req.body.name;
        const enLigne = req.body.en_ligne;
        const categorie = req.body.categorie;
        const urlIcone = req.body.url_icone;
        const sql = 'INSERT INTO applications (url_application, name, en_ligne, categorie, url_icone) VALUES (?, ?, ?, ?, ?)';
        connection.query(sql, [urlApplication, name, enLigne, categorie, urlIcone], (err, results, fields) => {
            if (err) {
                console.error('Erreur lors de l\'exécution de la requête :', err.stack);
                res.status(500).json('Erreur lors de l\'exécution de la requête');
                return;
            }
            console.log('Résultats de la requête :', results);
            res.json(results);
        });
    } catch (error) {
        console.error('Erreur :', error.message);
        res.status(500).json('Erreur lors de l\'exécution de la requête');
    }
};

module.exports.deleteApplication = async (req, res) => {
    try {
        const userRole = req.userRole;
        if (userRole !== 'admin') {
            res.status(403).json('Accès non autorisé');
            return;
        }
        const idApplication = req.params.id;
        connection.query('DELETE FROM applications WHERE id_application = ?', [idApplication], (err, results, fields) => {
            if (err) {
                console.error('Erreur lors de l\'exécution de la requête :', err.stack);
                res.status(500).json('Erreur lors de l\'exécution de la requête');
                return;
            }
            console.log('Résultats de la requête :', results);
            res.json(results);
        });
    } catch (error) {
        console.error('Erreur :', error.message);
        res.status(500).json('Erreur lors de l\'exécution de la requête');
    }
};