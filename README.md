<p align="center">
  <img src="https://nestjs.com/img/logo-small.svg" width="120" alt="NestJS Logo" />
</p>

<h1 align="center">🎓 Certificate Verification System (NestJS)</h1>

<p align="center">
  A secure digital certificate verification platform built with <b>NestJS</b>.  
  This system allows organizations to issue certificates with unique codes and QR codes,  
  enabling anyone to verify their authenticity easily.
</p>

---

## 🚀 Overview

This project provides a **digital certificate management and verification system** using **NestJS**.  
Organizations can issue authentic certificates, each containing a **unique code** and a **QR code** for public verification.  
Users can verify a certificate by either:
- Scanning its QR code, or  
- Entering the unique verification code manually.

The system then displays the certificate’s details and its **validity status**.

---

## ✨ Features

- 🏢 **Organization management** for issuing certificates  
- 🔐 **Unique code generation** for each certificate  
- 📱 **Automatic QR code generation**  
- ✅ **Public verification** via QR scan or unique code  
- 📋 **Certificate details page** showing validity and metadata  
- ⚙️ **NestJS modular architecture** for scalability

---

## 🧰 Technologies Used

- **NestJS** – Backend framework  
- **TypeScript**  
- **MongoDB** for DataBase
- **JWT Authentication**  
- **QR Code generation library**

---

## ⚙️ Installation & Setup

```bash
# Clone the repository
$ git clone https://github.com/HamzaElhanafy/certificate-verification-system-nestjs.git

# Go into the project folder
$ cd certificate-verification-system-nestjs

# Install dependencies
$ npm install

# Run the app in development mode
$ npm run start:dev
