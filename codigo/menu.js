const estados = require("./estados");
const simulacao = require("./simulacao");
const prompt = require("prompt-sync")();

class Menu {
  estados;
  resposta;

  constructor() {
    this.estados = estados;
  }

  exibirEstados() {
    console.clear();
    console.log(`
==========================
|   ESTADOS DO SISTEMA   |
--------------------------
| Lista de atendimento: ${this.estados.lista.atendimento}
| Lista de chegada:     ${this.estados.lista.chegada}
| Lista de saída:       ${this.estados.lista.saida}
| Tempos de saída:      ${this.estados.lista.temposSaida}
| Ocupado:              ${this.estados.ocupado}
| Relógio:              ${this.estados.relogio}
==========================

0. Voltar para o menu
`);

    this.resposta = prompt("Resposta: ");

    this.verificaResposta();
  }

  exibirPrompt() {
    console.clear();
    console.log(`
==========================
|        SIMULAÇÃO       |
--------------------------
1. Gerar chegada de cliente
2. Exibir estados do sistema
3. Encerrar simulação
`);

    this.resposta = prompt("Resposta: ");

    this.verificaResposta();
  }

  verificaResposta() {
    switch (this.resposta) {
      case "0":
        this.exibirPrompt();

        break;

      case "1":
        simulacao.inicializar();

        console.log("\nUm cliente chegou!");
        setTimeout(() => {
          this.exibirPrompt();
        }, 1000);

        break;
      case "2":
        this.exibirEstados();

        break;
      case "3":
        console.log("\n!!! SIMULAÇÃO ENCERRADA !!!");

        break;
      default:
        console.log("\nDigite uma resposta válida!");

        setTimeout(() => {
          console.clear();

          this.exibirPrompt();
        }, 1000);

        break;
    }
  }
}

const menu = new Menu(estados);

module.exports = menu;
