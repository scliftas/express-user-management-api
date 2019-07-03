import * as Redis from '../redis';

export default class UserService {
    protected redis;

    constructor() {
        this.redis = Redis.getConnection('cache');
    }

    async create(data: any) {
        const id = await this.generateID();

        const result = await this.redis.set(id, {
            test: 'test',
        });

        await this.redis.set('key', id);

        return result;
    }

    async update(id: string, data: object) {

    }

    async get(id: string) {

    }

    async delete(id: string) {

    }

    async generateID() {
        let key = await this.redis.get('key');

        if (key === null) return 1;

        return ++key;
    }
}