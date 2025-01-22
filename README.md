<div align="center">
  <img width="100%" height="340" src="https://github.com/Programming-Hero-Web-Course4/b10a12-client-side-ssmahim01/blob/main/public/medical-camp-management-system.png"  />
</div>

# Popular Medical Camp

A web application for managing participant registrations, payments, and confirmation statuses for camp events. The platform is designed for organizers to efficiently manage and track participants.

## Live Site URL
🔗 **[Live Website](https://popular-medical-camp.web.app)**

---

## Organizer Login Credentials
- **Username:** mahim1234@gmail.com
- **Password:** Mahim@1234

---

## Features
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

## Technologies Used
- **Frontend:** React, Tailwind CSS, Daisy UI, TailGrids
- **State Management:** React Query
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** Custom middleware for token-based security
- **Hosting:** Firebase (Front-end), Vercel (Backend)

---

## Getting Started
To set up the project locally, follow these steps:

### Prerequisites
- Node.js installed
- MongoDB database

### Installation
1. Clone this repository in your local folder then run this command in bash or command prompt <b>npm install</b>
2. Do not forget to create an <b>.env.local</b> file for keep secret values such as Firebase, imgBB API and Server URL. 

---

# Setup

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
