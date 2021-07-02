<?php

require_once('conexao.php');

if (isset($_GET['action'])) {
    if ($_GET['action'] == 'obterPrevisaoVendas') {
        obterPrevisaoVendas();
    }
}

function obterPrevisaoVendas() {
    $nomeProduto = trim($_GET['nomeProduto']);
    $dataInicial = date("Y-m-d", strtotime($_GET['dataInicial']));    
    $dataFinal = date("Y-m-d", strtotime($_GET['dataFinal']));
    
    $whereProduto = $nomeProduto ? (" AND p.descricao  LIKE CONCAT ('%', :nomeProduto,  '%')") : "";
    
    $PDO = conecta_bd();
    $sqlVendas = "(SELECT p.id as idProduto, p.descricao, p.unidade, YEAR(v.data) as ano,  SUM(vi.quantidade) as total, 'S' as tipo
        FROM vendaitem vi 
            JOIN venda v ON vi.idVenda = v.id 
            JOIN produto p ON vi.idProduto = p.id 
            WHERE v.data BETWEEN :dataInicial AND :dataFinal " . $whereProduto .
            " GROUP BY p.id, p.descricao, p.unidade, ano, tipo
            ORDER BY p.descricao)";

        $sqlCompras = "(SELECT p.id as idProduto, p.descricao, p.unidade, YEAR(pc.data) as ano,  SUM(pc.quantidade) as total, 'E' as tipo
            FROM pedidocompra pc
                JOIN produto p ON pc.idProduto = p.id 
                WHERE pc.data BETWEEN :dataInicial AND :dataFinal " . $whereProduto .
                " GROUP BY p.id, p.descricao, p.unidade, ano, tipo
                ORDER BY p.descricao)";
    
    $sql = $sqlVendas . ' UNION ALL ' . $sqlCompras;
    $stmt = $PDO->prepare($sql);
    $stmt->bindParam(':dataInicial', $dataInicial);
    $stmt->bindParam(':dataFinal', $dataFinal);
    if ($nomeProduto) {
        $stmt->bindParam(':nomeProduto', $nomeProduto);
    }
    $stmt->execute();
    $retorno = [];
    while ($row = $stmt->fetch()) {
        $field = $row['tipo'] == 'S' ? 'vendasPorAno' : 'comprasPorAno';
        if (!$retorno[$row['idProduto']]) {
            $retorno[$row['idProduto']] = [
                'idProduto' => $row['idProduto'],
                'descricao' => $row['descricao'],
                'unidade' => $row['unidade'],
                $field => [$row['ano'] => $row['totalVendas']]
            ];
        } else {
            $retorno[$row['idProduto']][$field][$row['ano']] = $row['totalVendas'];
        }
        
    }

    //Converte para array comum
    $retornoTemp = [];
    $i = 0;
    foreach ($retorno as $key => $value) {
        $retornoTemp[] = $value;
    }
    
    $retorno = $retornoTemp;
    
    if (empty($retorno)) {
        $retorno = ['erros' => ['Não foram localizados registros para a cidade e período informados']];
    }
    $retorno = json_encode($retorno);
    header('Content-Type: application/json');
    echo $retorno;
    
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

function popularDadosCompras() {
    
    
    try {
        $pdo = conecta_bd();
    } catch (PDOException $e) {
        header('HTTP/1.1 500 Internal Server');
        header('Content-Type: application/json');
        die(json_encode(['error' => $e->getMessage()]));
    }

    $sql = "SELECT YEAR(v.data) as ano, MONTH(v.data) as mes, vi.idProduto, SUM(vi.quantidade) as quantidade 
            FROM
                vendaitem vi
            JOIN
                venda v ON vi.idVenda = v.id
            JOIN 
                produto p on vi.idProduto = p.id
            GROUP BY ano , mes, vi.idProduto";
       
    $stmt = $pdo->prepare($sql);
    $stmt->execute();
    $vendas = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $data_fields = ['idProduto', 'quantidade', 'data'];
    $fieldsQty = sizeof($data_fields);
    $question_marks = [];
    $insert_values = [];
    
    foreach ($vendas as $key => $venda) { 
        $quantidade = $venda['quantidade'] + rand(1, 3500);
        $data = $venda['ano'] . '-' . substr('0' . $venda['mes'],-2, 2) . '-01';
        
        $insert_values = array_merge($insert_values, [$venda['idProduto'], $quantidade, $data]);
        $question_marks[] = '('  . placeholders('?', $fieldsQty) . ')';
    }

    $sql = "INSERT INTO pedidocompra (" . implode(",", $data_fields) . ") VALUES " . implode(',', $question_marks);
    $pdo->beginTransaction(); 
    $stmt = $pdo->prepare($sql);
    $stmt->execute($insert_values);
    $error = $stmt->errorInfo();
    $pdo->commit();
    
    
    exit;
}
?>