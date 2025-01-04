# MATIK DEVELOPMENT ENV SETUP
- This guide will help you get started with development.

## Pre-requisite:

**1.	Collaborator Access:**
-	Ensure you have been granted collaborator access to contribute to this private repository.

**2. SSH Setup**
-	Add your SSH public key to your GitHub account
- Configure your Git user details
```bash
git config --global user.name "username"
git config --global user.email "email@example.com"
```

# Installation
**1. Clone the Original Repository**
```bash
git clone git@github.com:matikdotapp/env.git
```  

**2. Install Dependencies**
```bash
cd repository && bun i
```
- Note: You need to install bunJS globally first.

**3. Run Script:**
```bash
bun run build:env
```
-	This will pull other code repositories needed. e.g. frontend, gateway, services