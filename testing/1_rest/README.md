# REST testing with JEST and SuperTest

This exercise guides you through testing a REST service **code-based** using **Jest** and **SuperTest**.

Instead of using a real database (such as SQLite), an **in-memory storage** is used for simplicity. You will create tests for all implemented REST operations (**GET, POST, PUT, DELETE**), ensuring proper API functionality.


Now it is on you to create tests for all implemented REST-calls (**GET**/**POST**/**PUT**/**DELETE**).

Create at least one test for each method
- GET (all)
- GET (by id)
- POST 
- PUT
- DELETE.  

If you're not familiar with the service, check the code or simple start it (`npm start`) and test its behavior manually.

## Getting started
First, checkout this example repo. Make sure you have a working Node-Environment.
* install [Node.js](https://nodejs.org/en/) (LTS recommended)
* install [`npm`](https://www.npmjs.com/) or [`yarn`](https://classic.yarnpkg.com/en/)

```console
$ git clone https://git-iit.fh-joanneum.at/msd-webserv/ss24_techdemos/exercises/testing
$ cd testing/1_rest/
$ npm install
```

## Understanding the Test Structure

Check the [**app/app.test.js**](app/app.test.js), there you will find the predefined structure for the tests, as well as a example test and an example response from the *supertest* request.

```javascript
//...
  let request;

  beforeEach(() => {
    request = supertest(app);
  });
//...
```
this will create for **each** test a **fresh request object**, so that you can perform all tests independently.

When you execute `request.METHOD` (`.get`, `.post`, ...), you should get a response like the following. Don't forget that express will response **asynchron**! 
```json
{
  header: {
    connection: "close",
    "content-length": "235",
    "content-type": "application/json; charset=utf-8",
    date: "Thu, 23 Apr 2020 13:26:46 GMT",
    etag: 'W/"eb-56ncnmAl9D8OPBf6+c+/y6H9lzI"',
    "x-powered-by": "Express",
  },
  req: {
    data: undefined,
    headers: { "user-agent": "node-superagent/3.8.3" },
    method: "GET",
    url: "http://127.0.0.1:37573/notes",
  },
  status: 200,
  text:
    '{"notes":[{"id":1,"title":"my first note","description":"this is my first note"},{"id":2,"title":"learn testing","description":"learn how to test REST-APIs"},{"id":3,"title":"buy coffee","description":"need more coffee to code well"}]}',
}
```

With the `request` object, you can not just execute the HTTP-methods, you can also set individual headers or send a custom body.
```javascript
// ...

  request.post("/path")
         .send({ message: "some text" })      // with `send` you can send a custom body to the 'server' (like JSON, URL-encoded etc.)
         .set('Accept', 'application/json');  // with `set` you can set custom request headers
// ...
```

For more information, take a look on the [supertest docu](https://www.npmjs.com/package/supertest).

> supertest brings it's own possibility to assert the response. you can chain multiple `.expect()` calls (like `.then()` in a promise chain) and inside that, you can do the assertions.  

## Switch to 🤖 AI-Supported Learning

In this exercise, the use of AI tools (e.g., ChatGPT) is allowed—but with a clear purpose: **to support understanding, not to blindly generate solutions**.

Try working with **different levels of prompt detail**:

* Start with a very general request (e.g., “Write a Jest test for a REST API”)
* Gradually add more context (endpoint, data structure, expected response)
* Finally, include specific details from your own project

While doing this, observe:

* How does the quality of the results change?
* What parts do you still need to adjust manually?
* What does not work well without sufficient context?

The goal is to understand **how important precise context is for meaningful AI output** and to critically evaluate generated suggestions before using them.

Now use following AI supported Learning [Instruction](ai-supported-learning.md).

## Writing Basic Tests

### POST

Finalize the existing test `should add a new entry on valid POST`.

> 🟢 **CHECKPOINT TST-001: Create a document and add a screenshot showing the output of `npm test`. It should show only *passing* tests (no failing test). Also add a screenshot of your test-code in [app/app.test.js](app/app.test.js).**

We will test all implemented HTTP methods.

### PUT and DELETE

> In a Unit/Integration test environment, all tests should be able to run independed of each other! In a End2End test environment, it could be usefull to run different tests, that are depending on other tests.  
> So we are able to run different tests after each other, depending on the result of the test before!

First, we will extend our current test-suite, to "save" the id of the newly created note for other tests.  
Therefore, adapt the test `should add a new entry on valid POST` to save the id of returned note.

On the top level of our `describe` block, add a new variable called `created`.  
Inside of our `POST` test, where we create a new note, save the id of the newly created note in that variable.

```javascript
describe("end2end testing", () => {
    let request;
    let created;
    // ...

    it("should add a new entry on valid POST", async () => {
        const response = await request.post("/notes").send({
            title: "New Note",
            description: "This is a test note."
        });

        created = response.body.id; // Save ID
    });
});
```

Now, we are able to use this id in other tests.

> In our simple example, the id will always be 4. But what if it will be created randomly? So it is necessary to temporary save the value for other tests (=other functions/scopes).


Create additional tests using the stored `id`:

1. **Verify the new note exists (`GET /notes/:id`)**
   - Next, create a new test (**below** the POST test) that check's that we have now 4 notes. (`GET /notes`)
   - Create another test, that check's the new created note. (`GET /notes/<created>`)
2. **Update the note (`PUT /notes/:id`)**
   - Now, create a test, that does a PUT request on the new note  and changes the *title* and the *description*. (`PUT /notes/<created>`)
   - Modify `title` and `description`
   - Validate response status and content
   - Check the status code, content type and content
3. **Check the updated note (`GET /notes/:id`)**
   - Verify the *title* and *description* of the (new, now updated) note.
5. **Verify checking the total count (`GET /notes`)**
   - At last, create another test, that check's again the amount of notes (should be 4) 


> 🟢 **CHECKPOINT TST-002: Update the document and add a screenshot showing the output of `npm test`. It should show only *passing* tests (no failing test). Also add a screenshot of your added test-code in [app/app.test.js](app/app.test.js).**

4. **Delete the note (`DELETE /notes/:id`)**
   - At least, we will test the `DELETE` endpoint.
   - Create another test (**below** all other tests!) and `DELETE` the note with the `created` id.
   - Check the status code
5. **Verify deletion by checking the total count (`GET /notes`)**
    - As last test, check the amount of notes in your ReST API.

> 🟢 **CHECKPOINT TST-003: Update the document and add a screenshot showing the output of `npm test`. It should show only *passing* tests (no failing test). Also add a screenshot of your added test-code in [app/app.test.js](app/app.test.js).**

## *\[OPTIONAL\]* Test edge cases

We tested only the behaviour, when everything wents well. But tests should also test for possible errors and edge cases.

Therefore, create a **new** testfile (`app/errors.test.js`) and add some tests for unexpected behaviour.

for example:
- [ ] Request to **nonexistent endpoints**
- [ ] **POST/PUT with invalid data**
- [ ] **Invalid HTTP methods**
- [ ] **Requesting a deleted resource**
- [ ]  ...

> 🟢 ***OPTIONAL* CHECKPOINT TST-004: Update the document and add a screenshot showing the output of `npm test`. It should show only *passing* tests (no failing test). Also add a screenshot of your added test-code in [app/errors.test.js](app/errors.test.js).**


## Step by Step Guide

SuperTest is a high-level abstraction for testing HTTP, making it a valuable tool for testing API endpoints in Node.js applications. It works seamlessly with testing frameworks like Jest to allow for comprehensive testing of your HTTP interfaces. Notably, SuperTest enables testing without the need for a server to be actively listening for connections, which simplifies the testing setup and execution. Here’s a step-by-step guide to using SuperTest with Jest, highlighting its ability to test APIs without a running server:

### Step 1: Installing Dependencies

Start by adding Jest and SuperTest to your Node.js project. If you haven't installed Jest yet, include it along with SuperTest as follows:

```bash
npm install --save-dev jest supertest
```

### Step 2: Preparing Your Application for Testing

Assume you have a simple Express application (`app.js`) that you wish to test:

```javascript
const express = require('express');
const app = express();

app.get('/user', function(req, res) {
  res.status(200).json({ name: 'John Doe' });
});

module.exports = app;
```

### Step 3: Writing Tests with SuperTest

Create a test file, such as `app.test.js`. This is where you'll define HTTP requests using SuperTest. Importantly, you do not need to start your server; SuperTest handles the interaction with your application internally:

```javascript
const request = require('supertest');
const app = require('./app');

describe('GET /user', () => {
  it('responds with JSON containing a user', async () => {
    const response = await request(app)
      .get('/user')
      .set('Accept', 'application/json');
    
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ name: 'John Doe' });
  });
});
```

In this example, we're testing the `/user` endpoint to ensure it returns a JSON object with user information. Note how SuperTest interacts with the Express application directly, without requiring the server to be started manually.

### Step 4: Running Your Tests

Ensure your `package.json` includes a script to run Jest:

```json
"scripts": {
  "test": "jest"
}
```

Then execute your tests using:

```bash
npm test
```

### Step 5: Understanding the Results

Jest will report the outcome of your tests, detailing which tests passed and which failed. This feedback loop helps you quickly identify and address any issues with your API.

### Conclusion

SuperTest, in conjunction with Jest, offers a powerful and efficient means of testing HTTP APIs in Node.js applications. Its ability to test APIs without the need for a live server simplifies the setup process and makes it easier to integrate testing into your development workflow. This approach ensures that your API behaves as expected under various conditions, enhancing the reliability and robustness of your application.
