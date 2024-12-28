# Node.js Video Render Server 📦

A backend server for video render built with **Node.js**, **Express.js**, **Remotion** and **Supabase**. 🚀

---


## Tech Stack 🛠️

- **NodeJS, ExpressJS, Typescript**
- **Remotion**
- **Supabase**
- **Redis**

---

## Endpoints 📡

1. **POST** `/api/video/render` - Render video with given data 
    - require: ```accessToken``` in ```req.body```

---

## Installation 📥

1. Create a `.env` file in **src** folder

```bash
SUPABASE_URL=your-supabase-url
SUPABASE_ANON_KEY=your-anon-key
PORT=5000
```

2. Install dependencies and run server

```bash
npm install
npm run dev
```
