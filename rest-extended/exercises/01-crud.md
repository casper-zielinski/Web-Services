# 01 – CRUD Refinement

## Overview

In the previous exercise, you implemented a basic REST API using Node.js, Express and SQLite.

You already created endpoints for managing **notes** and interacted with the API using HTTP requests.

This exercise revisits the same API and focuses on **CRUD operations** in more detail.

CRUD stands for:

| Operation | Meaning                     |
|-----------|-----------------------------|
| Create    | Create a new resource       |
| Read      | Retrieve resources          |
| Update    | Modify an existing resource |
| Delete    | Remove a resource           |

These operations are the foundation of most REST APIs.

The goal of this exercise is to **review, verify and improve** your existing CRUD implementation.

---

# Learning Goals

After completing this exercise you should be able to:

- correctly map CRUD operations to HTTP methods
- implement REST endpoints for a resource
- use appropriate HTTP status codes
- distinguish between collection endpoints and single-resource endpoints
- understand the role of controllers and models in a backend application
- detect and fix common implementation mistakes

---

# Relationship to the Previous REST Exercise

In the previous exercise you learned:

- what REST means
- how resources are represented
- how HTTP methods map to actions
- how JSON is used to exchange data
- how a REST API can be tested using tools such as curl or Postman

This exercise **builds directly on that work**.

You should **reuse the existing API implementation** and refine it rather than starting from scratch.

---

# The Resource: Notes

The API manages a simple resource called **notes**.

Each note has the following structure:

```json
{
  "id": 1,
  "title": "Example title",
  "description": "Example description"
}
````

The `id` is generated automatically by the database.

---

# Step 1 – Review the Existing Endpoints

Open the project and inspect the following files:

* `server.js`
* `controller.js`
* `model.js`

Identify where the routes are defined and which controller functions are called.

Typical mapping:

| HTTP Method | Endpoint   | Controller   |
| ----------- | ---------- | ------------ |
| GET         | /notes     | getAllAction |
| GET         | /notes/:id | getOneAction |
| POST        | /notes     | insertAction |
| PUT         | /notes/:id | updateAction |
| DELETE      | /notes/:id | deleteAction |

---

## Task 1.1

Locate the route definitions inside the server setup.

Example structure:

```javascript
app.get('/notes', controller.getAllAction);
app.get('/notes/:id', controller.getOneAction);
app.post('/notes', controller.insertAction);
app.put('/notes/:id', controller.updateAction);
app.delete('/notes/:id', controller.deleteAction);
```

Answer the following questions.

---

### Question 1

Which HTTP method is used to create a new resource?

---

### Question 2

Why is `/notes/:id` used instead of `/notes?id=1`?

---

### Question 3

Which endpoint returns a **collection of resources**?

---

### Question 4

Which endpoint represents a **single resource**?

---

# Step 2 – Verify Create (POST)

The POST endpoint should create a new note.

Example request:

```
POST /notes
Content-Type: application/json
```

Request body:

```json
{
  "title": "REST exercise",
  "description": "Improve CRUD implementation"
}
```

---

## Task 2.1

Test the endpoint.

Example using curl:

```
curl -X POST http://localhost:3000/notes \
-H "Content-Type: application/json" \
-d '{"title":"REST exercise","description":"Improve CRUD"}'
```

---

## Expected Result

* HTTP status code: **201 Created**
* JSON response containing the created note
* a generated `id`

Example response:

```json
{
  "id": 5,
  "title": "REST exercise",
  "description": "Improve CRUD"
}
```

---

## Task 2.2

Check the controller implementation.

Verify that:

* the request body is read correctly
* the data is passed to the model
* the created object is returned

---

# Step 3 – Verify Read Operations

Two different read operations exist.

## Read All Notes

```
GET /notes
```

Expected response:

```json
[
  {
    "id": 1,
    "title": "Example",
    "description": "Example text"
  }
]
```

---

## Read a Single Note

```
GET /notes/1
```

Expected response:

```json
{
  "id": 1,
  "title": "Example",
  "description": "Example text"
}
```

---

## Task 3.1

Test both endpoints.

Verify that the API correctly distinguishes between:

* collection requests
* single resource requests

---

## Task 3.2

Test a request for a non-existing note:

```
GET /notes/999
```

Expected result:

```
404 Not Found
```

---

# Step 4 – Verify Update (PUT)

The update endpoint modifies an existing note.

Example request:

```
PUT /notes/1
```

Request body:

```json
{
  "title": "Updated title",
  "description": "Updated description"
}
```

---

## Task 4.1

Test the update endpoint.

Verify that:

* the correct note is updated
* the response contains the updated object

---

## Task 4.2

Test updating a non-existing note.

Example:

```
PUT /notes/999
```

Expected result:

```
404 Not Found
```

---

# Step 5 – Verify Delete

The delete endpoint removes a resource.

Example request:

```
DELETE /notes/1
```

Expected response:

```
204 No Content
```

---

## Task 5.1

Test the delete endpoint.

After deletion, verify that the resource is no longer available:

```
GET /notes/1
```

Expected result:

```
404 Not Found
```

---

# Step 6 – Improve Status Codes

Verify that the API uses appropriate HTTP status codes.

| Operation        | Expected Status |
| ---------------- | --------------- |
| GET collection   | 200             |
| GET resource     | 200             |
| POST             | 201             |
| PUT              | 200             |
| DELETE           | 204             |
| Missing resource | 404             |

---

## Task 6.1

Review the controller functions.

Ensure that they return the correct status codes.

Example:

```javascript
res.status(201).json(note);
```

or

```javascript
res.status(204).send();
```

---

# Common Mistakes

Typical problems in CRUD implementations include:

* returning `200` for every request
* returning deleted resources
* not handling missing IDs
* mixing collection and resource endpoints
* exposing database errors directly

During this exercise, try to identify and correct such issues.

---

# Reflection Questions

Answer the following questions.

### Question 1

Why should POST be used for creating resources instead of GET?

---

### Question 2

Why does the endpoint `/notes/:id` represent a single resource?

---

### Question 3

What is the difference between

```
GET /notes
```

and

```
GET /notes/1
```

---

### Question 4

Why should DELETE usually return `204 No Content`?

---

### Question 5

Why is it useful to separate controller logic and model logic?

---

# Preparation for the Next Exercises

In the following exercises you will extend this API with additional functionality:

* filtering via query parameters
* pagination using `limit` and `offset`
* improved persistence
* caching mechanisms

These features will build on top of the CRUD endpoints implemented here.

Make sure that your CRUD implementation works correctly before moving on.
