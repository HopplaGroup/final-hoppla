# 🚗 Hoppla Ride Sharing Platform

**Hoppla** is a community-driven ride-sharing platform designed to help drivers share empty seats in their cars with passengers heading in the same direction. Whether you're commuting or planning a long trip, Hoppla connects you with potential passengers and drivers, making carpooling convenient and eco-friendly.

![Hoppla Logo](./logo.png)

## 🌟 Features

-   **Match drivers and passengers** based on routes and destinations
-   **Real-time trip updates** for both drivers and passengers
-   **Flexible filtering** to find the perfect ride
-   **Integrated reviews and ratings** for a trusted carpool experience
-   **User profiles and vehicle management**

## 🚀 Tech Stack

-   **Frontend**: [Next.js](https://nextjs.org/), TypeScript, React
-   **Backend**: Node.js, NextJS, Zenstack
-   **Database**: PostgreSQL, Prisma ORM
-   **Authentication**: Kinde Auth, OAuth, JWT
-   **Infrastructure**: Docker, Nginx, Azure, Cloudflare

## 🔧 Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/HopplaGroup/final-hoppla.git
    cd final-hoppla
    ```

2. Install dependencies:

    ```bash
    pnpm install
    pnpm dlx prisma db push
    ...
    ```

3. Set up environment variables:

    ```bash
    cp .env.example .env
    # Edit the .env file with your config
    ```

4. Start the development server:

    ```bash
    pnpm run dev
    ```

5. Open the app at [http://localhost:3000](http://localhost:3000).

## 🛠️ Docker Setup

You can also run the platform with Docker:

1. Build and start services:

    ```bash
    docker-compose up --build
    ```

2. Access the app at [http://localhost:3000](http://localhost:3000).

## 🛤 Roadmap

-   [ ] Add ride booking notifications
-   [ ] Enhance mobile UI/UX
-   [ ] Introduce carpool statistics and tracking
-   [ ] API integration with map services

## 🤝 Contributing

Contributions are welcome! Feel free to submit issues or pull requests.

 <!-- Check out our [contributing guide](link-to-contributing.md). -->

## 🧑‍💻 Maintainers

-   [Misho Dzuliashvili](https://github.com/mishodzuliashvili) – Lead Developer, Full Stack
-   [Demetre Shonia](https://github.com/DemetreShonia) – Project Manager, Frontend Engineer

## 📝 License

This project is proprietary. All rights reserved. You may not copy, modify, distribute, or use any part of this project without explicit permission from the owner.
