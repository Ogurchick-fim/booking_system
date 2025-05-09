# 🧠 MentalX – AI-powered Psychologist Booking Platform

MentalX is a full-stack web platform that allows users to:
- Book appointments with psychologists,
- Apply as a psychologist,
- Schedule and manage interviews (admin),
- Use an integrated AI chatbot for mental health support.

Built with:
- 🧱 **React** + **Tailwind CSS** (Frontend)
- 🔐 **Supabase** (Auth, DB, Storage)
- 🤖 **OpenAI API** (Chat Assistant)
- ⚙️ **Express.js** server (AI chat proxy)

---

## 📸 Screenshots
<img width="766" alt="Screenshot 2025-05-09 at 8 04 22 PM" src="https://github.com/user-attachments/assets/e18627e8-ee34-43e8-911d-6d63e31ce876" />
<img width="1470" alt="Screenshot 2025-05-09 at 7 37 18 PM" src="https://github.com/user-attachments/assets/9aa7174d-5155-4e74-a104-9a47f3b1396b" />
<img width="1470" alt="Screenshot 2025-05-09 at 7 37 05 PM" src="https://github.com/user-attachments/assets/9fad0f71-6ea0-43f8-9430-77201e25e1dd" />
<img width="1470" alt="Screenshot 2025-05-09 at 7 36 59 PM" src="https://github.com/user-attachments/assets/c7256656-30fd-4522-b3a4-b2922e3f68ce" />
<img width="1470" alt="Screenshot 2025-05-09 at 7 36 50 PM" src="https://github.com/user-attachments/assets/ebcc6916-a88f-497a-aecb-7cabcd866dc8" />
<img width="1470" alt="Screenshot 2025-05-09 at 7 36 37 PM" src="https://github.com/user-attachments/assets/93a9d9a9-d9ba-4ff9-a54c-f87f07a6aa83" />
<img width="1470" alt="Screenshot 2025-05-09 at 7 36 28 PM" src="https://github.com/user-attachments/assets/4660103a-02ef-441e-97a9-941323de7a16" />
<img width="1470" alt="Screenshot 2025-05-09 at 7 36 19 PM" src="https://github.com/user-attachments/assets/a67023e7-ecb9-4f3f-be00-1e84b166a15c" />
<img width="1470" alt="Screenshot 2025-05-09 at 7 36 07 PM" src="https://github.com/user-attachments/assets/cf9bbcbd-3630-4d41-b48c-71271a420d61" />

---

## 🚀 Features

- **Role-based authentication**: user, psychologist, admin (Supabase)
- **Psychologist registration form** with file upload and schedule grid
- **Admin interview scheduling panel** with link + datetime input
- **Interview tracking** and approval/rejection system
- **Supabase storage** for CVs and documents
- **OpenAI chatbot** for user support
- **i18n multilingual support** (EN, RU, KG)
- **RLS security policies** for user data access
- **Realtime updates** using Supabase DB triggers

---

## 🛠 Setup

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/mentalx.git
cd mentalx
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup Supabase

- Create a [Supabase](https://supabase.io/) project.
- Create tables from `/database/schema.sql`
- Enable RLS and apply policies from `/database/policies.sql`
- Set your `SUPABASE_URL` and `SUPABASE_ANON_KEY` in `.env`

### 4. Setup backend server for chat (port 5001)

```bash
cd backend
npm install
node chat.js
```

### 5. Run the frontend (Vite)

```bash
npm run dev
```

---

## 📂 Folder Structure

```
/src
  /pages
  /components
  /contexts
/backend
  chat.js
/supabase
  schema.sql
/screenshots
  *.png
```

---

## 📝 Project Report

### 🔍 Objective

MentalX aims to connect individuals with psychologists through a digital platform. It also assists admins in managing interviews and tracks the psychologist approval process.

### 🧩 Architecture

- **Supabase** handles auth, role management, and data storage.
- **React** frontend dynamically renders content based on role.
- **Express** server acts as a middleware for OpenAI API requests.
- **Multilingual support** enables interface access in 3 languages.

### 📈 Flow Diagram

1. User signs up → chooses role → redirected to role-based dashboard.
2. Psychologist submits form with documents + schedule.
3. Admin schedules interview → psychologist gets notified.
4. Admin marks result → approved psychologists shown on site.
5. Any user can chat with AI assistant.

### 🧪 Testing

- Manual end-to-end testing done across roles (user/psychologist/admin).
- Form validation, error catching, and server downtime were handled.

### 🔐 Security

- Supabase RLS policies restrict access by user ID.
- Authenticated routes for psychologist data access.
- Admin-only routes for scheduling and status updates.

---

## 📬 Contact

For issues or contributions, open an issue or PR on GitHub.

---
