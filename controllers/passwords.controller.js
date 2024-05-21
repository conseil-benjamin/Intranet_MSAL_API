const CryptoJS = require('crypto-js');
const connection = require('../config/db');

module.exports.addPassword = async (req, res) => {
    try {
        const userId = req.userId;
        const password = req.body.password;
        const site = req.body.site;
        const login = req.body.login;
        const folder = req.body.folder;
        const cryptedPassword = CryptoJS.AES.encrypt(password, process.env.CRYPTO_KEY).toString();
        connection.query('INSERT INTO passwords (id_user ,password, login, site, folder) VALUES (?, ?, ?, ?, ?) ',[ userId, cryptedPassword, login, site, folder], (err, results, fields) => {
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


module.exports.getAllPasswords = async (req, res) => {
    try {
        const userId = req.userId;
        connection.query('SELECT * FROM passwords WHERE id_user = ?',[userId], (err, results, fields) => {
            if (err) {
                console.error('Erreur lors de l\'exécution de la requête :', err.stack);
                res.status(500).json('Erreur lors de l\'exécution de la requête');
                return;
            }
            console.log('Résultats de la requête :', results);
            for (let i = 0; i < results.length; i++) {
                let password = results[i].password
                results[i].password = CryptoJS.AES.decrypt(password, process.env.CRYPTO_KEY).toString(CryptoJS.enc.Utf8);
            }
            res.json(results);
        });
    } catch (error) {
        console.error('Erreur lors de l\'exécution de la requête :', error.message);
        res.status(500).json('Erreur lors de l\'exécution de la requête');
    }
};

module.exports.updatePassword = async (req, res) => {
    try {
        const userId = req.userId;
        const password = req.body.password;
        const site = req.body.site;
        const login = req.body.login;
        const folder = req.body.folder;
        // TODO : Vérifier si le mot de passe est le même qu'en bdd 
        connection.query('UPDATE passwords set password = ?, login = ?, site = ?, folder = ?', [password, site, login, folder], (err, results, fields) => {
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

module.exports.deletePassword = async (req, res) => {
    try {
        const userId = req.userId;
        const idPassword = req.params.id;
        connection.query('DELETE FROM passwords WHERE id_password = ? AND id_user = ?', [idPassword, userId], (err, results, fields) => {
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