const inputValorHora = document.getElementById('valorHora');
const inputHorasTrabalhadas = document.getElementById('horasTrabalhadas');
const btnCalcular = document.getElementById('btnCalcular');
const saidaResultado = document.getElementById('saidaResultado');

const IR_PERCENTUAL = 0.05;
const INSS_PERCENTUAL = 0.10;

function formatarMoeda(valor) {
    return valor.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });
}

function calcularFolhaPagamento() {
    const valorHora = parseFloat(inputValorHora.value);
    const horasTrabalhadas = parseInt(inputHorasTrabalhadas.value);

    if (isNaN(valorHora) || isNaN(horasTrabalhadas) || valorHora <= 0 || horasTrabalhadas <= 0) {
        saidaResultado.innerHTML = '<p class="desconto">Por favor, preencha os campos com valores válidos e positivos.</p>';
        return;
    }
    
    const salarioBruto = valorHora * horasTrabalhadas;
    
    const descontoIR = salarioBruto * IR_PERCENTUAL;
    const descontoINSS = salarioBruto * INSS_PERCENTUAL;
    
    const totalDescontos = descontoIR + descontoINSS;
    
    const salarioLiquido = salarioBruto - totalDescontos;

    const resultadoHTML = `
        <p>Salário Bruto: <span class="valor">${formatarMoeda(salarioBruto)}</span></p>
        <p class="desconto">(-) IR (5%): <span class="valor">${formatarMoeda(descontoIR)}</span></p>
        <p class="desconto">(-) INSS (10%): <span class="valor">${formatarMoeda(descontoINSS)}</span></p>
        <p>Total de descontos: <span class="valor">${formatarMoeda(totalDescontos)}</span></p>
        <p class="liquido">Salário Líquido: <span class="valor">${formatarMoeda(salarioLiquido)}</span></p>
    `;

    saidaResultado.innerHTML = resultadoHTML;
}

btnCalcular.addEventListener('click', calcularFolhaPagamento);

document.addEventListener('DOMContentLoaded', calcularFolhaPagamento);