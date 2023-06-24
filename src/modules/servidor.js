const estados = require("./estados");

/**
 * Servidor para realizar as ações necessárias durante a simulação.
 */
class Servidor {
  estados;

  constructor() {
    this.estados = estados;
  }

  /**
   * Inicia um atendimento, deixando o servidor ocupado.
   */
  atender() {
    this.estados.status_servidor = 1;
  }

  /**
   * Calcula a Área QT.
   */
  calcularAreaQT() {
    let relogio = this.estados.relogio_simulacao;
    let ultimoEvento = this.estados.tempo_ultimo_evento;

    let subtracao = relogio - ultimoEvento;
    let soma = this.estados.area_sob_qt + subtracao;

    let multiplicacao = soma * this.estados.numero_em_fila;

    this.estados.area_sob_qt = Number(multiplicacao.toFixed(1));
  }

  /**
   * Calcula a Área UT
   */
  calcularAreaUT() {
    let relogio = this.estados.relogio_simulacao;
    let ultimoEvento = this.estados.tempo_ultimo_evento;

    let subtracao = relogio - ultimoEvento;
    let soma = this.estados.area_sob_ut + subtracao;

    let multiplicacao = soma * this.estados.status_servidor;

    this.estados.area_sob_ut = Number(multiplicacao.toFixed(1));
  }

  /**
   * Finaliza um atendimento, deixando o servidor ocioso.
   */
  ficarOcioso() {
    this.estados.status_servidor = 0;
  }

  /**
   * Insere um item na fila de chegada.
   * @param {number} item
   */
  inserirNaFila(item) {
    this.estados.fila_chegada.push(item);
    this.estados.numero_em_fila = this.estados.fila_chegada.length;
  }

  /**
   * Verifica se o servidor está ocioso.
   */
  ocioso() {
    if (this.estados.status_servidor === 0) return true;
    if (this.estados.status_servidor === 1) return false;
  }

  /**
   * Remove um item da fila de chegada.
   */
  removerDaFila() {
    this.estados.fila_chegada.shift();
    this.estados.numero_em_fila = this.estados.fila_chegada.length;
  }
}

const servidor = new Servidor();

module.exports = servidor;
