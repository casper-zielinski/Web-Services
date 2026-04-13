# 📌 What to Test (Web Services)

When testing web services, it is important to understand that testing is not limited to checking whether a request returns a response. Instead, you need to verify that the service behaves correctly under different conditions, follows the expected protocols, and handles both valid and invalid input properly.

In this repository, the focus lies on two main types of web services:

* **REST APIs** (request-response based)
* **WebSockets** (persistent, real-time communication)

---

## 1. Functional Behavior

The most basic aspect of testing is verifying that the service does what it is supposed to do.

* valid input should produce the expected output
* operations should behave correctly (e.g. create, read, update, delete)
* responses should match the intended functionality

### Examples

* REST: `GET /notes` returns a list of notes
* WebSocket: sending a message results in the correct response (e.g. echo)

---

## 2. Protocol Behavior

Web services must follow specific communication protocols. Testing should ensure that these protocols are used correctly.

### REST (HTTP-based)

* correct HTTP methods are used (`GET`, `POST`, `PUT`, `DELETE`)
* correct status codes are returned (e.g. `200`, `201`, `400`, `404`, `500`)
* headers and content types are correct (e.g. `application/json`)

### WebSocket

* connection can be established successfully
* messages are sent and received correctly
* message format is valid (e.g. JSON or text)
* connection can be closed cleanly

---

## 3. Data Validation

Services must validate incoming data before processing it.

* required fields must be present
* data types must be correct
* invalid input should be rejected

### Examples

* missing required field in a POST request
* sending invalid JSON
* malformed WebSocket message

---

## 4. Error Handling

A robust service must handle errors gracefully and predictably.

* invalid requests should return meaningful errors
* non-existing resources should be handled correctly
* unexpected failures should not crash the system

### Examples

* REST: requesting a non-existent resource returns `404`
* REST: invalid input returns `400` or `500`
* WebSocket: invalid message is handled without breaking the connection

---

## 5. State and Data Consistency

Testing should ensure that the system maintains correct state and data over time.

### REST

* created resources can be retrieved
* updated data is stored correctly
* deleted resources are no longer accessible

### WebSocket

* message sequences are handled correctly
* multiple messages are processed in order
* interactions between multiple clients behave as expected

---

## 6. Edge Cases

Good tests go beyond normal scenarios and include unusual or extreme inputs.

* empty inputs (e.g. empty body or message)
* very large payloads
* repeated or duplicate requests/messages
* concurrent usage (especially relevant for WebSockets)

---

## Summary

Testing web services means verifying more than just successful responses. A complete test strategy should include:

* correct functionality
* proper protocol usage
* validation of input data
* handling of errors
* consistency of state
* coverage of edge cases

Only by covering all these aspects can you ensure that a web service behaves reliably in real-world scenarios.
