import bcrypt from 'bcrypt'

export const hashPassword = async (password): Promise<any> => {
  const salt = await bcrypt.genSaltSync(10)
  return await bcrypt.hashSync(password, salt)
}

export const verifyPassword = async (
  password,
  hashedPassword
): Promise<any> => {
  return await bcrypt.compare(password, hashedPassword)
}
