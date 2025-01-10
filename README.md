# Darpo Dashboard

A modern property management dashboard built with Next.js 14 and TypeScript.

## Features

- 🔐 Google OAuth Authentication
- 👥 Organization Management
- 🏢 Property Management
- 📝 Visitor Management
- 🔑 Role-Based Access Control (RBAC)
- 📱 Responsive Design
- 🎨 Modern UI with shadcn/ui

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Authentication:** NextAuth.js
- **State Management:** React Query
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **Forms:** React Hook Form + Zod
- **API Client:** Axios

## Getting Started

### Prerequisites

- Node.js 20+
- npm or yarn
- Google OAuth credentials

### Development Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/lokeshjain2008/darpo-dash.git
   cd darpo-dash
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

3. Copy the environment variables:
   ```bash
   cp .env.example .env.local
   ```

4. Update the environment variables in `.env.local`:
   ```env
   NEXT_PUBLIC_API_BASE_URL=https://api.darpo.in
   NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your_nextauth_secret
   ```

5. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Project Structure

```
src/
├── app/                   # App router pages
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── forms/            # Form components
│   └── tables/           # Table components
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
│   ├── api/              # API client and endpoints
│   └── auth/             # Authentication utilities
├── types/                # TypeScript types
└── styles/               # Global styles
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript compiler check

## Authentication

The application uses NextAuth.js for authentication with Google OAuth. To set up authentication:

1. Create a Google OAuth application in the [Google Cloud Console](https://console.cloud.google.com/)
2. Configure the OAuth consent screen
3. Add authorized redirect URIs:
   - Development: `http://localhost:3000/api/auth/callback/google`
   - Production: `https://your-domain.com/api/auth/callback/google`
4. Copy the client ID and client secret to your `.env.local` file

## Development Guidelines

### Code Style

- Use TypeScript for all new files
- Follow the existing project structure
- Use shadcn/ui components when available
- Add proper typing for all props and functions
- Use React Query for API calls

### Components

- Place reusable UI components in `components/ui`
- Create form components in `components/forms`
- Use the existing table components for list views
- Follow the component naming convention: `ComponentName.tsx`

### API Integration

1. Define types in `types/`
2. Create API functions in `lib/api/`
3. Create React Query hooks in `hooks/api/`
4. Use the hooks in components

### Authentication & Authorization

- Protected routes are handled by Next.js middleware
- Use the `useAuth` hook for authentication state
- Use the `usePermissions` hook for checking permissions

### Forms

1. Define Zod schema in `lib/validations/`
2. Create form component using React Hook Form
3. Use shadcn/ui form components
4. Add proper error handling and validation

## Deployment

### Vercel Deployment

1. Push your changes to GitHub
2. Connect your repository to Vercel
3. Configure environment variables in Vercel
4. Deploy!

### Environment Variables

Make sure to set these environment variables in your deployment:

```env
NEXT_PUBLIC_API_BASE_URL=
NEXT_PUBLIC_GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
NEXTAUTH_URL=
NEXTAUTH_SECRET=
```

## Contributing

1. Create a new branch: `git checkout -b feature/your-feature`
2. Make your changes
3. Run tests: `npm run test`
4. Push to your branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.
