import { cleanEnv, makeValidator } from 'envalid'

const notEmpty = makeValidator((input) => {
  if (typeof input !== 'string' || input.trim() === '') {
    throw new Error('La variable doit être une chaîne de caractères non vide')
  }
  return input
})
export default cleanEnv(process.env, {
    FRONT_URL: notEmpty(),
    MONGO_URI:notEmpty(),
    SESSION_SECRET: notEmpty(),
})