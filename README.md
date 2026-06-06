# re-compile

## Live Demo

The application is deployed and available at [**https://re-compile.vercel.app**](https://re-compile.vercel.app/).

---

## Origin

I gave myself the constraints to complete this project in a week and coding not at all or as little as possible, essentially treating it as what I might build during the [Gauntlet AI](https://gauntletai.com/) bootcamp. I started with a high level plan, and quickly found a groove with concise but specific prompts and agents to move quickly and focus more and more on features. What I found was that I was able to build a lot more than I originally imagined.

I wanted to build an application for a non-profit I used to work with because they had no tooling or data and I wanted to show what is possible with a basic corporate approach of databases instead of spreadsheets. Using [Claude Code](https://claude.com/product/claude-code) I was able to build out a fully functional MVP that actually would work for real world use. While that non-profit has shut down operations, I am inspired by what I was able to do in such a short amount of time with AI. I am grateful to Gauntlet AI for the inspiration and I am excited to apply for their bootcamp.

## The Application

A full-stack case management and analytics platform built for non-profit organizations delivering second-chance technology education to incarcerated individuals. re-compile consolidates student tracking, employment outcomes, attendance, grant management, and program analytics into a single unified tool.

> "Applying corporate tooling and best practices to the second chance non-profit space to give them the tools they need to create positive outcomes and the tools their students and customers need to change their lives."

---

## Features

### Student Management

- Create and maintain detailed student profiles including personal info, incarceration details, class history, release data and employment outcomes
- Track completion of modules, projects, and cohort assignments at the company, state and site/class level
- Record job placements (tech and non-tech) with salary and timeline data after release
- Log internships, bootcamps, degrees, and professional links (LinkedIn, GitHub, portfolio, resume)

### 90-Day Tracking

- Case manager view filtered to students within 90 days of their release date
- Supports per-case-manager filtering for workload management

### Program Analytics

- US state-level interactive map showing program locations
- Track metrics per program: applied, accepted, completed, retention, attendance, and jobs placed
- Filter statistics by company, state and site
- Drill into individual state and site views

### Site Management

- Admin can add, edit, and archive individual sites (facilities/prisons) within each program
- Each site tracks contract, instructor, and student count

### Attendance Tracking

- Record monthly attendance by site
- Summarized attendance reports by program abbreviation
- Month selector on site attendance page populated dynamically from available data in MongoDB

### Grant Management

- Full CRUD for grant records (government, foundation, corporate, individual)
- Track grantor contact info, funding amounts, active states, and reporting schedules
- Filter by status: active, pending, applied, expired, or rejected
- Renewal eligibility and due date tracking

### Weekly DOC Reporting

- Dedicated sortable table view for weekly reports submitted to each state's Department of Corrections
- Week navigator to page through historical weekly data
- CSV export for the currently displayed week
- Data stored in and fetched from MongoDB

### Authentication & Role-Based Access

- Public user registration at `/signup` with both roles pre-selected for demo access
- Email/password login with JWT-based session management
- Users with multiple roles can toggle between Admin and Case Manager views from the navbar
- 30-day token expiration with secure Argon2 password hashing

### Dashboard

- Admin and Case Manager dashboards with live data cards
- Mini weekly report table card and student sample card
- Laptops given count card showing students who received a laptop on release
- Programs overview chart

### UI Customization

- Several professional DaisyUI themes available from the navbar, including custom themes matching real partner organization branding (adcrr, fdc, ndcs)

---

## Technology Stack

### Frontend

| Technology | Version | Purpose |
|---|---|---|
| React | 19.2.0 | UI framework |
| Vite | 7.3.1 | Build tool and dev server |
| Redux Toolkit | 2.11.2 | State management |
| React Router | 7.13.1 | Client-side routing |
| Tailwind CSS | 4.2.1 | Utility-first styling |
| DaisyUI | 5.5.19 | Tailwind component library |
| ECharts / echarts-for-react | 6.1.0 / 3.0.6 | Interactive charts and maps |
| Recharts | 3.8.1 | Additional chart components |
| Axios | 1.13.6 | HTTP client |

### Backend

| Technology | Version | Purpose |
|---|---|---|
| Node.js + Express | 5.2.1 | REST API server |
| MongoDB + Mongoose | 9.3.0 | Database and ODM |
| Passport.js | 0.7.0 | Authentication middleware |
| JWT (jsonwebtoken) | 9.0.3 | Stateless auth tokens |
| Argon2 | 0.44.0 | Password hashing |
| express-session | 1.19.0 | Session handling |
| dotenv | 17.3.1 | Environment configuration |
| Faker.js | 10.4.0 | Seed data generation |

---

## API Endpoints

### Auth — `/auth`
| Method | Path | Description |
|---|---|---|
| POST | `/auth/login` | Authenticate with email and password |
| GET | `/auth/me` | Return current authenticated user |
| POST | `/auth/logout` | Invalidate session |
| PUT | `/auth/update` | Update user profile |

### Students — `/student`
| Method | Path | Description |
|---|---|---|
| GET | `/student` | List all students |
| GET | `/student/:id` | Get student by ID |
| POST | `/student` | Create student |
| PUT | `/student/:id` | Update student |
| DELETE | `/student/:id` | Delete student |
| GET | `/student/90day[/:caseManager]` | Students within 90 days of release |
| GET | `/student/case-manager/:caseManager` | Students for a case manager |
| GET | `/student/days-to-job` | Days from release to first job |
| GET | `/student/laptops-given[/:state][/:site]` | Count of students who received a laptop |

### Programs — `/program`
| Method | Path | Description |
|---|---|---|
| GET | `/program/:year` | Programs for a given year |
| GET | `/program/state/:stateName` | Program data by state |
| GET | `/program/id/:id` | Program by MongoDB ID |
| GET | `/program/students/completed[/:state][/:site]` | Completion count |
| GET | `/program/students/accepted[/:state][/:site]` | Acceptance count |
| GET | `/program/jobs[/:state][/:site]` | Jobs placed count |
| POST | `/program` | Create program |
| PUT | `/program/:id` | Update program |
| PUT | `/program/:id/archive` | Archive program |

### Sites — `/site`
| Method | Path | Description |
|---|---|---|
| POST | `/site/:programId` | Create site |
| GET | `/site/:programId` | List non-archived sites for a program |
| GET | `/site/:programId/:siteId` | Get a single site |
| PUT | `/site/:programId/:siteId` | Update site |
| PUT | `/site/:programId/:siteId/archive` | Archive site |

### Grants — `/grant`
| Method | Path | Description |
|---|---|---|
| GET | `/grant` | List all grants |
| GET | `/grant/:id` | Get grant by ID |
| POST | `/grant` | Create grant |
| PUT | `/grant/:id` | Update grant |
| DELETE | `/grant/:id` | Delete grant |

### Attendance — `/attendance`
| Method | Path | Description |
|---|---|---|
| POST | `/attendance` | Create attendance record |
| GET | `/attendance/weekly` | All weekly report data |
| GET | `/attendance/site/:siteId/:month` | Attendance by site and month |
| GET | `/attendance/summary/:abbreviation` | Summary by program abbreviation |

### Users — `/user`
| Method | Path | Description |
|---|---|---|
| GET | `/user` | List all users |
| POST | `/user` | Create user |

### Classes — `/class`
| Method | Path | Description |
|---|---|---|
| POST | `/class` | Create a class |

---

## Project Structure

```
re-compile/
├── client/          # React frontend (Vite)
│   └── src/
│       ├── auth/        # Login, auth slice, JWT handling
│       ├── students/    # Student list, detail, 90-day views
│       ├── programs/    # Program map and analytics
│       ├── sites/       # Sites slice and service
│       ├── grants/      # Grant list and detail views
│       ├── attendance/  # Attendance data and views
│       ├── users/       # User registration and slice
│       └── admin/       # All protected admin/case-manager views
├── server/          # Express backend
│   ├── auth/        # Auth routes and strategies
│   ├── students/    # Student route handlers
│   ├── programs/    # Program route handlers
│   ├── sites/       # Site route handlers
│   ├── grants/      # Grant route handlers
│   ├── attendance/  # Attendance route handlers and models
│   ├── users/       # User route handlers
│   └── strategies/  # Passport auth strategies
└── data/            # Seed scripts (Faker.js)
```

---

## Getting Started

### Prerequisites

- Node.js 20.19+
- MongoDB (local or Atlas)

### Environment Variables

**`server/.env`**
```
PORT=8700
MONGODB_URI=mongodb://localhost:27017/recompile
JWT_SECRET=your_jwt_secret
TOKEN_EXPIRATION=2592000000
SESSION_SECRET=your_session_secret
COOKIE_SECRET=your_cookie_secret
```

**`client/.env`**
```
PORT=3700
VITE_API_SERVER_URL=http://localhost:8700
```

### Install and Run

```bash
# Install server dependencies
cd server && npm install

# Install client dependencies
cd client && npm install

# Start the server
cd server && npm start

# Start the client dev server
cd client && npm run dev
```

### Seed the Database

> **Note:** The seed scripts are still in progress and may not fully reflect the current data model.

```bash
cd data
node seedUsers.js
node seedStudents.js
node seedPrograms.js
node seedGrants.js
```

---

## Frontend Routes

| Path | View |
|---|---|
| `/` | Public landing page |
| `/login` | Login |
| `/signup` | User registration |
| `/admin/dashboard` | Admin/Case Manager dashboard |
| `/admin/programs` | Program map (US states) |
| `/admin/programs/:stateName` | State program detail and site cards |
| `/admin/sites/:site` | Site attendance view |
| `/admin/sites/:programId/add` | Add site to program |
| `/admin/sites/:programId/:siteId/edit` | Edit or archive a site |
| `/admin/90days` | 90-day case manager tracker |
| `/admin/weekly` | Weekly DOC report |
| `/admin/students` | Student list |
| `/admin/students/:id` | Student detail |
| `/admin/students/:id/edit` | Edit student |
| `/admin/grants` | Grant list |
| `/admin/grants/:id` | Grant detail |
| `/admin/program-list` | Program list |
| `/admin/program-list/:id` | Program detail |
| `/admin/program-list/:id/edit` | Edit program |
