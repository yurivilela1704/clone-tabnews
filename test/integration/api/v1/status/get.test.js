test("get status", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status")
  expect(response.status).toBe(200)

  const responseBody = await response.json()
  console.log(responseBody)

  expect(responseBody.update_at).toBeDefined()

  const parsedDate = new Date(responseBody.update_at).toISOString()

  expect(responseBody.update_at).toBe(parsedDate)

  const databaseStatus = responseBody.database

  expect(databaseStatus).toBeDefined()

  expect(databaseStatus.status).toBeDefined()
  expect(databaseStatus.maxConnections).toBeDefined()
  expect(databaseStatus.openConnections).toBeDefined()
})
