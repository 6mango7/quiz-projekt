import { createBrowserRouter } from 'react-router'
import { RouterProvider } from 'react-router/dom'
import HomePage from './pages/HomePage.jsx'

// Mapa adresów strony – każdą nową stronę dopisujesz tutaj,
// np. { path: '/kontakt', element: <ContactPage /> }
const router = createBrowserRouter([{ path: '/', element: <HomePage /> }])

export default function App() {
  return <RouterProvider router={router} />
}
