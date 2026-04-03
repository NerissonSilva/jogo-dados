"use client";
import { useState } from 'react';
import Dado from '../Dado/Dado';
import styles from './JogoDados.module.css';

export default function JogoDados() {
  const [rodada, setRodada] = useState(1);
  const [dadosJ1, setDadosJ1] = useState([null, null]);
  const [dadosJ2, setDadosJ2] = useState([null, null]);
  const [pontosJ1, setPontosJ1] = useState(0);
  const [pontosJ2, setPontosJ2] = useState(0);
  
  // 1: Jogador 1 deve jogar
  // 2: Jogador 2 deve jogar
  // 3: Rodada finalizada (esperando clicar em próxima rodada)
  const [etapaRodada, setEtapaRodada] = useState(1); 
  const [resultadoTurno, setResultadoTurno] = useState("");
  const [jogoFinalizado, setJogoFinalizado] = useState(false);

  const sortearDados = () => [Math.floor(Math.random() * 6) + 1, Math.floor(Math.random() * 6) + 1];

  const jogarJ1 = () => {
    const novosDados = sortearDados();
    setDadosJ1(novosDados);
    setResultadoTurno("");
    setEtapaRodada(2);
  };

  const jogarJ2 = () => {
    const novosDadosJ2 = sortearDados();
    setDadosJ2(novosDadosJ2);
    
    // Calcula quem venceu a rodada
    const somaJ1 = dadosJ1[0] + dadosJ1[1];
    const somaJ2 = novosDadosJ2[0] + novosDadosJ2[1];
    
    let novoPontosJ1 = pontosJ1;
    let novoPontosJ2 = pontosJ2;
    
    if (somaJ1 > somaJ2) {
      setResultadoTurno("🏁 Jogador 1 Venceu a Rodada!");
      novoPontosJ1 += 1;
      setPontosJ1(novoPontosJ1);
    } else if (somaJ2 > somaJ1) {
      setResultadoTurno("🏁 Jogador 2 Venceu a Rodada!");
      novoPontosJ2 += 1;
      setPontosJ2(novoPontosJ2);
    } else {
      setResultadoTurno("⚖️ A Rodada Empatou!");
    }

    if (rodada === 5) {
      setJogoFinalizado(true);
      setEtapaRodada(4); // Fim de jogo
    } else {
      setEtapaRodada(3); // Espera ir para próxima rodada
    }
  };

  const proximaRodada = () => {
    setRodada(prev => prev + 1);
    setDadosJ1([null, null]);
    setDadosJ2([null, null]);
    setResultadoTurno("");
    setEtapaRodada(1);
  };

  const reiniciarJogo = () => {
    setRodada(1);
    setDadosJ1([null, null]);
    setDadosJ2([null, null]);
    setPontosJ1(0);
    setPontosJ2(0);
    setEtapaRodada(1);
    setResultadoTurno("");
    setJogoFinalizado(false);
  };

  let mensagemFinal = "";
  if (jogoFinalizado) {
    if (pontosJ1 > pontosJ2) mensagemFinal = "🏆 Jogador 1 Venceu o Jogo!";
    else if (pontosJ2 > pontosJ1) mensagemFinal = "🏆 Jogador 2 Venceu o Jogo!";
    else mensagemFinal = "🤝 O Jogo Terminou Empatado Geral!";
  }

  return (
    <div className={styles.boardContainer}>
      <header className={styles.header}>
         <div className={styles.placarItem}>
            <span>JOGADOR 1</span>
            <div className={styles.pontos}>{pontosJ1}</div>
         </div>

         <div className={styles.statusCentral}>
           {jogoFinalizado ? (
              <h2 className={styles.tituloFinal}>Fim de Jogo</h2>
           ) : (
              <h2 className={styles.tituloRodada}>Rodada {rodada} / 5</h2>
           )}
           {resultadoTurno && <div className={styles.resultadoTurno}>{resultadoTurno}</div>}
           {mensagemFinal && <div className={styles.mensagemFinal}>{mensagemFinal}</div>}
         </div>

         <div className={styles.placarItem}>
            <span>JOGADOR 2</span>
            <div className={styles.pontos}>{pontosJ2}</div>
         </div>
      </header>

      <div className={styles.playersArea}>
        {/* Jogador 1 */}
        <div className={`${styles.playerCard} ${etapaRodada === 1 ? styles.activeTurn : ''}`}>
           <h3 className={styles.playerName}>Jogador 1</h3>
           <div className={styles.diceWrapper}>
              <Dado valor={dadosJ1[0]} />
              <Dado valor={dadosJ1[1]} />
           </div>
           <button 
             className={styles.playBtn} 
             onClick={jogarJ1} 
             disabled={etapaRodada !== 1 || jogoFinalizado}
           >
             Jogar Dados
           </button>
        </div>

        {/* Separador */}
        <div className={styles.vsInfo}>
           <span className={styles.vsText}>VS</span>
        </div>

        {/* Jogador 2 */}
        <div className={`${styles.playerCard} ${etapaRodada === 2 ? styles.activeTurn : ''}`}>
           <h3 className={styles.playerName}>Jogador 2</h3>
           <div className={styles.diceWrapper}>
              <Dado valor={dadosJ2[0]} />
              <Dado valor={dadosJ2[1]} />
           </div>
           <button 
             className={styles.playBtn} 
             onClick={jogarJ2} 
             disabled={etapaRodada !== 2 || jogoFinalizado}
           >
             Jogar Dados
           </button>
        </div>
      </div>

      <div className={styles.actionFooter}>
        {etapaRodada === 3 && (
           <button className={styles.nextBtn} onClick={proximaRodada}>
             Proxima Rodada ➡️
           </button>
        )}
        {jogoFinalizado && (
           <button className={styles.restartBtn} onClick={reiniciarJogo}>
             🔄 Jogar Novamente
           </button>
        )}
      </div>

    </div>
  );
}
