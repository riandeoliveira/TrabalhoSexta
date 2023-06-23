const simulacao = require("./simulacao");

describe("Testes da Simulação", () => {
  test("Caso de Parada 1", () => {
    simulacao.resetarValores();

    let parada = 1;

    const resultadoRecebido = simulacao.debugar(parada);
    const resultadoEsperado = {
      statusServidor: 1,
      numeroEmFila: 0,
      filaChegada: [],
      tempoUltimoEvento: 0.4,
      relogioSimulacao: 0.4,
      proximaChegada: 1.6,
      proximaSaida: 2.4,
      fimSimulacao: false,
      proximoEvento: "C",
      tempoTotalFila: 0,
      areaSobQT: 0,
      areaSobUT: 0,
      clientesAtendidos: 0,
      xAnt: 0,
    };

    expect(resultadoRecebido).toStrictEqual(resultadoEsperado);
  });

  test("Caso de Parada 2", () => {
    simulacao.resetarValores();

    let parada = 2;

    const resultadoRecebido = simulacao.debugar(parada);
    const resultadoEsperado = {
      statusServidor: 1,
      numeroEmFila: 1,
      filaChegada: [1.6],
      tempoUltimoEvento: 1.6,
      relogioSimulacao: 1.6,
      proximaChegada: 2.1,
      proximaSaida: 2.4,
      fimSimulacao: false,
      proximoEvento: "C",
      tempoTotalFila: 0,
      areaSobQT: 0,
      areaSobUT: 1.2,
      clientesAtendidos: 1,
      xAnt: 0,
    };

    expect(resultadoRecebido).toStrictEqual(resultadoEsperado);
  });

  test("Caso de Parada 3", () => {
    simulacao.resetarValores();

    let parada = 3;

    const resultadoRecebido = simulacao.debugar(parada);
    const resultadoEsperado = {
      statusServidor: 1,
      numeroEmFila: 2,
      filaChegada: [1.6, 2.1],
      tempoUltimoEvento: 2.1,
      relogioSimulacao: 2.1,
      proximaChegada: 3.8,
      proximaSaida: 2.4,
      fimSimulacao: false,
      proximoEvento: "C",
      tempoTotalFila: 0,
      areaSobQT: 0.5,
      areaSobUT: 1.7,
      clientesAtendidos: 1,
      xAnt: 0,
    };

    expect(resultadoRecebido).toStrictEqual(resultadoEsperado);
  });

  test("Caso de Parada 4", () => {
    simulacao.resetarValores();

    let parada = 4;

    const resultadoRecebido = simulacao.debugar(parada);
    const resultadoEsperado = {
      statusServidor: 1,
      numeroEmFila: 1,
      filaChegada: [2.1],
      tempoUltimoEvento: 2.4,
      relogioSimulacao: 2.4,
      proximaChegada: 3.8,
      proximaSaida: 3.1,
      fimSimulacao: false,
      proximoEvento: "C",
      tempoTotalFila: 0.8,
      areaSobQT: 1.1,
      areaSobUT: 2.0,
      clientesAtendidos: 1,
      xAnt: 0,
    };

    expect(resultadoRecebido).toStrictEqual(resultadoEsperado);
  });
});
