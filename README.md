# Saey - ساعى

> Modern Enterprise Resource Planning (ERP) / Business Management Platform

A complete, enterprise-grade ERP system built with modern technologies, designed for companies in Saudi Arabia and GCC countries. Features full Arabic + English support, RTL/LTR layouts, ZATCA compliance, and AI-powered automation.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | Next.js 15, React 19, TypeScript, Tailwind CSS |
| **Backend** | NestJS, TypeScript, Prisma ORM |
| **Database** | PostgreSQL |
| **Auth** | JWT, Passport.js, RBAC |
| **API** | REST + Swagger/OpenAPI |

## Features

### Core Platform
- Arabic + English multilingual support (RTL/LTR)
- Dark/Light mode
- Multi-company, multi-branch, multi-currency, multi-warehouse
- Role-based access control (RBAC)
- Audit logs & activity tracking
- Responsive design (desktop/tablet/mobile)

### Modules
- **HR Management**: Employees, departments, attendance, leave requests, payroll
- **Accounting & Finance**: Chart of accounts, journal entries, invoices, payments, VAT/ZATCA compliance
- **Inventory Management**: Products, categories, warehouses, stock movements, barcode support
- **Sales & CRM**: Customers, suppliers, quotations, sales orders, POS
- **Reports & Analytics**: Interactive dashboards, financial KPIs, export to PDF/Excel/CSV

### Saudi Arabia Compliance
- VAT 15% support
- ZATCA Phase 2 e-invoicing ready
- QR code invoices
- Arabic tax invoice format

## Getting Started

### Prerequisites
- Node.js >= 20
- PostgreSQL 15+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd saey-erp

# Install dependencies
npm install

# Set up backend environment
cp packages/backend/.env.example packages/backend/.env
# Edit .env with your database credentials

# Generate Prisma client
npm run db:generate

# Push database schema
npm run db:push

# Start development servers
npm run dev:frontend  # http://localhost:3000
npm run dev:backend   # http://localhost:4000
```

### Demo Login
Use any email/password combination on the login page to access the demo dashboard.

## Project Structure

```
saey-erp/
├── packages/
│   ├── frontend/          # Next.js frontend application
│   │   ├── src/
│   │   │   ├── app/       # App router pages
│   │   │   ├── components/ # UI components
│   │   │   ├── hooks/     # Custom React hooks
│   │   │   ├── i18n/      # Translations (AR/EN)
│   │   │   ├── lib/       # Utility functions
│   │   │   └── stores/    # Zustand state management
│   │   └── ...
│   ├── backend/           # NestJS backend API
│   │   ├── src/
│   │   │   ├── auth/      # Authentication module
│   │   │   ├── users/     # Users management
│   │   │   ├── companies/ # Company & branch management
│   │   │   ├── employees/ # HR module
│   │   │   ├── accounting/ # Accounting module
│   │   │   ├── inventory/ # Inventory module
│   │   │   ├── sales/     # Sales & CRM module
│   │   │   ├── common/    # Shared decorators, guards
│   │   │   └── prisma/    # Database service
│   │   └── prisma/
│   │       └── schema.prisma  # Database schema
│   └── shared/            # Shared types & constants
│       └── src/
│           ├── types/     # TypeScript interfaces
│           └── constants/ # Permissions, currencies
└── package.json           # Workspace root
```

## API Documentation

When the backend is running, Swagger docs are available at:
```
http://localhost:4000/api/docs
```

## Deployment

The application is designed for cloud deployment with Docker:

```bash
# Build all packages
npm run build

# Or build individually
npm run build:frontend
npm run build:backend
```

## License

MIT
