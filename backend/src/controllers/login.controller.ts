import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import bcrypt from 'bcrypt';
import prisma from '../utils/prisma';
import jwt from '../utils/jwt';

class LoginController
{
    async login(req: Request, res: Response, next: NextFunction)
    {
        const { email, password } = req.body;

        if (!email || !password) {
            return next({
                status: StatusCodes.BAD_REQUEST,
                message: 'Há campos obrigatórios faltando',
            });
        }

        const user = await prisma.user.findUnique({ where: { email } });

        if (!user)
        {
            return next({
                status: StatusCodes.UNAUTHORIZED,
                message: 'Email ou senha inválidos',
            });
        }

        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword)
        {
            return next({
                status: StatusCodes.UNAUTHORIZED,
                message: 'Email ou senha inválidos',
            });
        }

        const token = jwt.sign({ id: user.id, email: user.email });

        res.status(StatusCodes.OK).json({ user, token });
    }
}

export default new LoginController();