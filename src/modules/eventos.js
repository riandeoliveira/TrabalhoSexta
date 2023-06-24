const eventos = [
  {
    tempo_chegada: 0.4,
    tempo_partida: 2.0,
    tipo: "CHEGADA",
  },
  {
    tempo_chegada: 1.2,
    tempo_partida: 0.7,
    tipo: "CHEGADA",
  },
  {
    tempo_chegada: 0.5,
    tempo_partida: 0.2,
    tipo: "CHEGADA",
  },
  {
    tempo_chegada: 1.7,
    tempo_partida: 1.1,
    tipo: "CHEGADA",
  },

  // { tempo: 0.4, tipo: "chegada" }, // e1 | a1
  // { tempo: 1.2, tipo: "chegada" }, // e2 | a2
  // { tempo: 0.5, tipo: "chegada" }, // e3 | a3
  // { tempo: 2.0, tipo: "partida" }, // e4 | s1
  // { tempo: 0.7, tipo: "partida" }, // e5 | s2
  // { tempo: 0.2, tipo: "partida" }, // e6 | s3
];

module.exports = eventos;
