import { useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { mockApi } from "../services/mockApi";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import toast from "react-hot-toast";

export const Register = () => {
  const [userType, setUserType] = useState("paciente");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    CRP: "",
    specialty: "",
    phone: "",
    birthDate: "",
  });

  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = useCallback(
    (field) => (e) => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    },
    []
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Senhas não coincidem");
      return;
    }
    try {
      const { user, token } = await mockApi.register({
        ...formData,
        type: userType,
      });
      login(user, token);
      toast.success("Conta criada com sucesso");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-4 bg-white">
      <Card className="bg-[#f5f5f5] w-full max-w-lg p-8 shadow-lg rounded-xl">
        
        {/* Tabs Paciente / Psicólogo */}
        <div className="flex justify-center gap-6 mb-8">
          <button
            type="button"
            onClick={() => setUserType("paciente")}
            className={`px-6 py-2 rounded-full font-bold border-2 transition-all ${
              userType === "paciente"
                ? "bg-[#8B3A1E] text-white border-[#8B3A1E]"
                : "bg-white text-[#8B3A1E] border-[#8B3A1E]"
            }`}
          >
            PACIENTE
          </button>
          <button
            type="button"
            onClick={() => setUserType("psicologo")}
            className={`px-6 py-2 rounded-full font-bold border-2 transition-all ${
              userType === "psicologo"
                ? "bg-[#8B3A1E] text-white border-[#8B3A1E]"
                : "bg-white text-[#8B3A1E] border-[#8B3A1E]"
            }`}
          >
            PSICÓLOGO
          </button>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium">Nome completo</label>
            <input
              type="text"
              value={formData.name}
              onChange={handleInputChange("name")}
              placeholder="Seu nome completo"
              className="w-full rounded-full px-4 py-2 bg-[#8B3A1E] text-white placeholder-white/70 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium">E-mail</label>
            <input
              type="email"
              value={formData.email}
              onChange={handleInputChange("email")}
              placeholder="seu@email.com"
              className="w-full rounded-full px-4 py-2 bg-[#8B3A1E] text-white placeholder-white/70 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium">Senha</label>
            <input
              type="password"
              value={formData.password}
              onChange={handleInputChange("password")}
              placeholder="Sua senha"
              className="w-full rounded-full px-4 py-2 bg-[#8B3A1E] text-white placeholder-white/70 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium">Confirmar senha</label>
            <input
              type="password"
              value={formData.confirmPassword}
              onChange={handleInputChange("confirmPassword")}
              placeholder="Confirme sua senha"
              className="w-full rounded-full px-4 py-2 bg-[#8B3A1E] text-white placeholder-white/70 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium">Telefone</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={handleInputChange("phone")}
              placeholder="(xx) xxxxx-xxxx"
              className="w-full rounded-full px-4 py-2 bg-[#8B3A1E] text-white placeholder-white/70 focus:outline-none"
              required
            />
          </div>

          {userType === "paciente" && (
            <div>
              <label className="text-sm font-medium">Data de nascimento</label>
              <input
                type="date"
                value={formData.birthDate}
                onChange={handleInputChange("birthDate")}
                className="w-full rounded-full px-4 py-2 bg-[#8B3A1E] text-white placeholder-white/70 focus:outline-none"
                required
              />
            </div>
          )}

          {userType === "psicologo" && (
            <>
              <div>
                <label className="text-sm font-medium">CRP</label>
                <input
                  type="text"
                  value={formData.CRP}
                  onChange={handleInputChange("CRP")}
                  placeholder="Ex: 12/34567"
                  className="w-full rounded-full px-4 py-2 bg-[#8B3A1E] text-white placeholder-white/70 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium">Especialidade</label>
                <input
                  type="text"
                  value={formData.specialty}
                  onChange={handleInputChange("specialty")}
                  placeholder="Ex: Psicologia Clínica"
                  className="w-full rounded-full px-4 py-2 bg-[#8B3A1E] text-white placeholder-white/70 focus:outline-none"
                  required
                />
              </div>
            </>
          )}

          {/* Botão cadastrar */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-6 rounded-full bg-[#8B3A1E] text-white font-bold py-2 hover:bg-[#6f2f18] transition-colors"
          >
            {loading ? "Cadastrando..." : "CADASTRAR"}
          </button>
        </form>

        {/* Link login */}
        <div className="mt-6 text-center space-y-2">
          <p className="text-dark/70">Já possui conta?</p>
          <Link to="/login" className="text-[#8B3A1E] font-bold hover:underline">
            Faça login
          </Link>
        </div>
      </Card>
    </div>
  );
};
