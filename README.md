# Mediora | Digital Healthcare Platform

Mediora is a digital healthcare platform that helps users access symptom guidance, doctor discovery, pharmacy discovery, emergency contacts, profile tools, and an admin portal from one web application.

> This project is under active development.

## Tech Stack

### Frontend

- Next.js App Router
- React
- Tailwind CSS
- JavaScript

### Backend

- ASP.NET Core Web API
- Entity Framework Core
- PostgreSQL
- JWT Authentication
- BCrypt password hashing
- Swagger

## Frontend Setup

Install dependencies:

```bash
npm install
```

Create a local environment file:

```bash
cp .env.local.example .env.local
```

Expected frontend environment value:

```text
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

Run the frontend:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

## Backend Setup

The ASP.NET Core API is in:

```text
backend/
```

Update the PostgreSQL connection string in `backend/appsettings.json`:

```json
"DefaultConnection": "Host=localhost;Port=5432;Database=mediora_db;Username=postgres;Password=your_password"
```

Install or restore backend packages:

```bash
cd backend
dotnet restore
```

Create and update the database:

```bash
dotnet ef migrations add InitialCreate
dotnet ef database update
```

Run the backend:

```bash
dotnet run
```

Swagger is available in development at the backend Swagger URL shown by `dotnet run`.

## PostgreSQL

Create a PostgreSQL database named:

```text
mediora_db
```

Then run the EF Core migration commands from the backend folder.

## Test Credentials

User:

```text
Email: user@mediora.com
Username: mediorauser
Password: user12345
```

Admin:

```text
Email: admin@mediora.com
Password: admin123
```

Admin access is hidden from public navigation. Visit `/admin` manually to sign in.

## API Endpoints

Authentication:

- `POST /api/auth/register`
- `POST /api/auth/login`

Doctors:

- `GET /api/doctors`
- `GET /api/doctors/{id}`
- `POST /api/doctors`
- `PUT /api/doctors/{id}`
- `DELETE /api/doctors/{id}`

Pharmacies:

- `GET /api/pharmacies`
- `GET /api/pharmacies/{id}`
- `POST /api/pharmacies`
- `PUT /api/pharmacies/{id}`
- `DELETE /api/pharmacies/{id}`

Emergency Services:

- `GET /api/emergency-services`
- `GET /api/emergency-services/{id}`
- `POST /api/emergency-services`
- `PUT /api/emergency-services/{id}`
- `DELETE /api/emergency-services/{id}`

Symptoms:

- `GET /api/symptoms`
- `POST /api/symptoms`
- `POST /api/symptom-checker/analyze`

Create, update, and delete endpoints require an admin JWT.

## Connected Frontend Areas

- `/login` uses backend authentication and stores the JWT.
- `/register` creates users through the backend API.
- `/admin` uses backend authentication and only allows users with the `Admin` role.
- User dashboard routes are protected by stored JWT session state.
- Admin dashboard routes are protected by stored JWT session state and admin role.
- Doctor Locator loads doctors from `GET /api/doctors`.
- Pharmacy Locator loads pharmacies from `GET /api/pharmacies`.
- Emergency Guidance loads emergency services from `GET /api/emergency-services`.
- Symptom Checker loads symptoms and analyzes selected symptoms through the backend.
- Admin Doctors, Pharmacies, and Emergency Services pages support backend list, add, edit, and delete flows.

## Disclaimer

Mediora provides general health information and guidance only. The platform does not provide medical diagnoses and should not replace professional medical advice, diagnosis, or treatment.

Always consult a qualified healthcare professional regarding medical concerns.

## Author

Developed by Upuli Kuruppu.
