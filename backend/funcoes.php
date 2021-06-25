<?php

require_once('conexao.php');

if (isset($_GET['action'])) {
    //obterPrevisaoVendas();
    popularDados();
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

function placeholders($text, $count=0, $separator=","){
    $result = [];
    if($count > 0){
        for($x=0; $x<$count; $x++){
            $result[] = $text;
        }
    }

    return implode($separator, $result);
}


function popularDados() {
    $produtosUnidade = [
        'kg',
        'un',
        'kg',
        'kg',
        'kg',
        'un',
        'kg'
    ];
    
    try {
        $pdo = conecta_bd();
    } catch (PDOException $e) {
        header('HTTP/1.1 500 Internal Server');
        header('Content-Type: application/json');
        die(json_encode(['error' => $e->getMessage()]));
    }
    
    $data_fields = ['idVenda', 'idProduto', 'quantidade'];
    $fieldsQty = sizeof($data_fields);
    $question_marks = [];
    $insert_values = [];
    
    for ($i=1; $i <= 10000; $i++) { 
        $idProduto = rand(1, 7);
        $quantidade = rand(1, 500);
        if ($produtosUnidade[$idProduto - 1] == 'kg') {
            $quantidade = (float) ($quantidade . '.' . rand(0, 99));
        }
        $insert_values = array_merge($insert_values, [$i, $idProduto, $quantidade]);
        $question_marks[] = '('  . placeholders('?', $fieldsQty) . ')';
    }

    $sql = "INSERT INTO vendaitem (" . implode(",", $data_fields) . ") VALUES " . implode(',', $question_marks);
    $pdo->beginTransaction(); 
    $stmt = $pdo->prepare($sql);
    $stmt->execute($insert_values);
    $error = $stmt->errorInfo();
    $pdo->commit();
    
    
    header('Content-Type: application/json');
    $retorno = json_encode(['msg' => 'ok']);
    echo $retorno;
    exit;
}
?>