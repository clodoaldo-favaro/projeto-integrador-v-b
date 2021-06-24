$(document).ready(
    $('#botao-consulta').on('click', function(){
        //var res = validarDadosInformados();
        var res = [];
        
        if (!res['erros']) {
            $.ajax({
                url: '../backend/funcoes.php',
                type: 'GET',
                data: {dataInicial: $('#data-inicial').val(), dataFinal: $('#data-final').val(), nomeProduto: $('#nome-produto').val(), action:'obterPrevisaoVendas'},
            }).done(function(response) {
                debugger;
                if (!response['erros']) {
                    //montarResultadoConsultaCidade(response);
                    //mostrarResultado();
                    debugger;
                    console.log(response);
                } else {
                    //mostrarErros(response['erros']);
                }
            }
            );
        } else {
            mostrarErros(res['erros']);
        }
    })
);


function validarDadosInformados() {
    var res = [];
    var erros = [];
    var nomeCidade = $('#nome-produto').val().trim();
    var dataConsulta = $('#data-consulta').val().trim();
    
    erros = erros.concat(validarCidadeInformada(nomeCidade)['erros'], validarDataInformada(dataConsulta)['erros']);
    if (erros.length) {
        res['erros'] = erros;
    }

    return res;
}

function validarCidadeInformada(nomeCidade) {
    var res = {'erros': []};
    var format = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    //if (!nomeCidade) {
        //res['erros'].push('Cidade não informada.');
        //return res;
    //}

    if (nomeCidade && !isNaN(nomeCidade)) {
        res['erros'].push('O nome da cidade não pode ser um número.')
    }

    if (format.test(nomeCidade)) {
        res['erros'].push('O nome da cidade deve ser alfa-numérico, contendo no máximo hífens.');
    }

    return res;
}

function validarDataInformada(data) {
    var res = {'erros': []};
    
    if (!data) {
        res['erros'].push('Data não informada.');
        return res;
    } 
    
    data = data.replaceAll('/','-').split('-');

    data.forEach(arrayValue => {
        if (isNaN(arrayValue)) {
            res['erros'].push('Data com formato inválido.')
            return res;
        }
    });

    let ano = parseInt(data[0].length == 4 ? data[0] : data[2]);
    let mes = parseInt(data[1]);
    let dia = parseInt(data[0].length == 2 ? data[0] : data[2]);

    let diasPorMes = [31, anoBissexto(ano) ? 29 : 28 ,31,30,31,30,31,31,30,31,30,31];

    if (dia < 1 || dia > diasPorMes[mes - 1]) {
        res['erros'].push('Data inválida');
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

function montarResultadoConsultaCidade(data) {
    var nomeCidade = $('#nome-produto').val();
    var bandeira = data['bandeira'];
    var casos = data['casosConfirmados'];
    var obitos = data['qtdeObitos'];
    var recuperados = data['qtdeRecuperados'];
    var taxaMortalidade = ((obitos/casos)*100).toFixed(2);
    var taxaRecuperacao = ((recuperados/casos)*100).toFixed(2);
    
    $('#resultado-sucesso').empty();
    $('#resultado-sucesso').append(
        $('<h2>', {'class': 'nomeCidade', 'text': nomeCidade}),
        $('<h3>', {'class': 'bandeira', 'text': bandeira}),
        $('<ul>').append(
            $('<li>', {'text': 'Casos: ' + casos}),
            $('<li>', {'text': 'Óbitos: ' + obitos}),
            $('<li>', {'text': 'Recuperados: ' + recuperados}),
            $('<li>', {'text': 'Taxa de mortalidade: ' + taxaMortalidade + '%'}),
            $('<li>', {'text': 'Taxa de recuperação: ' + taxaRecuperacao + '%'})
        )
    );

}

function montarResultadoDezMais(data) {
    var listaCidadesObj = [];
    var tableCidades = $('<table>', {'class':'table-10 leftText'}).append(
        $('<thead>').append(
            $('<tr>').append(
                $('<th>', {'text':'Cidade'}),
                $('<th>', {'text':'Casos'})
            )
        )
    )
    var tableBody = $('<tbody>');

    $.each(data, function(index, cidade) {
        listaCidadesObj.push(
            $('<tr>').append(
                $('<td>', {'text': cidade['nome']}),
                $('<td>', {'text': cidade['casos']})
            )
        );
    });
    
    $('#resultado-sucesso').empty();
    $('#resultado-sucesso').append(
        tableCidades.append(
            tableBody.append(
                listaCidadesObj
            )
        )
    );
}

function montarResultadoBrasil(data) {
    var casos = data['casos'];
    var mortos = data['mortos'];
    var recuperados = data['recuperados'];

    var taxaMortalidade = ((mortos/casos)*100).toFixed(2);
    var taxaRecuperacao = ((recuperados/casos)*100).toFixed(2);
    
    $('#resultado-sucesso').empty();
    $('#resultado-sucesso').append(
        $('<h2>', {'text': 'Dados do COVID no Brasil'}),
        $('<ul>').append(
            $('<li>', {'text': 'Casos: ' + casos}),
            $('<li>', {'text': 'Mortos: ' + mortos}),
            $('<li>', {'text': 'Recuperados: ' + recuperados}),
            $('<li>', {'text': 'Taxa de mortalidade: ' + taxaMortalidade + '%'}),
            $('<li>', {'text': 'Taxa de recuperação: ' + taxaRecuperacao + '%'})
        )
    );
}

function mostrarResultado() {
    $('#resultado-erros').hide();
    $('#resultado-sucesso').show();
}