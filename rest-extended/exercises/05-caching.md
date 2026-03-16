# 05 – Caching for REST APIs

## Overview

In the previous exercises, you implemented and improved a REST API with:

- CRUD operations
- persistence
- filtering
- pagination using `limit` and `offset`

Now the API already behaves more like a real backend system.

The next important topic is **caching**.

Caching helps reduce unnecessary work by reusing previously generated responses or resource representations.

This can improve:

- response time
- server load
- bandwidth usage
- perceived frontend performance

However, caching also introduces risks:

- stale data
- inconsistent results
- wrong cache settings
- incorrect assumptions about what should be cached

This exercise introduces caching from two perspectives:

- **server-side in-memory caching**
- **client-side / browser-side HTTP caching**

It also introduces important HTTP headers:

- `Cache-Control`
- `ETag`
- `Last-Modified`

As an **optional** extension, this exercise can be expanded by implementing HTTP cache validation using the headers **ETag** and **Last-Modified**. These mechanisms allow a client (browser or application) to check whether a resource has changed without downloading it again.

---

## Learning Goals

After completing this exercise, you should be able to:

- explain what caching is and why it is useful
- distinguish between in-memory cache and browser cache
- set `Cache-Control` headers in an Express application
- explain the purpose of `ETag`
- explain the purpose of `Last-Modified`
- understand conditional requests
- identify resources that are suitable for caching
- identify common caching problems

---

## Relationship to the Previous Exercises

This exercise builds on top of your existing REST API.

You should not create a separate demo project.

Instead, apply the caching concepts to your current API endpoints such as:

- `GET /notes`
- `GET /notes/:id`

Caching is especially relevant for **read endpoints**.

It is usually not directly applied to:

- `POST`
- `PUT`
- `DELETE`

because those requests modify server-side state.

---

## Step 1 – What Caching Means

Caching means that a previously generated response or representation is stored temporarily and reused later instead of being generated again.

This can happen in different places:

- in the browser
- in a shared cache such as a proxy or CDN
- on the server itself
- inside an application process

HTTP caching is part of the web standard and is controlled mainly with response headers such as `Cache-Control`, validators such as `ETag` and `Last-Modified`, and conditional requests. :contentReference[oaicite:1]{index=1}

---

## Step 2 – In-Memory Cache vs Browser Cache

### In-Memory Cache

An in-memory cache is stored directly inside the server process.

Example:

- the API handles `GET /notes`
- the result is stored in a JavaScript object for 30 seconds
- repeated requests during that time reuse the stored result

Characteristics:

- exists only as long as the server process runs
- fast access
- simple to implement
- not shared across multiple server instances
- lost after restart

---

### Browser Cache / HTTP Cache

A browser cache stores responses on the client side according to HTTP rules.

This is controlled mainly by headers such as:

- `Cache-Control`
- `ETag`
- `Last-Modified`

Characteristics:

- handled by the browser or another HTTP cache
- based on standard HTTP behavior
- can reduce bandwidth and unnecessary downloads
- useful for static files and stable GET responses

`Cache-Control` applies to browsers and also to shared caches such as proxies and CDNs. :contentReference[oaicite:2]{index=2}

---

## Step 3 – Which Resources Can Be Cached?

Not every resource should be cached in the same way.

### Usually good candidates for caching

- static assets such as CSS, JavaScript, images
- documentation pages
- rarely changing reference data
- public `GET` endpoints with infrequent changes
- collection endpoints where a short cache duration is acceptable

---

### Usually problematic candidates

- personalized responses
- responses depending on authentication or session state
- highly dynamic dashboards
- rapidly changing inventory or live status endpoints
- write operations such as `POST`, `PUT`, `DELETE`

A cache should preserve correct HTTP semantics; that is a core idea of RFC 9111. :contentReference[oaicite:3]{index=3}

---

## Step 4 – Cache-Control Basics

