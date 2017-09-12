$(document).ready(main);
function main(){
    $('.relevant p').hide();
    
    var $element = $('.relevant').children();
    var count = $element.length;
    var colors = ['blue', 'red', 'green', 'cyan', 'purple', 'brown', 'orange'];

    for(var i = 0; i < count; i++){
        $element[i].style.color=colors[i];
    }

    $('p:nth-of-type('+1+')').fadeIn(1000, function(){
        $('p:nth-of-type('+2+')').fadeIn(1000, function(){
            $('p:nth-of-type('+3+')').fadeIn(1000, function(){
                $('p:nth-of-type('+4+')').fadeIn(1000, function(){
                    $('p:nth-of-type('+5+')').fadeIn(1000, function(){
                        $('p:nth-of-type('+6+')').fadeIn(1000, function(){
                            $('p:nth-of-type('+7+')').fadeIn(1000);
                        });
                    });
                });
            });
        });
    });
}