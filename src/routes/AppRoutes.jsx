// ---------------------------------------------
// 📁 src/routes/AppRoutes.jsx
// ---------------------------------------------

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { motion } from "framer-motion";

// 🧱 Componentes reutilizáveis
import { PublicNavbar } from "../components/PublicNavbar";
import { Sidebar } from "../components/Sidebar";
import { LoadingSpinner } from "../components/LoadingSpinner";

// 🌐 Páginas públicas
import { Home } from "../pages/Home";
import { About } from "../pages/About";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import { NotFound } from "../pages/NotFound";

// 🔒 Páginas privadas
import { DashboardPaciente } from "../pages/DashboardPaciente";
import { DashboardPsicologo } from "../pages/DashboardPsicologo";
import { Agendamento } from "../pages/Agendamentos";
import { ChatIA } from "../pages/ChatIA";
import { Relatorios } from "../pages/Relatorio";
import { PacienteDetalhes } from "../pages/PacienteDetalhes";
import { Paciente } from "../pages/Paciente";
import { Solicitacoes } from "../pages/Solicitacoes";
import { SessaoDetalhes } from "../pages/SessaoDetalhes";
import { Contato } from "../pages/Contato";
import { HistoricoSessoes } from "../pages/HistoricoSessoes"; 

// 🔑 Contexto de autenticação
import { useAuth } from "../context/AuthContext";


// -----------------------------------------------------------
// 🔐 COMPONENTES DE ROTAS
// -----------------------------------------------------------

// Rota protegida (acesso somente com login)
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;

  return (
    <div className="min-h-screen flex bg-gray-50">
      <Sidebar />
      <motion.main
        className="flex-1 lg:ml-64 p-6"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {children}
      </motion.main>
    </div>
  );
};

// Rota pública (sem login necessário)
const PublicRoute = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <PublicNavbar />
      <motion.main
        className="flex-1 mx-auto w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        {children}
      </motion.main>
    </div>
  );
};

// Dashboard dinâmico (paciente ou psicólogo)
const Dashboard = () => {
  const { user } = useAuth();
  return user?.type === "psicologo" ? (
    <DashboardPsicologo />
  ) : (
    <DashboardPaciente />
  );
};

// -----------------------------------------------------------
// 🌍 ROTAS PRINCIPAIS
// -----------------------------------------------------------

export const AppRoutes = () => {
  const { user, loading } = useAuth();

  // Exibe loading global enquanto autentica
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        {/* -------------------- 🌐 ROTAS PÚBLICAS -------------------- */}
        {!user && (
          <>
            <Route path="/" element={<PublicRoute><Home /></PublicRoute>} />
            <Route path="/about" element={<PublicRoute><About /></PublicRoute>} />
            <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
            <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
            <Route path="/contact"  element={<PublicRoute><Contato /></PublicRoute>}
            />
          </>
        )}

        {/* -------------------- 🔒 ROTAS PRIVADAS -------------------- */}
        {user && (
          <>
            <Route
              path="/dashboard"
              element={<ProtectedRoute><Dashboard /></ProtectedRoute>}
            />
            <Route
              path="/agendamento"
              element={<ProtectedRoute><Agendamento /></ProtectedRoute>}
            />
            <Route
              path="/chat-ia"
              element={<ProtectedRoute><ChatIA /></ProtectedRoute>}
            />
            <Route
              path="/relatorios"
              element={<ProtectedRoute><Relatorios /></ProtectedRoute>}
            />
            <Route
              path="/solicitacoes"
              element={<ProtectedRoute><Solicitacoes /></ProtectedRoute>}
            />
            <Route
              path="/pacientes"
              element={<ProtectedRoute><Paciente /></ProtectedRoute>}
            />
            <Route
              path="/pacientes/:id"
              element={<ProtectedRoute><PacienteDetalhes /></ProtectedRoute>}
            />
            <Route
              path="/sessao/:sessionId"
              element={<ProtectedRoute><SessaoDetalhes /></ProtectedRoute>}
            />
   <Route
              path="/contato"
              element={<ProtectedRoute><Contato /></ProtectedRoute>}
            />
   <Route
              path="/historicosessoes"
              element={<ProtectedRoute><HistoricoSessoes /></ProtectedRoute>}
            />

          </>
        )}

        {/* -------------------- ⚠️ REDIRECIONAMENTO / 404 -------------------- */}
        <Route
          path="*"
          element={
            user ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
};
