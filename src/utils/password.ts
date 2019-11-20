// https://www.npmjs.com/package/Bcrypt
import Bcrypt from 'bcrypt'

const encrypt = async (password: string, saltTimes: number) => {
  const hash = await Bcrypt.hash(password, saltTimes)
  return hash
};

const validate = async (password: string, hash: string) => {
  const match = await Bcrypt.compare(password, hash)
  return match;
};

export { encrypt, validate }
