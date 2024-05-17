const connection = require("../config/db");

module.exports.getAllShortcutsForOneUser = async (req, res) => {
    try {
        const userId = req.userId;
        connection.query('SELECT * FROM raccourcis WHERE id_user = ?',[userId], (err, results, fields) => {
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

module.exports.addShortcutForOneUser = async (req, res) => {
    try {
        const userId = req.userId;
        const name = req.body.name;
        const url = req.body.url;
        const img = req.body.img;
        const sql = 'INSERT INTO raccourcis (id_user, name, url_raccourci, img) VALUES (?, ?, ?, ?)';
        connection.query(sql, [userId, name, url, img], (err, results, fields) => {
            if (err) {
                console.error('Erreur lors de l\'exécution de la requête :', err.stack);
                res.status(500).json('Erreur lors de l\'exécution de la requête');
                return;
            }
            if (results.length === 0) {
                res.status(404).json('Shortcut non créé');
                return;
            }
            res.json(200);
        });
    } catch (error) {
        console.error('Erreur lors de l\'exécution de la requête :', error.message);
        res.status(500).json('Erreur lors de l\'exécution de la requête');
    }
};

module.exports.updateShortcutForOneUser = async (req, res) => {
    try {
        const userId = req.userId;
        const idShortcut = req.params.id;
        const urlShortcut = req.body.url;
        const name = req.body.name;
        const img = req.body.img;
        connection.query('UPDATE shortcuts set url_raccourci = ?, name = ?, img = ?, WHERE id_raccourci = ?', [urlShortcut, name, img, idShortcut], (err, results, fields) => {
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

module.exports.getOneShortcut = async (req, res) => {
    try {
        const raccourciId = req.params.id;
        connection.query('SELECT * FROM raccourcis WHERE id_raccourci = ?',[raccourciId], (err, results, fields) => {
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

module.exports.deleteShortcut = async (req, res) => {
    try {
        const raccourciId = req.params.id;
        const raccourciUser = req.params.userId;
        const userId = req.userId;
        console.log('userId', userId);
        console.log('raccourciUser', raccourciUser);
        if (userId != raccourciUser) {
            res.status(403).json('Accès non autorisé');
            return;
        }
        connection.query('DELETE FROM raccourcis WHERE id_raccourci = ?',[raccourciId], (err, results, fields) => {
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