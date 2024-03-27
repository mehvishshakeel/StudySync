# Backend Tests (Using CURL)
Function Being Tested: Login
Test Case: Valid Credentials
Input:
```bash
curl -X POST http://localhost:3003/login -d '{"email": "arvikrishna03@gmail.com", "password": "1234"}' -H "Content-Type: application/json"
```
Expected outcome:
logged in Successfully


Function Being Tested: Login
Test Case: Invalid Credentials
Input:
```bash
curl -X POST http://localhost:3003/login -d '{"email": "arvikrishna03@gmail.com", "password": "1234tdgd"}' -H "Content-Type: application/json"
```
Expected outcome:
failed tologin


Function Being Tested: Login
Test Case: Non-existent user
Input:
```bash
curl -X POST http://localhost:3003/login -d '{"email": "invalid@gmail.com", "password": "tdgd"}' -H "Content-Type: application/json"
```
Expected outcome:
failed to login


Function Being Tested: Sign up
Test Case: Existing user
Input:
```bash
curl -X POST http://localhost:3003/signup -d '{"fname": "Jane", "lname": "Smith", "email": "new@email.com", "program": "Software Engineering", "password": "abcdef", "year": "2"}' -H "Content-Type: application/json"
```
Expected outcome:
user already exists


Function Being Tested: Sign up
Test Case: New user
Input:
```bash
curl -X POST http://localhost:3003/signup -d '{"fname": "Jane", "lname": "Smith", "email": "new@email.com", "program": "Software Engineering", "password": "abcdef", "year": "2"}' -H "Content-Type: application/json"
```
Expected outcome:
creates a new user


Function Being Tested: Sign up
Test Case: Incomplete input
Input:
```bash
arvindkri03/signup -d '{"fname": "Alice", "lname": "Johnson", "email": "alice@email.com", "program": "Engineering"}' -H "Content-Type: application/json"
```
Expected outcome:
invalid entry


Function Being Tested: Get user courses
Test Case: Valid user email
Input:
```bash
curl -X POST http://localhost:3003/user-courses -d '{"email": "arvikrishna03@gmail.com"}' -H "Content-Type: application/json"
```
Expected outcome:
invalid data


Function Being Tested: Get user courses
Test Case: Invalid user email
Input:
```bash
curl -X POST http://localhost:3003/user-courses -d '{"email": "invalid@gmail.com"}' -H "Content-Type: application/json"
```
Expected outcome:
invalid data


Function Being Tested: Get posts
Test Case: Valid Course ID
Input:
```bash
curl -X GET http://localhost:3003/posts/444
```
Expected outcome:
Gives you the Post


Function Being Tested: Get posts
Test Case: Invalid Course ID
Input:
```bash
curl -X GET http://localhost:3003/posts/abc
```
Expected outcome:
invalid data


Function Being Tested: Get posts
Test Case: Valid Course ID with no posts
Input:
```bash
curl -X GET http://localhost:3003/posts/401
```
Expected outcome:
No post found under this course ID


Function Being Tested: Delete posts
Test Case: Valid Post and User ID
Input:
```bash
curl -X DELETE http://localhost:3003/delete-post/2/2
```
Expected outcome:
Deleted Post


Function Being Tested: Delete posts
Test Case: Invalid Post ID
Input:
```bash
curl -X DELETE http://localhost:3003/delete-post/2/3
```
Expected outcome:
invalid data


Function Being Tested: Delete posts
Test Case: Invalid User ID
Input:
```bash
curl -X DELETE http://localhost:3003/delete-post/3/2
```
Expected outcome:
invalid data


Function Being Tested: Delete posts
Test Case: Missing one of them
Input:
```bash
curl -X DELETE http://localhost:3003/delete-post/2/
```
Expected outcome:
Data missing

