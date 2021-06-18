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
    

    <div class="container body-container container-contato container-contato-padrao col-lg-4 col-md-6">
        <form action="" method="post">
            <div class="row justify-content-md-center">
                <div class="col-12 mb10">
                    <input class="form-control placeholderNormal formPadrao" type="text" id="nome" name="nome" required placeholder="Nome">
                </div>
            </div>
            
            <div class="row justify-content-md-center">
                <div class="col-12 mb10">
                    <input class="form-control placeholderNormal formPadrao" type="email" id="email" name="email" required placeholder="Email">
                </div>
            </div>

            <div class="row justify-content-md-center">
                <div class="col-12 mb10">
                    <textarea name="mensagem" id="mensagem" class="form-control placeholderNormal formPadrao" rows="5" placeholder="Mensagem"></textarea>
                </div>
            </div>

            <div class="row">
                <div class="col-12 mb10">
                    <input type="checkbox" name="receber-alertas" id="receber-alertas">
                    <label for="receber-alertas"><span class="bold">Deseja receber alertas de mudança de bandeira?</span></label>
                </div>
            </div>

            <div class="row justify-content-md-end button-container">
                <div class="col-12 mb10">
                    <button type="button" id="botao-enviar-mensagem" class="buttonPadrao formPadrao float-right" onclick="enviarMensagem()">ENVIAR</button>
                </div>
            </div>
        </form>
    </div>
    
    <script src="../scripts/jquery.js"></script>
    <script src="../bootstrap-4.5.3-dist/js/bootstrap.bundle.min.js"></script>
    <script src="../scripts/contato.js"></script>
    <script src="../scripts/acessibilidade_contato.js"></script>
    <script src="../scripts/header.js"></script>
</body>
</html>