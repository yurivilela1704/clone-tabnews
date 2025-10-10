import database from "infra/database.js";

beforeAll(cleanDatabase)

async function cleanDatabase() {
  await database.query("DROP SCHEMA public CASCADE; CREATE SCHEMA public;")
}

test("POST to api/v1/migrations", async () => {
  const firstReponse = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST",
  })

  expect(firstReponse.status).toBe(201)

  const firstReponseBody = await firstReponse.json()

  expect(Array.isArray(firstReponseBody)).toBe(true)
  expect(firstReponseBody.length).toBeGreaterThan(0)

  const secondeResponse = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST",
  })

  expect(secondeResponse.status).toBe(200)

  const secondeResponseBody = await secondeResponse.json()

  expect(Array.isArray(secondeResponseBody)).toBe(true)
  expect(secondeResponseBody.length).toBe(0)

})

