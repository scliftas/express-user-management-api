# Express User Management API

Basic user CRUD API built with Express, backed by a Redis instance.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

A Docker image and compose file are provided to run the API and Redis within. Uses volumes to allow for hot reloading within the container.

### Installing

A step by step series of examples that tell you how to get a development env running

Start the Docker containers using docker-compose. This will build and run the Docker image and Redis instance.

```
docker-compose up express-user-management-api
```

Once the output shows `App listening on port 3500`, the API should now be consumable at http://localhost:3500. 

### Testing

See the included Postman collection for easy testing.

## Authors

* **Shaun Clift** - *Initial work*