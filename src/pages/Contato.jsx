import { useState } from "react";
import { Card } from "../components/Card";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import toast from "react-hot-toast";

export const Contato = () => {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    mensagem: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulação de envio
    setTimeout(() => {
      toast.success("Mensagem enviada com sucesso!");
      setFormData({ nome: "", email: "", telefone: "", mensagem: "" });
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 px-4">
      <Card>
        <h1 className="text-2xl font-bold text-dark mb-6 text-center">Fale Conosco</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Nome *"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            required
            placeholder="Seu nome completo"
            aria-label="Nome"
          />
          <Input
            label="E-mail *"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="seuemail@exemplo.com"
            aria-label="E-mail"
          />
          <Input
            label="Telefone"
            name="telefone"
            value={formData.telefone}
            onChange={handleChange}
            placeholder="(00) 00000-0000"
            aria-label="Telefone"
          />
          <div>
            <label
              htmlFor="mensagem"
              className="block text-sm font-medium text-dark mb-2"
            >
              Mensagem *
            </label>
            <textarea
              id="mensagem"
              name="mensagem"
              value={formData.mensagem}
              onChange={handleChange}
              required
              placeholder="Digite sua mensagem aqui..."
              aria-label="Mensagem"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-light min-h-[120px]"
            />
          </div>

          <Button type="submit" loading={loading} className="w-full">
            Enviar Mensagem
          </Button>
        </form>
      </Card>
    </div>
  );
};
