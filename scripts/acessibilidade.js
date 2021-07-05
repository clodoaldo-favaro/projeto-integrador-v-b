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
        if (currentFontSize > 8) {
            $('html').css('font-size', currentFontSize - 1);
        }
        return false;
    }
    

    function altoContraste() {
        var color = $('body').css('background-color');
    
        if (color == 'rgb(250, 237, 192)') {
            $('body').css('background-color', '#000');
            
            $('.navegacao, #barra-auxiliar').css({
                'background-color': '#000',
                'color': '#FFF',
                'border': '2px solid white',
            });
            $('#header').css('border', '2px solid white');
            $('#barra-acessibilidade a').css('color', '#FFF');
            $("label[for='anos-anteriores']").css('color', '#FFF');
            $('span').css('color', '#FFF');
            
            $('#nome-produto').removeClass('formPadrao');
            $('#nome-produto').addClass('altoContraste');
            $('#nome-produto').removeClass('placeholderNormal');
            $('#nome-produto').addClass('placeholderAltoContraste');

            $('#data-inicial').removeClass('formPadrao');
            $('#data-inicial').addClass('altoContraste');
            $('#data-inicial').removeClass('placeholderNormal');
            $('#data-inicial').addClass('placeholderAltoContraste');

            $('#data-final').removeClass('formPadrao');
            $('#data-final').addClass('altoContraste');
            $('#data-final').removeClass('placeholderNormal');
            $('#data-final').addClass('placeholderAltoContraste');
            
            $('#botao-consulta').removeClass('buttonPadrao formPadrao');
            $('#botao-consulta').addClass('altoContraste');
            
            $('#resultado-consulta').removeClass('formPadrao');
            $('#resultado-consulta').addClass('altoContraste');
            $('#resultado-consulta').addClass('center');
            $('#barra-auxiliar').removeClass('backgroundNormal');
            $('#barra-auxiliar').addClass('altoContraste');
        } else {
            $('body, #barra-auxiliar').css('background-color', 'rgb(250, 237, 192)');
            $('.navegacao').css({
                'background-color': '#636AAD',
                'border': 'none',
                'color': '#F9F9F9'
            });
            $('#header').css('border', 'none');
            $('#barra-acessibilidade a').css('color', '#322');
            $("label[for='anos-anteriores']").css('color', '#322');
            $('span').css('color', '#322');
            
            $('#nome-produto').removeClass('altoContraste');
            $('#nome-produto').addClass('formPadrao');
            $('#nome-produto').removeClass('placeholderAltoContraste');
            $('#nome-produto').addClass('placeholderNormal');

            $('#data-inicial').removeClass('altoContraste');
            $('#data-inicial').addClass('formPadrao');
            $('#data-inicial').removeClass('placeholderAltoContraste');
            $('#data-inicial').addClass('placeholderNormal');

            $('#data-final').removeClass('altoContraste');
            $('#data-final').addClass('formPadrao');
            $('#data-final').removeClass('placeholderAltoContraste');
            $('#data-final').addClass('placeholderNormal');

            $('#botao-consulta').removeClass('altoContraste');
            $('#botao-consulta').addClass('formPadrao buttonPadrao');
            
            $('#resultado-consulta').removeClass('altoContraste');
            $('#resultado-consulta').addClass('formPadrao');
            $('#barra-auxiliar').removeClass('altoContraste');
            $('#barra-auxiliar').addClass('backgroundNormal');
        }
        return false;
    }
    
    $(".normal").on('click', normalFont);
    $(".aumentar").on('click', biggerFont);
    $(".diminuir").on('click',smallerFont);
    $(".alto-contraste").on('click', altoContraste);

    $(document).on('keydown', function(e) {
        var key = String.fromCharCode(e.keyCode);
        if (e.altKey) {
            e.preventDefault();
            
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

