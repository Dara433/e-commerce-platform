# Automating-Pipeline-for-an-E-commerce-Platform-Using-Github-Actions

We created a new git remote repository and named it as `e-commerce-platform. 
Next we created a new directory on our terminal, name it `e-commerce-api`  




 ## Backend API Project Setup

Next, we navigated into this directory and created a few more directories listed below

1. `.github/workflows` - This directory will store our workflows files ( **YAML** configuration files ) for Continuous Integration with our Git repository 
2. `api` for the backend: hosts everything that powers the backend. Routes, Controllers and models
3. `index.js` is the entry point for our server and jJavaScript production environment, it sets up a working server that listens for requests and delegates handling to the correct routes. It’s the brain of the operation, routing requests to where they’re handled.
4. `index.test.js`: A dedicated testing environment for our server. With `jest` as our JavaScript testing framework. 
5. `Dockerfile`: Configuration file used by Docker Hub to build and containerize our application.  





## Initializing Github Actions

 We navigated to `e-commerce-api` directory and initilized it as a git repository. This shows up as a hidden `.git` directory in the current folder. Initializing git enables git to track and monitor changes in this folder. 

![alt text](img/2..png)




## Backend API Setup and Installing Dependencies

To setup the backend, there is a series of application / packages we need need to install, JavaScript being one of them, it allows us to interact with our backend servers.

To get JavaScript running in our backend `api` directory, we need to create the `Node.js` environment - a runtime environment that lets us run JavaScript code.


To start a JavaScript runtime environment, `npm` - Node package manager is required. It helps to create a new `package.json` file, which sets up the project's dependencies, scripts, metadata and versioning that is essential for installing packages and deploying apps.

By running the command **npm init -y** we initializa a `Node.js` environment that is essential for JavaScript, this command automatically creates a `package.json` file

Then `npm install` which installs dependencies `package-lock.json` file 


**Note: we might run into an error "npm: command not found" when trying to execute the node package manager, this usually happens when *Node.js* and npm aren't installed on your local machine*
To install Node.js, go to <https://nodejs.org/en/download>, may need to close and reopen terminal for changes to take effect**


After successfully installing `Node.js`, we ran the following and initialized our JavaScript runtime environment.

![alt text](img/1..png)

 <u>Installing Dependencies</u>

 - Express
 - body-parser

`Express` a minimal and flexible web framework application for `Node.js` that creates our server, defines and handles routing, and handles middleware for parsing data, authentication and more. 

![alt text](img/3..png)


 `body-parser` (optional): helps process JSON requeest bodies, making it easier to handle form submissions or API request

![alt text](img/4..png)




## Backend API setup - continuation

 The following file was manually created in our `api`

![alt text](img/6..png)

 
`index.js` is the entry point for our server, it sets up a working server that listens for requests and delegates handling to the correct routes. It’s the brain of the operation, routing requests to where they’re handled.

 and the code; 

![alt text](img/5..png)

Note: *Embedded in the code is an importer that imports router objects from `routes/products`, `routes/Login` and `routes/Orderpage`. Using the router with `app.use()` connects it to the route path* 

More of this later. 


**Other Core API directories** 


- `routes`: Defines our API endpoints.

- `Controllers`: Handles logic for each route

- `models`: Structures data (especially useful when adding a database)

![alt text](img/7..png)

In the routes directory, - our route pages,`products.js`, `login.js` & `OrderPage.js` file were created. This file defines how our app handles product-related API request.

**product.js**

![alt text](img/8..png)





 **<u>Connection between routes files and index.js</u>**


In the `routes/products.js` core file, `module.exports` sends the router object out of the file, making it available for import in other parts of your app. 

![alt text](img/9..png)


Embedded in `index.js` code is an importer that imports router objects from the routes files 

![alt text](img/10..png)

Note that the import path correctly specifies the location of the route files in the api directory. 


Using the router with `app.use()` connect it to the route path. 
this tells express: whenever someone visits /products, use the logic inside `productRoutes` to respond.

**The same goes for all other route pages.**



Next, we ran the app by executing the file `index.js`. Hence, starting the full `Express` server, and delegating product-related traffic to the router defined in `products.js`

![alt text](img/12..png)

We tested the endpoints for our products page by going to the browser and inputing  

    http://localhost:3000/products


![alt text](img/11..png)

*Note that we have created our back end with Express server which runs on `localhost:3000`*





 

## Continuous Integration Workflow for Backend API

## Setting up Github workflow

In our backend api, create a new file, name it `build.yml` this is 

![alt text](img/21..png)

**Explanation of the script**

 <u>Step1: Checkout Action</u>

Checks out your repository so the workflow can access the code

 <u>Step 2: Set up Node.js</u>

This installs and configures the specifies Node.js version, in the workflow. We've used Node version 22


<u>Step 3: Cache Node.js dependencies</u>

It caches Node.js dependencies to speed up builds by avoiding repetitive npm install runs.
It uses GitHub's caching action to store the `~/.npm` folder and creates a unique cache key based on the operating system and the `package-lock.json` file. If an exact match isn't found, it falls back to older cache versions with a partial key.
This facilitates faster builds, less downloading—more time for coding

 <u>Step 4: Installs Dependencies</u>

Installs step uses a shell command (`npm ci`), "CI" means clean install. It installs dependices based on `package-lock.json`

 <u>Step 5: Run test</u>

Also a shell command (`npm test`). This executes the test suite.

Note that to run a test, a separate test file must be created named as `index.test.js`. And our `package.json` needs to define the test script.

![alt text](img/13..png)


As we see from the script above, `jest` a popular framework for testing is used.
We must install `jest` in our api directory for this to work. 

Here are the commnad needed to install Jest

![alt text](img/15..png)

`Supertest`: a Node.js library designed specifically for testing HTTP APIs, it helps simulate HTTP requests directly to Express app without needing external tools like Postman or Curl. Here is how we installed supertest. 

![alt text](img/14..png)

- Next we need to update the `index.test.js` file to include  jest test logic
![alt text](img/16..png)

The setup assumes routes supports `GET` requests and respond with status 200 for all API routes request.

To Run test simply use the command `npm test`

![alt text](img/17..png)

*Note that all routes `Login.js`, `OrdePage.js`, `products.js` must contain code to respond to `GET` request, otherwise an error would occur* 




<u>Step 6: Building the application</u>


Another shell command (`npm run build`). It tells the Node Package Manager (npm) to execute a script named `build` that's defined in the project's `package.json file`. 

![alt text](img/18..png)

You would notice what we echoed "No build step necessary for this Express app"
A couple of reason why we have this 

1.  Pure JavaScript Runtime: `Node.js` executes JavaScript files directly. There's no compilation, bundling, or transpilation required unless you're using TypeScript or JSX.
2.  No Frontend Assets to Compile: Since we are working purely with backend logic (routes like /orders, /login), there's no HTML, CSS, or frontend JavaScript being built or bundled.
3.  Direct node index.js Execution: Our entry file index.js runs as-is using the Node.js runtime, which means your application boots immediately with no transformation.






<u>Step 7: Set up Docker Buildx</u>

This It sets up Docker Buildx, an advanced tool for building Docker images.



<u>Step 8: Log in to DockerHub</u>

The calls the official docker action to log in, supplies DockerHub username and password, that is securly stored as a secret in 
githubsettings -- Secrets and variables ---- Actions -- Repository Secrets

![alt text](img/19..png)


<u>Step 9: Build and Push Docker Image</u>

Here we push docker images to the DockerHub registry - a self contained platform - ensuring the image is ready for deployment whenever and wherever its needed. 

To push a docker image, we need a `Dockerfile`, we created and placed this file in our root repository. 

![alt text](img/20..png)


<u>Dockerfile: script Explanation</u>

- Specifies what base image we want to use from Docker. `node:22-alpine` lightweight official Docker image for Node.js version 22. 


- We set the working directory to `/app`, where Docker's default container's filesystem is located.


- The line `COPY package*.json ./` in the Dockerfile instructs Docker to copy any file from the current local directory that matches the pattern `package*.json` - typically `package.json` and `package-lock.json` - into the container’s working directory (/app). 

    *By isolating this step before installing dependencies with `npm ci`, Docker can cache the result of the installation.
    This means that if these files haven’t changed between builds, Docker will reuse the cached dependency layer—avoiding a fresh install and significantly speeding up the build process*

- `npm ci --only=production` excludes packages listed under `devDependencies` in our `package.json`. Installing only what is needed to run the app- not what's needed to develop or test it, hence, it speeds up run time for the production environment. 
 

- We copied the built files from our local `api` directory into the container's `/app/api` directory. 

- We've exposed our app to port 3000, the default express server port our app (index.js) listens to. 

- Finally, runs the `node api/index.js` application when the container starts up




Once `Dockerfile` is created, the rest of the code is executed to build the image, tag it and push to DockerHub account, 
its image is tagged as `my-node-app:latest`



## Continuous Deployment Workflow for Our Backend API


















