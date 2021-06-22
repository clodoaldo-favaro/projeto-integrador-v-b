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
    
        if (color == 'rgb(58, 175, 169)') {
            $('body').css('background-color', '#000');
            $('.navegacao').css({
                'background-color': '#000',
                'color': '#FFF',
                'border': '2px solid white',
            });
            $('#header').css('border', '2px solid white');
            $('.acessibilidade a').css('color', '#FFF');
            
            $('#consulta-cidade').removeClass('formPadrao');
            $('#consulta-cidade').addClass('altoContraste');
            $('#consulta-cidade').removeClass('placeholderNormal');
            $('#consulta-cidade').addClass('placeholderAltoContraste');

            $('#data-consulta').removeClass('formPadrao');
            $('#data-consulta').addClass('altoContraste');
            $('#data-consulta').removeClass('placeholderNormal');
            $('#data-consulta').addClass('placeholderAltoContraste');
            
            $('#botao-consulta').removeClass('formPadrao');
            $('#botao-consulta').removeClass('buttonPadrao');
            $('#botao-consulta').addClass('altoContraste');
            $('#botao-consulta-10-mais').removeClass('formPadrao');
            $('#botao-consulta-10-mais').removeClass('buttonPadrao');
            $('#botao-consulta-10-mais').addClass('altoContraste');
            $('#botao-consulta-brasil').removeClass('formPadrao');
            $('#botao-consulta-brasil').removeClass('buttonPadrao');
            $('#botao-consulta-brasil').addClass('altoContraste');

            $('#resultado-consulta').removeClass('formPadrao');
            $('#resultado-consulta').addClass('altoContraste');
            $('#resultado-consulta').addClass('center');
            $('#barra-auxiliar').removeClass('backgroundNormal');
            $('#barra-auxiliar').addClass('altoContraste');
        } else {
            $('body').css('background-color', 'rgb(58, 175, 169)');
            $('.navegacao').css({
                'background-color': '#17252A',
                'border': 'none',
                'color': '#FEFFFF'
            });
            $('#header').css('border', 'none');
            $('.acessibilidade a').css('color', '#17252A');
            
            $('#consulta-cidade').removeClass('altoContraste');
            $('#consulta-cidade').addClass('formPadrao');
            $('#consulta-cidade').removeClass('placeholderAltoContraste');
            $('#consulta-cidade').addClass('placeholderNormal');

            $('#data-consulta').removeClass('altoContraste');
            $('#data-consulta').addClass('formPadrao');
            $('#data-consulta').removeClass('placeholderAltoContraste');
            $('#data-consulta').addClass('placeholderNormal');

            $('#botao-consulta').removeClass('altoContraste');
            $('#botao-consulta').addClass('formPadrao');
            $('#botao-consulta').addClass('buttonPadrao');
            $('#botao-consulta-10-mais').removeClass('altoContraste');
            $('#botao-consulta-10-mais').addClass('formPadrao');
            $('#botao-consulta-10-mais').addClass('buttonPadrao');
            $('#botao-consulta-brasil').removeClass('altoContraste');
            $('#botao-consulta-brasil').addClass('formPadrao');
            $('#botao-consulta-brasil').addClass('buttonPadrao');

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

    this.on('keypress', function(e) {
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

