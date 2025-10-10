import {Client} from "pg";

// Extracted configuration constant
const DB_CONFIG = {
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  user: process.env.POSTGRES_USER,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  ssl: process.env.NODE_ENV === "production",
  enableChannelBinding: process.env.NODE_ENV === "production",
};

function createDbClient() {
  return new Client(DB_CONFIG);
}

async function getConnectedClient() {
  const client = createDbClient();

  await client.connect();

  return client;
}

async function query(queryConfig) {
  let client;
  try {
    client = await getConnectedClient();

    return await client.query(queryConfig);
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await client.end();
  }
}

export default {
  query,
  getConnectedClient
};
