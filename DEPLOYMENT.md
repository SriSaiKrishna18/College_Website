# 🚀 Deployment Guide for SPARK Student Portal

This guide will help you deploy the SPARK Student Portal for **free** using modern hosting platforms.

---

## Option 1: Vercel (Recommended for Best UI Performance)
Vercel is perfect for hosting the frontend and can also host the Node.js backend as serverless functions.

### Steps:
1. **Sign Up/Login**: Go to [vercel.com](https://vercel.com) and log in with GitHub.
2. **Add New Project**:
   - Click **"Add New..."** > **"Project"**.
   - Import your `College_Website` repository.
3. **Configure Project**:
   - **Framework Preset**: select "Other" or leave as default.
   - **Root Directory**: `./` (default).
   - **Environment Variables**: Add the following:
     - `DB_HOST`: (Your database host)
     - `DB_USER`: (Your database user)
     - `DB_PASSWORD`: (Your database password)
     - `DB_NAME`: (Your database name)
4. **Deploy**: Click **"Deploy"**.

**Note:** If you don't have a database yet, the portal will automatically use **Demo Mode** so you can still interact with the UI!

---

## Option 2: Render (Best for Full Backend + Database)
Render offers a free tier for Node.js web services and PostgreSQL/MySQL.

### Steps:
1. **Sign Up**: Go to [render.com](https://render.com).
2. **Create Database**:
   - Click **"New +"** > **"PostgreSQL"** (or MySQL if available).
   - Copy the `Internal DB URL`.
3. **Create Web Service**:
   - Click **"New +"** > **"Web Service"**.
   - Connect your GitHub repo.
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment Variables**: Add your `DB_*` variables here.
4. **Deploy**: Click **"Create Web Service"**.

---

## Option 3: Railway (Easiest Full Stack)
Railway creates the database and backend for you automatically.

1. Go to [railway.app](https://railway.app).
2. Click **"Start a New Project"** > **"Deploy from GitHub repo"**.
3. Select your repository.
4. Add a Database (MySQL) to your project canvas.
5. Railway will automatically inject the database environment variables!

---

## ⚡ Quick Test
Once deployed, check your URL.
- **Frontend**: Should load the login page.
- **Demo Login**: Use `STU001` / `password123`.

## 🆘 Troubleshooting
- **"500 Server Error"**: Usually means database connection failed. Check your Environment Variables.
- **"404 Not Found"**: Check your `vercel.json` routes or Root Directory settings.
