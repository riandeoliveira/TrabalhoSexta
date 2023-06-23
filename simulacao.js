const chegadas = [0.4, 1.2, 0.5, 1.7, 0.2, 1.6, 0.2, 1.4, 1.9];
const saidas = [2.0, 0.7, 0.2, 1.1, 3.7, 0.6];

const simulacao = {
  statusServidor: 0,
  numeroEmFila: 0,
  filaChegada: [],
  tempoUltimoEvento: 0,
  relogioSimulacao: 0,
  proximaChegada: null,
  proximaSaida: 9999999999,
  fimSimulacao: false,
  proximoEvento: "C",
  tempoTotalFila: 0,
  areaSobQT: 0,
  areaSobUT: 0,
  clientesAtendidos: 0,
  xAnt: 0,

  inicializar(parada) {
    if (parada <= 4) this.processarChegada(parada);
    else this.processarSaida(parada);
  },

  debugar(parada) {
    this.inicializar(parada);

    return {
      statusServidor: this.statusServidor,
      numeroEmFila: this.numeroEmFila,
      filaChegada: this.filaChegada,
      tempoUltimoEvento: this.tempoUltimoEvento,
      relogioSimulacao: this.relogioSimulacao,
      proximaChegada: this.proximaChegada,
      proximaSaida: this.proximaSaida,
      fimSimulacao: this.fimSimulacao,
      proximoEvento: this.proximoEvento,
      tempoTotalFila: this.tempoTotalFila,
      areaSobQT: this.areaSobQT,
      areaSobUT: this.areaSobUT,
      clientesAtendidos: this.clientesAtendidos,
      xAnt: this.xAnt,
    };
  },

  exibirEstados() {
    console.clear();
    console.log(`
=========================
|   ESTADOS DO SISTEMA  |
-------------------------
| Status do servidor:     ${this.statusServidor}
| Nº em fila:             ${this.numeroEmFila}
| Fila de chegada:        ${this.filaChegada}
| Tempo do último evento: ${this.tempoUltimoEvento}
| Relógio da simulação:   ${this.relogioSimulacao}
| Próxima chegada:        ${this.proximaChegada}
| Próxima saída:          ${this.proximaSaida}
| Fim da simulação:       ${this.fimSimulacao}
| Próximo evento:         ${this.proximoEvento}
| Tempo total da fila:    ${this.tempoTotalFila}
| Área sob QT:            ${this.areaSobQT}
| Área sob UT:            ${this.areaSobUT}
| Clientes atendidos:     ${this.clientesAtendidos}
| X ant:                  ${this.xAnt}
=========================
    `);
  },

  processarChegada(parada) {
    for (let i = 0; i < 10; i++) {
      if (i === parada) break;

      let chegada = chegadas[i];
      let proximaChegada = chegadas[i + 1];

      let saida = saidas[i];
      let proximaSaida = saidas[i + 1];

      this.relogioSimulacao += chegada;
      this.proximaChegada = this.relogioSimulacao + proximaChegada;

      if (this.statusServidor === 0) {
        this.statusServidor = 1;
        this.proximaSaida = this.relogioSimulacao + saida;
      } else {
        let subtracao = this.relogioSimulacao - this.tempoUltimoEvento;

        let somaQT = this.areaSobQT + subtracao;
        let multiplicacaoQT = somaQT * this.numeroEmFila;
        this.areaSobQT = Number(multiplicacaoQT.toFixed(1));

        let somaUT = this.areaSobUT + subtracao;
        let multiplicacaoUT = somaUT * this.statusServidor;
        this.areaSobUT = Number(multiplicacaoUT.toFixed(1));

        if (this.filaChegada.length === 0) {
          this.clientesAtendidos++;
        }

        this.filaChegada.push(this.relogioSimulacao);

        this.numeroEmFila++;
      }

      this.tempoUltimoEvento = this.relogioSimulacao;
    }
  },

  processarSaida(parada) {
    for (let i = 0; i < 10; i++) {
      if (i === parada) break;

      if (this.numeroEmFila > 0) {
        this.proximaSaida = this.relogioSimulacao + saidas[i];
      }
    }

    // Função proc_saída(saida)
    // relogio_simulacao = saida
    // if numero_em_fila > 0:
    //     prox_saida = relogio_simulacao + gera_saidas(med_atendimento, x_ant)
    //     area_sob_qt = area_sob_qt + (relogio_simulacao-tempo_ult_evento)*numero_em_fila
    //     numero_em_fila -= 1
    //     tempo = fila_chegada.excluir_inicio() // rotina para retirar primeiro da fila
    //     tempo_total_fila = tempo_total_fila + relogio_simulacao-tempo
    // else:
    //     area_sob_ut = area_sob_ut + (relogio_simulacao-tempo_ult_evento)*status_servidor
    //     prox_saida = 9999999999
    //     status_servidor = 0
    // tempo_ult_evento = relogio_simulacao
    // clientes_atendidos += 1
  },

  resetarValores() {
    this.statusServidor = 0;
    this.numeroEmFila = 0;
    this.filaChegada = [];
    this.tempoUltimoEvento = 0;
    this.relogioSimulacao = 0;
    this.proximaChegada = null;
    this.proximaSaida = 9999999999;
    this.fimSimulacao = false;
    this.proximoEvento = "C";
    this.tempoTotalFila = 0;
    this.areaSobQT = 0;
    this.areaSobUT = 0;
    this.clientesAtendidos = 0;
    this.xAnt = 0;
  },
};

module.exports = simulacao;
