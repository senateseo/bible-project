import {Router} from 'express';

import BibleController from "../controllers/bible";

class BibleRoutes {
    router = Router();
    controller = new BibleController();

    constructor(){
        this.initializeRoutes();
    }

    initializeRoutes(){
        this.router.get("/", this.controller.getPhrase);
    }
}

export default new BibleRoutes().router;