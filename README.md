# SK Smart Insurance CRM - Enterprise Portal

Enterprise Customer Relationship Management (CRM) system built for **SK Smart Insurance**.

## 🚀 Technology Stack

### Frontend
* React JS
* Vite
* Tailwind CSS (Blue & White Theme: `#0A4DA2`, `#1976D2`)
* Recharts
* Framer Motion
* Lucide Icons
* React Router DOM

### Backend
* Spring Boot 3
* Java 21
* Spring Security & JWT
* Spring Data JPA
* Lombok & MapStruct
* Swagger / OpenAPI

### Database
* MySQL 8 DDL & Seed Data

---

## 📁 Repository Structure

```text
.
├── database/
│   ├── schema.sql                 # MySQL 8 Normalized Schema
│   └── data.sql                   # Seed Data for Roles, Users & Initial Leads
├── backend/                       # Spring Boot 3 Java Application
│   ├── pom.xml
│   └── src/main/java/com/sksmartinsurance/
└── frontend/                      # React JS + Vite Enterprise Frontend
    ├── package.json
    ├── tailwind.config.js
    └── src/
```

---

## 💻 Getting Started

### 1. Run Frontend (React JS)
```bash
cd frontend
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000).

### 2. Run Backend (Spring Boot 3)
```bash
cd backend
mvn spring-boot:run
```
REST API endpoints available at [http://localhost:8080/api/v1](http://localhost:8080/api/v1).

---

## 📜 License
Internal Enterprise Software for SK Smart Insurance Services Pvt Ltd.
