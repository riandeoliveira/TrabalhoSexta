class NumeroAleatorio {
  gerar() {
    const numeroAleatorio = Number((Math.random() * 5).toFixed(1));

    return numeroAleatorio;
  }
}

const numeroAleatorio = new NumeroAleatorio();

module.exports = numeroAleatorio;
