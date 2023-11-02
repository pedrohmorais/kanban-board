import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'

dotenv.config()

const { MYSQL_HOST, MYSQL_PORT, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE } =
  process.env

if (
  !MYSQL_HOST ||
  !MYSQL_USER ||
  !MYSQL_PASSWORD ||
  !MYSQL_DATABASE ||
  !MYSQL_PORT
) {
  throw new Error(
    'As variáveis de ambiente do banco de dados não foram configuradas corretamente.',
  )
}

const sequelize = new Sequelize(MYSQL_DATABASE, MYSQL_USER, MYSQL_PASSWORD, {
  host: MYSQL_HOST,
  dialect: 'mysql',
  port: Number(MYSQL_PORT),
  logging: false, // Defina como true para ver as consultas SQL no console
})

export default sequelize
