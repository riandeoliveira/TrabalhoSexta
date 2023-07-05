export interface Evento {
  tempo_chegada: number;
  tempo_saida: number;
}

/**
 * Repositório para armazenar todas as variáveis compartilhadas do sistema.
 */
class Repositorio {
  // Dados de entrada inseridos pelo usuário.
  entrada: {
    xi: number;
    a: number;
    c: number;
    m: number;
    tempo_medio_chegada: number;
    tempo_medio_atendimento: number;
    tempo_simulacao: number;
  };

  // Estados principais do sistema.
  estado: {
    status_servidor: number;
    numero_em_fila: number;
    fila_chegada: number[];
    tempo_ultimo_evento: number;
    relogio_simulacao: number;
    proxima_chegada: number | null;
    proxima_saida: number;
    fim_simulacao: boolean;
    proximo_evento: "C" | "S";
    tempo_total_fila: number;
    area_sob_qt: number;
    area_sob_ut: number;
    clientes_atendidos: number;
    x_ant: number;
  };

  // Variáveis auxiliares.
  extra: {
    lista_de_eventos: Evento[];
  };

  constructor() {
    this.entrada = {
      xi: 0,
      a: 0,
      c: 0,
      m: 0,
      tempo_medio_chegada: 0,
      tempo_medio_atendimento: 0,
      tempo_simulacao: 0,
    };

    this.estado = {
      status_servidor: 0,
      numero_em_fila: 0,
      fila_chegada: [],
      tempo_ultimo_evento: 0,
      relogio_simulacao: 0,
      proxima_chegada: null,
      proxima_saida: 9999999999,
      fim_simulacao: false,
      proximo_evento: "C",
      tempo_total_fila: 0,
      area_sob_qt: 0,
      area_sob_ut: 0,
      clientes_atendidos: 0,
      x_ant: 0,
    };

    this.extra = {
      lista_de_eventos: [],
    };
  }
}

const repositorio = new Repositorio();

export const entrada = repositorio.entrada;
export const estado = repositorio.estado;
export const extra = repositorio.extra;
