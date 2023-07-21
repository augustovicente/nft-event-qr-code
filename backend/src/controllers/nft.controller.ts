import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import bcrypt from 'bcrypt';
import prisma from '../utils/prisma';
import jwt from '../utils/jwt';

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
        const isValid = true;
        const isNotRedeeemed = true;
        const itemFound = true;
        
        if (isValid && isNotRedeeemed && itemFound)
        {
            res.status(StatusCodes.OK).json({
                success: true,
                data: {
                    item_url: 'https://solanart.io/_next/image?url=https%3A%2F%2Fapi-v2.solanart.io%2Fcdn%2F500%2Fhttps%3A%2F%2Fwww.arweave.net%2FicA7vfsZ9Uhw70qbpkZ2vyrQTyuePW67x-xHOMsWF78%3Fext%3Dpng&w=3840&q=75',
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