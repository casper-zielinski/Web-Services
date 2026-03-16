# 04 – Pagination with Limit and Offset

## Overview

In the previous exercise, you extended the `GET /notes` endpoint with filtering using query parameters.

So far, the API can return:

- all notes
- filtered notes
- notes matching multiple optional conditions

This is already useful, but it still has a problem:

If the database contains many rows, the API may return too much data at once.

Typical problems:

- large response bodies
- slower response times
- unnecessary network traffic
- more memory usage on server and client
- poor usability in frontend applications

To solve this, APIs often use **pagination**.

In this exercise, you will extend the collection endpoint with:

- `limit`
- `offset`

Example:

```http
GET /notes?limit=5&offset=10
````

Meaning:

> Return 5 notes, starting after the first 10 matching rows.

---

## Learning Goals

After completing this exercise, you should be able to:

* explain why pagination is needed
* implement `limit` and `offset` in a REST API
* combine pagination with filtering
* validate query parameters
* define safe default values
* define maximum limits
* understand why `ORDER BY` is required
* understand typical weaknesses of offset-based pagination

---

## Relationship to the Previous Exercises

This exercise builds directly on:

* the basic REST exercise
* `01 – CRUD Refinement`
* `03 – Filtering with Query Parameters`

Do not start from scratch.

You should extend the existing collection endpoint:

```http
GET /notes
```

so that it supports both filtering and pagination.

---

## Why Pagination Matters

Without pagination, a collection endpoint may return the entire dataset.

Example:

```http
GET /notes
```

If there are 10 rows, this is fine.

If there are 10,000 rows, it becomes problematic.

Pagination reduces the number of rows returned in a single request and helps control response size and performance. This is a common API design concern. ([Microsoft Learn][2])

---

## Core Parameters

### `limit`

Defines how many rows should be returned.

Example:

```http
GET /notes?limit=5
```

Meaning:

> Return at most 5 notes.

---

### `offset`

Defines how many matching rows should be skipped before returning results.

Example:

```http
GET /notes?limit=5&offset=10
```

Meaning:

> Skip the first 10 matching notes, then return the next 5.

---

## Step 1 – Start from the Existing Filtering Endpoint

Your existing endpoint probably already supports requests like:

```http
GET /notes?title=REST
GET /notes?description=API
GET /notes?title=REST&description=API
```

Now extend it with:

```http
GET /notes?limit=5
GET /notes?limit=5&offset=0
GET /notes?limit=5&offset=5
GET /notes?title=REST&limit=5&offset=10
```

---

## Step 2 – Extend the Controller

The controller should read the pagination parameters from `req.query` and pass them to the model. The previous parameter `filter` will be replaced with `options`. Options will describe the usage behind more clearly than filter

Example:

```javascript
function getAllAction(req, res) {
  const options = {
    title: req.query.title,
    description: req.query.description,
    limit: req.query.limit,
    offset: req.query.offset
  };

  model
    .get(options)
    .then((notes) => res.json(notes))
    .catch((err) => handleError(err, req, res));
}
```

### Important

At this point, `limit` and `offset` are still strings because query parameters are received as text.

That means they should be validated before use.

---

## Step 3 – Validate `limit` and `offset`

Clients should not be allowed to request arbitrary values without checks.

Examples of problematic input:

* `limit=-10`
* `offset=-5`
* `limit=abc`
* `limit=1000000`

A practical API usually defines:

* a default limit
* a maximum allowed limit
* only non-negative numeric offsets

### Example validation in the controller

```javascript
function getAllAction(req, res) {
  const rawLimit = req.query.limit;
  const rawOffset = req.query.offset;

  let limit = 10;
  let offset = 0;

  if (rawLimit !== undefined) {
    limit = Number(rawLimit);
  }

  if (rawOffset !== undefined) {
    offset = Number(rawOffset);
  }

  if (!Number.isInteger(limit) || limit < 1) {
    return res.status(400).json({
      error: "limit must be a positive integer"
    });
  }

  if (!Number.isInteger(offset) || offset < 0) {
    return res.status(400).json({
      error: "offset must be a non-negative integer"
    });
  }

  if (limit > 100) {
    limit = 100;
  }

  const options = {
    title: req.query.title,
    description: req.query.description,
    limit,
    offset
  };

  model
    .get(options)
    .then((notes) => res.json(notes))
    .catch((err) => handleError(err, req, res));
}
```

---

## Step 4 – Adapt the Model

Your model should already support optional filters.

Now add support for `limit` and `offset`.

### SQLite example

```javascript
function getAll(options = {}) {
  return new Promise((resolve, reject) => {
    let query = 'SELECT * FROM notes';
    const params = [];
    const conditions = [];

    if (options.title) {
      conditions.push('title LIKE ?');
      params.push(`%${options.title}%`);
    }

    if (options.description) {
      conditions.push('description LIKE ?');
      params.push(`%${options.description}%`);
    }

    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }

    query += ' ORDER BY id ASC';

    if (options.limit !== undefined) {
      query += ' LIMIT ?';
      params.push(options.limit);
    }

    if (options.offset !== undefined) {
      query += ' OFFSET ?';
      params.push(options.offset);
    }

    db.all(query, params, (err, rows) => {
      if (err) {
        return reject(err);
      }

      resolve(rows);
    });
  });
}
```

---

## Step 5 – Why `ORDER BY` Is Required

Do not paginate without explicit ordering.

Bad idea:

```sql
SELECT * FROM notes LIMIT ? OFFSET ?
```

Better:

```sql
SELECT * FROM notes ORDER BY id ASC LIMIT ? OFFSET ?
```

Why?

Without a stable order, the database may return rows in an unspecified order.
That means page 1 and page 2 may become inconsistent. MySQL documentation also makes clear that `LIMIT` interacts with ordering and optimization, so stable ordering is not optional if you want predictable pages. ([dev.mysql.com][1])

---

## Step 6 – Combine Filtering and Pagination

Pagination should work together with filtering.

Example:

```http
GET /notes?title=REST&limit=5&offset=10
```

Meaning:

1. filter notes by title
2. sort them
3. skip the first 10 matching rows
4. return the next 5 rows

This leads to SQL like:

```sql
SELECT *
FROM notes
WHERE title LIKE ?
ORDER BY id ASC
LIMIT ?
OFFSET ?
```

That order matters.

Filtering happens before the page is cut out of the result.

---

## Step 7 – Optional Response Metadata

A simple response can just return the rows:

```json
[
  {
    "id": 11,
    "title": "REST Notes",
    "description": "Example"
  }
]
```

But for frontend clients it is often useful to also return metadata.

Example:

```json
{
  "data": [
    {
      "id": 11,
      "title": "REST Notes",
      "description": "Example"
    }
  ],
  "pagination": {
    "limit": 5,
    "offset": 10
  }
}
```

### Optional task

Adapt the controller so that it returns this structure instead of a plain array.

Example:

```javascript
function getAllAction(req, res) {
  const rawLimit = req.query.limit;
  const rawOffset = req.query.offset;

  let limit = 10;
  let offset = 0;

  if (rawLimit !== undefined) {
    limit = Number(rawLimit);
  }

  if (rawOffset !== undefined) {
    offset = Number(rawOffset);
  }

  if (!Number.isInteger(limit) || limit < 1) {
    return res.status(400).json({ error: 'limit must be a positive integer' });
  }

  if (!Number.isInteger(offset) || offset < 0) {
    return res.status(400).json({ error: 'offset must be a non-negative integer' });
  }

  if (limit > 100) {
    limit = 100;
  }

  const options = {
    title: req.query.title,
    description: req.query.description,
    limit,
    offset
  };

  model
    .get(options)
    .then((notes) => {
      res.json({
        data: notes,
        pagination: {
          limit,
          offset
        }
      });
    })
    .catch((err) => handleError(err, req, res));
}
```

---

## Step 8 – Think About Total Count

A frontend often also wants to know:

* how many matching rows exist in total
* whether there is a next page

That requires an additional query such as:

```sql
SELECT COUNT(*) AS total
FROM notes
WHERE title LIKE ?
```

### Optional advanced task

Add a second query that calculates the total number of matching rows and include it in the response.

Example response:

```json
{
  "data": [
    {
      "id": 11,
      "title": "REST Notes",
      "description": "Example"
    }
  ],
  "pagination": {
    "limit": 5,
    "offset": 10,
    "total": 37
  }
}
```

This is optional for the compact exercise, but very useful as a discussion point.

---

## Step 9 – MySQL Example

If you also want to show the MySQL variant, the SQL structure stays almost the same.

Example using `mysql2/promise`:

```javascript
async function getAll(options = {}) {
  let query = 'SELECT * FROM notes';
  const params = [];
  const conditions = [];

  if (options.title) {
    conditions.push('title LIKE ?');
    params.push(`%${options.title}%`);
  }

  if (options.description) {
    conditions.push('description LIKE ?');
    params.push(`%${options.description}%`);
  }

  if (conditions.length > 0) {
    query += ' WHERE ' + conditions.join(' AND ');
  }

  query += ' ORDER BY id ASC';
  query += ' LIMIT ? OFFSET ?';

  params.push(options.limit, options.offset);

  const [rows] = await pool.execute(query, params);
  return rows;
}
```

The important lesson stays the same:

* controller remains largely stable
* model adapts to database specifics
* SQL logic remains conceptually similar

---

## Step 10 – Test Cases

Run the following tests.

### Basic pagination

```http
GET /notes?limit=5&offset=0
```

Expected result:

* first 5 notes

---

### Next page

```http
GET /notes?limit=5&offset=5
```

Expected result:

* next 5 notes

---

### Filtering + pagination

```http
GET /notes?title=REST&limit=3&offset=0
```

Expected result:

* first 3 notes matching the title filter

---

### Invalid limit

```http
GET /notes?limit=-1
```

Expected result:

* `400 Bad Request`

---

### Invalid offset

```http
GET /notes?offset=-5
```

Expected result:

* `400 Bad Request`

---

### Non-numeric limit

```http
GET /notes?limit=abc
```

Expected result:

* `400 Bad Request`

---

## Common Mistakes

Typical pagination mistakes include:

* using `LIMIT` without `ORDER BY`
* not validating `limit` and `offset`
* allowing extremely high limits
* mixing filtering and pagination in the wrong order
* assuming query parameters are already numbers
* forgetting that offset-based pagination can become inefficient on large datasets

---

## Reflection Questions

### Question 1

Why is pagination useful in a REST API?

---

### Question 2

What is the difference between `limit` and `offset`?

---

### Question 3

Why should `ORDER BY` be used before `LIMIT` and `OFFSET`?

---

### Question 4

Why should an API define a maximum allowed `limit`?

---

### Question 5

What is the difference between:

```http
GET /notes?limit=5&offset=0
```

and

```http
GET /notes?limit=5&offset=5
```

---

### Question 6

Why is offset-based pagination not always ideal for very large datasets?

---

## Preparation for the Next Exercise

In the next exercise, you will deepen the topic of caching.

You will look at:

* in-memory caching
* browser caching
* `Cache-Control`
* `ETag`
* `Last-Modified`
* common caching problems

Before moving on, make sure that filtering and pagination work together correctly.


[1]: https://dev.mysql.com/doc/refman/8.4/en/limit-optimization.html "MySQL :: MySQL 8.4 Reference Manual :: 10.2.1.19 LIMIT Query Optimization"
[2]: https://learn.microsoft.com/en-us/azure/architecture/best-practices/api-design "Web API Design Best Practices - Azure Architecture Center"
