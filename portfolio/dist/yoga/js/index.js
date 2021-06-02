require('es6-promise').polyfill();
window.addEventListener('DOMContentLoaded', function(){ //Пока не загрузиться DOM дерево, срабатывает событие когда загрузилась вся структура
    'use strict';//переводим в строгий режим
    let  myTimer = require('./timer'),
         mySlider = require('./slider'),
         myCalc = require('./calc'),
         myForm = require('./forms');
        
        myTimer();
        mySlider();
        myCalc();
        myForm();
    });