import { estado } from "../repositories/Repositorio";

/**
 * Serviço para realizar as ações necessárias durante a simulação.
 */
class ServidorServico {
  /**
   * Inicia um atendimento, deixando o servidor ocupado.
   */
  public atender(): void {
    estado.status_servidor = 1;
  }

  /**
   * Calcula a Área QT.
   */
  public calcularAreaQT(): void {
    let relogio = estado.relogio_simulacao;
    let ultimoEvento = estado.tempo_ultimo_evento;

    let subtracao = relogio - ultimoEvento;
    let soma = estado.area_sob_qt + subtracao;

    let multiplicacao = soma * estado.numero_em_fila;

    estado.area_sob_qt = Number(multiplicacao.toFixed(1));
  }

  /**
   * Calcula a Área UT
   */
  public calcularAreaUT(): void {
    let relogio = estado.relogio_simulacao;
    let ultimoEvento = estado.tempo_ultimo_evento;

    let subtracao = relogio - ultimoEvento;
    let soma = estado.area_sob_ut + subtracao;

    let multiplicacao = soma * estado.status_servidor;

    estado.area_sob_ut = Number(multiplicacao.toFixed(1));
  }

  /**
   * Finaliza um atendimento, deixando o servidor ocioso.
   */
  public ficarOcioso(): void {
    estado.status_servidor = 0;
  }

  /**
   * Insere um item na fila de chegada.
   */
  public inserirNaFila(item: number) {
    estado.fila_chegada.push(item);
    estado.numero_em_fila = estado.fila_chegada.length;
  }

  /**
   * Verifica se o servidor está ocioso.
   */
  public ocioso(): boolean | null {
    if (estado.status_servidor === 0) return true;
    if (estado.status_servidor === 1) return false;

    return null;
  }

  /**
   * Remove um item da fila de chegada.
   */
  public removerDaFila(): void {
    estado.fila_chegada.shift();
    estado.numero_em_fila = estado.fila_chegada.length;
  }
}

export const servidorServico = new ServidorServico();
