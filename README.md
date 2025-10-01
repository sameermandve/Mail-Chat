# MailChat 

![head](https://res.cloudinary.com/dhh432tdg/image/upload/v1759331204/Chat-Page_p1suyd.png)

This repository contains the backend server and frontend of a personalized messaging web app includes image sharing, near real-time messaging, presence indicators, friend search by email, and user profile management. It is built with a Node.js and Express backend, along with a React frontend that uses modern state management and UI patterns for a fast and reliable chat experience.

## Key Features

*   **Personalized user experience** tailored to each account, featuring a customizable avatar and profile. 
*   **Real-time or near-real-time messaging** between friends.
*   **Image sharing** in conversations.
*   **Online / Offline presence** indicators for users.
*   **Discover friends** by searching email and adding contacts.
*   **Account management**, including the option to delete your account. 
*   **Profile section** with editable user information and the ability to upload an avatar. 
*   **Loading skeletons** for smooth performance while data loads.
*   **Iconography** through lucide-react.

## Tech Stack

-   **Backend**: [Node.js](https://nodejs.org/), [Express.js](https://expressjs.com/)
-   **Frontend**: [**React.js**](https://react.dev/ "null"), [**React Router**](https://reactrouter.com/ "null"), [**Axios**](https://axios-http.com/ "null")
-   **Database**: [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/) ODM
-   **State Management**: [**Zustand**](https://zustand-demo.pmnd.rs/)
-   **Icons**: [**Lucide-React**](https://lucide.dev/guide/packages/lucide-react)
-   **Real Time**: [Socket.io](https://socket.io/)

## Project Structure

*   **backend** — Express server, REST APIs, real‑time socket handlers, authentication, MongoDB models.
*   **frontend** — React app with routes, chat UI, profile pages, friend search, and image upload.

### Usage

*   Register or sign in to a personalised account.
*   Search other users by **email** and add them as friends.
*   Start chats with friends and send texts and images.
*   View the user's **online/offline** status in the chat.
*   Edit your **profile**, change your avatar, and delete your account if you want.
*   Observe skeleton loaders while pages or lists fetch data.

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You need to have Node.js and npm installed on your machine. You will also need a MongoDB database instance (either local or a cloud service like MongoDB Atlas).

-   [Node.js](https://nodejs.org/en/download/)
-   [MongoDB](https://www.mongodb.com/try/download/community)

### Installation

1.  **Clone the repository:**
    ```sh
    git clone [https://github.com/sameermandve/Mail-Chat.git](https://github.com/sameermandve/Mail-Chat)
    cd Mail-Chat
    ```

2.  **Backend setup:**
    ```sh
    cd Backend
    cp .env
    set MONGODB_URI, JWT_SECRET, PORT and other env variables
    npm install
    npm run start
    ```
    * `MONGO_URI`: Your connection string for the MongoDB database.
    * `JWT_SECRET`: A secret key for signing JWTs.
    * `PORT`: The port on which the server will run (defaults to 5000 if not specified).

3.  **Frontend setup:**
    ```sh
    cd ../Frontend
    npm install
    npm run dev
    ```

4.  **Open the app at http://localhost:5173 and ensure backend is running on the configured port.**
