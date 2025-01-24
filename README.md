# RescueBites - Food Distribution Platform

![Project Image](https://socialify.git.ci/ShounakM04/RescueBites/image?language=1&amp;name=1&amp;owner=1&amp;pattern=Charlie+Brown&amp;stargazers=1&amp;theme=Dark)

**RescueBites** is a sustainability-focused platform that bridges the gap between food surplus and food scarcity. It enables restaurants, food outlets, and other food providers to list their unsold food at the end of the day, making it accessible to individuals, NGOs, or organizations working to feed the underprivileged. The platform aims to address the growing issue of food waste by connecting those with surplus food to those in need. By fostering a sense of community and reducing food waste, RescueBites contributes to a healthier, more sustainable planet. The goal is not only to save food but also to promote social responsibility and sustainability in the food industry.

This initiative supports environmental conservation by reducing landfill waste, and it helps alleviate hunger by making sure that food goes to those who need it most. Restaurants and food establishments can post their unsold food at the end of the day, and users can easily find and claim food donations. The platform provides real-time tracking, notifications, and confirmations, ensuring smooth transactions and a seamless user experience.

## 🚀 Demo

Check out the live demo of the platform: [RescueBites - Demo](https://rescue-bite.vercel.app/)

The demo showcases the key features of the platform, including posting food, claiming available food, tracking active and past claims, and receiving email confirmations. It’s designed to be intuitive, simple to use, and effective in connecting people with surplus food to those in need.

## 🧐 Features

Here are some of the key features of the platform:

- **Secure Access for Posting**: Restaurants and food providers can securely access the platform to post unsold food at the end of the day.
- **Food Details Upload**: Providers can upload food details, including images, descriptions, and pickup time, making it easy for users to understand what’s available.
- **Food Management**: Providers have the ability to edit or delete food posts conveniently, ensuring they can keep their listings up to date.
- **Nearby Available Food**: Users can browse a list of nearby available food items, view detailed information about each item, and reserve food they need.
- **Reservations and Email Confirmations**: Users can reserve food, and they will receive email confirmations, ensuring they don’t miss out on food they claimed.
- **Track Active and Past Claims**: Users can track their active and past claims, including the option to cancel reservations if needed.
- **Real-Time Notifications**: Notifications are sent when a claim is made, when food is available for pickup, and for any changes to the listing.
- **Food History Management**: A history of all posted food and its claim status is stored, allowing both users and providers to review past actions.

The platform ensures seamless coordination between food providers and recipients, helping to reduce food waste while promoting social good.

## 🛠️ Installation Steps

Follow these steps to set up the project locally and start contributing to RescueBites:

1. **Clone the Repository**:

    ```bash
    git clone https://github.com/ShounakM04/rescuebites.git
    ```

2. **Install Dependencies**: Run the following command to install the required Node.js packages:

    ```bash
    npm install
    ```

    This will install all the necessary dependencies, including React for the frontend and Express.js for the backend.

3. **Create the PostgreSQL Database and Tables**: Open `psql` or a database management tool like pgAdmin. Connect to the dbms database and run SQL scripts to create the necessary tables such as:

    - `consumer` (stores user details)
    - `provider` (stores food provider details)
    - `foodDetails` (stores details about posted food)
    - `consumer_requests` (stores user reservations)
    - `foodDetailsHistory` (keeps a record of food transactions)

    These tables will store all the data necessary for running the platform and managing food donations.

4. **Update the Database Credentials**: In your backend code, make sure to update the PostgreSQL database connection details:

    ```javascript
    const db = new pg.Client({
        user: "postgres",
        host: "localhost",
        database: "database",
        password: "yourpassword",
        port: 5432
    });
    ```

    Replace `database` with your actual database name, and `yourpassword` with your PostgreSQL password.

5. **Start the Backend Server**: Use the following command to start the Express server, which will handle all backend API requests:

    ```bash
    node index.js
    ```

    This will launch the server, and your backend will be up and running on the specified port (usually `localhost:5000`).

6. **Start the Frontend**: Navigate to the frontend directory and run the following command to start the React development server:

    ```bash
    npm run dev
    ```

    This will start the frontend, and you can access the platform on `localhost:3000` in your web browser.

## 💻 Built with

Technologies used in the project:

- **PostgreSQL**: A powerful, open-source relational database used to store all the platform's data, including food posts, reservations, and user information.
- **ExpressJS**: A minimal and flexible Node.js web application framework used to build the RESTful API and handle requests.
- **ReactJS**: A JavaScript library for building user interfaces. The frontend is built using React, which allows for a fast and responsive experience.
- **NodeJS**: A JavaScript runtime used to execute the backend server code. NodeJS is the foundation for the Express server.
- **Nodemailer**: A module for sending emails in Node.js. Used for sending email confirmations to users when they reserve food.

## 🎯 Contribution

Contributions to the RescueBites platform are welcome! Whether you're interested in improving the codebase, adding new features, or reporting issues, your help is appreciated. Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -am 'Add new feature'`).
5. Push to your branch (`git push origin feature-branch`).
6. Create a new Pull Request.
