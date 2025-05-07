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
      <Toaster position="bottom-right" />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route element={<AuthGuard />}>
          <Route element={<AdminGuard />}>
            <Route path="/painel" element={<Painel />} />
          </Route>
          <Route path="/trilhas-desenvolvedor" element={<TrilhasDesenvolvedor />} />
          <Route path="/trilhas-dados" element={<TrilhasDados />} />
          <Route path="/trilhas-desenvolvedor/:slug" element={<Aulas />} />
          <Route path="/trilhas-dados/:slug" element={<Aulas />} />
        </Route>
      </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
