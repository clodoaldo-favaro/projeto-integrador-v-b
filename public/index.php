<?php
    require_once('../backend/funcoes.php');
?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Consulta COVID-19</title>
    <link rel="stylesheet" href="../bootstrap-4.5.3-dist/css/bootstrap.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet">
    <link href="../fontawesome-free-5.15.1-web/css/all.css" rel="stylesheet">
    <link rel="stylesheet" href="../styles/reset.css">
    <link rel="stylesheet" href="../styles/styles.css">
</head>
<body>
    <div id="header" class="container-fluid"></div>
    

    <div class="container body-container">
        <form action="" method="get">
            <div class="col-4">
                <div class="row justify-content-start">
                    <input class="d-inline-flex form-control placeholderNormal consultaCidade formPadrao" type="text" id="consulta-cidade" name="consulta-cidade" placeholder="Digite o nome do produto (opcional)">    
                </div>
            </div>
            <div class="col-8 justify-concent-center">
                <div name="resultado-consulta" id="resultado-consulta" class="form-control resultadoConsulta centerText formPadrao"> 
                    <div id="resultado-sucesso">
                        
                    </div>
                    <div id="resultado-erros" style="display: none;">
                        <h2 class="bold">Não foi possível realizar a consulta</h2>
                        <br>
                        <ul></ul>
                    </div>
                </div>
            </div>
            <div class="row justify-content-center">
                <input class="d-inline-flex form-control placeholderNormal consultaCidade formPadrao" type="text" id="consulta-cidade" name="consulta-cidade" placeholder="Digite o nome do produto (opcional)">
                <input class="d-inline-flex form-control formPadrao" type="date" name="data-consulta" id="data-consulta" style="display: inline-block;">
            </div>
            <div class="row justify-content-center button-container">
                <button type="button" id="botao-consulta" class="buttonPadrao formPadrao">CONSULTAR</button>
            </div>
            <div class="row">
                <div class="col-12 justify-content-center resultado-container">
                    
                </div>
            </div>
        </form>
    </div>
    
    <script src="../scripts/jquery.js"></script>
    <script src="../bootstrap-4.5.3-dist/js/bootstrap.bundle.min.js"></script>
    <script src="../scripts/consulta.js"></script>
    <script src="../scripts/acessibilidade.js"></script>
    <script src="../scripts/changeFontSize.js"></script>
    <script src="../scripts/header.js"></script>
</body>
</html>