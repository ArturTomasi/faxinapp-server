class SecurityManager {
    hasPermission(req, res, next) {
        if (req.header('APP_SECRET') === process.env.APP_SECRET) {
            next();
        }
        else {
            res.status('401').json({ message: 'Sem acesso ai API!' });
        }
    }

    checkId(req, res, next) {
        if (req.params.id) {
            next();
        } else {
            res.status(400).json({ message: 'Hey body, you missing one param!' });
        }
    }
}

module.exports = new SecurityManager();