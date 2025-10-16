import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { mockApi } from '../services/mockApi';
import { Card } from '../components/Card';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { Calendar, Clock, FileText } from 'lucide-react';
 
export const HistoricoSessoes = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [psychologists, setPsychologists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 
  // Paginação
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;
 
  // Carregar dados
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        const [appointmentsData, psychologistsData] = await Promise.all([
          mockApi.getAppointments(user.id, 'paciente'),
          mockApi.getPsychologists()
        ]);
        const completedAppointments = appointmentsData.filter(
          apt => apt.status === 'concluido'
        );
        setAppointments(
          completedAppointments.sort(
            (a, b) => new Date(b.date) - new Date(a.date)
          )
        );
        setPsychologists(psychologistsData);
      } catch (error) {
        setError('Erro ao carregar histórico');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
 
    loadData();
  }, [user.id]);
 
  // Paginar
  const paginatedAppointments = appointments.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );
 
  if (loading) return <LoadingSpinner size="lg" />;
  if (error) return <p className="text-red-600">{error}</p>;
 
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-dark">Histórico de Sessões</h1>
        <p className="text-dark/70">{appointments.length} sessões encontradas</p>
      </div>
 
      {/* Lista ou vazio */}
      {paginatedAppointments.length === 0 ? (
        <Card className="text-center py-8">
          <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-dark/70">Nenhuma sessão encontrada.</p>
        </Card>
      ) : (
        <div className="space-y-4">
          {paginatedAppointments.map(appointment => (
            <Card key={appointment.id} className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-dark">
                    Sessão com{' '}
                    {psychologists.find(p => p.id === appointment.psychologistId)
                      ?.name || 'Psicólogo'}
                  </h3>
                  <div className="flex items-center text-dark/70 text-sm mt-1">
                    <Calendar className="w-4 h-4 mr-1" />
                    {new Date(appointment.date).toLocaleDateString('pt-BR')}
                    <Clock className="w-4 h-4 ml-4 mr-1" />
                    {appointment.time}
                  </div>
                </div>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                  Concluída
                </span>
              </div>
 
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium text-dark mb-1">
                    Descrição da Sessão
                  </h4>
                  <p className="text-dark/70 text-sm">
                    {appointment.description}
                  </p>
                </div>
 
                {appointment.notes && (
                  <div>
                    <h4 className="font-medium text-dark mb-1">Observações</h4>
                    <p className="text-dark/70 text-sm bg-gray-50 p-3 rounded-lg">
                      {appointment.notes}
                    </p>
                  </div>
                )}
 
                <div className="flex items-center text-sm text-dark/60">
                  <Clock className="w-4 h-4 mr-1" />
                  Duração: {appointment.duration} minutos
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
 
      {/* Paginação */}
      <div className="flex justify-between items-center mt-6">
        <button
          onClick={() => setPage(old => Math.max(1, old - 1))}
          disabled={page === 1}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Anterior
        </button>
 
        <span>
          Página {page} de {Math.max(1, Math.ceil(appointments.length / itemsPerPage))}
        </span>
 
        <button
          onClick={() =>
            setPage(old =>
              Math.min(Math.ceil(appointments.length / itemsPerPage), old + 1)
            )
          }
          disabled={page === Math.ceil(appointments.length / itemsPerPage)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Próxima
        </button>
      </div>
    </div>
  );
};
 
 