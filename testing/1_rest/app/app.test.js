const app = require("./app");
const supertest = require("supertest");

describe("end2end testing", () => {
  let request;
  let created;

  beforeEach(() => {
    request = supertest(app);
  });

  it("should return 3 notes on GET /notes", async () => {
    const response = await request.get("/notes");
    const json = JSON.parse(response.text);

    expect(response.status).toBe(200);
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(json.notes.length).toBe(3);
  });

  it("should add a new entry on valid POST", async () => {
    const response = await request
      .post("/notes")
      .send({ title: "testing", description: "automation testing" });

    expect(response.status).toBe(201);
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.body.id).toBeDefined();

    created = response.body.id;
  });

  it("should now have 4 notes on GET /notes", async () => {
    const response = await request.get("/notes");
    const json = JSON.parse(response.text);

    expect(json.notes.length).toBe(4);
  });

  it("should return the created note by GET /notes/:id", async () => {
    const response = await request.get(`/notes/${created}`);

    expect(response.status).toBe(200);
    expect(response.body.title).toBe("testing");
    expect(response.body.description).toBe("automation testing");
  });

  it("should update the note on PUT /notes/:id", async () => {
    const response = await request
      .put(`/notes/${created}`)
      .send({ title: "updated title", description: "updated description" });

    expect(response.status).toBe(200);
  });

  it("should reflect updates on GET /notes/:id", async () => {
    const response = await request.get(`/notes/${created}`);

    expect(response.body.title).toBe("updated title");
    expect(response.body.description).toBe("updated description");
  });

  it("should still have 4 notes on GET /notes", async () => {
    const response = await request.get("/notes");
    const json = JSON.parse(response.text);

    expect(json.notes.length).toBe(4);
  });

  it("should delete the note on DELETE /notes/:id", async () => {
    const response = await request.delete(`/notes/${created}`);

    expect(response.status).toBe(204);
  });

  it("should now have 3 notes after DELETE on GET /notes", async () => {
    const response = await request.get("/notes");
    const json = JSON.parse(response.text);

    expect(json.notes.length).toBe(3);
  });
});
