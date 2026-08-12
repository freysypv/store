# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.



## instructions to run project


PROJECT NAME: [social media store]
AUTHOR: [Freysy Pena]

DESCRIPTION
-----------
A React social media application featuring user authentication,
a follow/friends system, a create-post feature, and a sidebar
with trending topics and suggested follows.

FEATURES
--------
- User signup/login/logout with password change and reset
- Follow/unfollow system with "Friends" mutual-follow detection
- Create post with image preview
- Sidebar with trending topics, ad banner, and follow suggestions
- Dark mode support (auto-detects system preference)
- Responsive layout

HOW TO RUN
-----------
1. Install Node.js (v18 or higher recommended): https://nodejs.org

2. Extract this zip and navigate into the code/ folder:
   cd code

3. Install dependencies:
   npm install

4. Start the development server:
   npm start

5. Open your browser to:
   http://localhost:3000

NOTES
-----
- User data is stored in the browser's localStorage (no backend/database required).
- To reset all data, clear your browser's localStorage for this site,
  or open dev tools > Application > Local Storage > clear.

TECHNOLOGIES USED
------------------
- React
- React Router
- CSS
- HTML
