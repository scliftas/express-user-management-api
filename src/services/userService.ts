import * as Redis from '../redis';
import User from '../types/user';

export default class UserService {
    protected redis;

    constructor() {
        this.redis = Redis.getConnection('cache');
    }

    /**
     * Create a new user
     * 
     * @param data - User data to store
     * @returns The created user object
     */
    async create(data: User): Promise<User> {
        const id = await this.generateID();

        await this.save(id, data);
        await this.redis.set('key', id);

        data.id = id;

        return data;
    }

    /**
     * Update an existing user
     * 
     * @param id - ID of the user to update
     * @param data - Data to update the user with
     * @returns The updated user object
     */
    async update(id: number, data: User): Promise<User> {
        try {
            await this.save(id, data);

            data.id = id;

            return data;
        } catch (err) {
            throw new Error('User could not be updated!');
        }
        
    }

    /**
     * Get all existing users
     * 
     * @returns An array of all existing users
     */
    async get(): Promise<User[]> {
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

    /**
     * Get an existing user
     * 
     * @param id - ID of the user to retrieve
     * @returns The retrieved user object
     */
    async getOne(id: string): Promise<User> {
        try {
            let result = await this.redis.get(id);

            result = <User> JSON.parse(result);

            result.id = id;

            return result;
        } catch (err) {
            throw new Error('User could not be found!');
        }
    }

    /**
     * Delete an existing user
     * 
     * @param id - ID of the user to delete
     * @returns Result of the deletion (successful/unsuccessful)
     */
    async delete(id: string): Promise<boolean> {
        try {
            const result = await this.redis.del(id);

            return !!result;
        } catch (err) {
            throw new Error('User could not be deleted!');
        }
    }

    /**
     * Save the given data to Redis
     * 
     * @param id - ID to use as the key
     * @param user - User data to store
     * @returns Result of the operation (successful/unsuccessful)
     */
    async save(id: number, user: User): Promise<boolean> {
        return await this.redis.set(id, JSON.stringify(user));
    }

    /**
     * Generate a unique incremental ID
     * 
     * @returns Unique ID to use
     */
    async generateID(): Promise<number> {
        let key = await this.redis.get('key');

        if (key === null) return 1;

        return ++key;
    }
}