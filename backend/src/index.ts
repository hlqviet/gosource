import app from '@/app'
import config from '@/config/config'
import logger from '@/config/logger'
import prisma from '@/lib/prisma'

const unexpectedErrorHandler = async (error: Error) => {
  logger.error(error)
  await prisma.$disconnect()
}

process
  .on('uncaughtException', unexpectedErrorHandler)
  .on('unhandledRejection', unexpectedErrorHandler)
  .on('SIGTERM', async () => {
    logger.info('SIGTERM received')
    await prisma.$disconnect()
  })

app.listen(config.port, () => {
  logger.info(`🚀 Server ready at: http://localhost:${config.port}`)
})
