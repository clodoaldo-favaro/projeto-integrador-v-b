var header_content = `
<div id="barra-auxiliar" class="container-fluid fixed-top backgroundVerde">
<div id="barra-acessibilidade" class="d-flex justify-content-end">
    <ul class="list-group list-group-horizontal bg-transparent">
        <li class="idiminuir list-group-item bg-transparent border-0">
            <a class="diminuir" href="#" accesskey="6" title="Diminuir fonte">Diminuir fonte [6]</a>
        </li>
        <li class="inormal list-group-item bg-transparent border-0">
            <a class="normal" href="#" accesskey="7" title="Tamanho normal">Tamanho normal [7]</a>
        </li>
        <li class="iaumentar list-group-item bg-transparent border-0">
            <a class="aumentar" href="#" accesskey="8" title="Aumentar fonte">Aumentar fonte [8]</a>
        </li>
        <li class="ialto-contraste list-group-item bg-transparent border-0">
            <a class="alto-contraste" href="#" accesskey="9" title="Alto contraste">Alto contraste[9]</a>
        </li>
    </ul>
</div>

</div>
<nav class="navbar navbar-expand-md fixed-top navegacao">
<a class="navbar-brand resizable" id="consulta-covid" href="#">CONSULTA COVID-19</a>
<div class="d-flex ml-auto pages">
    <div class="p-2"><a href="index.php">INICIO</a></div>
    <div class="p-2"><a href="sobre.php">SOBRE</a></div>
    <div class="p-2"><a href="contato.php">CONTATO</a></div>
</div>
</nav>`; 

var header_element = document.getElementById('header');

header_element.innerHTML = header_content;

