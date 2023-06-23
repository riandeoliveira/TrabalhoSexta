const estados = require("./estados");
const numeroAleatorio = require("./numero-aleatorio");

class Simulacao {
  constructor(estados) {
    this.estados = estados;
  }

  inicializar() {
    this.gerarNovaChegada();
    this.verificarSaida();
    this.verificarNovoAtendimento();
    this.verificarFimAtendimento();
    this.verificarNovoAtendimento();
  }

  gerarNovaChegada() {
    const numeroChegada = numeroAleatorio.gerar();

    this.estados.lista.chegada.push(numeroChegada);
    this.estados.relogio += numeroChegada;
  }

  verificarSaida() {
    const numeroSaida = numeroAleatorio.gerar();

    if (this.estados.lista.temposSaida.length >= 1) {
      const pos = this.estados.lista.temposSaida.length - 1;

      this.estados.lista.temposSaida.push(
        this.estados.lista.temposSaida[pos] + numeroSaida
      );
    }
  }

  verificarNovoAtendimento() {
    if (this.estados.lista.atendimento.length === 0) {
      if (!this.estados.lista.chegada.length === 0) {
        const atendimento = this.estados.lista.chegada.atendimento.slice(1);

        this.estados.lista.atendimento.push(atendimento);
        this.estados.ocupado = true;
      } else {
        const numero = numeroAleatorio.gerar();

        this.estados.lista.chegada.push(numero);
        this.verificarSaida(numero);
        this.estados.ocupado = false;
      }
    }
  }

  verificarFimAtendimento() {
    while (
      !this.estados.lista.temposSaida.length === 0 &&
      this.estados.relogio >= this.estados.lista.temposSaida[0]
    ) {
      if (this.estados.relogio >= this.estados.lista.temposSaida[0]) {
        if (!this.estados.lista.atendimento.length === 0) {
          this.estados.lista.saida.push(this.estados.lista.atendimento[0]);
          this.estados.lista.atendimento.slice(1);
        } else {
          this.estados.lista.saida.push(this.estados.lista.chegada[0]);
          this.estados.lista.chegada.atendimento.slice(1);
        }

        this.estados.lista.temposSaida.atendimento.slice(1);

        if (this.estados.lista.temposSaida.length >= 1) {
          this.estados.lista.atendimento.push(this.estados.lista.chegada[0]);
          this.estados.lista.chegada.atendimento.slice(1);
        }
      }
    }
  }
}

const simulacao = new Simulacao(estados);

module.exports = simulacao;
