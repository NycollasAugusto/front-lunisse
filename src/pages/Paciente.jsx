import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { mockApi } from "../services/mockApi";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { LoadingSpinner } from "../components/LoadingSpinner";
import {
  Users,
  User,
  Calendar,
  Phone,
  Mail,
  Activity,
  CheckCircle,
  Eye,
  Search,
} from "lucide-react";

export const Paciente = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- estados e funções do histórico ---
  const [sessoes, setSessoes] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [loadingSessoes, setLoadingSessoes] = useState(true);

  // ---------------- Pacientes ----------------
  const loadPatients = async () => {
    setLoading(true);
    try {
      const data = await mockApi.getPatients(user.id);
      setPatients(data);
      console.log("Pacientes carregados:", data);
    } catch (error) {
      console.error("Erro ao carregar pacientes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPatients();
  }, [user.id]);

  useEffect(() => {
    const handleFocus = () => loadPatients();
    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, []);

  // ---------------- Histórico de Sessões ----------------
  const loadSessions = async () => {
    try {
      const data = await mockApi.getAppointments(user.id, "paciente");
      setSessoes(data);
    } catch (error) {
      console.error("Erro ao carregar histórico:", error);
    } finally {
      setLoadingSessoes(false);
    }
  };

  useEffect(() => {
    loadSessions();
  }, []);

  const sessoesFiltradas = sessoes.filter(
    (s) =>
      s.description?.toLowerCase().includes(filtro.toLowerCase()) ||
      s.professionalName?.toLowerCase().includes(filtro.toLowerCase())
  );

  // ---------------- Loading geral ----------------
  if (loading || loadingSessoes) return <LoadingSpinner size="lg" />;

  // ---------------- Render ----------------
  return (
    <div className="space-y-12">
      {/* Cabeçalho */}
      <div className="flex items-center gap-3">
        <Users className="w-8 h-8 text-white" />
        <h1 className="text-3xl font-bold text-dark">
          Meus Pacientes: {patients.length}
        </h1>
      </div>

      {/* Lista de Pacientes */}
      <div className="grid gap-6">
        {patients.length === 0 ? (
          <Card className="text-center py-12">
            <Users className="w-16 h-16 text-dark/30 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-dark mb-2">
              Nenhum paciente encontrado
            </h3>
            <p className="text-dark/70">
              Conforme seus agendamentos, os seus pacientes irão aparecer aqui!
            </p>
          </Card>
        ) : (
          patients.map((patient) => (
            <Card
              key={patient.id}
              onClick={() => navigate(`/pacientes/${patient.id}`)}
              className="cursor-pointer hover:shadow-lg transition-shadow p-6"
            >
              {/* Cabeçalho do Card */}
              <div className="flex items-center gap-4 mb-6">
                <div
                  className="w-16 h-16 bg-gradient-to-br from-light to-accent
                    rounded-full flex items-center justify-center"
                >
                  <User className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-dark text-xl font-semibold">
                    {patient.name}
                  </h3>
                  <p className="text-sm text-dark/60">
                    Paciente #{patient.id}
                  </p>
                </div>
              </div>

              {/* Informações em colunas */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-dark/80">
                {/* Coluna 1 */}
                <div className="space-y-2">
                  <p className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>
                      Idade:{" "}
                      <strong>
                        {patient.age ? `${patient.age} anos` : "—"}
                      </strong>
                    </span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Activity className="w-4 h-4" />
                    <span>
                      Total de Sessões:{" "}
                      <strong>{patient.sessions || 0}</strong>
                    </span>
                  </p>
                </div>

                {/* Coluna 2 */}
                <div className="space-y-2">
                  <p className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>
                      Nascimento:{" "}
                      <strong>{patient.birthDate || "Não informado"}</strong>
                    </span>
                  </p>
                  <p className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>
                      Status:{" "}
                      <strong className="text-green-600">
                        {patient.status || "Ativo"}
                      </strong>
                    </span>
                  </p>
                </div>

                {/* Coluna 3 */}
                <div className="space-y-2">
                  <p className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    <span>{patient.phone || "Não informado"}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    <span>{patient.email || "Não informado"}</span>
                  </p>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Histórico de Sessões */}
      <div>
        <h2 className="text-2xl font-bold text-dark text-center mb-4">
          Histórico de Sessões
        </h2>

        <Card>
          <div className="flex items-center gap-3 mb-4">
            <Search className="w-5 h-5 text-dark/70" />
            <Input
              placeholder="Filtrar por profissional ou tipo de sessão"
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
            />
          </div>

          {sessoesFiltradas.length === 0 ? (
            <p className="text-dark/70 text-center py-6">
              Nenhuma sessão encontrada.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left border-t">
                <thead>
                  <tr className="text-dark/70 border-b">
                    <th className="p-3">Data/Hora</th>
                    <th className="p-3">Profissional</th>
                    <th className="p-3">Tipo</th>
                    <th className="p-3">Observações</th>
                    <th className="p-3">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {sessoesFiltradas.map((s) => (
                    <tr key={s.id} className="border-b hover:bg-gray-50">
                      <td className="p-3">
                        {new Date(s.date).toLocaleDateString("pt-BR")} {s.time}
                      </td>
                      <td className="p-3">{s.professionalName || "—"}</td>
                      <td className="p-3">{s.description}</td>
                      <td className="p-3 truncate max-w-[150px]">
                        {s.notes || "—"}
                      </td>
                      <td className="p-3">
                        <Button
                          size="sm"
                          onClick={() =>
                            alert(`Ver detalhes da sessão #${s.id}`)
                          }
                          className="flex items-center gap-2"
                        >
                          <Eye size={16} /> Ver
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};
