           
---

**Live Website**: [Sehaat Saathi](https://sehaat-saathi.vercel.app/)

---


<div align="center">                                                                                                
  
  ![GitHub repo size](https://img.shields.io/github/repo-size/abhishekkumar62000/SehaatSaathi)
  ![GitHub stars](https://img.shields.io/github/stars/abhishekkumar62000/SehaatSaathi?style=social) 
  ![GitHub forks](https://img.shields.io/github/forks/abhishekkumar62000/SehaatSaathi?style=social)
[![Twitter Follow](https://img.shields.io/twitter/follow/AbhiYadav4723?style=social)](https://twitter.com/intent/follow?screen_name=AbhiYadav4723)

<img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="2300">
  <h1 align="center">🧑‍⚕️Welcome to SehaatSaathi - Your Trusted Al Health Assistant!😷</h1>
  <img src="./SehaatSaathi Logo.png" width="100px" />
  <br><a href="https://sehaatsaathi.vercel.app/"><strong>SehaatSaathi.AI</strong></a> <br>
  
  ## About SehaatSaathi
  ` Sehaatsaathi is an AI-powered Virtual Health Assistant designed to provide users with personalized healthcare advice, symptom checking, emergency treatment suggestions, and doctor consultations. This project aims to empower individuals to make informed health decisions and access real-time support for managing their health. The app integrates advanced AI models to ensure accurate diagnosis and treatment recommendations while keeping healthcare accessible to everyone, especially in rural and underserved communities. `
<hr>

Sehaatsaathi is an **AI-powered Virtual Health Assistant** designed to provide users with **real-time healthcare advice, symptom analysis, emergency medical guidance, and doctor consultations.** The project is open-source, inviting global contributions to build an accessible and smart healthcare solution for everyone, especially underserved communities.

## 🚀 Our Mission
To make **Healthcare Accessible, Affordable, and AI-driven** by providing **Instant Diagnosis, Treatment Recommendations, and Emergency Support** using advanced technology.

---

### Overview

The **Sehaat Saathi** website is a comprehensive platform designed to enhance patient experiences through easy appointment scheduling, access to diagnostic services, and detailed health information. Patients can browse services, view doctors’ profiles, and book appointments, all in a responsive and interactive web interface. This repository contains both the frontend and backend codebase.

## Features

#### General Features

- **Doctor Booking System**: Easily book appointments with specialists.
- **Online Payment**: Pay securely via Stripe for all services.
- **Patient Reviews**: View feedback from other patients on doctor profiles.
- **Health Packages**: Explore and purchase health packages based on diagnostic needs.
- **Educational Resources**: Access educational videos and health articles.
- **Responsive Design**: Fully optimized for various screen sizes and devices.

### Frontend Features

- **User-Friendly Navigation**: Fast and intuitive navigation with `React Router Dom`.
- **Interactive Animations**: Smooth loading spinners and toast notifications for feedback.
- **Image Sliders**: Display Management-Team and Patients Reviews with Swiper.
- **Secure Image Uploads**: Patients can upload necessary images using Cloudinary.
- **Customizable Theme**: Styled with Tailwind CSS for a modern look.

### Backend Features

- **Role-Based Authentication**: JWT-based authentication with roles for patients and doctors.
- **Patient Management**: Manage appointments, payments, and users/patients.
- **Encrypted User Data**: Secure handling of passwords and sensitive information with bcrypt.
- **Payment Integration**: Integrated Stripe payments for efficient transaction processing.
- **Configurable API**: Built with RESTful principles for easy data access.

---

## Technologies Used

### Frontend

- **React**: Core framework for user interface development.
- **React Router Dom**: Manages in-app navigation.
- **Tailwind CSS**: Utility-first framework for responsive and customized styles.
- **react-icons**: Provides icons across the UI.
- **react-spinners**: Adds animated loaders during data fetching.
- **react-toastify**: Delivers success/error messages to users.
- **swiper**: Carousel component for image / card sliders.
- **Google Fonts**: Adds custom fonts for styling.
- **Cloudinary**: Manages secure image uploads and storage.
- **Stripe**: Enables secure payment processing.

### Backend

- **Express**: Backend framework for building APIs.
- **MongoDB** and **Mongoose**: Database and ORM for data persistence.
- **cors**: Middleware for handling cross-origin requests.
- **jsonwebtoken**: Handles authentication with JWT.
- **cookie-parser**: Parses cookies for session management.
- **dotenv**: Configures environment variables.
- **bcryptjs**: Encrypts passwords for user security.
- **Stripe**: Manages payment processing.

## 🌟 Features

### 🔹 **AI-Powered Symptom Checker**
- Enter symptoms and get AI-generated **possible diagnoses and treatment suggestions.**

### 🔹 **Emergency Treatment Recommendations**
- Get **instant first-aid advice** when a doctor is unavailable.

### 🔹 **Virtual Health Chatbot**
- AI chatbot to interact with users and provide **personalized health recommendations.**

### 🔹 **Doctor Consultations**
- Book appointments for **video calls, online chats, or in-person doctor visits.**

### 🔹 **Medicine Ordering & Reminders**
- Order medicines online and receive **automated reminders** for prescriptions.

### 🔹 **Health Record Management**
- Securely **store and track** personal health records.

### 🔹 **Lab Test & Diagnostic Booking**
- Schedule **lab tests and medical diagnostics** directly from the app.

### 🔹 **Collaboration with Pharmaceutical Companies**
- **Order medicines from verified suppliers** and get doorstep delivery.

### 🔹 **Emergency Ambulance Service**
- Book an **ambulance in emergencies** directly through the app.

---

## 🛠 Tech Stack
- **Frontend:** React.js / Next.js / Flutter (for mobile apps)
- **Backend:** Python (FastAPI / Django / Flask)
- **AI/ML Models:** OpenAI, Hugging Face, TensorFlow, PyTorch
- **Database:** PostgreSQL / MongoDB / Firebase
- **Authentication:** JWT / OAuth2
- **Cloud Hosting:** AWS / Google Cloud / Azure
- **CI/CD:** GitHub Actions, Docker

---

## 📥 Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/sehaatsaathi.git
   cd sehaatsaathi
   ```

2. **Set up a virtual environment:**
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # (Linux/MacOS)
   venv\Scripts\activate     # (Windows)
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```

5. **Run the application:**
   ```bash
   python app.py
   ```

---

## 🤝 Contributing
We welcome contributions from the community! Follow these steps to contribute:

### 🔥 How to Contribute:
1. **Fork the repository** and create your own branch.
2. **Clone your fork:**
   ```bash
   git clone https://github.com/abhishekkumar62000/SehaatSaathi.git
   ```
3. **Create a feature branch:**
   ```bash
   git checkout -b feature-name
   ```
4. **Make changes, test, and commit:**
   ```bash
   git commit -m "Added new feature"
   ```
5. **Push changes to your fork:**
   ```bash
   git push origin feature-name
   ```
6. **Create a Pull Request** on GitHub.

### ✅ Contribution Guidelines:
- Follow **PEP8 coding style** for Python.
- Ensure **code is well-documented**.
- Write **unit tests** for new features.
- Keep UI **responsive and user-friendly**.
- Respect community guidelines and ethical AI principles.

---

## 📜 License
Sehaatsaathi is **Open-Source** under the **MIT License**. 

---

## 📞 Contact & Support
- **Email:** support@sehaatsaathi.com
- **WhatsApp:** https://chat.whatsapp.com/EXdQpQbtZuW5Coq0gzOH0A
- **Phone:** 6200087830, 9470074183
- **GitHub Issues:** [Submit a bug or feature request](https://github.com/abhishekkumar62000/SehaatSaathi)  
- **Discord/Slack Community:** (Link to join)

Join us in building a smart and accessible healthcare solution for the world! 🚀




## License

This project is licensed under the MIT License.

## Author

- **Mohammad Nurul Azam** - [GitHub Profile](https://github.com/nurulazam-dev)
