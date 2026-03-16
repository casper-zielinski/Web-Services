# REST API Deepening Exercise: CRUD, Persistence, Filtering, Pagination and Caching

## Overview

This repository contains a compact follow-up exercise for a REST API implemented with Node.js and Express.

The starting point is an already existing REST service with basic persistence.  
The goal of this exercise is to deepen important API concepts that are common in real-world backend systems:

- CRUD operations
- persistence strategies
- query parameters and filtering
- pagination
- limit and offset
- caching basics and HTTP cache headers

The exercise is designed so that it can theoretically be completed within **2 hours** if you follow the instructions in a strict step-by-step manner.  
Who explore more, validate edge cases, or refactor their code should expect to need more time.

---

## Learning Goals

After completing the exercise, you should be able to:

- explain and implement complete CRUD behavior in a REST API
- understand persistence beyond a simple demo setup
- compare SQLite-based persistence with a switch to MySQL
- use query parameters for filtering and result shaping
- implement `limit` and `offset` in API endpoints
- understand why pagination is necessary
- distinguish between in-memory caching and browser caching
- apply HTTP cache-related headers such as `Cache-Control`, `ETag`, and `Last-Modified`
- identify common caching problems and stale-data scenarios

---

## Suggested Exercise Structure

The exercise is split into several sub-exercises.

### 1. CRUD Refinement
Complete or improve the following operations:

- `GET /notes`
- `GET /notes/:id`
- `POST /notes`
- `PUT /notes/:id`
- `DELETE /notes/:id`

Focus points:

- correct HTTP methods
- proper status codes
- handling of missing resources
- update vs. create behavior
- clean request and response structure

See: [./exercises/01-crud.md](./exercises/01-crud.md)


---

### 2. Persistence Deep Dive
Persistence already exists in the starter project, but it should now be discussed and extended.

Work on one of two variants:

- **Variant A:** continue with SQLite and improve the current persistence layer
- **Variant B:** replace SQLite with MySQL and adapt the data access layer

Topics:

- why persistence matters
- separation of controller and model/data layer
- adapting SQL queries for another database backend
- keeping the API contract stable while changing the storage technology

Typical tasks may include:

- extracting database-specific code
- introducing a configuration-based database choice
- comparing SQLite and MySQL from an API developer perspective
- checking which parts of the code must change and which should stay unchanged

See: [./exercises/02-persistence.md](./exercises/02-persistence.md)

---

### 3. Query Parameters and Filtering
Extend collection endpoints with query parameters.

Examples:

- `GET /notes?title=rest`
- `GET /notes?description=api`
- `GET /notes?title=rest&description=api`

Topics:

- query parameters vs. path parameters
- optional filtering
- combining multiple filters
- safe SQL parameter handling
- validating and sanitizing incoming values

See: [./exercises/03-filtering.md](./exercises/03-filtering.md)

---

### 4. Pagination with Limit and Offset
Extend list endpoints with pagination support.

Examples:

- `GET /notes?limit=5`
- `GET /notes?limit=5&offset=0`
- `GET /notes?limit=5&offset=10`

Topics:

- why large result sets are problematic
- how `limit` and `offset` work
- combining pagination with filtering
- validating limit and offset values
- defining maximum allowed limits

You should also think about how existing functions must be adapted when pagination is introduced.

Typical code changes include:

- controller changes to read query parameters
- model changes to build SQL statements dynamically
- optional response metadata such as `count`, `limit`, `offset`

See: [./exercises/04-pagination.md](./exercises/04-pagination.md)

---

### 5. Caching Basics and HTTP Caching
Deepen caching beyond a simple local memory object.

The exercise distinguishes between:

- **in-memory cache** on the server
- **browser cache / HTTP cache** on the client side

Topics:

- what kinds of resources can be cached
- when caching makes sense
- `Cache-Control`
- `ETag`
- `Last-Modified`
- conditional requests
- stale data
- invalidation problems
- differences between dynamic and static resources

You should understand that caching is not only a performance topic, but also a correctness topic.

See: [./exercises/05-caching.md](./exercises/05-caching.md)

---

## Recommended Order

Work through the sub-exercises in this order:

1. CRUD
2. Persistence
3. Filtering
4. Pagination
5. Caching

This order is intentional.

Filtering and pagination build on top of collection endpoints.  
Caching is easier to understand once the underlying resource behavior is clear.

---

## Expected Project Architecture

A simple structure is sufficient, for example:

```text
.
├── exercises
    ├── 01-crud.md
    ├── 02-persistence.md
    ├── 03-filtering.md
    ├── 04-pagination.md
    └── 05-caching.md
├── notes
    ├── controller.js
    ├── model.js
    ├── server.js
    └── index.js
├── package.json
└── server.js
````

If the project is refactored further, you may also introduce separate modules such as:

* `db/`
* `routes/`
* `services/`
* `middleware/`
* `cache/`

---

## Example Deepening Questions

This exercise is also intended as a basis for later exam questions.

Examples:

* Why is `GET /notes/:id` different from `GET /notes?title=test`?
* What changes when a project switches from SQLite to MySQL?
* Why should `limit` usually be restricted to a maximum value?
* What is the difference between server-side in-memory caching and browser-side caching?
* Why can `ETag` and `Last-Modified` help reduce unnecessary data transfer?
* Which API resources are good candidates for caching, and which are not?

---

## Notes

Do not try to solve everything at once.

Work step by step:

1. understand the current code
2. change one endpoint at a time
3. test after every change
4. only then move to the next feature

A working small solution is better than a large broken one.

---

## Source Orientation

The exercise topics are aligned with common web and API documentation concepts, especially regarding:

* HTTP caching and conditional requests
* API design and pagination
* SQL-based `LIMIT` / `OFFSET`
* Express middleware and response behavior

Students are encouraged to read the official documentation in parallel with the exercise steps.



[1]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Cache-Control "Cache-Control header - HTTP | MDN - MDN Web Docs"
