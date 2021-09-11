import { config } from '../config'
import { createBlackList, BlackList, STORE_TYPE } from 'jwt-blacklist'
import { Connection, createConnection } from 'mongoose'

/**
 * Connects to a Mongoose connected database
 *
 * @param  {string} url the database connection url
 * @returns {Promise<Connection>} the database connection object
 */
export async function setupConnection(url: string): Promise<Connection> {
  return createConnection(url)
}

/**
 * Connects to the redis based blacklist
 *
 * @returns {Promise<BlackList>} Promise
 */
export async function blacklistConnection(): Promise<BlackList> {
    return createBlackList({
        daySize: 10000,
        errorRate: 0.001,
        storeType: STORE_TYPE.REDIS,
        redisOptions: {
            host: config.redis.host,
            port: config.redis.port,
            key: config.redis.blacklistKeyName,
        },
    })
}
