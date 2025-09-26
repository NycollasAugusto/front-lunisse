import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { mockApi } from "../services/mockApi";
import { Card } from "../components/Card";
import { LoadingSpinner } from "../components/LoadingSpinner";
import {
  Users,
  User,
  Calendar,
  Phone,
  Mail,
  Activity,
  CheckCircle,
} from "lucide-react";

export const Paciente = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) return <LoadingSpinner size="lg" />;

  return (
    <div className="space-y-6">
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
              onClick={() => navigate(`pacientes/${patient.id}`)}
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
                  <p className="text-sm text-dark/60">Paciente #{patient.id}</p>
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
                      <strong>{patient.age ? `${patient.age} anos` : "—"}</strong>
                    </span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Activity className="w-4 h-4" />
                    <span>
                      Total de Sessões: <strong>{patient.sessions || 0}</strong>
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
    </div>
  );
};
