import { estado } from "../repositories/Repositorio";

/**
 * Serviço para lidar com os estados do sistema.
 */
class EstadoServico {
  /**
   * Exibe todos os estados em tempo real.
   */
  public exibirEstados(): void {
    console.clear();
    console.log(`
=========================
|   ESTADOS DO SISTEMA  |
-------------------------
| Status do servidor:     ${estado.status_servidor}
| Nº em fila:             ${estado.numero_em_fila}
| Fila de chegada:        ${estado.fila_chegada}
| Tempo do último evento: ${estado.tempo_ultimo_evento}
| Relógio da simulação:   ${estado.relogio_simulacao}
| Próxima chegada:        ${estado.proxima_chegada}
| Próxima saída:          ${estado.proxima_saida}
| Fim da simulação:       ${estado.fim_simulacao}
| Próximo evento:         ${estado.proximo_evento}
| Tempo total da fila:    ${estado.tempo_total_fila}
| Área sob QT:            ${estado.area_sob_qt}
| Área sob UT:            ${estado.area_sob_ut}
| Clientes atendidos:     ${estado.clientes_atendidos}
| X ant:                  ${estado.x_ant}
=========================
    `);
  }

  /**
   * Resetar todos os estados para seus valores iniciais.
   */
  public resetarEstados(): void {
    estado.status_servidor = 0;
    estado.numero_em_fila = 0;
    estado.fila_chegada = [];
    estado.tempo_ultimo_evento = 0;
    estado.relogio_simulacao = 0;
    estado.proxima_chegada = null;
    estado.proxima_saida = 9999999999;
    estado.fim_simulacao = false;
    estado.proximo_evento = "C";
    estado.tempo_total_fila = 0;
    estado.area_sob_qt = 0;
    estado.area_sob_ut = 0;
    estado.clientes_atendidos = 0;
    estado.x_ant = 0;
  }
}

export const estadoServico = new EstadoServico();
