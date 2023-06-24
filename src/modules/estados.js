/**
 * Estados e contadores do sistema.
 */
const estados = {
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

module.exports = estados;