`Cache-Control` is the main HTTP header for defining caching behavior.

MDN describes it as the header that contains instructions for caching in requests and responses. :contentReference[oaicite:4]{index=4}

### Common directives

- `no-store`  
  do not store this response at all

- `no-cache`  
  the response may be stored, but it must be revalidated before reuse

- `public`  
  response may be stored by shared caches

- `private`  
  response is intended for a single user and should not be stored by shared caches

- `max-age=60`  
  response is fresh for 60 seconds

---

## Step 5 – Set Cache-Control in Express

Express allows you to set headers directly on the response object via methods such as `res.set()` / `res.header()`. :contentReference[oaicite:5]{index=5}

### Example: Disable caching completely

```javascript
function getOneAction(req, res) {
  model
    .get({ id: req.params.id })
    .then((note) => {
      if (!note) {
        return res.status(404).json({
          error: `could not find note with id [${req.params.id}]`,
        });
      }

      res.set('Cache-Control', 'no-store');
      res.json(note);
    })
    .catch((err) => handleError(err, req, res));
}
````

Use this when you want to make sure that the response is never cached.

---

### Example: Allow short-term caching

```javascript
function getAllAction(req, res) {
  const options = {
    title: req.query.title,
    description: req.query.description,
    limit: req.query.limit,
    offset: req.query.offset,
  };

  model
    .get(options)
    .then((notes) => {
      res.set('Cache-Control', 'public, max-age=60');
      res.json(notes);
    })
    .catch((err) => handleError(err, req, res));
}
```

Meaning:

* response may be cached
* it is considered fresh for 60 seconds

---

### Example: Require revalidation

```javascript
res.set('Cache-Control', 'no-cache');
```

This does **not** mean “do not cache at all”.
It means the cache must revalidate the response before reuse. MDN distinguishes `no-cache` from `no-store` explicitly. ([MDN Web Docs][1])

---

## Step 6 – Simple In-Memory Cache

Now implement a very simple server-side cache.

### Example idea

Cache the result of `GET /notes` for 30 seconds.

### Example cache object

```javascript
const notesCache = {
  data: null,
  timestamp: 0,
};
```

### Example controller logic

```javascript

function getAllAction(req, res) {
  const options = {
    title: req.query.title,
    description: req.query.description,
    limit: req.query.limit,
    offset: req.query.offset,
  };

  const cacheKey = JSON.stringify(options);
  const now = Date.now();

  if (!getAllAction.cache) {
    getAllAction.cache = {};
  }

  const entry = getAllAction.cache[cacheKey];

  if (entry && now - entry.timestamp < 30000) {
    res.set('Cache-Control', 'no-store');
    return res.json(entry.data);
  }

  model
    .get(options)
    .then((notes) => {
      getAllAction.cache[cacheKey] = {
        data: notes,
        timestamp: now,
      };

      res.set('Cache-Control', 'no-store');
      res.json(notes);
    })
    .catch((err) => handleError(err, req, res));
}
```

---

## Step 7 – Important Note About In-Memory Cache

This cache is only inside the current Node.js process.

That means:

* it disappears when the server restarts
* it is not shared if multiple app instances run
* different users may hit different caches if a load balancer is used

This is why simple in-memory caching is useful for teaching and small setups, but limited in real distributed systems.

---

## Step 8 – Cache Invalidation

One of the most important problems in caching is invalidation.

If the API caches `GET /notes`, then a later:

* `POST /notes`
* `PUT /notes/:id`
* `DELETE /notes/:id`

can make the cached result outdated.

### Example invalidation after insert

```javascript
function clearNotesCache() {
  getAllAction.cache = {};
}
```

Then call it after writes:

```javascript
function insertAction(req, res) {
  const note = {
    title: req.body.title,
    description: req.body.description,
  };

  model
    .save(note)
    .then((createdNote) => {
      clearNotesCache();
      res.status(201).json(createdNote);
    })
    .catch((err) => handleError(err, req, res));
}
```

Do the same after update and delete.

---

## Step 9 – ETag

An `ETag` is an identifier for a specific version of a resource. MDN describes it exactly that way. If the resource changes, a new `ETag` should be generated. ([MDN Web Docs][2])

### Why ETag is useful

A client can ask:

> “Has this resource changed since the version I already have?”

If not, the server can respond with:

```http
304 Not Modified
```

instead of sending the full response body again.

This saves bandwidth and avoids unnecessary payload transfer. ([MDN Web Docs][2])

---

## Step 10 – Simple ETag Example

### Example implementation for a single note

```javascript
const crypto = require('crypto');

