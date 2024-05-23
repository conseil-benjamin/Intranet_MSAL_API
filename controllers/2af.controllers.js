const speakeasy = require('speakeasy');
const QRCode = require('qrcode');
const connection = require('../config/db');

module.exports.enable2af = async (req, res) => {
    try {
        const userId = req.userId;
        const secret = speakeasy.generateSecret({ length: 20 });
        const secretBase32 = secret.base32;
        const a2f_activate = true;

        const otpauth_url = speakeasy.otpauthURL({ secret: secretBase32, label: 'Servagroupe Intranet'});

        connection.query('UPDATE users set a2f_activate = ?, token_secret_a2f = ? WHERE id = ?',[a2f_activate, secretBase32, userId], (err, results, fields) => {
            if (err) {
                console.error('Erreur lors de l\'exécution de la requête :', err.stack);
                res.status(500).json('Erreur lors de l\'exécution de la requête');
                return;
            }
        });

        QRCode.toDataURL(secret.otpauth_url, (err, data_url) => {
            if (err) {
                console.error('Erreur lors de la génération du QR code :', err.stack);
                res.status(500).json('Erreur lors de la génération du QR code');
                return;
            }
            console.log('QR code généré');
            res.json({ secret: secretBase32, data_url: data_url });
        });
        
    } catch (error) {
        console.error('Erreur lors de l\'exécution de la requête :', error.message);
        res.status(500).json('Erreur lors de l\'exécution de la requête');
    }
};

module.exports.verify2afActive = async (req, res) => {
    try {
        const userId = req.userId;
        const a2f_activate = true;
        connection.query('SELECT * FROM users WHERE id = ? AND a2f_activate = ?',[userId, a2f_activate], (err, results, fields) => {
            if (err) {
                console.error('Erreur lors de l\'exécution de la requête :', err.stack);
                res.status(500).json('Erreur lors de l\'exécution de la requête');
                return;
            } else if (results.length === 0) {
                res.status(407).json('2AF non activée pour cet utilisateur');
                return;
            }
            console.log('Résultats de la requête :', results);
            res.status(200).json(results);
        });
    } catch (error) {
        console.error('Erreur lors de l\'exécution de la requête :', error.message);
        res.status(500).json('Erreur lors de l\'exécution de la requête');
    }
};


module.exports.verifyOTPcode = async (req, res) => {
    try {
        const userId = req.userId;
        const OTPcode = req.body.otp;
         connection.query('SELECT * FROM users WHERE id = ?',[userId], (err, results, fields) => {
            if (err) {
                console.error('Erreur lors de l\'exécution de la requête :', err.stack);
                res.status(500).json('Erreur lors de l\'exécution de la requête');
                return;
            } else if (results.length === 0) {
                res.status(407).json('2AF non activée pour cet utilisateur');
                return;
            }
            console.log(results[0].token_secret_a2f);
            
            const verified = speakeasy.totp.verify({
                secret: results[0].token_secret_a2f,
                encoding: 'base32',
                token: OTPcode
            });
            console.log(verified);
            console.log(OTPcode);

            if (verified) {
            res.status(200).json('Code OTP valide');
            } else {
            res.status(409).json('Code OTP invalide');
            }
        });

    } catch (error) {
        console.error('Erreur lors de l\'exécution de la requête :', error.message);
        res.status(500).json('Erreur lors de l\'exécution de la requête');
    }
};