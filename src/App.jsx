import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Dashboard from './pages/Dashboard';
import Bookings from './pages/Bookings';
import Cabins from './pages/Cabins';
import Users from './pages/Users';
import Settings from './pages/Settings';
import Account from './pages/Account';
import Login from './pages/Login';
import PageNotFound from './pages/PageNotFound';
import AppLayout from "./ui/AppLayout";
import GlobalStyles from './styles/GlobalStyles';
import { Toaster } from "react-hot-toast";

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout/>,
    errorElement: <PageNotFound/>,
    children: [
      {
        index: true,
        element: <Dashboard/>
      },
      {
        path: 'bookings',
        element: <Bookings/>
      },
      {
        path: 'cabins',
        element: <Cabins/>
      },
      {
        path: 'users',
        element: <Users/>
      },
      {
        path: 'settings',
        element: <Settings/>
      },
      {
        path: 'account',
        element: <Account/>
      },
    ]
  },
  {
    path: 'login',
    element: <Login/>
  }

])

export default function App() {

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 0
      }
    }
  })
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false}/>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{margin: '8px'}}
        toastOptions={{
          success: {
            duration: 3000
          },
          error: {
            duration: 5000
          },
          style: {
            fontSize: '16px',
            maxWidth: '500px',
            padding: '16px 24px',
            backgroundColor: 'var(--color-grey-0)',
            color: 'var(--color-grey-700)'
          }
        }}
      />
      <GlobalStyles/>
      <RouterProvider router={router}>
        
      </RouterProvider>
    </QueryClientProvider>
  )
}
