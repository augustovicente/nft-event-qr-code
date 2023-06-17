import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import bcrypt from 'bcrypt';
import prisma from '../utils/prisma';
import jwt from '../utils/jwt';

class NFTController
{
    async colect_nft(req: Request, res: Response, next: NextFunction)
    {

    }
    async validate_wallet(req: Request, res: Response, next: NextFunction)
    {

    }
    async redeem_nft(req: Request, res: Response, next: NextFunction)
    {

    }
}

export default new NFTController();