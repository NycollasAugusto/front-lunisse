import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate(); // hook do React Router para navegar

  return (
    <div className="bg-[#F5F2EF] min-h-screen flex flex-col items-center justify-center">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-6">
        {/* Logo com animação */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="w-44 h-44 rounded-3xl flex items-center justify-center mb-6 shadow-2xl overflow-hidden bg-white"
        >
          <img
            src="/logoProvisoria.png"
            alt="PsicoAgenda"
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Título principal */}
        <h1 className="text-5xl md:text-6xl font-bold text-[#C48465] mb-3">
          Bem-vindo ao PsicoAgenda
        </h1>

        {/* Subtítulo */}
        <h2 className="text-lg md:text-xl font-medium text-[#4B2C25] mb-8 max-w-3xl">
          Plataforma digital que otimiza o agendamento e gestão de atendimentos
          psicológicos voluntários. Desenvolvida para universidades, ONGs e
          projetos sociais que promovem saúde mental.
        </h2>

        {/* Botões */}
        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={() => navigate("/login")} // navega para a página de login
            className="bg-[#C48465] text-white px-8 py-3 rounded-lg font-semibold shadow-md hover:opacity-90 transition"
          >
            Começar Agora
          </button>

          <button
            onClick={() => navigate("/recursos")} // navega para a página de recursos
            className="bg-[#4B2C25] text-[#C48465] px-8 py-3 rounded-lg font-semibold shadow-md hover:opacity-90 transition"
          >
            Conhecer Recursos
          </button>
        </div>
      </section>
    </div>
  );
};
