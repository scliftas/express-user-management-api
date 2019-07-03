import { Request, Response } from "express";
import UserService from '../services/userService';

export default class JobController {
    protected service: UserService;

    constructor() {
        this.service = new UserService();

        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.get = this.get.bind(this);
        this.delete = this.delete.bind(this);
    }

    async create(req: Request, res: Response) {
        const job = await this.service.create(req.body);
    
        res.status(200).json(job);
    }

    async update(req: Request, res: Response) {
        const job = await this.service.update(req.params.id, req.body);

        res.status(200).json(job);
    }

    async get(req: Request, res: Response) {
        const job = await this.service.get(req.params.id);

        res.status(200).json(job);
    }

    async delete(req: Request, res: Response) {
        const result = await this.service.delete(req.params.id);

        res.status(200).json(result);
    }
}