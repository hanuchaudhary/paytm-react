# PayTM Clone - React Application

![Project Banner](/assets/banner.png)

## Project Overview

Welcome to the PayTM Clone, a full-featured, responsive web application built with React. This project aims to replicate key functionalities of the PayTM platform, offering users a seamless experience to sign up, sign in, and manage their finances, including sending money securely.

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Features

- **User Authentication**: Sign up and sign in with secure authentication.
- **Dashboard**: View account details and transaction history.
- **Send Money**: Securely transfer funds to other users.
- **Responsive Design**: Optimized for both desktop and mobile devices.
- **Smooth Navigation**: Implemented smooth transitions for a better user experience.

## Project Structure

```plaintext
.
├── backend
├── frontend
│   ├── node_modules
│   ├── public
│   ├── src
│   │   ├── assets
│   │   ├── components
│   │   │   ├── Button.jsx
│   │   │   ├── FeatureCard.jsx
│   │   │   ├── Input.jsx
│   │   │   ├── SwitchRoute.jsx
│   │   ├── pages
│   │   │   ├── Background.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── LandingPage.jsx
│   │   │   ├── SendMoney.jsx
│   │   │   ├── Signin.jsx
│   │   │   ├── Signup.jsx
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── index.css
│   │   ├── main.jsx
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   ├── vite.config.js
├── README.md
└── .gitignore
```

## Installation

### Prerequisites

- Node.js (v14+)
- Git

### Clone the Repository

```bash
git clone https://github.com/hanuchaudhary/paytm-react.git
cd paytm-react/frontend
```

### Install Dependencies

```bash
npm install
```

## Usage

### Running the Frontend

```bash
npm run dev
```

Open your browser and navigate to `http://localhost:3000`.

### Building for Production

```bash
npm run build
```

### Running the Backend

Make sure you have a running backend server to handle authentication and transaction APIs.

## Technologies Used

- **React**: For building the user interface.
- **Tailwind CSS**: For styling the components.
- **Vite**: As the build tool.
- **PostCSS**: For transforming CSS with JavaScript plugins.
- **ESLint**: For linting the codebase.
- **Zod**: For form validation.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create your feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m 'Add my feature'`
4. Push to the branch: `git push origin feature/my-feature`
5. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---
