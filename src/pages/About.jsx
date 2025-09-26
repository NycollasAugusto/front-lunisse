import { motion } from 'framer-motion';
import { Heart, Users, Brain, Shield, Zap, Calendar, Activity, FileText } from 'lucide-react';

export const About = () => {
  const values = [
    { icon: <Heart className="w-6 h-6 text-light" />, title: 'Conexão Humana', description: 'Empatia e cuidado para criar relações mais saudáveis e conscientes.' },
    { icon: <Brain className="w-6 h-6 text-accent" />, title: 'Tecnologia Inteligente', description: 'Análise avançada para apoiar profissionais e otimizar atendimentos.' },
    { icon: <Shield className="w-6 h-6 text-medium" />, title: 'Proteção de Dados', description: 'Segurança robusta para manter informações sigilosas totalmente protegidas.' },
    { icon: <Users className="w-6 h-6 text-light" />, title: 'Inclusão Digital', description: 'Interface acessível para atender diferentes necessidades de usuários.' }
  ];

  const features = [
    { icon: <Calendar className="w-5 h-5 text-light" />, title: 'Organização Prática', description: 'Calendário intuitivo com alertas e confirmações em tempo real.' },
    { icon: <Activity className="w-5 h-5 text-accent" />, title: 'Monitoramento Avançado', description: 'Análise de progresso para decisões assertivas durante o acompanhamento.' },
    { icon: <FileText className="w-5 h-5 text-medium" />, title: 'Prontuário Digital', description: 'Armazenamento seguro e estruturado de todo o histórico do paciente.' },
    { icon: <Zap className="w-5 h-5 text-light" />, title: 'Experiência Rápida', description: 'Sistema otimizado para uso simples, rápido e confortável.' }
  ];

  const problems = [
    'Falta de acompanhamento estruturado no processo terapêutico',
    'Dificuldade para integrar voluntários e instituições',
    'Poucos recursos digitais para análise de progresso',
    'Gestão desorganizada e pouco intuitiva'
  ];

  const solutions = [
    'Plataforma que centraliza agendamentos e prontuários',
    'Ferramentas que conectam profissionais e pacientes de forma eficiente',
    'Relatórios inteligentes para avaliação contínua',
    'Interface humanizada e prática para uso diário'
  ];

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <main className="flex-grow py-28 space-y-4">
        
        {/* Card Visão */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-[#8B3A1E] text-white p-6 rounded-2xl shadow-lg text-center"
        >
          <h2 className="font-bold text-lg mb-4">NOSSA VISÃO</h2>
          <p className="leading-relaxed text-sm">
            SER A PRINCIPAL PLATAFORMA DE GESTÃO DE ATENDIMENTOS PSICOLÓGICOS 
            VOLUNTÁRIOS, RECONHECIDA PELA INOVAÇÃO TECNOLÓGICA E COMPROMISSO 
            COM O BEM-ESTAR COLETIVO.
          </p>
          <p className="leading-relaxed text-sm mt-4">
            QUEREMOS TRANSFORMAR A FORMA COMO PROJETOS SOCIAIS GERENCIAM SEUS 
            ATENDIMENTOS, PROPORCIONANDO MAIS EFICIÊNCIA, SEGURANÇA E QUALIDADE 
            NO CUIDADO OFERECIDO.
          </p>
        </motion.div>

        {/* Linha com 2 cards lado a lado */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Card Psicoagenda */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-[#8B3A1E] text-white p-10 rounded-2xl shadow-lg text-center"
          >
            <p className="leading-relaxed text-sm">
              O PSICOAGENDA É UM SISTEMA PENSADO PARA FACILITAR A VIDA DE PSICÓLOGOS 
              E PACIENTES. COM ELE, MARCAR CONSULTAS SE TORNA RÁPIDO, SEGURO E ORGANIZADO.
            </p>
            <p className="leading-relaxed text-sm mt-4">
              NOSSA MISSÃO É TRAZER PRATICIDADE E CUIDADO PARA A SAÚDE MENTAL, 
              CONECTANDO QUEM PRECISA DE ATENÇÃO COM QUEM PODE OFERECER SUPORTE 
              DE FORMA SIMPLES E EFICIENTE.
            </p>
          </motion.div>

          {/* Card Missão */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="bg-[#8B3A1E] text-white p-10 rounded-2xl shadow-lg text-center"
          >
            <h2 className="font-bold text-lg mb-4">NOSSA MISSÃO</h2>
            <p className="leading-relaxed text-sm">
              DESENVOLVER UMA SOLUÇÃO DIGITAL QUE ORGANIZE AGENDAS, REGISTRE 
              HISTÓRICOS DE SESSÕES E ANALISE FATORES DE RISCO EMOCIONAL, 
              GARANTINDO PRIVACIDADE, USABILIDADE E SUPORTE ANALÍTICO PARA 
              PROJETOS DE IMPACTO SOCIAL EM SAÚDE MENTAL.
            </p>
            <p className="leading-relaxed text-sm mt-4">
              NOSSO OBJETIVO É DEMOCRATIZAR O ACESSO A FERRAMENTAS TECNOLÓGICAS 
              AVANÇADAS PARA ORGANIZAÇÕES QUE TRABALHAM COM RECURSOS LIMITADOS, 
              MAS COM GRANDE IMPACTO SOCIAL.
            </p>
          </motion.div>
        </div>
      </main>
    </div>
  );
};
