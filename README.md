# Messenger Clone

<p align="center">
  <img src="./public/images/readme_logo_x512.png" alt="Messenger Logo x512">
</p>

Welcome to the Messenger Clone! This project is a real-time messaging application built with Next.js 14. It aims to replicate the core features of popular messaging platforms, offering an intuitive and modern user interface.

## Getting Started

### Prerequisites
Ensure you have the following installed:

- Node.js (version 18.17 or higher)
- npm

### Instalation
1. Clone the repository:
   ```bash
   git clone https://github.com/FelipeLL/messenger-clone.git
   cd messenger-clone
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   Create a `.env` file in the root of the project and add the following variables:
   ```bash
   DATABASE_URL=""
   AUTH_SECRET=""
   GITHUB_CLIENT_ID=""
   GITHUB_CLIENT_SECRET=""
   GOOGLE_CLIENT_ID=""
   GOOGLE_CLIENT_SECRET=""
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=""
   NEXT_PUBLIC_PUSHER_APP_KEY=""
   PUSHER_APP_ID=""
   PUSHER_SECRET=""
   ```
4. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
  Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Features
- User authentication
- Real-time messaging
- Group chats and direct messages
- User presence indicators
- Image upload

## Demo
Check out the live demo [here](https://messenger-x-clone.vercel.app)

## Technologies Used
- Next.js 14
- Typescript
- Tailwind CSS
- Headlessui
- Prisma
- MongoDB
- Next-auth
- Cloudinary
- Pusher
