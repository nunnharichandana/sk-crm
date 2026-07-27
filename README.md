# SK Smart Investments CRM — Enterprise Portal

Enterprise Investment CRM system built for **SK Smart Investments** with React 18, Spring Boot 3, Firebase Authentication, Firebase Admin SDK, and Firestore NoSQL Document Database.

---

## 🚀 Technology Stack

### 1. Frontend
* **Core**: React 18 + Vite
* **Styling**: Tailwind CSS (Corporate Blue `#1E6091` & White Theme)
* **Authentication**: Firebase Web Auth SDK (Email + Password)
* **Visualizations**: Recharts (Modern Bar & Line Charts)
* **Icons**: Lucide React
* **Routing**: React Router DOM v6

### 2. Backend
* **Core**: Spring Boot 3.2.3 (Java 23 / 21)
* **Authentication**: Firebase Admin SDK (`com.google.firebase:firebase-admin:9.2.0`)
* **Security Filter**: `FirebaseAuthenticationFilter.java` (Bearer ID Token Validation & Authorization)
* **Architecture**: 3-Tier Layered Architecture (Controllers $\rightarrow$ Services $\rightarrow$ Firestore SDK)
* **API Documentation**: SpringDoc OpenAPI 2.3.0 / Swagger UI

### 3. Database (NoSQL — 100% Firestore Document Store)
* **Database**: **Google Cloud Firestore Database** (`com.google.cloud.firestore.Firestore`)
* **13 Document Collections**:
  1. `users` (User UID, role RBAC, status)
  2. `roles` (Super Admin, Admin, Manager, Employee, Viewer permissions)
  3. `branches` (Branch offices, address, stats)
  4. `customers` (Customer 360° profile, PAN, Aadhaar, nominee)
  5. `leads` (Lead pipeline: `NEW` $\rightarrow$ `WON`/`LOST`, priority, lead score)
  6. `investments` (SIP, Mutual Fund, FD, Insurance, Stocks, Bonds, Gold, Real Estate)
  7. `income` (Commission, Brokerage, Dividend earnings)
  8. `expenses` (Salary, Rent, Marketing operational expenses)
  9. `tasks` (Daily tasks: Pending, Completed)
  10. `activities` (System activity feed)
  11. `reports` (Filtered business analytics summary)
  12. `automation` (First-login workspace setup `automation/{uid}`)
  13. `auditLogs` (Immutable security audit log trail)

---

## 📁 Repository Structure

```text
.
├── backend/                       # Spring Boot 3 Java Application (Firebase Admin SDK)
│   ├── pom.xml
│   └── src/main/java/com/sksmartinsurance/
│       ├── config/                # Firebase & Security Filter Config
│       ├── controller/            # REST Controllers (Auth, Admin, Leads, Investments, etc.)
│       ├── model/                 # 13 Firestore Document Models
│       ├── security/              # Bearer Token Validation Filter
│       └── service/               # Firestore Service Layer
└── frontend/                      # React JS + Vite + Firebase Auth Frontend
    ├── package.json
    └── src/
        ├── config/                # Firebase Client Auth Configuration
        ├── context/               # AuthContext with Bearer Token Storage
        ├── pages/                 # Dashboard, Investments, Leads, Customers, etc.
        └── services/              # API Client Interceptor (Bearer Token)
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
REST API endpoints available at [http://localhost:8080](http://localhost:8080).

---

## 📜 License
Internal Enterprise Software for SK Smart Investments.
