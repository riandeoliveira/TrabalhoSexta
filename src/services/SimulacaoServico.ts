import { Evento, estado, extra } from "../repositories/Repositorio";
import { servidorServico } from "./ServidorServico";

/**
 * Serviço para lidar com a simulação.
 */
class SimulacaoServico {
  /**
   * Método para iniciar a simulação.
   */
  iniciar() {
    for (let i in extra.lista_de_eventos) {
      let indice = Number(i);

      if (indice > 0) break;

      let evento = extra.lista_de_eventos[indice];
      let proximoEvento = extra.lista_de_eventos[indice + 1];

      this.processarChegada(evento, proximoEvento);
    }
  }

  /**
   * Processar um evento de CHEGADA.
   */
  processarChegada(evento: Evento, proximoEvento: Evento) {
    let chegada = evento.tempo_chegada;

    estado.relogio_simulacao += chegada;

    estado.proxima_chegada =
      estado.relogio_simulacao + proximoEvento.tempo_chegada;

    if (servidorServico.ocioso()) {
      servidorServico.atender();

      estado.proxima_saida = estado.relogio_simulacao + evento.tempo_saida;
    } else {
      servidorServico.calcularAreaQT();
      servidorServico.calcularAreaUT();
      servidorServico.inserirNaFila(estado.relogio_simulacao);
    }

    estado.tempo_ultimo_evento = estado.relogio_simulacao;
  }

  /**
   * Processar um evento de SAÍDA.
   */
  processarSaida(evento: Evento, proximoEvento: Evento) {
    let saida = evento.tempo_saida;

    estado.relogio_simulacao += saida;

    if (estado.numero_em_fila > 0) {
      estado.proxima_saida =
        estado.relogio_simulacao + proximoEvento.tempo_saida;

      servidorServico.calcularAreaQT();
      servidorServico.removerDaFila();

      estado.tempo_total_fila =
        estado.tempo_total_fila + estado.relogio_simulacao;
    } else {
      servidorServico.calcularAreaUT();

      estado.proxima_saida = 9999999999;

      servidorServico.ficarOcioso();
    }

    estado.tempo_ultimo_evento = estado.relogio_simulacao;
    estado.clientes_atendidos++;
  }
}

export const simulacaoServico = new SimulacaoServico();
