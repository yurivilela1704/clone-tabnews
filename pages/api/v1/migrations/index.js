import migrationRunner from 'node-pg-migrate';
import {join} from 'node:path';
import { pool } from "infra/pool.js";

export default async function migrations(request, response) {
  let dbClient;
  try {
    dbClient = await pool.connect()

    const migrations = await migrationRunner({
      dbClient: dbClient,
      dryRun: request.method === 'GET',
      dir: join('infra', 'migrations'),
      direction: "up",
      verbose: true,
      migrationsTable: "pgmigrations",
    })

    if (migrations.length !== 0 && request.method === 'POST') {
      return response.status(201).json(migrations)
    }

    return response.status(200).json(migrations)
  } catch (error) {
    console.error(error)
    return response.status(500).json({ error: error.message })
  } finally {
    dbClient.release()
  }
}
