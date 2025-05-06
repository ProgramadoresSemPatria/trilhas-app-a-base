import { BrowserRouter, Route, Routes } from "react-router-dom"
import SignIn from "./pages/sign-in"
import Painel from "./pages/painel"
import AuthGuard from "./components/auth-guard"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Toaster } from 'sonner';
import AdminGuard from "./components/admin-guard"
import TrilhasDesenvolvedor from "./pages/trilhas-desenvolvedor"
import TrilhasDados from "./pages/trilhas-dados"
import Aulas from "./pages/aulas"

function App() {

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster position="top-right" />
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/painel" element={
              <AuthGuard>
                <AdminGuard>
                  <Painel />
                </AdminGuard>
              </AuthGuard>
              } />
            <Route path="/trilhas-desenvolvedor" element={
              <AuthGuard>
                  <TrilhasDesenvolvedor />
              </AuthGuard>
              } />
            <Route path="/trilhas-dados" element={
              <AuthGuard>
                  <TrilhasDados />
              </AuthGuard>
              } />
              <Route path="/trilhas-desenvolvedor/:slug" element={
                <AuthGuard>
                    <Aulas />
                </AuthGuard>
                } />
            <Route path="/trilhas-dados/:slug" element={
              <AuthGuard>
                  <Aulas />
              </AuthGuard>
              } />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
