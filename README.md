# Task Management API

Task Management API is a RESTful API for managing tasks. Users can create, retrieve, update, and delete tasks, with optional features like authentication and rate limiting.

## Table of Contents
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the API](#running-the-api)
- [Task Structure](#task-structure)
- [Endpoints](#endpoints)
- [Authentication](#authentication)
- [Error Handling](#error-handling)
- [Logging](#logging)
- [Rate Limiting](#rate-limiting)

## Getting Started

### Prerequisites
Before you begin, ensure you have the following requirements:
- Node.js
- npm installed.

### Installation

1. Clone this repository:

- git clone <br/>
- cd task-management-api

2. Install dependencies:
- npm install

3. Create a `.env` file with the following variables:
- `mongourl`: Your MongoDB Atlas URL
- `port`: Port for the API (e.g., 8080)
- `secrete`: Your secret key for authentication (provide a value)
### Running the API
Start the API server:

The API will be accessible at http://localhost:3000 by default.

## Task Structure
Each task should have the following properties:
- ID
- Title
- Description
- Creation Date
- Status (e.g., pending, completed)

## Endpoints

- `POST /task/addtask`: Add a new task.
- `GET /task/gettask`: Retrieve a list of all tasks.
- `GET /task/:id`: Retrieve a specific task by ID.
- `PUT /task/updatetask/:id`: Update a specific task by ID.
- `DELETE /task/deletetask/:id`: Delete a specific task by ID.

## Authentication Endpoints

- `POST /user/register`: Register a new user.
- `POST /user/login`: Authenticate and log in a user.

## Authentication
To use authentication, users must register and log in to manage tasks. Protected endpoints require authentication.

## Error Handling
Appropriate HTTP status codes and error messages will be returned in case of errors.

## Logging
API requests and responses can be logged in a `log.txt` file.

## Rate Limiting
Rate limiting is applied to restrict the number of requests from clients within a specified time period.


<h1 align="center">✨Thank You✨</h1>
