const simulacao = require("../src/modules/simulacao");

describe("Testes da Simulação", () => {
  test("Caso de Parada 0", () => {
    let parada = 0;

    const resultadoRecebido = simulacao.debugar(parada);
    const resultadoEsperado = {
      status_servidor: 1,
      numero_em_fila: 0,
      fila_chegada: [],
      tempo_ultimo_evento: 0.4,
      relogio_simulacao: 0.4,
      proxima_chegada: 1.6,
      proxima_saida: 2.4,
      fim_simulacao: false,
      proximo_evento: "C",
      tempo_total_fila: 0,
      area_sob_qt: 0,
      area_sob_ut: 0,
      clientes_atendidos: 0,
      x_ant: 0,
    };

    expect(resultadoRecebido).toStrictEqual(resultadoEsperado);
  });

  test("Caso de Parada 1", () => {
    let parada = 1;

    const resultadoRecebido = simulacao.debugar(parada);
    const resultadoEsperado = {
      status_servidor: 1,
      numero_em_fila: 1,
      fila_chegada: [1.6],
      tempo_ultimo_evento: 1.6,
      relogio_simulacao: 1.6,
      proxima_chegada: 2.1,
      proxima_saida: 2.4,
      fim_simulacao: false,
      proximo_evento: "C",
      tempo_total_fila: 0,
      area_sob_qt: 0,
      area_sob_ut: 1.2,
      clientes_atendidos: 1,
      x_ant: 0,
    };

    expect(resultadoRecebido).toStrictEqual(resultadoEsperado);
  });

  test("Caso de Parada 2", () => {
    let parada = 2;

    const resultadoRecebido = simulacao.debugar(parada);
    const resultadoEsperado = {
      status_servidor: 1,
      numero_em_fila: 2,
      fila_chegada: [1.6, 2.1],
      tempo_ultimo_evento: 2.1,
      relogio_simulacao: 2.1,
      proxima_chegada: 3.8,
      proxima_saida: 2.4,
      fim_simulacao: false,
      proximo_evento: "C",
      tempo_total_fila: 0,
      area_sob_qt: 0.5,
      area_sob_ut: 1.7,
      clientes_atendidos: 1,
      x_ant: 0,
    };

    expect(resultadoRecebido).toStrictEqual(resultadoEsperado);
  });

  // test("Caso de Parada 3", () => {
  //   let parada = 3;

  //   const resultadoRecebido = simulacao.debugar(parada);
  //   const resultadoEsperado = {
  //     status_servidor: 1,
  //     numero_em_fila: 1,
  //     fila_chegada: [2.1],
  //     tempo_ultimo_evento: 2.4,
  //     relogio_simulacao: 2.4,
  //     proxima_chegada: 3.8,
  //     proxima_saida: 3.1,
  //     fim_simulacao: false,
  //     proximo_evento: "C",
  //     tempo_total_fila: 0.8,
  //     area_sob_qt: 1.1,
  //     area_sob_ut: 2.0,
  //     clientes_atendidos: 1,
  //     x_ant: 0,
  //   };

  //   expect(resultadoRecebido).toStrictEqual(resultadoEsperado);
  // });
});
