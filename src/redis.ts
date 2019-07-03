import Redis from 'ioredis';

const connections = {};

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

const getConnection = (name: string) => {
    if (connections.hasOwnProperty(name)) return connections[name];

    return false;
}

export {
    connections,
    connect,
    getConnection,
}