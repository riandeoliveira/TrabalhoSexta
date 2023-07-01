const Menu = require("./modules/Menu");
const simulacao = require("./modules/simulacao");

const menu = new Menu();

menu.receberDadosNPAs()

// menu.receberDadosNPAs();

// Tempo médio entre chegadas (exponencial): 1 minuto
// ➢ Tempo médio de atendimento (exponencial): 0,5 minuto
// ➢ Tempo de simulação: 8 horas (480 minutos)

// x0 = 15
// a = 3
// c = 7
// m = 128
