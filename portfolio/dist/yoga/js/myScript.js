(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
function myCalc(){
    /////////////////
        //calc
        ////////////////
        let persons = document.querySelectorAll('.counter-block-input')[0],
            restDays = document.querySelectorAll('.counter-block-input')[1],
            place = document.getElementById('select'),
            totalValue = document.getElementById('total'),
            personsSum = 0,
            daySum = 0,
            total = 0;
    
            totalValue.innerHTML = 0;//т.к. данные приходят не от пользователя используем innerHTML
    
            persons.addEventListener('change', function(){
                personsSum =+ this.value;
                total = (daySum + personsSum)*4000;
                if(restDays.value == '' || this.value ==''){
                    totalValue.innerHTML = 0;
                }else{
                    totalValue.innerHTML = total;
                }
                console.log(total);
            });
            restDays.addEventListener('change', function(){
                daySum =+ this.value;
                total = (daySum + personsSum)*4000;
                if(persons.value == ''  || this.value ==''){
                    totalValue.innerHTML = 0;
                }else{
                    totalValue.innerHTML = total;
                }
            });
            place.addEventListener('change', function(){
                if(restDays.value == '' || persons.value == ''){
                    totalValue.innerHTML = 0;
                }else{
                    let a = total;
                    totalValue.innerHTML = a * this.options[this.selectedIndex].value;
                }
    
            });
    
}
module.exports = myCalc;
},{}],2:[function(require,module,exports){
function myForm(){
    let tab = document.querySelectorAll('.info-header-tab'),
        info = document.querySelector('.info-header'),
        tabContent = document.querySelectorAll('.info-tabcontent'),
        infoMain = document.querySelector('.info');
       
    
        function hideTabContent(a){//все табы скрываем со страницы кроме первой табы
            for(let i=a; i<tabContent.length; i++){
                tabContent[i].classList.remove('show');
                tabContent[i].classList.add('hide');
                
            }
        }
        hideTabContent(1);
    
        function showTabContent(b){
            if(tabContent[b].classList.contains('hide')){
                tabContent[b].classList.remove('hide');
                tabContent[b].classList.add('show');
               
            }
        }
    
        info.addEventListener('click', function(event){
            let target = event.target;
            if(target && target.classList.contains('info-header-tab')){
                for(let i=0; i<tab.length; i++){
                    if(target == tab[i]){
                        hideTabContent(0);
                        showTabContent(i);
                        break;
                    }
                }
            }
        });
    
    /////////////////////////////////////////
    //Формы
    ////////////////////////////////////////
    let message = {
        loading: "Загрузка...",
        succes: "Спасибо! Скоро мы с вами свяжемся!",
        failure: "Что то пошло не так!"
    };
    
    let form = document.querySelector('.main-form'),
        formContact = document.getElementById('form'),
        inputContact = formContact.getElementsByTagName('input'),
        input = form.getElementsByTagName('input'),
        
        statusMessage = document.createElement('div');
        statusMessage.classList.add('status');//добавили класс к диву
        statusMessage.style.color ="white";
    
    function sendForm(elem, inp){
        elem.addEventListener('submit', function(event){
            event.preventDefault();//отменяем перезагрузку страницы
            elem.appendChild(statusMessage);//добовляем див на стрницу
            
            let formData = new FormData(elem);
             
            let obj = {};
            //помещаем все данные с формы в объект
            formData.forEach(function(value, key){
                obj[key]=value;
            });
    
    
            
            let json = JSON.stringify(obj);
    
            function postData(){
                return new Promise(function(resolve, reject){
                     //создаем запрос
                    let request = new XMLHttpRequest();
                    request.open('POST', 'server.php');//настроили запрос
                    request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');//настроили заголовки
                    request.onreadystatechange =function(){
                        if(request.readyState < 4){
                            resolve(); 
                        }else if(request.readyState === 4 && request.status === 200){
                            resolve(); 
                        }else{
                            reject();
                        }
                    };
                    request.send(json);//отправляем запрос на сервер
                });
     } 
     function clearInput(inp){
     for(let i=0; i<inp.length; i++){//очищаем инпуты
        inp[i].value = "";
    }
    }
    
    postData(formData).then(()=>statusMessage.innerHTML = message.loading)
                    .then(()=>(statusMessage.innerHTML = message.succes))
                    .then(()=>setTimeout(()=>statusMessage.textContent="", 15000))
                    .catch(()=>statusMessage.innerHTML = message.failure)
                    .then(clearInput(inp));
               
        });
    }
    sendForm(form, input);
    sendForm(formContact, inputContact);
     ////////////////////////////
    //Модальное окно
    let more = document.querySelector('.more'),
        overlay = document.querySelector('.overlay'),
        close = document.querySelector('.popup-close');
       
    
        more.addEventListener('click', function(){
            overlay.style.display = 'block';
            this.classList.add('more-splash');
            document.body.style.overflow = 'hidden';//запрещаем прокрутку
        });
    
        close.addEventListener('click', function(){//Закрываем окно
            overlay.style.display = 'none';
            more.classList.remove('more-splash');
            document.body.style.overflow = '';
            statusMessage.textContent = "";
        });
    ///////////////////////////////////   
    //Узнать подробнее- модальное окно
    //Моя первая функция!!! Работате!!! 
    function showDescription(){
       infoMain.addEventListener('click', function(event){
            if(event.target && event.target.matches('div.description-btn')){
       
                overlay.style.display = 'block';
                event.target.classList.add('more-splash');
                document.body.style.overflow = 'hidden';//запрещаем прокрутку
       
    }
    });
    }
    showDescription();
}
module.exports = myForm;
},{}],3:[function(require,module,exports){
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
},{"./calc":1,"./forms":2,"./slider":4,"./timer":5}],4:[function(require,module,exports){
function mySlider(){
    /////////////////////////////////
    //Слайдер
    /////////////////////////////////
    let slideIndex = 1,//параметр текущего слайда
        slides = document.querySelectorAll('.slider-item'),
        prev = document.querySelector('.prev'),
        next = document.querySelector('.next'),
        dotsWrap = document.querySelector('.slider-dots'),
        dots = document.querySelectorAll('.dot');
    showSlides(slideIndex);
        function showSlides(n){
            if(n > slides.length){
                slideIndex = 1;
            }
            if(n < 1){
                slideIndex = slides.length;
            }
    
            slides.forEach((item) => item.style.display = 'none');
            // for(let i=0; i<slides.length;i++){
            //     slides[i].style.display='none';
            // }
            dots.forEach((item) => item.classList.remove('dot-active'));
            slides[slideIndex - 1].style.display = 'block';
            dots[slideIndex - 1].classList.add('dot-active');
        }       
        function plusSlides(n){
            showSlides(slideIndex += n);
        }
        function currentSlides(n){
            showSlides(slideIndex = n);
        }
        prev.addEventListener('click', function(){
            plusSlides(-1);
        });
        next.addEventListener('click', function(){
            plusSlides(1);
        });
        dotsWrap.addEventListener('click', function(event){
            for(let i=0; i<dots.length + 1; i++){
                if(event.target.classList.contains('dot') && event.target == dots[i-1]){
                    currentSlides(i);
                }
            }
        });
}
module.exports = mySlider;
},{}],5:[function(require,module,exports){
function myTimer(){
       //Пишем таймер
       let deadLine = "2021-03-01";//Конец события
      
       function getTaimeRemaining(endtime){
       
           let t = Date.parse(endtime) - Date.parse(new Date()),
           seconds = Math.floor((t/1000) % 60),
           minuts = Math.floor((t/1000/60) % 60),
           hours = Math.floor((t/(1000*60*60))),
           //days = Math.floor((t/1000/60/60) % 24);
           days =  Math.floor((t/(1000*60*60*24)));
       
           return{
               'total': t,
               'hours': hours,
               'minuts': minuts,
               'seconds': seconds
           };
       }
       
       function setClock(id, endtime){
           
           let timer = document.getElementById(id),
               hours = timer.querySelector('.hours'),
               minutes = timer.querySelector('.minutes'),
               seconds = timer.querySelector('.seconds'),
               timeInterval = setInterval(upDateClock, 1000);//обновляем таймер каждую секунду
       
               function upDateClock(){
                   let t = getTaimeRemaining(endtime);
                  
                   function addZero(num){
                       if(num<=9){
                           return '0'+ num;
                       }else{
                           return num;
                       }
                   }
       
                   hours.textContent = addZero(t.hours);
                   minutes.textContent = addZero(t.minuts);
                   seconds.textContent = addZero(t.seconds);
       
                   if(t.total <= 0){
                       clearInterval(timeInterval);
                       hours.textContent = "00";
                       minutes.textContent = "00";
                       seconds.textContent = "00";
       
                   }
               }
       }
       setClock('timer', deadLine);
}
module.exports = myTimer;
},{}]},{},[3]);
