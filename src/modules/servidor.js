const estados = require("./estados");

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

  calcularAreaQT() {
    let relogio = this.estados.relogio_simulacao;
    let ultimoEvento = this.estados.tempo_ultimo_evento;

    let subtracao = relogio - ultimoEvento;
    let soma = this.estados.area_sob_qt + subtracao;

    let multiplicacao = soma * this.estados.numero_em_fila;

    this.estados.area_sob_qt = Number(multiplicacao.toFixed(1));
  }

  calcularAreaUT() {
    let relogio = this.estados.relogio_simulacao;
    let ultimoEvento = this.estados.tempo_ultimo_evento;

    let subtracao = relogio - ultimoEvento;
    let soma = this.estados.area_sob_ut + subtracao;

    let multiplicacao = soma * this.estados.status_servidor;

    this.estados.area_sob_ut = Number(multiplicacao.toFixed(1));
  }

  ficarOcioso() {
    this.estados.status_servidor = 0;
  }

  /**
   * @param {number} item
   */
  inserirNaFila(item) {
    this.estados.fila_chegada.push(item);
    this.estados.numero_em_fila = this.estados.fila_chegada.length;
  }

  ocioso() {
    if (this.estados.status_servidor === 0) return true;
    if (this.estados.status_servidor === 1) return false;
  }

  removerDaFila() {
    this.estados.fila_chegada.shift();
    this.estados.numero_em_fila = this.estados.fila_chegada.length;
  }
}

const servidor = new Servidor();

module.exports = servidor;
