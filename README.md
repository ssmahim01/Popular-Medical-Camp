<div align="center">
  <img width="100%" height="340" src="https://github.com/ssmahim01/Popular-Medical-Camp/blob/main/public/medical-camp-management-system.png" />
</div>

---

# 📌 Popular Medical Camp

A web application for managing participant registrations, payments, and confirmation statuses for camp events. The platform is designed for organizers to efficiently manage and track participants.

## 🌐 Live Site URL
🔗 **[Live Website](https://popular-medical-camp.web.app)**  
🔗 **[Backend Repository](https://github.com/ssmahim01/popular-medical-camp-server)**

---

## 🔑 Organizer Login Credentials
- **Username:** `mahim1234@gmail.com`
- **Password:** `Mahim@1234`

---

## 🚀 Core Features
✅ **Secure Login for Organizers** – Log in securely to manage camp registrations.  
✅ **Search Functionality** – Search participants by name, camp name, fees, or statuses with a dynamic search bar.  
✅ **Pagination** – View registered participants with a paginated interface.  
✅ **Participant Confirmation** – Change the confirmation status of participants directly.  
✅ **Payment Status Tracking** – Identify participants who have paid or are yet to pay.  
✅ **Cancel Registrations** – Cancel registrations for participants with pending payment or unconfirmed status.  
✅ **Real-Time Updates** – Data is fetched and updated in real-time with React Query.  
✅ **Custom Items Per Page** – Adjustable pagination settings.  
✅ **Responsive Design** – Fully responsive for seamless use across devices.  
✅ **User-Friendly Dashboard** – Intuitive design for efficient management.  

---

## 🛠️ Technologies Used
- **Frontend:** React, Tailwind CSS, Daisy UI, TailGrids
- **State Management:** React Query
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** Token-based security with custom middleware
- **Hosting:** Firebase (Frontend), Vercel (Backend)

---

## 💻 Getting Started
Follow these steps to set up the project locally.

### ✅ Prerequisites
Ensure you have the following installed:
- **[Node.js](https://nodejs.org/)**
- **MongoDB** (local or cloud)

### 📥 Installation
1. **Clone the repository**  
   ```sh
   git clone https://github.com/ssmahim01/Popular-Medical-Camp.git
   cd Popular-Medical-Camp
   ```
2. **Install dependencies**  
   ```sh
   npm install
   ```
3. **Set up environment variables**  
   Create a `.env.local` file in the root folder and add your secret values.

4. **Start the development server**  
   ```sh
   npm run dev
   ```

---

## 🛠️ Backend Setup
To run the backend server, follow the instructions in the **[backend repository](https://github.com/ssmahim01/popular-medical-camp-server)**.

---

## ⚡ Setup with Vite
This project is set up with **Vite** for fast development with Hot Module Replacement (HMR).

Currently, it supports:
- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) – Uses Babel for Fast Refresh.
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) – Uses SWC for Fast Refresh.