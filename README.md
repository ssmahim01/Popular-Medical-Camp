<div align="center">
  <img width="100%" height="360" src="/public/image-of-popular-medical-camp-website.png" />
</div>

---

# 🏥 Popular Medical Camp

**Popular Medical Camp** is a web-based application for managing participant registrations, payments, and confirmation statuses at medical camp events. It helps organizers efficiently track and manage participants. Additionally, an AI-powered image generation API is implemented, allowing both user roles to generate images. This feature is accessible after login.

[![Website](https://img.shields.io/badge/Live%20Demo-Popular%20Medical%20Camp-brightgreen)](https://popular-medical-camp.web.app)  
[![Backend Repository](https://img.shields.io/badge/Backend%20Repository-Click%20Here-blue)](https://github.com/ssmahim01/popular-medical-camp-server)  

---

## 🚀 Features

1. **Secure Login for Organizers:** Organizers can log in securely to manage camp registrations.
2. **Search Functionality:** Search participants by name, camp name, fees, or statuses with a dynamic search bar.
3. **Pagination:** View registered participants with a paginated interface for better data navigation.
4. **Participant Confirmation:** Change the confirmation status of participants directly from the interface.
5. **Payment Status Tracking:** Easily identify participants who have paid or are yet to pay.
6. **Cancel Registrations:** Cancel registrations for participants with pending payment or unconfirmed status.
7. **Real-Time Updates:** Data is fetched and updated in real-time with React Query.
8. **Custom Items Per Page:** Choose how many participants are displayed per page with adjustable pagination.
9. **Responsive Design:** Fully responsive layout for seamless use across devices.
10. **User-Friendly Dashboard:** Intuitive design with clean visuals for organizers to manage tasks efficiently.

---

## 📌 Organizer Credentials

| Email        | Password |
|----------------|-------------|
| **📧 mahim1234@gmail.com**   | Mahim@1234 |

---

## 🛠️ Technologies Used

| Category        | Technologies |
|----------------|-------------|
| **Frontend**   | React, Tailwind CSS, Daisy UI, TailGrids |
| **State Management** | Tanstack (React) Query |
| **Backend**    | Node.js, Express.js |
| **Database**   | MongoDB |
| **Authentication** | Token-based authentication with JWT, Firebase |
| **Hosting**    | Firebase (Frontend), Vercel (Backend) |

---

## ✅ Prerequisites

Before you begin, ensure you have the following installed:

- **[Node.js](https://nodejs.org/)**
- **MongoDB** (local or cloud, e.g., MongoDB Atlas)
- **Git** (for cloning the repository)

---

## 📥 Installation & Setup

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/ssmahim01/Popular-Medical-Camp.git
cd Popular-Medical-Camp
```

### 2️⃣ Install Dependencies
```sh
npm install
```

### 3️⃣ Configure Environment Variables
Create a `.env.local` file in the root directory and add the keys with secret values

---

## 🏃 Project Run Locally

To run the project locally, execute the following command:

```sh
npm run dev
```

🔹 This will start the development server, and you can access it at:  
📌 **`http://localhost:5173`**  

To start the backend, visit the **[Backend Repository](https://github.com/ssmahim01/popular-medical-camp-server)**

---

## 📦 Used Dependencies

```json
  "dependencies": {
  "@stripe/react-stripe-js": "^3.1.1",
  "@stripe/stripe-js": "^5.5.0",
  "@tanstack/react-query": "^5.64.1",
  "axios": "^1.7.9",
  "firebase": "^11.1.0",
  "localforage": "^1.10.0",
  "match-sorter": "^8.0.0",
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "react-hook-form": "^7.54.2",
  "react-icons": "^5.4.0",
  "react-rating-stars-component": "^2.2.0",
  "react-router-dom": "^7.1.1",
  "recharts": "^2.15.0",
  "sort-by": "^1.2.0",
  "stripe": "^17.5.0",
  "sweetalert2": "^11.15.10",
  "swiper": "^11.2.1",
  "tailgrids": "^2.2.7"
}
```
---

## 📚 Used npm Packages

| Package | Documentation |
|---------|--------------|
| **axios** | [Docs](https://axios-http.com/docs/intro) |
| **tanstack-query** | [Docs](https://tanstack.com/query/latest/docs/framework/react/quick-start) |
| **react-hook-form** | [Docs](https://react-hook-form.com) |
| **swiper-js** | [Docs](https://swiperjs.com/get-started) |
| **stripe** | [Docs](https://www.npmjs.com/package/@stripe/react-stripe-js) |
| **react-icons** | [Docs](https://react-icons.github.io/react-icons) |
| **sweetalert2** | [Docs](https://sweetalert2.github.io) |
| **recharts** | [Docs](https://recharts.org/en-US) |

---

## 🔧 Vite + React Setup

This project is set up using **Vite** for fast development.

Official plugins:
- **[@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md)** - Uses Babel for Fast Refresh.
- **[@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc)** - Uses SWC for Fast Refresh.