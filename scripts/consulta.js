var dadosVendas = [];
var labelsX = [];
var myBarChart = null;
var myBarChart_2 = null;

$(document).ready(
    $('#botao-consulta').on('click', function(){
        var res = [];
        res = validarDadosInformados();
        if (!res['erros']) {
            $.ajax({
                url: '../backend/funcoes.php',
                type: 'GET',
                data: {dataInicial: $('#data-inicial').val(), dataFinal: $('#data-final').val(), nomeProduto: $('#nome-produto').val(), action:'obterPrevisaoVendas'},
            }).done(function(response) {
                dadosVendas = response;
                montarTabelaResultado(response);
                mostrarResultado();
            }).fail(function(response) {
                mostrarErros(JSON.parse(response['responseText'])['erros']);
            });
        } else {
            mostrarErros(res['erros']);
        }
    }),

    $('#modalChart').on('shown.bs.modal',function(event){
        var link = $(event.relatedTarget);
        var index = link.attr('data-index-vendas');
        
        // get data source
        var dadosParaGrafico = [];
        var dadosParaGraficoVendas = [];
        var dadosParaGraficoCompras = [];
     
        for (const [ano, qtdeVendas] of Object.entries(dadosVendas[index]['vendasPorAno'])) {
            dadosParaGrafico.push(qtdeVendas);
            dadosParaGraficoVendas.push(qtdeVendas);
        }

        for (const [ano, qtdeCompras] of Object.entries(dadosVendas[index]['comprasPorAno'])) {
            dadosParaGraficoCompras.push(qtdeCompras);
        }

        dadosParaGrafico.push(link.attr('data-media'));
        dadosParaGrafico.push(link.attr('data-previsao'));

        // get title
        var title = dadosVendas[index]['descricao'];
        
        // get labels
        var chartLabels = [...labelsX, 'Média', 'Previsão'];

        var data = {
            labels: chartLabels,
            datasets: [
                {
                    label: title,
                    data: dadosParaGrafico,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)'
                    ],
                    borderColor: [
                        'rgb(255, 99, 132)'
                    ],
                    borderWidth: 1
                }
            ]
        };
        
        var dataCompraVenda = {
            labels: labelsX,
            datasets: [
                {
                    label: 'Vendas',
                    data: dadosParaGraficoVendas,
                    backgroundColor: [
                        'rgba(99, 255, 132, 0.2)'
                    ],
                    borderColor: [
                        'rgb(99, 255, 132)'
                    ],
                    borderWidth: 1
                },
                {
                    label: 'Compras',
                    data: dadosParaGraficoCompras,
                    backgroundColor: [
                        'rgba(99, 132, 255, 0.2)'
                    ],
                    borderColor: [
                        'rgb(99, 132, 255)'
                    ],
                    borderWidth: 1
                }
            ]
        };
        
        // Chart initialisieren
        var modal = $('#modalChart');
        var canvas = modal.find('.modal-body #canvas');
        var canvas_2 = modal.find('.modal-body #canvas_2');
        modal.find('.modal-title').html(title + '. Previsão de vendas e comparativo de compra e venda');
        var ctx = canvas[0].getContext("2d");
        var ctx2 = canvas_2[0].getContext("2d");
        
        myBarChart = new Chart(ctx, {
            type: 'bar',
            data: data,
            options: {
                barValueSpacing: 20,
                responsive: true,
                scales: {
                    yAxes: [{
                        ticks: {
                            min: 0,
                        }
                    }]
                }
            },
        });

        myBarChart_2 = new Chart(ctx2, {
            type: 'bar',
            data: dataCompraVenda,
            options: {
                barValueSpacing: 20,
                responsive: true,
                scales: {
                    yAxes: [{
                        ticks: {
                            min: 0,
                        }
                    }]
                }
            },
        });
    }).on('hidden.bs.modal',function(event){
        // reset canvas size
        var modal = $('#modalChart');
        var canvas = modal.find('.modal-body #canvas');
        var canvas_2 = modal.find('.modal-body #canvas_2');
        canvas.attr('width','568px').attr('height','300px');
        canvas_2.attr('width','568px').attr('height','300px');
        // destroy modal
        myBarChart.destroy();
        myBarChart_2.destroy();
        $('#modalChart').data('bs.modal', null);
    })
);


function validarDadosInformados() {
    var res = [];
    var erros = [];
    var dataInicial = $('#data-inicial').val().trim();
    var dataFinal = $('#data-final').val().trim();
    
    erros = erros.concat(validarData(dataInicial, 'inicial')['erros'], validarData(dataFinal, 'final')['erros']);
    if (erros.length) {
        res['erros'] = erros;
    }

    return res;
}

