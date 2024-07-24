# Rule Engine Application

## Overview

This application is a rule engine that determines user eligibility based on attributes such as age, department, salary, and experience. It uses an Abstract Syntax Tree (AST) to represent and manage conditional rules, allowing for dynamic rule creation, combination, and evaluation.

## Features

- **Create Rules:** Define rules using a string format that gets converted into an AST.
- **Combine Rules:** Combine multiple rules into a single AST for more complex evaluations.
- **Evaluate Rules:** Check if the given data meets the criteria defined by the AST.
- **API Endpoints:** Interact with the backend through RESTful APIs.

## Tech Stack

- **Backend:** Node.js, Express.js
- **Frontend:** React.js
- **Database:** MongoDB

## Getting Started

### Prerequisites

- Node.js and npm installed
- MongoDB installed and running

### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/Abhishek058/rule-engine.git
   cd rule-engine
   ```

2. **Install Backend Dependencies**

   ```bash
   cd server
   npm install
   ```

3. **Install Frontend Dependencies**

   ```bash
   cd ../client
   npm install
   ```

4. **Start MongoDB**

   Ensure that MongoDB is running on your local machine:

   ```bash
   mongod
   ```

5. **Start the Backend Server**

   ```bash
   cd ../server
   npm start
   ```

6. **Start the Frontend Development Server**

   ```bash
   cd ../client
   npm start
   ```

## API Endpoints

1. **Create a Rule**
   - **Endpoint:** `/api/rules`
   - **Method:** POST
   - **Body:**

     ```json
     {
       "ruleString": "((age > 30 AND department = 'Sales') OR (age < 25 AND department = 'Marketing')) AND (salary > 50000 OR experience > 5)",
       "ruleName": "Rule 1"
     }
     ```
   - **Response:**

     ```json
     {
       "_id": "605c72ef1f4e3a001f4d2e9a",
       "rule_name": "Rule 1",
       "rule_ast": { ... }
     }
     ```

2. **Combine Rules**
   - **Endpoint:** `/api/rules/combine`
   - **Method:** POST
   - **Body:**

     ```json
     {
       "ruleIds": ["605c72ef1f4e3a001f4d2e9a", "605c730f1f4e3a001f4d2e9b"]
     }
     ```
   - **Response:**

     ```json
     {
       "type": "operator",
       "value": "AND",
       "left": { ... },
       "right": { ... }
     }
     ```

3. **Evaluate a Rule**
   - **Endpoint:** `/api/rules/evaluate`
   - **Method:** POST
   - **Body:**

     ```json
     {
       "rule": { ... },
       "data": {
         "age": 35,
         "department": "Sales",
         "salary": 60000,
         "experience": 3
       }
     }
     ```
   - **Response:**

     ```json
     {
       "result": true
     }
     ```

## Frontend Components

1. **CreateRule**
   - Allows users to create new rules by providing a rule string and rule name.
2. **CombineRules**
   - Combines multiple rules by their IDs into a single AST.
3. **EvaluateRule**
   - Evaluates a rule against provided data and displays the result.

## Running Tests

You can add and run tests to ensure everything is working correctly. Create tests in the backend and frontend directories, then run them using the respective test commands for each environment.
```
