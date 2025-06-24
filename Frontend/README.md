# SkillSwap Frontend

Welcome to the **Frontend** of **SkillSwap**, a peer-to-peer learning platform that allows users to teach and learn various skills from one another. This React-based application is designed for a seamless user experience in skill discovery, scheduling sessions, messaging, and profile management.

## Project Overview

SkillSwap empowers users to:
- Register and log in securely using JWT authentication.
- List and categorize the skills they can teach.
- Discover available skills offered by others.
- Request and schedule learning sessions.
- Send and receive messages with learning partners.
- Rate and review fellow learners and instructors.
- Manage their profile, skills, and availability.

## Project Structure

Frontend/
├── public/
├── src/
│ ├── Components/ # Reusable UI components (Navbar, Footer, etc.)
│ ├── Pages/ # App pages (Login, Register, Profile, etc.)
│ ├── utils/ # Utility files (PrivateRoutes, UserContext)
│ ├── App.jsx # Root component with routing
│ ├── main.jsx # Entry point
│ └── index.css # Global styles
├── .env # Environment variables
├── package.json
└── vite.config.js


## Tech Stack

- **Framework**: React + Vite
- **Styling**: Tailwind CSS & Bootstrap
- **Routing**: React Router
- **State Management**: Context API
- **HTTP Client**: Axios
- **Real-Time Messaging**: Socket.io (planned)
- **Notifications**: React Toastify

## Installation

### Prerequisites
- Node.js (v18+)
- npm

### Steps

1. Clone the repo:

git clone https://github.com/Harshpal01/SkillSwap-Project
cd SkillSwap-Project/Frontend

2. Install dependencies:
npm install

3. Create a .env file in the root of the Frontend folder:
VITE_LOCALHOST=http://localhost:8000
VITE_SERVER_URL=<your-deployment-url>

4. Run the development server:
npm run dev

## MVP Features
User authentication (JWT)

Skill listing with categories

Skill discovery

Session requests and scheduling

Messaging between users

Ratings and reviews

Profile management

## Planned Improvements
Real-time chat with Socket.io

Calendar integration

Skill recommendation system

Progressive Web App (PWA) support

## Contributors
Dominic Kipkorir 
