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
        const isValid = false;
        const isNotRedeeemed = true;
        const itemFound = true;
        
        if (isValid && isNotRedeeemed && itemFound)
        {
            res.status(StatusCodes.OK).json({ success: true });
        }
        else if (!isValid)
        {
            res.status(StatusCodes.OK).json({ error: 'wallet-not-valid' });
        }
        else if (!isNotRedeeemed)
        {
            res.status(StatusCodes.OK).json({ error: 'item-already-redeemed' });
        }
        else if (!itemFound)
        {
            res.status(StatusCodes.OK).json({ error: 'item-not-found-in-wallet' });
        }

    }
    async redeem_nft(req: Request, res: Response, next: NextFunction)
    {

    }
}

export default new NFTController();