<?php

require_once('conexao.php');

if (isset($_GET['action'])) {
    //popularDados();
    obterPrevisaoVendas();
}

function obterPrevisaoVendas() {
    $nomeProduto = trim($_GET['nomeProduto']);
    $dataInicial = date("Y-m-d", strtotime($_GET['dataInicial']));    
    $dataFinal = date("Y-m-d", strtotime($_GET['dataFinal']));
    
    $whereProduto = $nomeProduto ? (" AND p.descricao  LIKE CONCAT ('%', :nomeProduto,  '%')") : "";
    
    $PDO = conecta_bd();
    $sql = "SELECT p.id as idProduto, p.descricao, p.unidade, YEAR(v.data) as ano,  SUM(vi.quantidade) as totalVendas
        FROM vendaitem vi 
            JOIN venda v ON vi.idVenda = v.id 
            JOIN produto p ON vi.idProduto = p.id 
            WHERE v.data BETWEEN :dataInicial AND :dataFinal " . $whereProduto .
            " GROUP BY p.id, p.descricao, p.unidade, YEAR(v.data)
            ORDER BY p.descricao";
    
    
    $stmt = $PDO->prepare($sql);
    $stmt->bindParam(':dataInicial', $dataInicial);
    $stmt->bindParam(':dataFinal', $dataFinal);
    if ($nomeProduto) {
        $stmt->bindParam(':nomeProduto', $nomeProduto);
    }
    $stmt->execute();
    $retorno = [];
    while ($row = $stmt->fetch()) {
        if (!$retorno[$row['idProduto']]) {
            $retorno[$row['idProduto']] = [
                'idProduto' => $row['idProduto'],
                'descricao' => $row['descricao'],
                'unidade' => $row['unidade'],
                'vendasPorAno' => [$row['ano'] => $row['totalVendas']]
            ];
        } else {
            $retorno[$row['idProduto']]['vendasPorAno'][$row['ano']] = $row['totalVendas'];
        }
        
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