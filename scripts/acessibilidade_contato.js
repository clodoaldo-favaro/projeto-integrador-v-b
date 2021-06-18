$(document).ready(function() {
    var defaultFontSize  =$('html').css('font-size');
    
    function normalFont() {
        $('html').css({'font-size': defaultFontSize});
    }

    function biggerFont() {
        var currentFontSize = parseInt($('html').css('font-size'));
        if (currentFontSize < 16) {
            $('html').css('font-size', currentFontSize + 1);
        }
        return false;
    }

    function smallerFont() {
        var currentFontSize = parseInt($('html').css('font-size'));
        if (currentFontSize < 16) {
            $('html').css('font-size', currentFontSize - 1);
        }
        return false;
    }

    function altoContraste() {
        var color = $('body').css('background-color');
    
        if (color == 'rgb(58, 175, 169)') {
            $('body').css('background-color', '#000');
            $('.navegacao').css({
                'background-color': '#000',
                'color': '#FFF',
                'border': '2px solid white',
            });
            $('#header').css('border', '2px solid white');
            $('.acessibilidade a').css('color', '#FFF');
            $('.container-contato').removeClass('formPadrao');
            $('.container-contato').addClass('altoContraste');
            $('#barra-auxiliar').removeClass('backgroundVerde');
            $('#barra-auxiliar').addClass('altoContraste');
            
            $('#nome').removeClass('formPadrao');
            $('#nome').addClass('altoContraste');
            $('#nome').removeClass('placeholderNormal');
            $('#nome').addClass('placeholderAltoContraste');

            $('#email').removeClass('formPadrao');
            $('#email').addClass('altoContraste');
            $('#email').removeClass('placeholderNormal');
            $('#email').addClass('placeholderAltoContraste');

            $('#mensagem').removeClass('formPadrao');
            $('#mensagem').addClass('altoContraste');
            $('#mensagem').addClass('center');

            $('#botao-enviar-mensagem').removeClass('formPadrao');
            $('#botao-enviar-mensagem').removeClass('buttonPadrao');
            $('#botao-enviar-mensagem').addClass('altoContraste');
            
        } else {
            $('body').css('background-color', 'rgb(58, 175, 169)');
            $('.navegacao').css({
                'background-color': '#17252A',
                'border': 'none',
                'color': '#FEFFFF'
            });
            $('#header').css('border', 'none');
            $('.acessibilidade a').css('color', '#17252A');
            
            $('.container-contato').addClass('formPadrao');
            $('.container-contato').removeClass('altoContraste');
            $('#barra-auxiliar').removeClass('altoContraste');
            $('#barra-auxiliar').addClass('backgroundVerde');

            $('#nome').addClass('formPadrao');
            $('#nome').removeClass('altoContraste');
            $('#nome').addClass('placeholderNormal');
            $('#nome').removeClass('placeholderAltoContraste');

            $('#email').addClass('formPadrao');
            $('#email').removeClass('altoContraste');
            $('#email').addClass('placeholderNormal');
            $('#email').removeClass('placeholderAltoContraste');

            $('#mensagem').addClass('formPadrao');
            $('#mensagem').removeClass('altoContraste');
            $('#mensagem').removeClass('center');

            $('#botao-enviar-mensagem').addClass('formPadrao');
            $('#botao-enviar-mensagem').addClass('buttonPadrao');
            $('#botao-enviar-mensagem').removeClass('altoContraste');
        }
        return false;
    }
    
    $(".normal").on('click', normalFont);
    $(".aumentar").on('click', biggerFont);
    $(".diminuir").on('click', smallerFont);
    $(".alto-contraste").click(altoContraste);

    this.bind('keypress', function(e) {
        debugger;
        if (e.altKey) {
            var key = String.fromCharCode(e.which);
            switch (key) {
                case 6: 
                    smallerFont();
                    break;
                case 7:
                    normalFont();
                    break;
                case 8:
                    biggerFont();
                    break;
                case 9:
                    altoContraste();
                    break;
                default:
                    break;
            }
        }
    }
    );
  
});

