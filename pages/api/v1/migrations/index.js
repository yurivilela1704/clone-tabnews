import migrationRunner from 'node-pg-migrate';
import {join} from 'node:path';
import database from "infra/database.js";

export default async function migrations(request, response) {
  try {
    const dbClient = await database.getConnectedClient()

    const migrations = await migrationRunner({
      dbClient: dbClient,
      dryRun: request.method === 'GET',
      dir: join('infra', 'migrations'),
      direction: "up",
      verbose: true,
      migrationsTable: "pgmigrations",
    })

    await dbClient.end()

    if (migrations.length !== 0 && request.method === 'POST') {
      return response.status(201).json(migrations)
    }

    return response.status(200).json(migrations)
  } catch (error) {
    console.error(error)
  }
}
