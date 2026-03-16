# 03 – Filtering with Query Parameters

## Overview

In the previous exercise you refined the CRUD operations of your REST API.

So far, the endpoint

```
GET /notes
```

returns **all notes stored in the database**.

In real-world APIs this is rarely sufficient.  
Clients usually need to retrieve **only a subset of data**.

Examples:

- notes containing a specific title
- notes matching a keyword
- notes created within a certain range
- notes with a specific status

This is where **query parameters** and **filtering** are used.

---

# Learning Goals

After completing this exercise you should be able to:

- understand the difference between **path parameters** and **query parameters**
- implement filtering for REST API endpoints
- read query parameters in Express
- safely build SQL queries with parameters
- combine multiple filters
- understand how filtering interacts with pagination

---

# Path Parameters vs Query Parameters

### Path Parameter

Represents a **specific resource**

Example:

```
GET /notes/5
```

Meaning:

> Retrieve the note with ID 5.

---

### Query Parameter

Used to **modify the request or filter a collection**

Example:

```

GET /notes?title=REST

```

Meaning:

> Retrieve all notes where the title matches "REST".

---

### Example Requests

```
GET /notes?title=API
GET /notes?description=test
GET /notes?title=API&description=test
````

These requests still target the **collection** `/notes`,  
but the result is filtered.

---

# Step 1 – Inspect Query Parameters

Express provides query parameters via:

```javascript
req.query
````

Example request:

```
GET /notes?title=REST
```

Controller access:

```javascript
req.query.title
```

Example:

```javascript
function getAllAction(req, res) {

  const title = req.query.title;

  console.log("title filter:", title);

}
```

---

# Step 2 – Extend the Controller

Modify the `getAllAction` controller so that it reads query parameters and forwards them to the model.

Example:

```javascript
function getAllAction(req, res) {

  const filter = {
    title: req.query.title,
    description: req.query.description
  };

  model.get(filter)
    .then(notes => res.json(notes))
    .catch(err => handleError(err, req, res));

}
```

### Explanation

Instead of passing nothing to the model, we now pass a **filter object**.

This allows the model layer to decide how the database query should be built.

---

# Step 3 – Adapt the Model

The current model function probably looks similar to this:

```javascript
function getAll() {
  const query = "SELECT * FROM notes";
}
```

This must now be adapted to support filters.

---

## Example Implementation for MySQL

```javascript
async function getAll(filter) {

    let query = "SELECT * FROM notes";
    const params = [];
    const conditions = [];

    if (filter.title) {
      conditions.push("title LIKE ?");
      params.push("%" + filter.title + "%");
    }

    if (filter.description) {
      conditions.push("description LIKE ?");
      params.push("%" + filter.description + "%");
    }

    if (conditions.length > 0) {
      query += " WHERE " + conditions.join(" AND ");
    }

    query += " ORDER BY id ASC";

    const [rows] = await pool.execute(query, params);

    return rows;

}
```

At the end of the model `module.exports` has to be adapted too.
```javascript

module.exports = {
  get(filter) {
    if (isNaN(filter)) {
      console.log("getAll")
      return getAll(filter);
    }
    console.log("get")
    return getOne(filter);
  },

    ...
    
};
```

---

# Step 4 – Test Filtering

Test the following requests. Take Care to create demo data before.

---

### Filter by Title

```
GET /notes?title=REST
```

Expected result:

Only notes containing the word **REST** in their title.

---

### Filter by Description

```
GET /notes?description=test
```

---

### Combine Filters

```
GET /notes?title=REST&description=API
```

---

# Step 5 – Understand Safe SQL Queries

It is **extremely important** to never build SQL queries using string concatenation.

Incorrect example:

```javascript
query = "SELECT * FROM notes WHERE title = '" + title + "'";
```

This approach can lead to **SQL injection vulnerabilities**.

Instead use **parameterized queries**.

Correct example:

```javascript
query = "SELECT * FROM notes WHERE title = ?";
params.push(title);
```

Parameterized queries are supported by SQLite and MySQL drivers and protect against SQL injection.
This is a widely recommended practice in database security. (OWASP SQL Injection Prevention Cheat Sheet)

Source:
[https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html](https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html)

---

# Step 6 – Handling Optional Filters

Filters should always be **optional**.

This means the endpoint must still work if **no query parameters are provided**.

Example:

```
GET /notes
```

Expected result:

Return **all notes**.

Your code should therefore only add `WHERE` conditions when filters exist.

---

# Step 7 – Interaction with Pagination

In the next exercise you will implement **pagination** using:

```
limit
offset
```

Example:

```
GET /notes?title=REST&limit=10&offset=20
```

This means:

> Retrieve notes matching the filter, but only return a specific subset of the result.

Therefore:

Filtering must be implemented **before pagination** in the SQL query.

Example order:

```
SELECT *
FROM notes
WHERE title LIKE ?
ORDER BY id
LIMIT ?
OFFSET ?
```

---

# Test Cases

Test the following API calls.

---

### No Filter

```
GET /notes
```

---

### Filter by Title

```
GET /notes?title=REST
```

---

### Filter by Description

```
GET /notes?description=test
```

---

### Combined Filter

```
GET /notes?title=REST&description=test
```

---

# Common Mistakes

Typical mistakes when implementing filtering:

* using string concatenation for SQL queries
* forgetting to handle empty filters
* forgetting to sanitize input
* forgetting deterministic ordering (`ORDER BY`)
* mixing filtering logic into the controller instead of the model

---

# Reflection Questions

Answer the following questions.

### Question 1

What is the difference between

```
GET /notes/5
```

and

```
GET /notes?id=5
```

---

### Question 2

Why should query parameters be used for filtering instead of path parameters?

---

### Question 3

Why is it important to use parameterized SQL queries?

---

### Question 4

Why should filters be optional?

---

### Question 5

Why is `ORDER BY` important before implementing pagination?

---

# Preparation for the Next Exercise

In the next exercise you will implement:

* pagination
* limit
* offset
* maximum page size

These features will extend the filtering mechanism implemented here.
