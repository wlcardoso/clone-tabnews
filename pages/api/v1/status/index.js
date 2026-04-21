import database from "infra/database.js";

async function status (request, response) {
  const updatedAt = new Date().toISOString();

  const databaseVersion = await database.query('SELECT version();')
  const version = databaseVersion.rows[0].version.split(" ")[1]

  const databaseMaxConn = await database.query('SHOW max_connections;')
  const maxConn = parseInt(databaseMaxConn.rows[0].max_connections)

  const databaseUsedConn = await database.query("SELECT count(*) FROM pg_stat_activity WHERE state = 'active';")
  const usedConn = parseInt(databaseUsedConn.rows[0].count)
  
  response.status(200).json({
    updated_at: updatedAt, 
    dependencies: {
      database: {
        version: version,
        max_connections: maxConn,
        opened_connections: usedConn,
      }
    }
  })
}

export default status;