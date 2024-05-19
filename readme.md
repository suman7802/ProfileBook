# Profile Book

## Introduction

Store your profile and retrieve it whenever you want. Profile Book offers a seamless experience for managing and accessing user profiles. with a user-friendly interface and secure authentication, Profile Book is the perfect solution for managing your profile. like a pro, ` link: [Profile Book](https://profilebook.onrender.com)

## Features

### User Registration and Verification

- **Sign Up**: Users can register as either a regular user or an admin. Admin registration requires an admin password.

- **OTP Verification**: After registration, an OTP is sent to the registered email. Users are redirected to the verification page to enter the OTP, which is valid for 1 hour.

- **Resend OTP**: If the OTP expires, users need to re-sign up with the same email to receive a new OTP.

- **Login**: If the OTP is valid, you will be redirected to the login page to enter your email and password.

### Profile Management

- **View Profile**: Users can view their profile, including their full name and email address and a bio.

- **Profile Picture**: Users can upload a profile picture, which is displayed on their profile.

- **Update Profile**: Users can update their profile picture, bio, and full name. The UI/UX is designed for a smooth user experience.

- **Delete Profile**: Users can delete their profile, which requires confirmation to prevent accidental deletions.

### Admin Features

- **User Management**: Admins can view a list of all users, including profile pictures, email addresses, verification statuses, bios, and names.

- **Remove Users**: Admins can remove any user from the platform.

- **Load More Users**: Admins can load additional users from the database (5 users at a time) to improve efficiency. This is managed using React Context for state management.

- **Admin Badge**: Admins can see an admin badge on their profile.

- **Admin Account Deletion**: Admin accounts can only be deleted by the account owner.

### Additional Functionalities

- **Logout and Account Deletion**: Users and admins can log out or delete their accounts with well-designed popup alerts to confirm actions.

- **Secure Admin Management**: One admin cannot remove another admin. Admin accounts can only be self-deleted by the owner.

## Installation

To install the project, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/profile-book.git
   ```

2. **Create .env files:**

   Use `.env.sample` as a template to create your `.env` file, and make sure to edit the configuration file in the client directory as needed.

3. **Run the Project:**

   ```bash
   npm run dev
   ```

   - **Development Server Instances:**

     - [Client Side](http://localhost:3000)
     - [Server Side](http://localhost:8000)

   - **Production Server Instances:**
     - [Profile Book](https://profilebook.onrender.com)

## Usage

For detailed API usage, refer to the [Postman Documentation](https://documenter.getpostman.com/view/27265804/2sA3JT3doh).

## Table Relations

For a detailed overview of the database schema, refer to the [Table Relations](https://dbdiagram.io/d/profile-book-662a4b0c03593b6b61f4819f).

## Contributing

We welcome contributions! Please fork the repository and create a pull request with your changes.

## Contact

For any inquiries, please reach out to [mansu7802@gmail.com].

---

Feel free to explore and contribute to the development of this application. Enjoy managing your profile with ease and efficiency!
