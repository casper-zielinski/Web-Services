# What is OpenAPI, which problems does it solve, and how does it improve the quality and usability of APIs?

OpenAPI is a standard, language-agnostic (not dependent on the programming language,framwork,technologies) specification
for describing RESTful APIs. It is like a Blueprint / Contract for Web Services / API's readable by both humans and machines to understand the capabilities 
of a service without needing additional documentation or the actual source code

One of the biggest problems, especially in big teams is the communication between the backend and frontend teams, especially when it comes to API Design. The same problem has a big team of 
frontend developers, when everyone has a different design idea and no desing to guide them, like a figma mockup, you get a app with no consistent design. This is why OpenAPI shines the brightest in a API-First Development. Teams use OpenAPI to define the "contract" (the spec file) before writing any backend code. The frontend teams uses the spec to create mocks, while the backend team uses it as a coding guide. Similar to how frontend developers use a figma mockup to guide them how to style their app. It is even more poweful than that, provind tools for Automatisation, Live-Validation etc.

It also improves the quality of the API when developers use the OpenAPI Design they decided on, every endpoint is similar/consistent to another, creating a better DX for external users. It also enables a fast and easy way to test api's not only manualy but also generate test's and even SDK's for other languages.

In this project, OpenAPI is used to document all the todo API Endpoints and with Swagger UI, having a visible Documentation on how the API's work. It also comes with a built in testing environment, being able to not only test the get request but also all the other methodes and set parameters and querys easily