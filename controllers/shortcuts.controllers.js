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