import database from "infra/database.js"

async function status (request, response) {
  const result = await database.query("SELECT NOW()")

  if (result.rows.length === 0) {
    response.status(500).json({ "status": "error" })
    return
  }

  response.status(200).json({ "status": "ok" })
}

export default status
