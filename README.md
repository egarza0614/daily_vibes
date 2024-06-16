###  Daily Vibes

#### Table of Contents

1. **Project Overview**
2. **Project Structure**
3. **Key Features and Endpoints**
4. **Dependencies**
5. **Setup and Configuration**
6. **Issues**
7. **Tech used**
7. **License**

---

### Project Overview

Welcome to Daily Vibes, a social media web application designed to promote positivity and foster a community around sharing uplifting content. This project utilizes Node.js and Express.js for server-side logic, Sequelize ORM for database interactions with PostgreSQL, and Handlebars.js for dynamic HTML rendering. The front-end styling is enhanced with Tailwind CSS for efficient and flexible UI design.The application filters out inappropriate language using the bad-words npm package.

###  Project Structure

The project is structured as follows:

- **Routes**: Defined in `routes/index.js`, handling user authentication, post management, and profile settings.
  
- **Models**: Located in `models/`, including `Users`, `Posts`, and `Comments`, defining database schema and relationships.

- **Views**: Templated using Handlebars.js (`*.handlebars` files) in the `views/` directory, rendering server-side dynamic content.

- **Static Assets**: CSS styles (`output.css`), client-side JavaScript (`*.js`), and Font Awesome icons in `public/`, enhancing the user interface.

- **Database Configuration**: Managed by Sequelize in `config/db.js`, using environment variables for secure database connections.

###  Key Features and Endpoints

- **User Authentication**:
  - `/signup`: Registration form for new users.
  - `/login`: Login page for existing users.

- **Posts and Comments**:
  - `/posts`: Displays posts sorted by creation date, with associated user details and comments.

- **User Profiles**:
  - `/profile/:username`: Shows user-specific posts and profile information (username, bio, location, birthday).

- **User Settings**:
  - `/settings`: Form to update user profile settings.


###  Setup and Configuration

 **Installation**:
   ```bash
   git clone <repository-url>
   cd <project-directory>
   npm install
   add .env file 
   run the db setup commands 
   npm start
   ```

 **Explanation**:

- **Step 1:** Cloning the repository and navigating to the project directory.
- **Step 2:** Installing all required dependencies using `npm install`.
- **Step 3:** Setting up environment variables by creating a `.env` file with specific database configurations. (`DB_NAME`, `DB_USER`, `DB_PASSWORD`.
- **Step 4:** Initializing and seeding the database:
  - **`npm run schema`**: This command sets up the database schema using Sequelize migrations.
  - **`npm run seed`**: This command populates the database with initial seed data using Sequelize seeders.
- **Step 5:** Starting the server with `npm start`.
- **Step 6:** Accessing the Daily Vibes application on `http://localhost:3002`.

These steps ensure that the project environment is properly set up, including database configuration and initialization, allowing users to seamlessly run the application locally.

3. **Running the Application**:

   Access the application at `http://localhost:3000` in your web browser.
   Sign up or log in to create posts, view posts, and update your profile settings.

###  Issues
- **Issues**: 

## Technologies Used
- **Express**: Web framework for Node.js applications.
- **Sequelize**: Promise-based ORM for PostgreSQL database management.
- **Handlebars**: Templating engine for rendering server-side HTML pages.
- **dotenv**: Loads environment variables securely from a `.env` file.
- **Tailwind CSS**: Utility-first CSS framework for styling components without writing custom CSS.
- **Bad words npm**: Used to filter out bad language.
-**bcrypt**: Library for hashing passwords.
**Node.js**:JavaScript runtime environment for server-side applications.


### License

This project is licensed under the [MIT License](LICENSE).

---

