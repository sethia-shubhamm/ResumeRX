# Resume Builder — React + Bootstrap (MERN Frontend)

A full-featured resume builder frontend implemented with **React 18**, **Bootstrap 5**, and **Vite**, ready to connect to a Node.js / Express / MongoDB backend.

## Tech Stack
| Layer | Technology |
|---|---|
| UI | React 18 + Bootstrap 5 + Bootstrap Icons |
| Routing | React Router v6 |
| Forms | react-hook-form |
| HTTP | Axios (proxied to `localhost:5000`) |
| State | React Context (AuthContext, ResumeContext) |
| PDF export | html2canvas + jsPDF + react-to-print |
| Notifications | react-hot-toast |
| Bundler | Vite 6 |

## Project Structure
```
src/
├── context/
│   ├── AuthContext.jsx       # Auth state + login/register/logout
│   └── ResumeContext.jsx     # CRUD operations for resumes
├── components/
│   ├── Navbar.jsx            # Sticky top nav
│   ├── Footer.jsx            # Site footer
│   ├── ResumeCard.jsx        # Dashboard grid card
│   └── ResumePreview.jsx     # Live A4 resume preview (printable)
├── pages/
│   ├── Home.jsx              # Landing page (Hero / Features / Templates / FAQ)
│   ├── Login.jsx             # Sign-in page
│   ├── Register.jsx          # Sign-up page
│   ├── Dashboard.jsx         # Resume list (grid + list view)
│   └── Builder.jsx           # Full resume builder (left form | preview | templates)
├── styles/
│   └── custom.css            # Dark-theme design system
├── App.jsx                   # Router + providers
└── index.jsx                 # Entry point
```

## Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Configure environment
Copy `.env.example` to `.env` and fill in values.

### 3. Start development server
```bash
npm run dev
```
The app runs at `http://localhost:3000`.  
API requests to `/api/…` are proxied to `http://localhost:5000` (your Express backend).

### 4. Production build
```bash
npm run build
```

## Backend API Contract
The frontend expects the following REST endpoints:

### Auth
| Method | Endpoint | Body | Response |
|---|---|---|---|
| POST | `/api/auth/register` | `{ name, username, email, password }` | `{ user, token }` |
| POST | `/api/auth/login` | `{ identifier, password }` | `{ user, token }` |

### Resumes
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/api/resumes` | ✓ | List user's resumes |
| POST | `/api/resumes` | ✓ | Create resume `{ title }` |
| GET | `/api/resumes/:id` | ✓ | Get single resume |
| PUT | `/api/resumes/:id` | ✓ | Update resume `{ data, template }` |
| DELETE | `/api/resumes/:id` | ✓ | Delete resume |
| POST | `/api/resumes/:id/duplicate` | ✓ | Duplicate resume |

Authentication uses **Bearer tokens** — add `Authorization: Bearer <token>` header.

## Pages Overview
| Route | Component | Access |
|---|---|---|
| `/` | `Home` | Public |
| `/auth/login` | `Login` | Guest only |
| `/auth/register` | `Register` | Guest only |
| `/dashboard` | `Dashboard` | Protected |
| `/builder/:resumeId` | `Builder` | Protected |
