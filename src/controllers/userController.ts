import { Request, Response } from "express";
import UserService from '../services/userService';

const catcher = func => async (req, res, next) => {
	try {
		return await func(req, res, next);
	} catch(err) {
        console.log(err);
		next(err);
	}
}

export default class UserController {
    protected service: UserService;

    constructor() {
        this.service = new UserService();

        this.create = catcher(this.create.bind(this));
        this.update = catcher(this.update.bind(this));
        this.get = catcher(this.get.bind(this));
        this.getOne = catcher(this.getOne.bind(this));
        this.delete = catcher(this.delete.bind(this));
    }

    async create(req: Request, res: Response, next: Function) {
        const result = await this.service.create(req.body);
    
        res.status(200).json(result);
    }

    async update(req: Request, res: Response, next: Function) {
        const result = await this.service.update(req.params.id, req.body);

        res.status(200).json(result);
    }

    async get(req: Request, res: Response, next: Function) {
        const result = await this.service.get();

        res.status(200).json(result);
    }

    async getOne(req: Request, res: Response, next: Function) {
        const result = await this.service.getOne(req.params.id);

        res.status(200).json(result);
    }

    async delete(req: Request, res: Response, next: Function) {
        const result = await this.service.delete(req.params.id);

        res.status(200).json(result);
    }
}