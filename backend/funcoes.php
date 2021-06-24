<?php

require_once('conexao.php');

if (isset($_GET['action'])) {
    obterPrevisaoVendas();
}

function teste() {
    echo 'oi';
}

function obterPrevisaoVendas() {
    //$nomeProduto = $_GET['nomeProduto'];
    //echo $nomeProduto;
    /*$nomeCidade = $_GET['nomeCidade'];
    $dataConsulta = $_POST['dataConsulta'];    
    */   
    $PDO = conecta_bd();
    /*$sql = "SELECT id, descricao, unidade
            FROM produto as p
            WHERE a.idCidade in (SELECT id 
                                FROM cidades 
                                WHERE nome = :nomeCidade)
            and a.data= :dataConsulta";*/

    $sql = "SELECT * from produto where id > 0";
    $stmt = $PDO->prepare($sql);
    /*$stmt->bindParam(':nomeCidade', $nomeCidade);
    $stmt->bindParam(':dataConsulta', $dataConsulta);*/
    $stmt->execute();
    $retorno = [];
    while ($row = $stmt->fetch()) {
        $retorno[] = [
            'id' => $row['id'],
            'descricao' => $row['descricao'],
            'unidade' => $row['unidade'],
        ];
    }
    
        
    if (empty($retorno)) {
        $retorno = ['erros' => ['Não foram localizados registros para a cidade e período informados']];
    }
        
    header('Content-Type: application/json');
    echo json_encode($retorno);
    
    exit;
}

function consultaDezMais() {       
   $dataConsulta = $_POST['dataConsulta'];
      
   $PDO = conecta_bd();
   $sql = "SELECT DISTINCT(casos) casos, recuperados, mortos, bandeiraAtual, 
	            (SELECT c.nome 
                  FROM cidades c 
                  WHERE c.id = a.idCidade) cidade
            FROM casos a
            WHERE data=:dataConsulta 
            ORDER BY a.casos DESC
            LIMIT 10";

    $stmt = $PDO->prepare($sql);
    $stmt->bindParam(':dataConsulta', $dataConsulta);
    $stmt->execute();
    $cidades= [];

    while ($resultado = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $cidades []= 
            [
            'nome' => $resultado['cidade'], 
            'casos' => (int)$resultado['casos'], 
            'recuperados' => (int)$resultado['recuperados'], 
            'mortos' => (int)$resultado['mortos'], 
            'bandeiraAtual' => $resultado['bandeiraAtual']
            ];
    }
    
    $retorno = [];
    if (empty($cidades)) {
        $retorno['erros'] = ['Não foram localizados registros para o período informado.'];
    } else {
        $retorno = $cidades;
    }

    header('Content-Type: application/json');
    echo json_encode($retorno);
    exit;
}

function consultaBrasil() {
    $res = [
        'casos' => 13900000,
        'recuperados' => 12300000,
        'mortos' => 373000
    ];
    
    header('Content-Type: application/json');
    echo json_encode($res);
    exit;
}
?>