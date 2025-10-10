import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { mockApi } from "../services/mockApi";

import { Input } from "../components/Input";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { LoadingSpinner } from "../components/LoadingSpinner";

import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  Calendar,
  Activity,
  CheckCircle,
  Clock,
  Eye,
  Plus,
} from "lucide-react";
import toast from "react-hot-toast";

const PatientInfo = ({ patient }) => {
  const fields = [
    { icon: Calendar, label: "Idade", value: `${patient.age} Anos` },
    {
      icon: Calendar,
      label: "Data de Nascimento",
      value: new Date(patient.birthDate).toLocaleDateString("pt-BR"),
    },
    { icon: Phone, label: "Telefone", value: patient.phone, href: `tel:${patient.phone}` },
    { icon: Mail, label: "Email", value: patient.email, href: `mailto:${patient.email}` },
    { icon: Activity, label: "Total de sessões", value: patient.totalSessions },
    {
      icon: CheckCircle,
      label: "Status do tratamento",
      value: patient.status,
      isStatus: true,
    },
  ];

  return (
    <Card>
      <div className="space-y-6">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 bg-gradient-to-br from-light to-accent rounded-full flex items-center justify-center">
            <User className="w-10 h-10 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-dark">{patient.name}</h2>
            <p className="text-sm text-dark/60">Paciente: {patient.id}</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {fields.map(({ icon: IconComponent, label, value, href, isStatus }) => (
            <div key={label} className="flex items-center gap-3">
              <IconComponent className="w-5 h-5 text-dark/60" />
              <div>
                <p className="text-sm text-dark/60 font-semibold">{label}</p>

                {href ? (
                  <a
                    href={href}
                    className="font-semibold text-dark/70 hover:text-accent transition-colors"
                  >
                    {value}
                  </a>
                ) : isStatus ? (
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                      value === "ativo" || value === "em tratamento"
                        ? "bg-green-400 text-dark/70"
                        : "bg-red-400 text-dark/70"
                    }`}
                  >
                    {value}
                  </span>
                ) : (
                  <p className="font-medium text-dark/80">{value}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

const SessionForm = ({ data, onChange, onSubmit, onCancel, loading }) => {
  const timeSlots = ["08:00", "09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00", "18:00"];
  const durations = [30, 40, 50, 60];
  const today = new Date().toISOString().split("T")[0];

  return (
    <Card className="bg-white p-6 shadow-md rounded-lg">
      <h4 className="font-semibold text-dark mb-6 text-xl">Agendar Nova Sessão</h4>
      <form onSubmit={onSubmit} className="space-y-5">
        <div className="grid md:grid-cols-2 gap-6">
          <Input
            label="Data *"
            type="date"
            value={data.date}
            onChange={(e) => onChange({ ...data, date: e.target.value })}
            min={today}
            required
          />
          <div>
            <label className="block text-sm font-medium text-dark mb-2">Horário *</label>
            <select
              value={data.time}
              onChange={(e) => onChange({ ...data, time: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-dark focus:outline-none focus:ring-2 focus:ring-accent transition"
              required
            >
              <option value="">Selecione um horário</option>
              {timeSlots.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>
        </div>

        <Input
          label="Descrição *"
          value={data.description}
          onChange={(e) => onChange({ ...data, description: e.target.value })}
          placeholder="EX: Sessão de acompanhamento, Avaliação inicial ..."
          required
        />

        <div>
          <label className="block text-sm font-medium text-dark mb-2">Duração (minutos)</label>
          <select
            value={data.duration}
            onChange={(e) => onChange({ ...data, duration: parseInt(e.target.value) })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-dark focus:outline-none focus:ring-2 focus:ring-accent transition"
            required
          >
            <option value="">Selecione a duração da sessão</option>
            {durations.map((duration) => (
              <option key={duration} value={duration}>
                {duration} Minutos
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-4 mt-4">
          <Button
            type="button"
            variant="secondary"
            onClick={onCancel}
            className="flex-1 border border-gray-300 text-dark hover:bg-gray-100"
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            loading={loading}
            className="flex-1 bg-accent text-white hover:bg-accent-dark disabled:opacity-50"
            disabled={!data.date || !data.time}
          >
            Agendar sessão
          </Button>
        </div>
      </form>
    </Card>
  );
};

const Header = ({ onBack, title }) => (
  <div className="flex items-center gap-4 mb-6">
    <Button
      variant="secondary"
      onClick={onBack}
      className="flex items-center gap-2 bg-white text-accent hover:bg-gray-100 border border-gray-300"
    >
      <ArrowLeft size={20} />
      Voltar
    </Button>
    <h1 className="text-3xl font-bold text-dark">{title}</h1>
  </div>
);

const SessionsCard = ({
  sessions,
  showForm,
  formData,
  onFormChange,
  onFormSubmit,
  onFormCancel,
  onShowForm,
  onStatusUpdate,
  updatingSessions,
  creatingSession,
  navigate,
}) => (
  <Card className="p-6">
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-dark flex items-center gap-2">
          <Clock className="w-5 h-5" />
          Histórico de Sessões
        </h3>
        <Button
          onClick={onShowForm}
          className="flex items-center gap-2 bg-accent text-white hover:bg-accent-dark"
        >
          <Plus className="w-4 h-4" />
          Nova Sessão
        </Button>
      </div>

      {showForm && (
        <SessionForm
          data={formData}
          onChange={onFormChange}
          onSubmit={onFormSubmit}
          onCancel={onFormCancel}
          loading={creatingSession}
        />
      )}

      <SessionList
        sessions={sessions}
        onStatusUpdate={onStatusUpdate}
        updatingSessions={updatingSessions}
        navigate={navigate}
      />
    </div>
  </Card>
);

const SessionList = ({ sessions, onStatusUpdate, updatingSessions, navigate }) => {
  if (sessions.length === 0) {
    return (
      <div className="text-center py-8">
        <Clock className="w-16 h-16 text-dark/30 mx-auto mb-4" />
        <p className="text-dark/70">Nenhuma sessão encontrada para este paciente.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {sessions.map((session) => (
        <div
          key={session.id}
          className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <p className="font-semibold text-dark">Sessão #{session.id}</p>
                <select
                  value={session.status}
                  onChange={(e) => onStatusUpdate(session.id, e.target.value)}
                  disabled={updatingSessions.has(session.id)}
                  className="px-2 py-1 text-xs font-medium border rounded-full focus:ring-2 focus:ring-accent bg-blue-100 text-blue-800"
                >
                  <option value="agendado">Agendado</option>
                  <option value="iniciado">Iniciado</option>
                  <option value="concluido">Concluído</option>
                  <option value="cancelado">Cancelado</option>
                </select>
              </div>
              <p className="text-sm text-dark/70 mb-2">
                {new Date(session.date).toLocaleDateString("pt-BR")} às {session.time}
              </p>
              <p className="text-dark font-medium">{session.description}</p>
            </div>
            <button
              onClick={() => navigate(`/sessao/${session.id}`)}
              className="p-2 text-dark/60 hover:text-dark transition-colors"
              title="Ver detalhes completos"
            >
              <Eye size={18} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export const PacienteDetalhes = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAuth();

  const [patient, setPatient] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [loadingPatient, setLoadingPatient] = useState(true);
  const [loadingSessions, setLoadingSessions] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [creatingSession, setCreatingSession] = useState(false);
  const [updatingSessions, setUpdatingSessions] = useState(new Set());

  const [formData, setFormData] = useState({
    date: "",
    time: "",
    description: "",
    duration: 30,
  });

  useEffect(() => {
    async function fetchPatient() {
      try {
        setLoadingPatient(true);
        const data = await mockApi.getPatient(id, user.token);
        setPatient(data);
      } catch (error) {
        toast.error("Erro ao carregar informações do paciente.");
      } finally {
        setLoadingPatient(false);
      }
    }
    fetchPatient();
  }, [id, user.token]);

  useEffect(() => {
    async function fetchSessions() {
      try {
        setLoadingSessions(true);
        const data = await mockApi.getSessionsByPatient(id, user.token);
        setSessions(data);
      } catch (error) {
        toast.error("Erro ao carregar sessões.");
      } finally {
        setLoadingSessions(false);
      }
    }
    fetchSessions();
  }, [id, user.token]);

  const handleFormChange = (newData) => {
    setFormData(newData);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setCreatingSession(true);
    try {
      const newSession = await mockApi.createSession(id, formData, user.token);
      setSessions((prev) => [...prev, newSession]);
      setShowForm(false);
      setFormData({
        date: "",
        time: "",
        description: "",
        duration: 30,
      });
      toast.success("Sessão criada com sucesso!");
    } catch {
      toast.error("Erro ao criar sessão.");
    } finally {
      setCreatingSession(false);
    }
  };

  const handleStatusUpdate = async (sessionId, status) => {
    setUpdatingSessions((prev) => new Set(prev).add(sessionId));
    try {
      await mockApi.updateSessionStatus(sessionId, status, user.token);
      setSessions((prev) =>
        prev.map((session) =>
          session.id === sessionId ? { ...session, status } : session
        )
      );
      toast.success("Status atualizado!");
    } catch {
      toast.error("Erro ao atualizar status.");
    } finally {
      setUpdatingSessions((prev) => {
        const newSet = new Set(prev);
        newSet.delete(sessionId);
        return newSet;
      });
    }
  };

  const handleBack = () => navigate("/pacientes");

  if (loadingPatient) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <Header onBack={handleBack} title="Detalhes do Paciente" />
      <PatientInfo patient={patient} />

      {loadingSessions ? (
        <div className="flex justify-center mt-8">
          <LoadingSpinner />
        </div>
      ) : (
        <SessionsCard
          sessions={sessions}
          showForm={showForm}
          formData={formData}
          onFormChange={handleFormChange}
          onFormSubmit={handleFormSubmit}
          onFormCancel={() => setShowForm(false)}
          onShowForm={() => setShowForm(true)}
          onStatusUpdate={handleStatusUpdate}
          updatingSessions={updatingSessions}
          creatingSession={creatingSession}
          navigate={navigate}
        />
      )}
    </div>
  );
};

