import jwt from 'jsonwebtoken';

import auth from '../../config/auth';

import { promisify } from 'util';

export default async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ error: 'Token não foi enviado!'});
    }

    const [, token ] = authHeader.split(' ');

    try {
        const decoded = await promisify(jwt.verify)(token, auth.secret);
        
        req.userId = decoded.id;

        return next();

    } catch (err) {
        return res.status(401).json({ error: 'Token inválido!'});
    }

    return next();

}