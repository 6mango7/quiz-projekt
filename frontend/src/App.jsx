import { createBrowserRouter } from 'react-router'
import { RouterProvider } from 'react-router/dom'
import { ThemeProvider } from './context/ThemeProvider'
import { ToastProvider } from './context/ToastProvider'
import { AuthProvider } from './context/AuthProvider'
import { Layout } from './components/Layout'
import { HomePage } from './pages/HomePage'
import { UnderConstructionPage } from './pages/UnderConstructionPage'
import { NotFoundPage } from './pages/NotFoundPage'

// Mapa adresów strony.
// Gotowa jest strona główna. Pozostałe adresy pokazują stronę "W budowie" –
// gdy zrobisz daną stronę, podmień jej element, np.:
//   { path: 'logowanie', element: <LoginPage /> },
const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },

      // strona quizu (opis, wybór liczby opcji, ranking, komentarze)
      { path: 'quiz/:id', element: <UnderConstructionPage title="Strona quizu" /> },
      // rozgrywka – pojedynki 1 na 1
      { path: 'quiz/:id/graj', element: <UnderConstructionPage title="Rozgrywka" /> },
      // podsumowanie + oceny i komentarze
      { path: 'quiz/:id/wynik', element: <UnderConstructionPage title="Podsumowanie quizu" /> },
      // edycja i usuwanie quizu
      { path: 'quiz/:id/edytuj', element: <UnderConstructionPage title="Edycja quizu" /> },
      // tworzenie quizu
      { path: 'stworz', element: <UnderConstructionPage title="Tworzenie quizu" /> },
      { path: 'logowanie', element: <UnderConstructionPage title="Logowanie" /> },
      { path: 'rejestracja', element: <UnderConstructionPage title="Rejestracja" /> },
      { path: 'profil/:username', element: <UnderConstructionPage title="Profil" /> },
      { path: 'ustawienia', element: <UnderConstructionPage title="Ustawienia konta" /> },
      { path: 'kontakt', element: <UnderConstructionPage title="Kontakt" /> },

      // każdy inny adres
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])

export default function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </ToastProvider>
    </ThemeProvider>
  )
}
