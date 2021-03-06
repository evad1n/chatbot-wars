![Build & Deploy](https://github.com/evad1n/chatbot-wars/actions/workflows/build.yml/badge.svg)

# Chatbot Wars

Make a chatbot, watch it crash and burn

[->Link to app<-](https://chatbot-wars.herokuapp.com/)

Design docs located in [design folder](./design/)

----

## Tech stack

- Backend
    - Go
        - Gin router
        - MongoDB Driver
    - MongoDB
- Frontend
    - React
        - Material UI
        - React router
        - Axios
- Deployment
    - Heroku
        - Serve API and static files from prod branch
    - GitHub Workflows
        - Build to prod branch

---
## Resource

**Users**
- firstName (string)
- lastName (string)
- username (string)
- password (string[hashed])


**Bots**
- name (string)
- greetings ([]Line)
- questions ([]Line)
- responses ([]Line)

Line
- text (string)
- mood (int)

---
## API Endpoints

Prefixed with /api

### **Sessions**

Name                           | Method | Path                              | RequireAuth
-------------------------------|--------|-----------------------------------|------------
Log in                         | POST   | /sessions                         | No
Get logged in user info        | GET    | /me                               | Yes

### **Users**

Name                           | Method | Path                              | RequireAuth
-------------------------------|--------|-----------------------------------|------------
Create user                    | POST   | /users                            | No


### **Bots**

Name                           | Method | Path                              | RequireAuth
-------------------------------|--------|-----------------------------------|------------
Retrieve bots collection       | GET    | /bots                             | No
Retrieve user bots             | GET    | /users/bots                       | Yes
Retrieve bot                   | GET    | /bots/*:id*                       | Yes
Create bot                     | POST   | /bots                             | Yes
Update bot                     | PUT    | /bots/*:id*                       | Yes
Delete bot                     | DELETE | /bots/*:id*                       | Yes

### **Lines**

Name                           | Method | Path                              | RequireAuth
-------------------------------|--------|-----------------------------------|------------
Add line to bot                | POST   | /bots/*:id*/*:lineType*           | Yes
Delete line from bot           | DELETE | /bots/*:id*/*:lineType*/*:index*  | Yes

### **Rooms**

Name                           | Method | Path                              | RequireAuth
-------------------------------|--------|-----------------------------------|------------
Start a room with a websocket  | WS   | /rooms                            | No

### **Other**

Name                           | Method | Path                              | RequireAuth
-------------------------------|--------|-----------------------------------|------------
See if bot name is taken       | GET    | /unique/bots/*:name*              | No
See if username is taken       | GET    | /unique/users/*:username*         | No
