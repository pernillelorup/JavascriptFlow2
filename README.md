# JavascriptFlow2

## Why would you consider a Scripting Language as JavaScript as your Backend Platform?

* It's easy and fast to build and setup a working network application with node.js and the right editor.
* It's very handy that you can use the same language both in front-end and in the back-end.
* Not a lot of code is required for an application to run.

## Explain Pros & Cons in using Node.js + Express to implement your Backend compared to a strategy using, for example, Java/JAX-RS/Tomcat

| Pros        | Cons            |
| ------------- |:-------------:| 
| You can make a good and responsive network application, if done right.  | Java is good at handling CPU heavy tasks, Node.JS + Express is not. Because Node is, despite its asynchronous event model, by nature single threaded. When you launch a Node process, you are running a single process with a single thread on a single core. So your code will not be executed in parallel, only I/O operations are parallel because they are executed asynchronous. As such, long running CPU tasks will block the whole server and are usually a bad idea | 
| Allows the use of data streaming, web sockets and fast file uploads | Java integrates well with relational databases like MySQL. Node.JS + Express does not, they have mongoDB but that isn't relational  | 
| It's easy to set up a REST-API with generators like a custom boilerplate project, yeomon or express and mongoDB | Java as oppposed to Node.JS + Express is a strictly typed language which provides a certain security.  | 
| It is efficient at handling thousands of concurrent requests (For example - a chat application). | 500 errors in Node.JS and Express will crash the entire application, Java will not   | 
| It is very simple to implement server middleware, that will be executed between all requests. |          | 
|          |           | 


## Node.js uses a Single Threaded Non-blocking strategy to handle asynchronous task. Explain strategies to implement a Node.js based server architecture that still could take advantage of a multi-core Server.


#### Explain briefly how to deploy a Node/Express application including how to solve the following deployment problems:

##### Ensure that you Node-process restarts after a (potential) exception that closed the application

##### Ensure that you Node-process restarts after a server (Ubuntu) restart
      
##### Ensure that you can take advantage of a multi-core system

##### Ensure that you can run “many” node-applications on a single droplet on the same port (80)

### Explain the difference between “Debug outputs” and application logging. What’s wrong with console.log(..) statements in our backend-code.

### Demonstrate a system using application logging and       “coloured” debug statements.

### Explain, using relevant examples, concepts related to testing a REST-API using Node/JavaScript + relevant packages 

### Explain, using relevant examples, the Express concept; middleware.
   
### Explain, using relevant examples, how to implement sessions and the legal implications of doing this.

### Compare the express strategy toward (server side) templating with the one you used with Java on second semester.

### Demonstrate a simple Server Side Rendering example using a technology of your own choice (pug, EJS, ..).

### Explain, using relevant examples, your strategy for implementing a REST-API with Node/Express and show how you can "test" all the four CRUD operations programmatically using, for example, the Request package.

### Explain, using relevant examples, about testing JavaScript code, relevant packages (Mocha etc.) and how to test asynchronous code.
      
### Explain, using relevant examples, different ways to mock out databases, HTTP-request etc.

### Explain, preferably using an example, how you have deployed your node/Express applications, and which of the Express Production best practices you have followed.



## NoSQL, MongoDB and Mongoose

### Explain, generally, what is meant by a NoSQL database.

### Explain Pros & Cons in using a NoSQL database like MongoDB as your data store, compared to a traditional Relational SQL Database like MySQL.

### Explain reasons to add a layer like Mongoose, on top on of a schema-less database like MongoDB

#### These two topics will be introduced in period-3

##### Explain about indexes in MongoDB, how to create them, and demonstrate how you have used them.
##### Explain, using your own code examples, how you have used some of MongoDB's "special" indexes like TTL and 2dsphere

### Demonstrate, using a REST-API you have designed, how to perform all CRUD operations on a MongoDB

### Explain the benefits of using Mongoose, and demonstrate, using your own code, an example involving all CRUD operations

### Explain the “6 Rules of Thumb: Your Guide Through the Rainbow” as to how and when you would use normalization vs. denormalization.

### Demonstrate, using your own code-samples, decisions you have made regarding → normalization vs denormalization 

### Explain, using a relevant example, a full JavaScript backend including relevant test cases to test the REST-API (not on the production database)

