function enviarMensagem() {
    alert('Mensagem enviada com sucesso!');
    $('#mensagem, #email, #nome').val(''); 
    $("#receber-alertas").prop("checked", false); 
}