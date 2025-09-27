import { getDatabaseStatus } from "infra/pool.js"

async function status (request, response) {
  const updatedAt = new Date().toISOString()

  const settings = await getDatabaseStatus()

  response.status(200).json({
    "update_at": updatedAt,
    dependencies: {
      "database": settings,
    }
  })
}

export default status