function createEtag(value) {
  return crypto
    .createHash('sha1')
    .update(JSON.stringify(value))
    .digest('hex');
}

function getOneAction(req, res) {
  model
    .get({ id: req.params.id })
    .then((note) => {
      if (!note) {
        return res.status(404).json({
          error: `could not find note with id [${req.params.id}]`,
        });
      }

      const etag = createEtag(note);
      res.set('ETag', etag);
      res.set('Cache-Control', 'no-cache');

      if (req.headers['if-none-match'] === etag) {
        return res.status(304).send();
      }

      res.json(note);
    })
    .catch((err) => handleError(err, req, res));
}
```

### What happens here?

* server generates an `ETag` from the note
* server sends `ETag` in the response
* client can later send `If-None-Match`
* if the value matches, server returns `304 Not Modified`

This is a standard conditional request pattern. ([MDN Web Docs][2])

---

## Step 11 – Last-Modified

`Last-Modified` is a response header containing the date and time when the server believes the resource was last changed. It is used with conditional headers such as `If-Modified-Since`. ([MDN Web Docs][3])

### Why it is useful

It offers another way to validate whether a cached representation is still current.

### Example requirement

For this to work well, your resource should contain modification information, for example:

* `updated_at`
* `created_at`
* file modification time for static files

---

## Step 12 – Example with Last-Modified

Assume each note has an `updated_at` field.

### Example controller

```javascript
function getOneAction(req, res) {
  model
    .get({ id: req.params.id })
    .then((note) => {
      if (!note) {
        return res.status(404).json({
          error: `could not find note with id [${req.params.id}]`,
        });
      }

      const lastModified = new Date(note.updated_at).toUTCString();
      res.set('Last-Modified', lastModified);
      res.set('Cache-Control', 'no-cache');

      const ifModifiedSince = req.headers['if-modified-since'];

      if (ifModifiedSince && new Date(ifModifiedSince) >= new Date(note.updated_at)) {
        return res.status(304).send();
      }

      res.json(note);
    })
    .catch((err) => handleError(err, req, res));
}
```

### Important note

This is a teaching example.
In real systems, time precision and comparison details matter.

---

## Step 13 – Static Resources and Express

Static resources are common candidates for browser caching.

Express’ `serve-static` middleware supports cache-related options such as `lastModified` and `maxAge`; the documentation states that `lastModified` is enabled by default and uses the file system’s modification time, while `maxAge` can be configured. ([expressjs.com][4])

### Example

```javascript
const express = require('express');
const path = require('path');

