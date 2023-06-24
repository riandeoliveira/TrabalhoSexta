const eventos = require("./eventos");
const estados = require("./estados");
const servidor = require("./servidor");

/**
 * Classe para iniciar a simulação e suas rotinas.
 */
class Simulacao {
  estados;

  constructor() {
    this.estados = estados;
  }

  /**
   * Método para uso durante os testes automatizados.
   * @param {number} parada
   */
  debugar(parada) {
    this.resetarEstados();

    for (let i in eventos) {
      let indice = Number(i);

      if (indice > parada) break;

      let evento = eventos[indice];
      let proximoEvento = eventos[indice + 1];

      this.processarChegada(evento, proximoEvento);
    }

    return this.estados;
  }

  /**
   * Método para iniciar a simulação.
   */
  iniciar() {
    for (let i in eventos) {
      let indice = Number(i);

      if (indice > 0) break;

      let evento = eventos[indice];
      let proximoEvento = eventos[indice + 1];

      this.processarChegada(evento, proximoEvento);
    }
  }

  /**
   * Processar um evento de CHEGADA.
   * @param {eventos[0]} evento
   * @param {eventos[0]} proximoEvento
   */
  processarChegada(evento, proximoEvento) {
    let chegada = evento.tempo_chegada;

    this.estados.relogio_simulacao += chegada;

    this.estados.proxima_chegada =
      this.estados.relogio_simulacao + proximoEvento.tempo_chegada;

    if (servidor.ocioso()) {
      servidor.atender();

      this.estados.proxima_saida =
        this.estados.relogio_simulacao + evento.tempo_partida;
    } else {
      servidor.calcularAreaQT();
      servidor.calcularAreaUT();
      servidor.inserirNaFila(this.estados.relogio_simulacao);
    }

    this.estados.tempo_ultimo_evento = this.estados.relogio_simulacao;
  }

  /**
   * Processar um evento de SAÍDA.
   * @param {eventos[0]} evento
   * @param {eventos[0]} proximoEvento
   */
  processarSaida(evento, proximoEvento) {
    let saida = evento.tempo_partida;

    this.estados.relogio_simulacao += saida;

    if (this.estados.numero_em_fila > 0) {
      this.estados.proxima_saida =
        this.estados.relogio_simulacao + proximoEvento.tempo_partida;

      servidor.calcularAreaQT();
      servidor.removerDaFila();

      this.estados.tempo_total_fila =
        this.estados.tempo_total_fila + this.estados.relogio_simulacao;
    } else {
      servidor.calcularAreaUT();

      this.estados.proxima_saida = 9999999999;

      servidor.ficarOcioso();
    }

    this.estados.tempo_ultimo_evento = this.estados.relogio_simulacao;
    this.estados.clientes_atendidos++;
  }

  /**
   * Resetar todos os estados para seus valores iniciais.
   */
  resetarEstados() {
    this.estados.status_servidor = 0;
    this.estados.numero_em_fila = 0;
    this.estados.fila_chegada = [];
    this.estados.tempo_ultimo_evento = 0;
    this.estados.relogio_simulacao = 0;
    this.estados.proxima_chegada = null;
    this.estados.proxima_saida = 9999999999;
    this.estados.fim_simulacao = false;
    this.estados.proximo_evento = "C";
    this.estados.tempo_total_fila = 0;
    this.estados.area_sob_qt = 0;
    this.estados.area_sob_ut = 0;
    this.estados.clientes_atendidos = 0;
    this.estados.x_ant = 0;
  }
}

const simulacao = new Simulacao();

module.exports = simulacao;
