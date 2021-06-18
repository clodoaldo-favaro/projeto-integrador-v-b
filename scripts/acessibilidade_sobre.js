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
    

    $(".alto-contraste").click(function() {
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
            $('.container-sobre').removeClass('formPadrao');
            $('.container-sobre').addClass('altoContraste');
            $('#barra-auxiliar').removeClass('backgroundVerde');
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
            
            $('.container-sobre').addClass('formPadrao');
            $('.container-sobre').removeClass('altoContraste');
            $('#barra-auxiliar').removeClass('altoContraste');
            $('#barra-auxiliar').addClass('backgroundVerde');
        }
        return false;
    });
  
});

