import { Pool } from "pg"

const pool = new Pool({
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
})

/**
 * Executes a database query safely with error handling
 * @param {string|object} query - SQL query string or query config object
 * @returns {Promise<Object|null>} Query result or null if query fails
 * @private
 */
async function executeQuery (query) {
  try {
    return await pool.query(query)
  } catch (error) {
    console.error(`Database query failed: ${error.message}`)
    return null
  }
}

/**
 * Check database connection status
 * @returns {Promise<Date|null>} Current database timestamp or null if unavailable
 */
async function isDatabaseConnected () {
  const result = await executeQuery("SELECT NOW()")
  return result?.rows[0]?.now || null
}

/**
 * Get maximum connections configured for database
 * @returns {Promise<number|null>} Maximum connections or null if unavailable
 */
async function getDatabaseMaxConnections () {
  const result = await executeQuery(`
    SELECT current_setting('max_connections')::int AS max_connections
  `)
  return result?.rows[0]?.max_connections ? parseInt(result.rows[0].max_connections) : null
}

/**
 * Get current open connections to the database
 * @returns {Promise<number|null>} Number of open connections or null if unavailable
 */
async function getDatabaseOpenConnections () {
  // Using pg_stat_database.numbackends for accurate connection count
  const result = await executeQuery(`
    SELECT numbackends AS open_connections
    FROM pg_stat_database
    WHERE datname = current_database()
  `)
  return result?.rows[0]?.open_connections ? parseInt(result.rows[0].open_connections) : null
}

/**
 * Get PostgreSQL version information
 * @returns {Promise<string|null>} PostgreSQL version or null if unavailable
 */
async function getDatabaseVersion () {
  const result = await executeQuery("SHOW server_version;")
  return result?.rows[0]?.server_version || null
}

/**
 * Get all database settings as a JSON object
 * @returns {Promise<Object>} Database settings including status, max connections, and open connections
 */
async function getDatabaseStatus () {
  try {
    const dbTimestamp = await isDatabaseConnected()

    if (!dbTimestamp) {
      return {
        status: "unavailable",
        max_connections: null,
        opened_connections: null,
        version: null
      }
    }

    const maxConnections = await getDatabaseMaxConnections()
    const openedConnections = await getDatabaseOpenConnections()
    const version = await getDatabaseVersion()

    return {
      status: "healthy",
      max_connections: maxConnections,
      opened_connections: openedConnections,
      version: version
    }
  } catch (error) {
    console.error("Failed to get database settings:", error.message)
    return {
      status: false,
      error: error.message,
      max_connections: null,
      opened_connections: null,
      version: null
    }
  }
}

export {
  pool,
  isDatabaseConnected,
  getDatabaseMaxConnections,
  getDatabaseOpenConnections,
  getDatabaseVersion,
  getDatabaseStatus
}
