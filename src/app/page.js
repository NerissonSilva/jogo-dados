import JogoDados from "@/components/JogoDados/JogoDados";

export const metadata = {
  title: 'Jogo de Dados',
  description: 'Um jogo de dados multijogador em Next.js',
}

export default function Home() {
  return (
    <main className="main-container">
      <div className="bg-glow bg-glow-1"></div>
      <div className="bg-glow bg-glow-2"></div>
      
      <div className="content-wrapper">
        <h1 className="main-title">Jogo de Dados</h1>
        <p className="subtitle">Desafie seu amigo para 5 rodadas!</p>
        <JogoDados />
      </div>
    </main>
  );
}
