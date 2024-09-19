# Project Roles and Installation Guide Bigbox 

## Roles

### Super Admin
  - Full control over the system including user management, technical settings, and data backup.
  - Ensures smooth and secure operation of the system according to company needs.

### Admin (CRM Manager)
  - Manages the CRM team and oversees event analytics and management.
  - Monitors event progress and manages reports.

### CRM Team
  - Handles assigned events.
  - Updates event progress and generates event reports.

## Installation Guide

### Node.js

1. **Download and Install**:
   - Visit [Node.js official site](https://nodejs.org/) and download the installer for your operating system.
   - Follow the installation instructions.

2. **Verify Installation**:
   - Open terminal or command prompt and run:
     ```bash
     node --version
     ```

### MongoDB

1. **Download and Install**:
   - Go to [MongoDB official site](https://www.mongodb.com/try/download/community) and download the Community Server edition.
   - Follow the official guide for installation based on your operating system.

2. **Verify Installation**:
   - Run:
     ```bash
     mongo --version
     ```

### Express.js

1. **Setup**:
   - Assuming Node.js is installed, run:
     ```bash
     npm install express --save
     ```
   - This will install Express.js and save it to your package.json file.

### Routes

1. **Basic Route Setup**:
   - Example route configuration in Express.js:
     ```javascript
     const express = require('express');
     const app = express();

     app.get('/', function (req, res) {
       res.send('Hello World!');
     });

     app.listen(3000, function () {
       console.log('App listening on port 3000!');
     });
     ```
