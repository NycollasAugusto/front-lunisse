import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Bell, User, Clock, CheckCircle, X } from 'lucide-react';

import { useAuth } from '../context/AuthContext';
import { mockApi } from '../services/mockApi';

import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { LoadingSpinner } from '../components/LoadingSpinner';

export const Solicitacoes = () => {
  const { user } = useAuth();

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingRequests, setProcessingRequests] = useState(new Set());

  useEffect(() => {
    loadRequests();
  }, [user.id]);

  const loadRequests = async () => {
    setLoading(true);
    try {
      const data = await mockApi.getRequests(user.id);
      const pendingRequests = data.filter(req => req.status === 'pendente');
      setRequests(pendingRequests);
    } catch (error) {
      console.error('Erro ao carregar solicitações:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptRequest = async (requestId, requestData) => {
    setProcessingRequests(prev => new Set([...prev, requestId]));

    try {
      const existingPatients = await mockApi.getPatients(user.id);
      const duplicatePatient = existingPatients.find(p => p.email === requestData.patientEmail);

      if (duplicatePatient) {
        toast.error('Este paciente já está cadastrado em sua lista!');
        return;
      }

      await mockApi.createPatient({
        name: requestData.patientName,
        email: requestData.patientEmail,
        phone: requestData.patientPhone,
        birthDate: '1990-01-01',
        age: 30,
        status: 'Ativo',
        psychologistId: user.id
      });

      await mockApi.updateRequestStatus(requestId, 'aceito', 'Paciente aceito e cadastrado no sistema');
      setRequests(prev => prev.filter(req => req.id !== requestId));
      toast.success('Solicitação aceita! Paciente adicionado à sua lista.');

    } catch (error) {
      console.error('Erro ao aceitar solicitação:', error);
      toast.error('Erro ao processar solicitação');
    } finally {
      setProcessingRequests(prev => {
        const newSet = new Set(prev);
        newSet.delete(requestId);
        return newSet;
      });
    }
  };

  const handleRejectRequest = async (requestId) => {
    setProcessingRequests(prev => new Set([...prev, requestId]));

    try {
      await mockApi.updateRequestStatus(requestId, 'rejeitado', 'Solicitação rejeitada pelo psicólogo');
      setRequests(prev => prev.filter(req => req.id !== requestId));
      toast.success('Solicitação rejeitada.');
    } catch (error) {
      console.error('Erro ao rejeitar solicitação:', error);
      toast.error('Erro ao processar solicitação');
    } finally {
      setProcessingRequests(prev => {
        const newSet = new Set(prev);
        newSet.delete(requestId);
        return newSet;
      });
    }
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'alta': return 'bg-[#f2d6d0] text-[#8b2d2d] shadow-md';
      case 'media': return 'bg-[#fbecc0] text-[#8b6f1f] shadow-md';
      case 'baixa': return 'bg-[#d8ead3] text-[#2e5d34] shadow-md';
      default: return 'bg-[#e0dcd6] text-[#4b3a2f] shadow-md';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'aceito': return 'bg-[#d8ead3] text-[#2e5d34] shadow-md';
      case 'rejeitado': return 'bg-[#f2d6d0] text-[#8b2d2d] shadow-md';
      case 'pendente': return 'bg-[#e7d6c0] text-[#4b3a2f] shadow-md';
      default: return 'bg-[#e0dcd6] text-[#4b3a2f] shadow-md';
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <LoadingSpinner size="lg" />
    </div>
  );

  return (
    <div className="space-y-8 px-4 md:px-0 max-w-4xl mx-auto">
      <div className="flex items-center gap-3">
        <Bell className="w-8 h-8 text-[#4b3a2f]" />
        <h1 className="text-3xl font-extrabold text-[#4b3a2f] tracking-wide">Solicitações de Pacientes</h1>
      </div>

      <div className="grid gap-8">
        {requests.length === 0 ? (
          <Card className="text-center py-16 bg-[#f5f3ef] border border-[#d6c3b3] rounded-lg shadow-lg">
            <Bell className="w-16 h-16 text-[#4b3a2f]/40 mx-auto mb-6 animate-bounce" />
            <h3 className="text-2xl font-semibold text-[#4b3a2f] mb-3">Nenhuma solicitação encontrada</h3>
            <p className="text-[#4b3a2f]/70 max-w-sm mx-auto">
              As solicitações de novos pacientes aparecerão aqui assim que chegarem.
            </p>
          </Card>
        ) : (
          requests.map(request => (
            <Card
              key={request.id}
              className="space-y-5 bg-[#f5f3ef] border border-[#e1d7ce] rounded-xl shadow-md transition-transform transform hover:scale-[1.02] hover:shadow-xl duration-300 ease-in-out"
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#d6c3b3] to-[#bfae9f] rounded-full flex items-center justify-center shadow-md">
                    <User className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-[#4b3a2f] tracking-tight">{request.patientName}</h3>
                    <p className="text-sm text-[#4b3a2f]/70">{request.patientEmail}</p>
                    <p className="text-sm text-[#4b3a2f]/70">{request.patientPhone}</p>
                  </div>
                </div>

                <div className="flex flex-col gap-2 text-center">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold tracking-wide ${getUrgencyColor(request.urgency)} select-none`}
                    style={{ minWidth: '90px' }}
                  >
                    {request.urgency === 'alta' ? 'Alta' : request.urgency === 'media' ? 'Média' : 'Baixa'} urgência
                  </span>

                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold tracking-wide ${getStatusColor(request.status)} select-none`}
                    style={{ minWidth: '90px' }}
                  >
                    {request.status === 'aceito' ? 'Aceito' : request.status === 'rejeitado' ? 'Rejeitado' : 'Pendente'}
                  </span>
                </div>
              </div>

              <div className="bg-[#ede8e2] rounded-lg p-5 shadow-inner border border-[#d6c3b3]">
                <h4 className="font-medium text-[#4b3a2f] mb-2 text-lg">Descrição da necessidade</h4>
                <p className="text-[#4b3a2f]/80 leading-relaxed">{request.description}</p>
              </div>

              <div className="flex items-center gap-4 text-sm text-[#4b3a2f]/60 font-medium">
                <Clock className="w-5 h-5" />
                <span>Enviado em {new Date(request.createdAt).toLocaleDateString('pt-BR')}</span>
              </div>

              {request.notes && (
                <div className="bg-[#f8f4f0] rounded-lg p-4 shadow-sm border border-[#d6c3b3]">
                  <p className="text-sm text-[#4b3a2f] font-semibold">
                    <strong>Observações:</strong> {request.notes}
                  </p>
                </div>
              )}

              <div className="flex gap-4">
                <Button
                  variant="secondary"
                  onClick={() => handleRejectRequest(request.id)}
                  loading={processingRequests.has(request.id)}
                  className="flex-1 flex items-center justify-center gap-2 bg-[#e0c1b3] hover:bg-red-600 hover:text-white transition duration-300"
                >
                  <X className="w-5 h-5" />
                  Rejeitar
                </Button>

                <Button
                  onClick={() => handleAcceptRequest(request.id, request)}
                  loading={processingRequests.has(request.id)}
                  className="flex-1 flex items-center justify-center gap-2 bg-[#bfae9f] hover:bg-green-600 hover:text-white transition duration-300"
                >
                  <CheckCircle className="w-5 h-5" />
                  Aceitar como Paciente
                </Button>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};
