import * as Redis from '../redis';

export default class UserService {
    protected redis;

    constructor() {
        this.redis = Redis.getConnection('cache');
    }

    async create(data: any): Promise<Object> {
        const id = await this.generateID();

        await this.redis.set(id, JSON.stringify(data));
        await this.redis.set('key', id);

        data.id = id;

        return data;
    }

    async update(id: string, data: any): Promise<Object> {
        try {
            await this.redis.set(id, JSON.stringify(data));

            data.id = id;

            return data;
        } catch (err) {
            throw new Error('User could not be updated!');
        }
        
    }

    async get() {
        try {
            let result = await this.redis.keys('*');

            result = result
                .filter(key => key !== 'key')
                .map(async (key) => {
                    let user = await this.getOne(key);

                    user.id = key;

                    return user;
                });

            return await Promise.all(result);
        } catch (err) {
            throw new Error('Users could not be found!');
        }
    }

    async getOne(id: string): Promise<any> {
        try {
            let result = await this.redis.get(id);

            result = JSON.parse(result);

            result.id = id;

            return result;
        } catch (err) {
            throw new Error('User could not be found!');
        }
    }

    async delete(id: string): Promise<boolean> {
        try {
            const result = await this.redis.del(id);

            return !!result;
        } catch (err) {
            throw new Error('User could not be deleted!');
        }
    }

    async generateID(): Promise<Number> {
        let key = await this.redis.get('key');

        if (key === null) return 1;

        return ++key;
    }
}