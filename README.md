# 🧪 Zetta Dashboard

A modern, responsive dashboard built with **Next.js 15**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**.

## 🌟 Live Demo

- **GitHub Repository**: [https://github.com/azn-arabin/zetta](https://github.com/azn-arabin/zetta)
- **Live Site**: [https://zetta-five.vercel.app/](https://zetta-five.vercel.app/)

## 🎯 Features Implemented

### ✅ Core Requirements

- [x] **Next.js 15** with App Router and TypeScript
- [x] **Custom components** without external UI libraries (shadcn/ui not used)
- [x] **Tailwind CSS** for styling
- [x] **Framer Motion** for animations

### 🎁 Bonus Feature - Google OAuth Authentication

- [x] **NextAuth.js** integration with Google OAuth
- [x] **Protected Profile Page** (`/profile`) with user details
- [x] **Authentication State Management** in navigation
- [x] **Session-based Route Protection** with middleware
- [x] **Sign In/Sign Out** functionality with smooth transitions
- [x] **Responsive Auth UI** for mobile and desktop

### 📱 Pages & Routes

- [x] **`/` - Dashboard Home**: Static summary with animated charts and stats
- [x] **`/posts` - Posts Page**: Fetch & display posts with Card components
- [x] **`/posts/[id]` - Post Details**: Individual post view with navigation
- [x] **`/users` - Users Page**: Responsive table with animated modal
- [x] **`/auth/signin` - Sign In Page**: Google OAuth authentication
- [x] **`/profile` - Profile Page**: Protected user profile with session details

### 🔧 Reusable Components

- [x] **Card Component**: Reusable with animations and hover effects
- [x] **Modal Component**: Animated modal with backdrop and transitions
- [x] **Loading Component**: Spinner with customizable size and text
- [x] **Error Component**: User-friendly error display with retry functionality
- [x] **Navigation**: Responsive navigation with active states

### 🪝 Custom Hooks

- [x] **useFetch**: Generic API data fetching with loading/error states
- [x] **usePosts**: Specific hook for posts API
- [x] **useUsers**: Specific hook for users API
- [x] **useErrorDemo**: Intentional error demonstration

### 🎭 Framer Motion Animations

- [x] **Staggered Card Animations**: Posts and stats animate in sequence
- [x] **Animated Modal**: Scale and fade transitions
- [x] **Collapsible Sidebar**: Spring animations with smooth transitions
- [x] **Page Transitions**: Smooth entrance animations
- [x] **Interactive Elements**: Hover and tap animations on buttons/cards
- [x] **Layout Animations**: Smooth layout shifts and morphing

### 🚨 Error Handling & Loading

- [x] **Loading States**: Spinner components during API calls
- [x] **Error Messages**: Clear, user-friendly error displays
- [x] **Retry Functionality**: Users can retry failed requests
- [x] **Error Demo**: Button to simulate various API errors (404, 500, network failures)

## 🛠️ Technologies Used

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **Authentication**: NextAuth.js (Auth.js) with Google OAuth
- **API**: JSONPlaceholder (posts & users)
- **Fonts**: Geist Sans & Geist Mono

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm/yarn/pnpm
- Google Cloud Console account (for OAuth)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/azn-arabin/zetta.git
   cd zetta
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up Google OAuth (Bonus Feature)**

   a. Go to [Google Cloud Console](https://console.cloud.google.com/)

   b. Create a new project or select existing one

   c. Enable Google+ API

   d. Create OAuth 2.0 credentials:

   - Go to "Credentials" → "Create Credentials" → "OAuth client ID"
   - Application type: Web application
   - Authorized redirect URIs: `http://localhost:3000/api/auth/callback/google`

   e. Copy `.env.example` to `.env.local`:

   ```bash
   cp .env.example .env.local
   ```

   f. Fill in your credentials:

   ```env
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-random-secret-here
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   ```

4. **Run development server**

   ```bash
   npm run dev
   ```

5. **Open browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build & Deploy

```bash
# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## 🎨 Design Highlights

### Responsive Design

- Mobile-first approach
- Responsive navigation with hamburger menu
- Adaptive table that transforms to cards on mobile
- Flexible grid layouts

### User Experience

- Smooth page transitions
- Loading states for better perceived performance
- Error handling with retry options
- Keyboard navigation support (ESC to close modal)
- Hover and focus states throughout

### Animation Details

- **Staggered animations** on posts and dashboard cards
- **Spring physics** for natural sidebar transitions
- **Morphing layouts** with `layoutId` for seamless transitions
- **Gesture animations** (hover, tap, drag) for interactivity
- **Entrance animations** with proper timing and easing

## 📁 Project Structure

```
src/
├── app/                   # Next.js App Router
│   ├── auth/
│   │   └── signin/       # Authentication pages
│   ├── posts/            # Posts pages
│   ├── users/            # Users page
│   ├── profile/          # Protected profile page
│   ├── api/
│   │   └── auth/         # NextAuth API routes
│   ├── layout.tsx        # Root layout with SessionProvider
│   └── page.tsx          # Dashboard home
├── components/           # Reusable components
│   ├── Card.tsx         # Animated card component
│   ├── Modal.tsx        # Animated modal
│   ├── Navigation.tsx   # Responsive navigation with auth
│   ├── AnimatedSidebar.tsx # Collapsible sidebar
│   ├── Loading.tsx      # Loading spinner
│   ├── Error.tsx        # Error display
│   ├── Providers.tsx    # Session provider wrapper
│   └── ErrorDemo.tsx    # Error demonstration
├── hooks/               # Custom React hooks
│   └── useFetch.ts     # API data fetching
├── lib/                # Library configurations
│   └── auth.ts         # NextAuth configuration
├── types/              # TypeScript definitions
│   └── index.ts        # API response types
└── middleware.ts       # Route protection middleware
```

## 🧪 Error Demonstration

The dashboard includes a comprehensive error handling demonstration:

- **Random error simulation**: Network failures, 404s, 500s
- **User-friendly messages**: Clear error descriptions
- **Retry functionality**: Users can attempt to recover
- **Loading states**: Visual feedback during retry attempts
- **Smooth animations**: Error states transition gracefully

## 🎯 Test Requirements Checklist

- ✅ Next.js 15 with TypeScript and App Router
- ✅ Tailwind CSS (no shadcn/ui or external UI libraries)
- ✅ Framer Motion animations
- ✅ Dashboard home with static summary and animations
- ✅ Posts page with Card components and dynamic routes
- ✅ Users page with responsive table and animated modal
- ✅ Custom useFetch hook for API calls
- ✅ Reusable Card component
- ✅ Error handling with intentional error demo
- ✅ Loading states throughout the application
- ✅ Meaningful animations (not just fades)
- ✅ Clean, scalable code structure
- ✅ Responsive design for all screen sizes
- ✅ **BONUS**: Google OAuth authentication with NextAuth.js
- ✅ **BONUS**: Protected profile page with session management
- ✅ **BONUS**: Authentication state in navigation
- ✅ **BONUS**: Route protection with middleware

## 📝 API Endpoints Used

- **Posts**: `https://jsonplaceholder.typicode.com/posts`
- **Single Post**: `https://jsonplaceholder.typicode.com/posts/{id}`
- **Users**: `https://jsonplaceholder.typicode.com/users`

## 🚀 Deployment Instructions

### Vercel (Recommended)

1. Connect GitHub repository to Vercel
2. Set build command: `npm run build`
3. Set output directory: `.next`
4. Deploy automatically

### Alternative Platforms

- **Netlify**: Use `npm run build` and deploy `.next` folder
- **Render**: Connect GitHub and use build command `npm run build`

---

**Built with ❤️ using Next.js 15** 🚀
