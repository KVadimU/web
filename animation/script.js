'use strict';
window.addEventListener('DOMContentLoaded', ()=>{
    let canvas = document.getElementById('canvas'),
        context = canvas.getContext('2d');
        //рисуем контур
        context.strokeStyle = 'red';
        context.lineWidth = '0.4';
        context.lineJoin = 'round';
        context.fillStyle = 'red';
        context.beginPath();
        context.moveTo(0, 500);
        context.lineTo(0, 480);//линия
        context.lineTo(1100, 480);
        
        context.lineTo(1100, 500);
        context.lineTo(0, 500);
        context.closePath();
        context.stroke();
        context.fill();
        //context.moveTo(275, 480);
        context.beginPath();//начинаем фрагмент
        context.moveTo(275, 480);
        context.quadraticCurveTo(550, 400, 825, 480);
        context.closePath();
        context.stroke();//рисуем
        context.fill();//закрашиваем

            canvas.addEventListener('click', function(event){
                let elemLeft = canvas.offsetLeft,
                    elemTop = canvas.offsetTop,
                    //context = elem.getContext('2d'),
                    elements = [];

// Add event listener for `click` events.
                  //  elem.addEventListener('click', function(event) {
    let x = event.pageX - elemLeft,
        y = event.pageY - elemTop;

    // Collision detection between clicked offset and element.
    elements.forEach(function(element) {
        if (y > element.top && y < element.top + element.height 
            && x > element.left && x < element.left + element.width) {
            alert('clicked an element');
        }
    });

//}, false);

// Add element.
elements.push({
    colour: '#05EFFF',
    width: 150,
    height: 100,
    top: 20,
    left: 15
});

// Render elements.
// elements.forEach(function(element){
//     context.fillStyle = element.colour;
//     context.fillRect(element.left, element.top, element.width, element.height);
// });​
                
                //context.scale(1.5, 1.3);
             });

});