/**
 * Classe para a geração de números aleatórios utilizando o Método Congruente Linear.
 */
class GeradorNPAs {
  /**
   * @param {number} x0
   * @param {number} a
   * @param {number} c
   * @param {number} m
   */
  receberDados(x0, a, c, m) {
    this.x0 = x0;
    this.a = a;
    this.c = c;
    this.m = m;
  }

  /**
   * Gera um número aleatório.
   */
  gerarUm() {
    let semente = this.x0 * this.a + this.c;

    this.x0 = semente;

    let modulo = semente % this.m;
    let intervalo = modulo / (this.m - 1);
    let numeroAleatorio = Math.log(intervalo) 
    // * chegada
    // * atendimento

    return numeroAleatorio;
  }

  /**
   * Recebe uma quantidade específica e gera uma lista de números aleatórios.
   */
  gerarMuitos(quantidade) {
    let numerosGerados = [];

    for (let i = 0; i < quantidade; i++) {
      let numero = this.gerarUm();

      numerosGerados.push(numero);
    }

    return numerosGerados;
  }
}

const geradorNPAs = new GeradorNPAs();

module.exports = geradorNPAs;
