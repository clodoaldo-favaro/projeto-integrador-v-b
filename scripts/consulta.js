$(document).ready(
    $('#botao-consulta').on('click', function(){
        var res = validarDadosInformados();
        //TODO: Mostrar consulta em andamento
        if (!res['erros']) {
            $.ajax({
                url: '../backend/funcoes.php',
                type: 'GET',
                data: {dataInicial: $('#data-inicial').val(), dataFinal: $('#data-final').val(), nomeProduto: $('#nome-produto').val(), action:'obterPrevisaoVendas'},
            }).done(function(response) {
                montarTabelaResultado(response);
                mostrarResultado();
            }).fail(function(response) {
                alert(JSON.parse(response['responseText'])['error']);
            });
        } else {
            mostrarErros(res['erros']);
        }
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
    var quantidadeAnos = anoFinal - anoInicial || 1;
    var mostrarTotaisAnosAnteriores = $('#anos-anteriores').prop('checked');
    
    $('#resultado-sucesso').empty();

    $('#resultado-sucesso').append(
        $('<h2>', {'text': 'Período: ' + anoInicial + ' a ' + anoFinal})
    )

    var tabela = $('<table>', {'id': 'tabela-previsao-vendas'});
    var cabecalhoTabela = $('<thead>').append(
        $('<th>', {'text': 'Produto'})
    );
    
    if (mostrarTotaisAnosAnteriores) {
        for (let ano = anoInicial; ano <= anoFinal; ano++) {
            cabecalhoTabela.append(
                $('<th>', {'text': ano})
            )
        }
        cabecalhoTabela.append(
            $('<th>', {'text': 'Média'})
        )
    }

    cabecalhoTabela.append(
        $('<th>', {'text': 'Previsão'})
    )

    var corpoTabela = $('<tbody>');

    var linhasTabela = [];
    
    for (let key in data) {
        var linha = $('<tr>');
        
        linha.append(
            $('<td>', {'text': data[key]['descricao'] + ' (' + data[key]['unidade'] +  ')'})
        );

        var soma = 0;
        for (let ano = anoInicial; ano <= anoFinal; ano++) {
            if (mostrarTotaisAnosAnteriores) {
                linha.append(
                    $('<td>', {'text': data[key]['vendasPorAno'][ano] || 0})
                )
            }
            soma += parseFloat(data[key]['vendasPorAno'][ano] || 0.00);
        }
        
        linha.append(
            $('<td>', {'text': (soma / quantidadeAnos).toFixed(2)})
        )

        linhasTabela.push(linha);
      }

    corpoTabela.append(linhasTabela);
    tabela.append(cabecalhoTabela, corpoTabela);

    $('#resultado-sucesso').append(tabela);

    


    //$('#resultado-sucesso').append(
    //    $('<h2>', {'class': 'nomeCidade', 'text': nomeCidade}),
    //    $('<h3>', {'class': 'bandeira', 'text': bandeira}),
    //    $('<ul>').append(
    //        $('<li>', {'text': 'Casos: ' + casos}),
    //        $('<li>', {'text': 'Óbitos: ' + obitos}),
    //        $('<li>', {'text': 'Recuperados: ' + recuperados}),
    //        $('<li>', {'text': 'Taxa de mortalidade: ' + taxaMortalidade + '%'}),
    //        $('<li>', {'text': 'Taxa de recuperação: ' + taxaRecuperacao + '%'})
    //    )
    //);

}

function mostrarResultado() {
    $('#resultado-erros').hide();
    $('#resultado-sucesso').show();
}