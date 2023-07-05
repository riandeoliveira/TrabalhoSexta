import { entrada, extra } from "../repositories/Repositorio";
import { eventoServico } from "./EventoServico";

/**
 * Serviço para lidar com as sementes geradas do sistema.
 */
class SementeServico {
  /**
   * Salva na memória a próxima semente a ser utilizada.
   */
  public salvarProximaSemente(semente: number): void {
    entrada.xi = semente;
  }

  /**
   * Retorna a soma dos valores de uma lista de sementes.
   */
  private somarTodas(sementes: number[]): number {
    return sementes.reduce((a, b) => a + b, 0);
  }

  /**
   * Valida sementes.
   */
  public validarSementes(): void {
    const sementes: number[] = [];
    let sementesSomadas: number = 0;

    while (sementesSomadas < entrada.tempo_simulacao) {
      const eventoDeChegada = eventoServico.gerarProximoEvento(
        entrada.tempo_medio_chegada
      );
      const eventoDeSaida = eventoServico.gerarProximoEvento(
        entrada.tempo_medio_atendimento
      );

      const sementeJaExistente = sementes.includes(eventoDeChegada);

      if (sementeJaExistente) {
        console.log("\nERRO! Semente inválida.\n");
        console.log(
          `As sementes começaram a se repetir após ${sementes.length} gerações!`
        );
        console.log(`Tempo total alcançado: ${sementesSomadas}`);
        console.log(`Tempo mínimo esperado: ${entrada.tempo_simulacao}`);

        break;
      }

      sementes.push(eventoDeChegada, eventoDeSaida);

      sementesSomadas = this.somarTodas(sementes);

      extra.lista_de_eventos.push({
        tempo_chegada: eventoDeChegada,
        tempo_saida: eventoDeSaida,
      });
    }

    // console.log("\nSEMENTE VÁLIDA ENCONTRADA!\n");
    // console.log(`Tempo total alcançado: ${sementesSomadas}`);
    // console.log(`Tempo mínimo esperado: ${entrada.tempo_simulacao}`);
  }
}

export const sementeServico = new SementeServico();
