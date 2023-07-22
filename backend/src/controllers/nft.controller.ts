import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import bcrypt from 'bcrypt';
import prisma from '../utils/prisma';
import jwt from '../utils/jwt';
import { validate_wallet } from '../utils/Web3Service';

class NFTController
{
    async colect_nft(req: Request, res: Response, next: NextFunction)
    {
        const hasItem = true;
        const isNotCollected = true;
        
        if (hasItem && isNotCollected)
        {
            res.status(StatusCodes.OK).json({ success: true });
        }
        else if (!hasItem)
        {
            res.status(StatusCodes.OK).json({ error: 'item-sold-out' });
        }
        else if (!isNotCollected)
        {
            res.status(StatusCodes.OK).json({ error: 'item-already-collected' });
        }
    }
    async validate_wallet(req: Request, res: Response, next: NextFunction)
    {
        let isValid = true;
        let isNotRedeeemed = true;
        let itemFound = true;
        const { wallet } = req.body;

        // TODO: get nft_id from user
        const user_data = await prisma.user.findUnique({
            where: {
                id: res.locals.payload.id,
            },
            select: {
                nftId: true,
            }
        });
        const nftId = user_data?.nftId || 1;
        
        // check if wallet is valid
        if(wallet.length < 42 || wallet.length > 42)
        {
            isValid = false;
        }
        const validate = await validate_wallet(wallet, nftId);
        if (validate === 'not-found')
        {
            itemFound = false;
        }
        else if (validate === 'already-redeemed')
        {
            isNotRedeeemed = false;
        }

        if (isValid && isNotRedeeemed && itemFound)
        {
            res.status(StatusCodes.OK).json({
                success: true,
                data: {
                    item_id: '1',
                }
            });
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
        res.status(StatusCodes.OK).json({ success: true });
    }
}

export default new NFTController();