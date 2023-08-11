import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import prisma from '../utils/prisma';
import { collect_nft, redeem_nft, validate_collect, validate_wallet } from '../utils/Web3Service';
import crypto from "node:crypto";
global.crypto ??= crypto as any;

class NFTController
{
    async colect_nft(req: Request, res: Response, next: NextFunction)
    {
        let hasItem = true;
        let isNotCollected = true;

        const { wallet, nft_id } = req.body;
        let collect;
        try
        {
            collect = await validate_collect(wallet, nft_id);
        }
        catch (error)
        {
            console.log(error);
            res.status(StatusCodes.OK).json({ error: 'validate-failed' });
            return;
        }

        if (collect === 'already-collected')
        {
            isNotCollected = false;
        }
        else if (collect === 'has-item')
        {
            hasItem = false;
        }
        
        if (hasItem && isNotCollected)
        {
            try
            {
                await collect_nft(wallet, nft_id);
            }
            catch (error)
            {
                console.log(error);
                res.status(StatusCodes.OK).json({ error: 'collect-failed' });   
                return;
            }
            res.status(StatusCodes.OK).json({ success: true });
            return;
        }
        else if (!hasItem)
        {
            res.status(StatusCodes.OK).json({ error: 'item-sold-out' });
            return;
        }
        else if (!isNotCollected)
        {
            res.status(StatusCodes.OK).json({ error: 'item-already-collected' });
            return;
        }
    }
    async validate_wallet(req: Request, res: Response, next: NextFunction)
    {
        let isValid = true;
        let isNotRedeeemed = true;
        let itemFound = true;

        const { wallet } = req.body;
        let user_data;
        try
        {
            user_data = await prisma.user.findUnique({
                where: {
                    id: res.locals.payload.id,
                },
                select: {
                    nftId: true,
                }
            });
        }
        catch (error)
        {
            res.status(StatusCodes.OK).json({ error: 'user-not-found' });
        }

        const nftId = user_data?.nftId || 1;
        
        // check if wallet is valid
        if(wallet.length < 42 || wallet.length > 42)
        {
            isValid = false;
        }
        let validate;
        try
        {
            validate = await validate_wallet(wallet, nftId);
        }
        catch (error)
        {
            res.status(StatusCodes.OK).json({ error: 'validate-failed' });
        }

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
                    item_id: nftId,
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
        const { wallet } = req.body;
        let user_data;
        try
        {
            user_data = await prisma.user.findUnique({
                where: {
                    id: res.locals.payload.id,
                },
                select: {
                    nftId: true,
                }
            });
        }
        catch (error)
        {
            res.status(StatusCodes.OK).json({ error: 'user-not-found' });
        }

        const nftId = user_data?.nftId || 1;
        
        try
        {
            await redeem_nft(wallet, nftId);
        }
        catch (error)
        {
            res.status(StatusCodes.OK).json({ error: 'redeem-failed' });
        }
        res.status(StatusCodes.OK).json({ success: true });
    }
}

export default new NFTController();