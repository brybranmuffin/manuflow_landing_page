# Overview

This is a startup landing page application with two deployment options:
1. **Full-stack version** (Replit deployment) - React frontend with Express.js backend and PostgreSQL database
2. **Static version** (GitHub Pages deployment) - React-only frontend using external form services

The project features a dark theme with blue primary colors, showcasing a product suite with beta signup functionality. The application uses TypeScript throughout and includes comprehensive UI components built with Radix UI and Tailwind CSS.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript and Vite as the build tool
- **UI Library**: Extensive use of Radix UI primitives with shadcn/ui components for consistent, accessible design
- **Styling**: Tailwind CSS with CSS variables for theming support (light/dark modes)
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **Form Handling**: React Hook Form with Zod validation for type-safe form processing

## Backend Architecture
- **Framework**: Express.js with TypeScript running on Node.js
- **Database ORM**: Drizzle ORM for type-safe database operations
- **Schema Validation**: Zod for runtime type validation and API request/response validation
- **Session Management**: Ready for PostgreSQL-based session storage with connect-pg-simple
- **Development**: Hot reload support with Vite integration in development mode

## Data Storage
- **Database**: PostgreSQL with Neon serverless driver for cloud deployment
- **Schema Management**: Drizzle Kit for database migrations and schema management
- **Current Schema**: 
  - Users table with authentication fields
  - Beta signups table for lead capture with organization details
- **Fallback Storage**: In-memory storage implementation for development/testing

## API Design
- **Architecture**: RESTful API with JSON responses
- **Endpoints**: 
  - POST /api/beta-signup for lead capture
  - GET /api/beta-signups for admin access
- **Validation**: Zod schemas shared between client and server for consistent validation
- **Error Handling**: Centralized error handling with proper HTTP status codes
- **Logging**: Request/response logging with performance metrics

## Build and Deployment
- **Replit Deployment**: Vite dev server with Express API proxy, full-stack functionality
- **GitHub Pages**: Static-only build using `vite.config.static.ts` and `package-static.json`
- **GitHub Actions**: Automated deployment workflow for GitHub Pages
- **Form Handling**: Netlify Forms integration for static deployments
- **Asset Management**: Vite handles frontend assets, relative paths for static hosting
- **TypeScript**: Shared type definitions between client/server in the shared directory

## Recent Changes (January 2025)
- Created static version of landing page for GitHub Pages deployment
- Added GitHub Actions workflow for automatic deployment
- Configured Netlify Forms for beta signup functionality on static sites
- Removed server dependencies for static builds
- Added comprehensive deployment documentation

# External Dependencies

## Database Services
- **Neon Database**: Serverless PostgreSQL hosting with connection pooling
- **Drizzle ORM**: Type-safe database queries and migrations

## UI and Styling
- **Radix UI**: Headless, accessible UI components for complex interactions
- **Tailwind CSS**: Utility-first CSS framework with custom design system
- **Lucide Icons**: Modern icon library for consistent iconography

## Development Tools
- **Vite**: Fast build tool with hot module replacement and optimized production builds
- **TanStack Query**: Powerful data fetching and caching library
- **React Hook Form**: Performant form library with minimal re-renders
- **Zod**: Runtime type validation and schema definition

## Deployment Platform
- **Replit**: Cloud development and hosting platform with integrated tooling
- **Replit Plugins**: Runtime error overlay and cartographer for enhanced development experience

The application is designed for scalability with a clear separation of concerns, type safety throughout the stack, and modern development practices. The architecture supports both development and production environments with appropriate tooling for each context.