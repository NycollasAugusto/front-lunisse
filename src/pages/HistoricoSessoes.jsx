import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Calendar, Clock, FileText, Star, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

export const HistoricoSessoes = () => {
  const { user } = useAuth();
  const [sessoes, setSessoes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSessoes = async () => {
      setLoading(true);
      const data = [
        {
          id: 1,
          terapeuta: 'Dra. Ana Costa',
          tipo: 'Terapia Cognitivo-Comportamental',
          descricao: 'Exploramos estratégias para melhorar o bem-estar emocional e gerenciar pensamentos negativos.',
          duracao: 50,
          icone: <FileText size={18} />,
        },
        {
          id: 2,
          terapeuta: 'Dra. Ana Costa',
          tipo: 'Sessão Inicial - Avaliação',
          descricao: 'Primeiro encontro com análise detalhada das necessidades do paciente e definição de objetivos terapêuticos.',
          duracao: 60,
          icone: <Clock size={18} />,
        },
        {
          id: 3,
          terapeuta: 'Dra. Ana Costa',
          tipo: 'Terapia Cognitivo-Comportamental',
          descricao: 'Práticas de respiração, técnicas de relaxamento e reestruturação de pensamentos automáticos.',
          duracao: 50,
          icone: <Star size={18} />,
        },
        {
          id: 4,
          terapeuta: 'Dra. Ana Costa',
          tipo: 'Sessão de Acompanhamento',
          descricao: 'Avaliação do progresso, reforço de estratégias aprendidas e orientação para manutenção do equilíbrio emocional.',
          duracao: 50,
          icone: <Heart size={18} />,
        },
      ];
      setSessoes(data);
      setLoading(false);
    };

    fetchSessoes();
  }, []);

  if (loading) {
    return <div className="text-center mt-10 text-brown-800">Carregando histórico de sessões...</div>;
  }

  return (
    <div className="p-8 bg-[#F5F2EF] min-h-screen">
      <h1 className="text-3xl font-bold text-[#4B2E2E] mb-4">Histórico de Sessões</h1>
      <p className="text-[#6B4F4F] mb-6">{sessoes.length} sessões registradas</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sessoes.map((sessao) => (
          <motion.div
            key={sessao.id}
            whileHover={{ scale: 1.03 }}
            className="bg-gradient-to-r from-[#A0522D] to-[#D2A679] rounded-xl p-5 shadow-lg text-white"
          >
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2 font-semibold">
                {sessao.icone}
                <span>{sessao.terapeuta}</span>
              </div>
              <span className="bg-[#E0C9B0] text-[#4B2E2E] px-3 py-1 rounded-full text-sm">
                Concluída
              </span>
            </div>
            <h3 className="font-medium mb-2">{sessao.tipo}</h3>
            <p className="bg-[#E8D9C3] text-[#4B2E2E] p-3 rounded-lg mb-3">{sessao.descricao}</p>
            <div className="flex items-center text-sm gap-1 text-[#4B2E2E]">
              <Clock size={16} /> <span>{sessao.duracao} min</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Paginação simples */}
      <div className="flex justify-between items-center mt-8">
        <button className="bg-[#C4A484] text-white px-4 py-2 rounded-md opacity-70 cursor-not-allowed">
          Anterior
        </button>
        <span className="text-[#4B2E2E]">Página 1 de 1</span>
        <button className="bg-[#C4A484] text-white px-4 py-2 rounded-md opacity-70 cursor-not-allowed">
          Próxima
        </button>
      </div>
    </div>
  );
};
