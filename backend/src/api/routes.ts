import { Router } from 'express';
import rescue from 'express-rescue';
import loginController from '../controllers/login.controller';
import nftController from '../controllers/nft.controller';
import authMiddleware from '../middlewares/auth';

const main_router = Router();

main_router.route('/colect-nft').post(nftController.colect_nft);
main_router.route('/login').post(loginController.login);
// authenticated routes
main_router.route('/validate-wallet').post(authMiddleware, rescue(nftController.validate_wallet));
main_router.route('/redeem-nft').post(authMiddleware, rescue(nftController.redeem_nft));

export default main_router;