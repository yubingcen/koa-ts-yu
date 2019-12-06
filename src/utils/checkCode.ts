import { getValue } from '../config/redisConfig'
const checkCode = async (key: string, value: string) => {
  const data = await getValue(key)
  console.log(data, key, value)
  if (data !== null) {
    if (data.toLowerCase() === value.toLowerCase()) {
      return true
    } else {
      return false
    }
  } else {
    return false
  }
}

export default checkCode