const Menu = require("./modules/Menu");
const simulacao = require("./modules/simulacao");

const menu = new Menu();

simulacao.iniciar();
menu.exibirEstados();
