import PromptSync from "prompt-sync";

type ProximoEvento = "C" | "S";

const prompt = PromptSync();

function aguardar(segundos: number): Promise<unknown> {
  return new Promise((resolve) => setTimeout(resolve, segundos));
}

function gerarChegada(): number {
  let semente = (xi * a + c) % m;
  let npa = semente / (m - 1);
  let numeroAleatorio = Math.abs(Math.log(npa) * tempo_medio_chegada);

  xi = semente;

  return numeroAleatorio;
}

function gerarSaida(): number {
  let semente = (xi * a + c) % m;
  let npa = semente / (m - 1);
  let numeroAleatorio = Math.abs(Math.log(npa) * tempo_medio_atendimento);

  xi = semente;

  return numeroAleatorio;
}

console.log("\nInsira os dados para a geração de NPAs:\n");

let xi = Number(prompt("Insira o valor de xi: "));
let a = Number(prompt("Insira o valor de a: "));
let c = Number(prompt("Insira o valor de c: "));
let m = Number(prompt("Insira o valor de m: "));

let tempo_medio_chegada = Number(
  prompt("Insira o tempo médio entre chegadas (exponencial): ")
);

let tempo_medio_atendimento = Number(
  prompt("Insira o tempo médio entre atendimentos (exponencial): ")
);

let tempo_simulacao = Number(prompt("Insira o tempo de simulação (minutos): "));

// Variáveis utilizadas pelo grupo
//
// let xi: number = 123456;
// let a: number = 1103515245;
// let c: number = 12345;
// let m: number = 2147483648;

// let tempo_medio_chegada: number = 1;
// let tempo_medio_atendimento: number = 0.5;
// let tempo_simulacao: number = 480;
//

let status_servidor: number = 0;
let numero_em_fila: number = 0;
let fila_chegada: number[] = [];
let tempo_ultimo_evento = 0;
let relogio_simulacao = 0;
let proxima_saida: number = 9999999999;
let fim_simulacao: boolean = false;
let proximo_evento: ProximoEvento = "C";
let tempo_total_fila: number = 0;
let area_sob_qt: number = 0;
let area_sob_ut: number = 0;
let clientes_atendidos: number = 0;
let proxima_chegada: number = gerarChegada();

/**
 * Exibe todos os estados em tempo real.
 */
function exibirEstados(): void {
  let proximaSaida: string | number =
    proxima_saida !== 9999999999 ? proxima_saida.toFixed(2) : proxima_saida;

  console.clear();
  console.log(`
=========================
|   ESTADOS DO SISTEMA  |
-------------------------
| Status do servidor:     ${status_servidor}
| Nº em fila:             ${numero_em_fila}
| Fila de chegada:        [ ${fila_chegada.join(", ")} ]
| Tempo do último evento: ${tempo_ultimo_evento.toFixed(2)}
| Relógio da simulação:   ${relogio_simulacao.toFixed(2)}
| Próxima chegada:        ${proxima_chegada.toFixed(2)}
| Próxima saída:          ${proximaSaida}
| Fim da simulação:       ${fim_simulacao}
| Próximo evento:         ${proximo_evento}
| Tempo total da fila:    ${tempo_total_fila.toFixed(2)}
| Área sob QT:            ${area_sob_qt.toFixed(2)}
| Área sob UT:            ${area_sob_ut.toFixed(2)}
| Clientes atendidos:     ${clientes_atendidos}
=========================
  `);
}

/**
 * Calcula a Área QT.
 */
function calcularAreaQT(): void {
  area_sob_qt =
    area_sob_qt + (relogio_simulacao - tempo_ultimo_evento) * numero_em_fila;
}

/**
 * Calcula a Área UT
 */
function calcularAreaUT(): void {
  area_sob_ut =
    area_sob_ut + (relogio_simulacao - tempo_ultimo_evento) * status_servidor;
}

/**
 * Remove um item da fila de chegada.
 */
function removerDaFila(): void {
  fila_chegada.shift();
  numero_em_fila = fila_chegada.length;
}

/**
 * Processar um evento de CHEGADA.
 */
function processarChegada(chegada: number): void {
  relogio_simulacao = chegada;

  proxima_chegada = relogio_simulacao + gerarChegada();

  if (status_servidor === 0) {
    status_servidor = 1;

    proxima_saida = relogio_simulacao + gerarSaida();
  } else {
    calcularAreaQT();
    calcularAreaUT();

    fila_chegada.push(chegada);
    numero_em_fila++;
  }

  tempo_ultimo_evento = relogio_simulacao;
}

/**
 * Processar um evento de SAÍDA.
 */
function processarSaida(saida: number): void {
  relogio_simulacao = saida;

  if (numero_em_fila > 0) {
    proxima_saida = relogio_simulacao + gerarSaida();

    calcularAreaQT();
    removerDaFila();

    tempo_total_fila = tempo_total_fila + relogio_simulacao;
  } else {
    calcularAreaUT();

    proxima_saida = 9999999999;
    status_servidor = 0;
  }

  tempo_ultimo_evento = relogio_simulacao;
  clientes_atendidos++;
}

/**
 * Alterna entre os eventos de chegada (C) e de saída (S).
 */
function alternarEvento(): ProximoEvento {
  let proximaSaida: string | number =
    proxima_saida !== 9999999999 ? proxima_saida.toFixed(2) : proxima_saida;

  console.log("\nTemporizador:");
  console.log(`Próxima chegada: ${proxima_chegada.toFixed(2)}`);
  console.log(`Próxima saída: ${proximaSaida}`);

  if (proxima_chegada <= proxima_saida) return "C";

  return "S";
}

/**
 * Função de inicialização do programa.
 */
async function iniciarSimulacao(): Promise<void> {
  let indice: number = 0;
  let avancarGeracoes: boolean = false;
  let continuarExibindo: string = "";

  while (true) {
    exibirEstados();

    console.log(`Geração atual: ${indice + 1}`);
    console.log("\nVocê deseja continuar exibindo os dados (s/n)?\n");

    if (!avancarGeracoes) {
      continuarExibindo = prompt("Resposta: ");
    }

    if (continuarExibindo === "n" || continuarExibindo === "N") {
      avancarGeracoes = true;
    }

    if (proximo_evento === "C") processarChegada(proxima_chegada);
    if (proximo_evento === "S") processarSaida(proxima_saida);

    if (proxima_chegada > tempo_simulacao && proxima_saida === 9999999999) {
      let tempoMedioEmFila: number = tempo_total_fila / clientes_atendidos;
      let numeroMedioEmFila: number = area_sob_qt / tempo_simulacao;
      let taxaDeOcupacao: number = (area_sob_ut / relogio_simulacao) * 100;

      fim_simulacao = true;
      relogio_simulacao = tempo_simulacao;

      exibirEstados();

      console.log(`Total de gerações: ${indice}\n`);

      console.log(`Tempo médio em fila: ${tempoMedioEmFila.toFixed(2)}`);
      console.log(`Número médio em fila: ${numeroMedioEmFila.toFixed(2)}`);
      console.log(`Taxa de ocupação: ${taxaDeOcupacao.toFixed(2)}%\n`);

      break;
    } else if (proxima_chegada > tempo_simulacao) {
      proximo_evento = "S";
    } else {
      proximo_evento = alternarEvento();

      if (!avancarGeracoes) await aguardar(2000);
    }

    indice++;
  }
}

iniciarSimulacao();
