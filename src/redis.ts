import Redis from 'ioredis';

const connections = {};

/**
 * Create and store a new Redis connection, so one persistent 
 * connection be re-used where needed for each database
 * 
 * @param name - Name of the connection
 * @param host - Host of the Redis database to connect to
 * @returns Created Redis client
 */
const connect = async (name: string, host: string) => {
    if (connections.hasOwnProperty(name)) return connections[name];
        
    connections[name] = new Redis({
        host: host,
        maxRetriesPerRequest: null,
        enableReadyCheck: false,
        db: 0
    });

    return connections[name];
}

/**
 * Get an existing Redis connection
 * 
 * @param name - Name of the connection to retrieve
 * @returns Retrieved Redis client
 */
const getConnection = (name: string) => {
    if (connections.hasOwnProperty(name)) return connections[name];

    return false;
}

export {
    connections,
    connect,
    getConnection,
}