app.use(
  '/static',
  express.static(path.join(__dirname, 'public'), {
    maxAge: '1h',
    lastModified: true,
  })
);
```

This is a good contrast to dynamic API responses.

---

## Step 14 – Typical Caching Strategies in This Exercise

For the exercise, discuss these three patterns:

### Pattern A – No caching

Use for:

* highly dynamic data
* sensitive user-specific data
* endpoints where stale data would be dangerous

Example:

```javascript
res.set('Cache-Control', 'no-store');
```

---

### Pattern B – Browser revalidation

Use for:

* data that may change
* but where sending a validator is useful

Example:

```javascript
res.set('Cache-Control', 'no-cache');
res.set('ETag', etag);
```

or

```javascript
res.set('Cache-Control', 'no-cache');
res.set('Last-Modified', lastModified);
```

MDN shows `Cache-Control: no-cache` together with validators such as `ETag` and `Last-Modified` as a common pattern for revalidation. ([MDN Web Docs][5])

---

### Pattern C – Short public caching

Use for:

* public GET endpoints
* data where short-term staleness is acceptable

Example:

```javascript
res.set('Cache-Control', 'public, max-age=60');
```

---

## Step 15 – Common Problems

Caching often fails because of incorrect assumptions.

### Problem 1 – Stale data

The cache returns old data after the resource has changed.

---

### Problem 2 – Missing invalidation

Write operations update the database, but cached collection results are not cleared.

---

### Problem 3 – Caching personalized data incorrectly

A response intended for one user may accidentally be reused for another user if caching headers are too permissive.

---

### Problem 4 – Confusing `no-cache` with `no-store`

These are not the same.
`no-store` means “do not store at all”, while `no-cache` means “may store, but must revalidate before reuse.” ([MDN Web Docs][1])

---

### Problem 5 – In-memory cache only works locally

It may appear correct in development but fail in multi-instance deployment.

---

### Problem 6 – Caching the wrong resource type

Write endpoints or highly dynamic endpoints are often poor cache candidates.

---

## Step 16 – Suggested Tasks

### Task 1

Add `Cache-Control: no-store` to `GET /notes/:id`.

---

### Task 2

Add short-term in-memory caching for `GET /notes`.

---

### Task 3

Invalidate the in-memory cache when notes are inserted, updated, or deleted.

---

### Task 4

Add an `ETag` to `GET /notes/:id`.

---

### Task 5

Implement a simple `304 Not Modified` response when `If-None-Match` matches.

---

### Task 6

Discuss whether `GET /notes` or `GET /notes/:id` is a better candidate for browser cache validation.

---

## Test Cases

### Test 1 – Cache-Control header

Request:

```http
GET /notes/1
```

Expected:

* response contains `Cache-Control`

---

### Test 2 – ETag response

Request:

```http
GET /notes/1
```

Expected:

* response contains `ETag`

---

### Test 3 – Conditional request

First request:

```http
GET /notes/1
```

Read the returned `ETag`.

Second request:

```http
GET /notes/1
If-None-Match: <etag-value>
```

Expected:

* `304 Not Modified` if unchanged

---

### Test 4 – In-memory cache invalidation

1. request `GET /notes`
2. request `POST /notes`
3. request `GET /notes`

Expected:

* second `GET /notes` should not return an outdated cached collection

---

## Reflection Questions

### Question 1

What is the difference between server-side in-memory caching and browser caching?

---

### Question 2

What does `Cache-Control: no-store` mean?

---

### Question 3

What is the difference between `no-store` and `no-cache`?

---

### Question 4

What is the purpose of an `ETag`?

---

### Question 5

What is the purpose of `Last-Modified`?

---

### Question 6

Which API resources are good candidates for caching, and which are not?

---

### Question 7

Why is cache invalidation difficult?

---

## Source Orientation

Use the following sources while working on this exercise:

* MDN HTTP Caching
* MDN Cache-Control
* MDN ETag
* MDN Last-Modified
* RFC 9111 HTTP Caching
* Express API / middleware / static file documentation

These are central and reliable references for the concepts used in this exercise.


[1]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Cache-Control "Cache-Control header - HTTP | MDN - MDN Web Docs"
[2]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/ETag "ETag header - HTTP | MDN - MDN Web Docs"
[3]: https://developer.mozilla.org/de/docs/Web/HTTP/Reference/Headers/Last-Modified "Last-Modified header - HTTP | MDN"
[4]: https://expressjs.com/en/resources/middleware/serve-static.html "Express serve-static middleware"
[5]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Caching "HTTP caching - HTTP | MDN - MDN Web Docs"
