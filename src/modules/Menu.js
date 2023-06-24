const estados = require("./estados");

class Menu {
  estados;

  constructor() {
    this.estados = estados;
  }

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
