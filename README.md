# 🛠️ Horizone Backend  

🚀 **Horizone Backend** is a **Node.js** API built with **Express.js** and **Mongoose ODM**, powered by **MongoDB**. This backend manages authentication, data storage, and API interactions for the Horizone project.  

🔗 **Live Site:** [Horizone Frontend](https://github.com/heshangoonawardena/horizone-frontend)  
🔗 **Frontend Repository:** [Horizone Frontend](https://github.com/heshangoonawardena/horizone-frontend)  
🔗 **Live Backend API:** [Horizone Backend](https://horizone-backend-heshan.onrender.com)  

---

## 📌 Features  

✅ **Secure REST API using Clerk**  
✅ **Authentication & Authorization using Clerk metadata**  
✅ **Database with MongoDB + Mongoose ODM**  
✅ **Optimized Performance**  

---

## 📂 Project Structure  

```
horizone-backend/
│── src/  
│   ├── api/              # Route handlers and middleware
│   ├── application/      # Business logic and and entities  
│   ├── domain/           # Domain models and error classes  
│   ├── infrastructure/   # Database connection and schemas
│   ├── index.ts          # Entry point  
│── .env          # Environment variable example  
│── nodemon.json   
```

---

## ⚙️ Prerequisites  

Ensure you have the following installed:  
- **Node.js** (v18+)  
- **pnpm** (latest version)  

---

## 🛠️ Installation  

```sh
# Clone the repository  
git clone https://github.com/heshangoonawardena/horizone-backend.git  

# Navigate to the project directory  
cd horizone-backend  

# Install dependencies  
pnpm install  
```

---

## 🔧 Environment Variables  

Create a `.env` file in the root directory and configure the required environment variables.  

```env
MONGODB_URL=your-mongodb-connection-string
CLERK_PUBLISHABLE_KEY=your-clerk-publishable-key
CLERK_SECRET_KEY=your-clerk-secret-key
OPENAI_API_KEY=your-openai-key
```

---

## 🚀 Running the Project  

```sh
# Start the development server  
pnpm run dev  
```

---

## 📦 Production Build  

```sh
# Build the project  
pnpm run build  

# Start the production server  
pnpm run start  
```

---


## 🎯 Tech Stack  

- **Node.js + Express.js**  
- **TypeScript**  
- **Mongoose ODM** + **MongoDB**  
- **Zod validation**  
- **Clerk Authentication**  
- **pnpm** for package management  

---

## 🤝 Contributing  

We welcome contributions! If you’d like to improve this project, follow these steps:  

1. **Fork the repository**  
2. **Create a new branch** (`feature-branch-name`)  
3. **Make your changes and commit** (`git commit -m "Your Message"`)  
4. **Push to your branch** (`git push origin feature-branch-name`)  
5. **Submit a Pull Request (PR)**  

Feel free to **open an issue** for bugs, enhancements, or feature requests. 😊  

---


## 📝 License  

This project is licensed under the MIT License.  

📌 **Maintained by:** [Heshan Goonawardena](https://github.com/heshangoonawardena)  


---
