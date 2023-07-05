import promptSync from "prompt-sync";
import { entrada } from "../repositories/Repositorio";
import { sementeServico } from "./SementeServico";

const prompt = promptSync();

/**
 * Serviço para lidar com as entradas de dados do usuário.
 */
export class EntradaServico {
  /**
   * Solicita os valores iniciais para a geração de NPAs.
   */
  public solicitarDadosIniciais(): void {
    console.log("\nInsira os dados para a geração de NPAs:\n");

    entrada.xi = Number(prompt("Insira o valor de xi: "));
    entrada.a = Number(prompt("Insira o valor de a: "));
    entrada.c = Number(prompt("Insira o valor de c: "));
    entrada.m = Number(prompt("Insira o valor de m: "));

    entrada.tempo_medio_chegada = Number(
      prompt("Insira o tempo médio entre chegadas (exponencial): ")
    );

    entrada.tempo_medio_atendimento = Number(
      prompt("Insira o tempo médio entre atendimentos (exponencial): ")
    );

    entrada.tempo_simulacao = Number(
      prompt("Insira o tempo de simulação (minutos): ")
    );

    sementeServico.validarSementes();

    // entrada.xi = 15;
    // entrada.a = 3;
    // entrada.c = 7;
    // entrada.m = 128;

    // entrada.tempo_medio_chegada = 1;
    // entrada.tempo_medio_atendimento = 0.5;
    // entrada.tempo_simulacao = 480;
  }
}

export const entradaServico = new EntradaServico();
