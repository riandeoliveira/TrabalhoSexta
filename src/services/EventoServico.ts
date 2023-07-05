import { entrada } from "../repositories/Repositorio";
import { sementeServico } from "./SementeServico";

/**
 * Serviço para a geração dos eventos através de números aleatórios utilizando o Método Congruente Linear.
 */
class EventoServico {
  /**
   * Gera o próximo evento, a partir da média de chegada/atendimento.
   */
  public gerarProximoEvento(tipoDeEvento: number): number {
    let semente = (entrada.xi * entrada.a + entrada.c) % entrada.m;
    let npa = semente / (entrada.m - 1);
    let numeroAleatorio = Math.abs(Math.log(npa) * tipoDeEvento); // mutplicado por: MEDIA_CHEGADA ou MEDIA_ATENDIMENTO

    sementeServico.salvarProximaSemente(semente);

    if (numeroAleatorio === Infinity) return 0;

    return numeroAleatorio;
  }
}

export const eventoServico = new EventoServico();