function validarData(data, tipo) {
    var res = {'erros': []};
    
    if (!data) {
        res['erros'].push('Data '  + tipo + ' não informada.');
        return res;
    } 
    
    data = data.replaceAll('/','-').split('-');

    data.forEach(arrayValue => {
        if (isNaN(arrayValue)) {
            res['erros'].push('Data ' + tipo + ' com formato inválido.')
            return res;
        }
    });

    let ano = parseInt(data[0].length == 4 ? data[0] : data[2]);
    let mes = parseInt(data[1]);
    let dia = parseInt(data[0].length == 2 ? data[0] : data[2]);

    let diasPorMes = [31, anoBissexto(ano) ? 29 : 28 ,31,30,31,30,31,31,30,31,30,31];

    if (dia < 1 || dia > diasPorMes[mes - 1]) {
        res['erros'].push('Data ' + tipo + ' inválida');
    }
    
    return res;
}

function anoBissexto(ano)
{
  return ((ano % 4 == 0) && (ano % 100 != 0)) || (ano % 400 == 0);
}

function mostrarErros(erros) {
    $('#resultado-erros ul').empty();
    
    erros.forEach(msgErro => {
        $('#resultado-erros ul').append(
            $('<li>').text(msgErro)
        )
    });
    
    $('#resultado-sucesso').hide();
    $('#resultado-erros').show();
}

function montarTabelaResultado(data) {
    var anoInicial = parseInt($('#data-inicial').val());
    var anoFinal = parseInt($('#data-final').val());
    var quantidadeAnos = anoFinal + 1 - anoInicial || 1;
    var mostrarTotaisAnosAnteriores = $('#anos-anteriores').prop('checked');
    var that = this;
    
    $('#resultado-sucesso').empty();

    $('#resultado-sucesso').append(
        $('<h2>', {'text': 'Período: ' + anoInicial + ' a ' + anoFinal})
    )

    var tabela = $('<table>', {'id': 'tabela-previsao-vendas'});
    var cabecalhoTabela = $('<thead>').append(
        $('<th>', {'text': 'Produto'})
    );
    labelsX = [];
    for (let ano = anoInicial; ano <= anoFinal; ano++) {
        if (mostrarTotaisAnosAnteriores) {
            cabecalhoTabela.append(
                $('<th>', {'text': ano})
            )
        }
        labelsX.push(ano);
    }
    
    cabecalhoTabela.append(
        $('<th>', {'text': 'Média'}),
        $('<th>', {'text': 'Previsão (' + (anoFinal + 1) + ')'  })
    )

    var corpoTabela = $('<tbody>');

    var linhasTabela = [];
    
    for (let key in data) {
        var linha = $('<tr>');
        var chartIcon = $('<i>', {'class':'fas fa-chart-bar', 'data-toggle':'modal', 'data-target':'#modalChart', 'data-index-vendas' : key});
        linha.append(
            $('<td>', {'class': 'product-description'}).append(
                $('<span>', {'text': data[key]['descricao'] + ' (' + data[key]['unidade'] +  ')'}),
                chartIcon
            )
        );

        var soma = 0;
        var vendasAnteriores = [];
        for (let ano = anoInicial; ano <= anoFinal; ano++) {
            if (mostrarTotaisAnosAnteriores) {
                linha.append(
                    $('<td>', {'text': data[key]['vendasPorAno'][ano] || 0})
                )
            }
            vendasAnteriores.push(parseFloat(data[key]['vendasPorAno'][ano] || 0.00));
            soma += parseFloat(data[key]['vendasPorAno'][ano] || 0.00);
        }
        var media = (soma / quantidadeAnos).toFixed(2);
        var previsao = calcularPrevisao(vendasAnteriores, media, quantidadeAnos);

        chartIcon.attr('data-media', media);
        chartIcon.attr('data-previsao', previsao);
        linha.append(
            $('<td>', {'text': media}),
            $('<td>', {'text': previsao})
        );
       
        linhasTabela.push(linha);
      }

    corpoTabela.append(linhasTabela);
    tabela.append(cabecalhoTabela, corpoTabela);

    $('#resultado-sucesso').append(tabela);
}

function calcularPrevisao(totais, media, qtdeAnos) {
    let resumoComPeso = 0;
    let somatorioPesoPeriodos = 0;
    let somatorioPesoQuadrados = 0;
    
    for (let i = 1; i <= qtdeAnos; i++) {
        resumoComPeso += totais[i - 1]  * i; 
        somatorioPesoPeriodos += i;
        somatorioPesoQuadrados += Math.pow(i, 2);
    }

    let diferenca = resumoComPeso - (media * somatorioPesoPeriodos);
    let ratio = somatorioPesoQuadrados - (Math.pow(somatorioPesoPeriodos / qtdeAnos, 2) * qtdeAnos);
    let b = diferenca / ratio;
    let a = media - (b * ratio);
    let previsao = a + ((qtdeAnos + 1) * b);
    
    return previsao.toFixed(2);
}

function mostrarResultado() {
    $('#resultado-erros').hide();
    $('#resultado-sucesso').show();
}
