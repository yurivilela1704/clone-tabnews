import { getDatabaseStatus } from "infra/pool.js"

async function status (request, response) {
  const updatedAt = new Date().toISOString()

  try {
    const settings = await getDatabaseStatus()

    response.status(200).json({
      "updated_at": updatedAt,
      dependencies: {
        "database": settings,
      }
    })
  } catch (error) {
    console.error("Status endpoint error:", error.message)
    response.status(200).json({
      "updated_at": updatedAt,
      dependencies: {
        "database": {
          status: "unavailable",
          error: "Failed to retrieve database status",
          max_connections: null,
          opened_connections: null,
          version: null
        }
      }
    })
  }
}

export default status
