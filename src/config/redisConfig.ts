import redis from 'redis'
import CONFIG from './configs'
// import { promisifyAll } from 'bluebird'
const options: any = {
  host: CONFIG.REDIS.host,
  port: CONFIG.REDIS.port,
  password: CONFIG.REDIS.password,
  detect_buffers: true,
  retry_strategy: (options: any) => {
    if (options.error && options.error.code === 'ECONNREFUSED') {
      // End reconnecting on a specific error and flush all commands with
      // a individual error
      return new Error('The server refused the connection');
    }
    if (options.total_retry_time > 1000 * 60 * 60) {
      // End reconnecting after a specific timeout and flush all commands
      // with a individual error
      return new Error('Retry time exhausted');
    }
    if (options.attempt > 10) {
      // End reconnecting with built in error
      return undefined;
    }
    // reconnect after
    return Math.min(options.attempt * 100, 3000);
  }
}

const client = redis.createClient(options)
// const client = promisifyAll(redis.createClient(options))

const setValue = (key: string, value: any, time?: number) => {
  if (typeof value === 'undefined' || value === null || value === '') {
    return
  }
  if (typeof value === 'string') {
    if (time) {
      client.set(key, value, 'EX', time)
    } else {
      client.set(key, value)
    }
  } else if (typeof value === 'object') {
    Object.keys(value).forEach(item => {
      client.hset(key, item, value[item], redis.print)
    })
  }
}

import { promisify } from 'util'
const getAsync = promisify(client.get).bind(client)

const getValue = (key: string) => {
  return getAsync(key)
}

export {
  client,
  setValue,
  getValue
}