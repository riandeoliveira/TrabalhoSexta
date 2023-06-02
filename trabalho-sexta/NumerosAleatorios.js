// LEIAME: Para executar este arquivo, insira no terminal: node NumerosAleatorios.js

/**
 * Classe para a geração de números aleatórios utilizando o Método Congruente Linear.
 */
class NumerosAleatorios {
  constructor(xi, a, c, m) {
    this.xi = xi;
    this.a = a;
    this.c = c;
    this.m = m;
  }

  /**
   * Gera um número aleatório.
   */
  gerarUm() {
    // semente gerada (ex: xi * a + c)
    let semente = this.xi * this.a + this.c;

    // semente encontrada se torna a próxima semente a ser usada
    this.xi = semente;

    // resto da divisão (ex: 52 mod 128)
    let modulo = semente % this.m;

    // intervalo (ex: xi / m - 1)
    let intervalo = modulo / (this.m - 1);

    // logaritmo natural
    let numeroAleatorio = Math.log(intervalo);

    return numeroAleatorio;
  }

  /**
   * Recebe uma quantidade específica e gera uma lista de números aleatórios.
   */
  gerarMuitos(quantidade) {
    let numerosGerados = [];

    // gera um número de acordo com a quantidade solicitada
    for (let i = 0; i < quantidade; i++) {
      let numero = this.gerarUm();

      numerosGerados.push(numero);
    }

    return numerosGerados;
  }
}

const numerosAleatorios = new NumerosAleatorios(15, 3, 7, 128);

// NOTA: As funções para gerar um ou mais números aleatórios já foram implementadas!

const npaGerado = numerosAleatorios.gerarUm();
const npasGerados = numerosAleatorios.gerarMuitos(5);

console.log(npaGerado);
console.log(npasGerados);

module.exports = numerosAleatorios;
