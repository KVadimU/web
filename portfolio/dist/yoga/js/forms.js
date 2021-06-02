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