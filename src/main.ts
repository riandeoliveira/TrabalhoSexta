// Arquivo principal do sistema, reponsável por chamar todas as rotinas necessárias.

import { entradaServico } from "./services/EntradaServico";
import { sementeServico } from "./services/SementeServico";
import { simulacaoServico } from "./services/SimulacaoServico";

entradaServico.solicitarDadosIniciais();
sementeServico.validarSementes();
simulacaoServico.iniciar();
