test("test DB status", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status")
  expect(response.status).toBe(200)

  const responseBody = await response.json()
  expect(responseBody.updated_at).toBeDefined()

  const parsedDate = new Date(responseBody.updated_at).toISOString()
  expect(responseBody.updated_at).toBe(parsedDate)

  const databaseStatus = responseBody.dependencies.database
  console.log(databaseStatus)
  expect(databaseStatus).toBeDefined()
  expect(databaseStatus.status).toBeDefined()
  expect(databaseStatus.max_connections).toBeDefined()
  expect(databaseStatus.max_connections).toBeDefined()
  expect(databaseStatus.opened_connections).toBeDefined()
  expect(databaseStatus.version).toBe("16.0")
})

