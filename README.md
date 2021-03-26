# Chatbot Wars

Make a chatbot, watch it crash and burn

[->Link to app<-](https://chatbot-wars.herokuapp.com/)

[Assignment](http://cit.dixie.edu/cs/4200/assignments/passport.xhtml)

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


**For Rooms**

Transcript
- []Message

Message
- Name
- Line

---
## API Endpoints

Prefixed with /api

### **Users**

Name                           | Method | Path
-------------------------------|--------|------------------
Create user                    | POST   | /users

### **Sessions**

Name                           | Method | Path
-------------------------------|--------|------------------
Log in                         | POST   | /sessions
Get logged in user info        | GET    | /me

### **Bots**

Name                           | Method | Path
-------------------------------|--------|------------------
Retrieve bots collection       | GET    | /bots
Retrieve bot                   | GET    | /bots/*:id*
Create bot                     | POST   | /bots
Update bot                     | PUT    | /bots/*:id*
Delete bot                     | DELETE | /bots/*:id*

### **Lines**

Name                           | Method | Path
-------------------------------|--------|------------------
Add line to bot                | POST   | /bots/*:id*/*:lineType*
Delete line from bot           | DELETE | /bots/*:id*/*:lineType*/*:index*

### **Rooms**

Name                           | Method | Path
-------------------------------|--------|------------------
Create a room                  | POST   | /rooms
Get transcript from a room     | GET    | /rooms/*:roomHash*
Add a bot to a room            | PUT    | /rooms/*:roomHash*/*:botID*
Delete a room                  | DELETE | /rooms/*:roomHash*

### **Other**

Name                           | Method | Path
-------------------------------|--------|------------------
See if bot name is taken       | GET    | /unique/bots/*:name*
See if username is taken       | GET   | /unique/users/*:username*