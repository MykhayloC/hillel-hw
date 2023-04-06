'use strict';

const inputElement = $('input');
const outputStyle = {'padding':'4px', 'margin':'2px', 'color':'white', 'background-color':'indigo', 'border':'1px solid red', 'border-radius':'10px', 'font-size':'large'};

$('button').click(function () {
    const inputValue = inputElement.val();
    const checkValue = inputValue.trim();
    (checkValue) ? $('<span></span>').css(outputStyle).text(inputValue).appendTo('.output-container').hide().fadeIn(1500) : alert("Please, input something!");
    inputElement.val('');
})  

$('.output-container').on('click', 'span', function () {
    $(this).fadeOut(1500);
    setTimeout(() => $(this).remove(), 2000);
})

