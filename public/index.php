<?php
    require_once('../backend/funcoes.php');
?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Consulta COVID-19</title>
    <link rel="icon" href="favicon.ico" type="image/x-icon" />
    <link rel="stylesheet" href="../bootstrap-4.5.3-dist/css/bootstrap.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet">
    <link href="../fontawesome-free-5.15.1-web/css/all.css" rel="stylesheet">
    <link rel="stylesheet" href="../styles/reset.css">
    <link rel="stylesheet" href="../styles/styles.css">
</head>
<body>
    <div id="header" class="container-fluid"></div>
    

    <div class="d-flex body-container">
        <div class="d-flex flex-column side-bar">
            <form>
                <input class="d-inline-flex form-control placeholderNormal formPadrao" type="text" id="nome-produto" name="nome-produto" placeholder="Digite o nome do produto (opcional)">    
                <div class="d-flex justify-content-between align-items-center data-wrapper">
                    <input class="d-inline-flex form-control formPadrao" type="date" name="data-inicial" id="data-inicial">
                    <span>até</span>
                    <input class="d-inline-flex form-control formPadrao" type="date" name="data-final" id="data-final">
                </div>
                <div class="d-flex justify-content-start align-items-center">
                    <input type="checkbox" name="anos-anteriores" id="anos-anteriores">
                    <label for="anos-anteriores">Mostrar totais de anos anteriores</label>
                </div>
                <div class="d-flex justify-content-start">
                    <button type="button" id="botao-consulta" class="buttonPadrao formPadrao">CONSULTAR</button>
                </div>
            </form>
        </div>
            
        <div class="resultado-container">
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
    </div>
    
    <div id="myModal" class="modal">
        <div class="modalContent">
            <span class="close-canvas"> &times; </span>
            <canvas id="myChart"></canvas>
        </div>
    </div>
    


<!-- Modal para o gráfico -->
<div class="modal fade" id="modalChart" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Previsão de vendas</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <canvas id="canvas" width="568" height="300"></canvas>
        <canvas id="canvas_2" width="568" height="300"></canvas>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
      </div>
    </div>
  </div>
</div>
    
    <script src="../scripts/jquery.js"></script>
    <script src="../bootstrap-4.5.3-dist/js/bootstrap.bundle.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.4.0/chart.min.js" integrity="sha512-JxJpoAvmomz0MbIgw9mx+zZJLEvC6hIgQ6NcpFhVmbK1Uh5WynnRTTSGv3BTZMNBpPbocmdSJfldgV5lVnPtIw==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="../scripts/consulta.js"></script>
    <script src="../scripts/acessibilidade.js"></script>
    <script src="../scripts/header.js"></script>
</body>
</html>