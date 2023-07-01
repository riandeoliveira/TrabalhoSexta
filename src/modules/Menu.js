const estados = require("./estados");
const prompt = require("prompt-sync")();
const geradorNPAs = require("./gerador-npas");

/**
 * Menu interativo do sistema.
 */
class Menu {
  estados;

  constructor() {
    this.estados = estados;
  }

  receberDadosNPAs() {
    console.log("\nInsira os dados para a geração de NPAs:\n");

    const x0 = Number(prompt("Insira o valor de x0: "));
    const a = Number(prompt("Insira o valor de a: "));
    const c = Number(prompt("Insira o valor de c: "));
    const m = Number(prompt("Insira o valor de m: "));

    const tempoMedioChegada = Number(prompt("Insira o tempo médio entre chegadas (exponencial): "));
    const tempoMedioAtendimento = Number(prompt("Insira o tempo médio entre atendimentos (exponencial): "));
    const tempoSimulacao = Number(prompt("Insira o tempo de simulação: "));

    // Tempo médio entre chegadas (exponencial): 1 minuto
    // ➢ Tempo médio de atendimento (exponencial): 0,5 minuto
    // ➢ Tempo de simulação: 8 horas (480 minutos)

    geradorNPAs.receberDados(x0, a, c, m);

    console.log(geradorNPAs.gerarUm());
  }

  /**
   * Exibe todos os estados em tempo real.
   */
  exibirEstados() {
    console.clear();
    console.log(`
=========================
|   ESTADOS DO SISTEMA  |
-------------------------
| Status do servidor:     ${this.estados.status_servidor}
| Nº em fila:             ${this.estados.numero_em_fila}
| Fila de chegada:        ${this.estados.fila_chegada}
| Tempo do último evento: ${this.estados.tempo_ultimo_evento}
| Relógio da simulação:   ${this.estados.relogio_simulacao}
| Próxima chegada:        ${this.estados.proxima_chegada}
| Próxima saída:          ${this.estados.proxima_saida}
| Fim da simulação:       ${this.estados.fim_simulacao}
| Próximo evento:         ${this.estados.proximo_evento}
| Tempo total da fila:    ${this.estados.tempo_total_fila}
| Área sob QT:            ${this.estados.area_sob_qt}
| Área sob UT:            ${this.estados.area_sob_ut}
| Clientes atendidos:     ${this.estados.clientes_atendidos}
| X ant:                  ${this.estados.x_ant}
=========================
    `);
  }
}

module.exports = Menu;
