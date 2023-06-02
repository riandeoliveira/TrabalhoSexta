// LEIAME: Para executar este arquivo, insira no terminal: node Simulacao.js

// Descomente a linha abaixo para importar o objeto responsável por gerar números aleatórios
// const numerosAleatorios = require("./NumerosAleatorios");

/**
 * Classe para os estados e funcionalidades da Simulação.
 */
class Simulacao {
  // Contadores da simulação
  areaBt = 0;
  areaQt = 0;
  clientesAtendidos = 0;
  esperaTotal = 0;

  // Estados da simulação
  numFila = 0;
  proximosEventos = [];
  relogio = 0;
  status = 0;
  temposChegada = [];
  tempoUltimoEvento = 0;

  iniciar() {}
}

module.exports = Simulacao;
