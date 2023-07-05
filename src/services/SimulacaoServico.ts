import PromptSync from "prompt-sync";
import { Evento, estado, extra } from "../repositories/Repositorio";
import { estadoServico } from "./EstadoServico";
import { servidorServico } from "./ServidorServico";

const prompt = PromptSync();

/**
 * Serviço para lidar com a simulação.
 */
class SimulacaoServico {
  /**
   * Método para iniciar a simulação.
   */
  public iniciar(): void {
    let indice = 0;

    this.simular(indice);
  }

  /**
   * Processar um evento de CHEGADA.
   */
  public processarChegada(evento: Evento, proximoEvento: Evento): void {
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
  public processarSaida(evento: Evento, proximoEvento: Evento): void {
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

  public simular(indice: number): void {
    let evento = extra.lista_de_eventos[indice];
    let proximoEvento = extra.lista_de_eventos[indice + 1];

    estadoServico.exibirEstados();

    console.log(`Geração atual: ${indice + 1}`);

    if (estado.proximo_evento === "C") {
      this.processarChegada(evento, proximoEvento);
    } else if (estado.proximo_evento === "S") {
      this.processarSaida(evento, proximoEvento);
    }

    indice++;

    const continuarSimulacao = prompt(
      "\nVocê deseja continuar a simulação (s/n)?\n"
    );

    switch (continuarSimulacao) {
      case "s":
        this.simular(indice);

        break;
      case "n":
        break;

      case "N":
        break;

      default:
        this.simular(indice);

        break;
    }
  }
}

export const simulacaoServico = new SimulacaoServico();
