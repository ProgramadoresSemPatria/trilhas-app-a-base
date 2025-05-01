import { BrowserRouter, Route, Routes } from "react-router-dom"
import SignIn from "./pages/sign-in"
import Painel from "./pages/painel"
import AuthGuard from "./components/auth-guard"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Toaster } from 'sonner';

function App() {

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster position="top-right" />
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/painel" element={<AuthGuard><Painel /></AuthGuard>} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
