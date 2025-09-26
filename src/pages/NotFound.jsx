// Importa o componente Link do React Router DOM
// Link permite navegar entre páginas da aplicação sem recarregar a página inteira
import { Link } from 'react-router-dom';

// Importa um botão customizado do projeto
// Este Button provavelmente possui estilos e comportamentos já definidos
import { Button } from '../components/Button';

// Importa um Card customizado do projeto
// Card é um container estilizado que pode ser usado para destacar conteúdo
import { Card } from '../components/Card';

// Importa o ícone "Home" da biblioteca lucide-react
// Esse ícone será usado dentro do botão para representar visualmente a ação "voltar para casa"
import { Home } from 'lucide-react';

// Declaração do componente funcional NotFound
// Esse componente será exibido quando o usuário acessar uma rota que não existe (erro 404)
export const NotFound = () => {
  // O componente retorna JSX, que é a sintaxe que React usa para criar elementos HTML com JavaScript
  return (
    // Cria uma div principal que ocupa a altura mínima da tela
    // "min-h-screen" garante que o conteúdo ocupe pelo menos 100% da altura da tela
    // "flex items-center justify-center" centraliza o conteúdo tanto vertical quanto horizontalmente
    // "p-4" adiciona um pequeno padding interno para espaçamento em telas pequenas
    <div className="min-h-screen flex items-center justify-center p-4">

      {/* Card é o container principal do conteúdo da página 404 */}
      {/* "text-center" centraliza o texto dentro do Card */}
      {/* "max-w-md" limita a largura máxima do Card para não ficar gigante em telas grandes */}
      <Card className="text-center max-w-md">

        {/* Div que agrupa o conteúdo textual do Card */}
        {/* "mb-6" adiciona margem inferior para separar do botão */}
        <div className="mb-6">

          {/* Título principal "404" */}
          {/* "text-6xl" define um tamanho de fonte muito grande */}
          {/* "font-bold" deixa o texto em negrito */}
          {/* "text-light" provavelmente aplica uma cor clara (dependendo do tema do projeto) */}
          {/* "mb-4" adiciona margem inferior entre o título e o subtítulo */}
          <h1 className="text-6xl font-bold text-light mb-4">404</h1>

          {/* Subtítulo explicativo "Página não encontrada" */}
          {/* "text-2xl" define o tamanho da fonte para ser menor que o título */}
          {/* "font-semibold" aplica um peso médio em negrito */}
          {/* "text-dark" aplica uma cor escura ao texto */}
          {/* "mb-2" adiciona uma pequena margem inferior entre o subtítulo e o parágrafo */}
          <h2 className="text-2xl font-semibold text-dark mb-2">Página não encontrada</h2>

          {/* Parágrafo explicativo */}
          {/* "text-dark/70" aplica uma cor escura com 70% de opacidade */}
          {/* Fornece instruções amigáveis ao usuário sobre o que aconteceu */}
          <p className="text-dark/70">
            Ops! A página que você está procurando não existe ou foi movida.
          </p>
        </div>

        {/* Link do React Router que direciona o usuário de volta ao Dashboard */}
        {/* O Link garante navegação sem recarregar a página */}
        <Link to="/dashboard">

          {/* Botão customizado dentro do Link */}
          {/* "flex items-center gap-2" organiza o ícone e o texto do botão em linha com um pequeno espaçamento */}
          {/* "mx-auto" centraliza o botão horizontalmente dentro do Card */}
          <Button className="flex items-center gap-2 mx-auto">

            {/* Ícone "Home" dentro do botão */}
            {/* "size={20}" define o tamanho do ícone */}
            <Home size={20} />

            {/* Texto do botão */}
            Voltar ao Início
          </Button>
        </Link>
      </Card>
    </div>
  );
};
  
