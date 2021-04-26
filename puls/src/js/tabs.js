'use strict';
window.addEventListener('DOMContentLoaded', function(){
    let tabs = document.querySelector('.catalog__tabs'),
        tab = document.querySelectorAll('.catalog__tab'),
        catalog = document.querySelectorAll('.catalog__content'),
        link = document.querySelectorAll('.catalog-item__link'),
        list = document.querySelectorAll('.catalog-item__list');
       
        tabs.addEventListener('click', function(event){
            let li = event.target.closest('li'),//closset()-возвращает ближайшего предка
                tabIndex;
            if(li && !li.classList.contains('catalog__tab_active')){
            for(tabIndex=0; tabIndex<tab.length; tabIndex++){
                tab[tabIndex].classList.remove('catalog__tab_active');
                if(li == tab[tabIndex]){
                    li.classList.add('catalog__tab_active');
                    catalog.forEach(function(item, i, catalog){
                        item.classList.remove('catalog__content_active');
                       if(tabIndex==i){
                           item.classList.add('catalog__content_active');
                       }
                    });
                }
             }
            }
            
        });
        link.forEach(function(item, i, link){
            item.addEventListener('click', function(event){
               event.preventDefault();//Отменяем стандартный переход по ссылке
               this.parentNode.classList.remove('catalog-item__content_active');
               list.forEach(function(item, y, link){
                    if(i == y){
                        item.classList.add('catalog-item__list_active');
                       // console.log(item.lastElementChild);
                        item.lastElementChild.addEventListener('click',function(event){
                            event.preventDefault();
                            item.classList.remove('catalog-item__list_active');
                            item.previousElementSibling.classList.add('catalog-item__content_active'); 
                        });
                    }
               });
        });
    });  
    //MODAL
    let buttonConsultation = document.querySelectorAll('[data-modal = "consultation"]'),
        overlay = document.querySelector('.overlay'),
        modalConsultatin = document.getElementById('consultation');

        function overlayShow(){
            let str = getComputedStyle(overlay).backgroundColor,
            alphaStart = 0.00,
            regexp = /rgba?\((\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,(\s*\d+[\.\d+]*)*\)/g.exec(str);//строку в массив
            //found = str.match(regexp);
            let timer = setInterval(fadein, 15);

        function fadein(){    
           if(parseFloat(alphaStart).toFixed(10) == parseFloat(regexp[4])){
               clearInterval(timer);
           }else{
               alphaStart = alphaStart + 0.01;
               overlay.style.backgroundColor = "rgba("+[regexp[1],regexp[2],regexp[3], alphaStart]+")"; 
           }
        }
            overlay.style.display = 'block';
        }
        
        buttonConsultation.forEach(function(item, i, buttonConsultation){
            item.addEventListener('click', function(event){
        
                overlayShow();
                modalConsultatin.style.display = 'block';
                document.body.style.position = 'fixed';
            });
            modalConsultatin.firstElementChild.addEventListener('click', function(){
                modalConsultatin.style.display = 'none';
                overlay.style.display = 'none';
                document.body.style.position = '';
               
            });
        });
        //modal
        //----------------------------------------------------
        //catalog
        let buttonMini = document.querySelectorAll('.button_mini'),
            modalOrder = document.getElementById('order');
        buttonMini.forEach(function(item, i, buttonMini){
            item.addEventListener('click', function(event){
                // target = event.target;
                let catalogItemSubtitle = item.parentNode.parentNode.firstElementChild.firstElementChild.firstElementChild.nextElementSibling.textContent;
                    modalOrder.firstElementChild.nextElementSibling.nextElementSibling.textContent = catalogItemSubtitle;
                overlayShow();
                modalOrder.style.display = 'block';
            });
            modalOrder.firstElementChild.addEventListener('click',function(){
                modalOrder.style.display = 'none';
                overlay.style.display = 'none';
                
            });
        });
        //validationForm
        let formsConsultation = document.querySelectorAll('.feed-form')[1],
            //regPhone = /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
            regPhone2 = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){6,14}(\s*)?$/;

            formsConsultation.addEventListener('submit', formSend);

            function formSend(e){
                e.preventDefault();
                let error = formValidate(formsConsultation);

            }
        
            function formValidate(formsConsultation){
                let error = 0,
                    formInp = formsConsultation.querySelectorAll('input');
                 for (let i = 0; i < formInp.length; i++) {
                     const input = formInp[i];
                     console.log(input);
                     removeError(input);
                     if(i == 2){   //проверяем email
                         console.log(input.value);
                         if(testEmail(input)){
                             addError(input);
                             error++;
                         }

                     }else if(input.value === ''){
                         addError(input);
                         error++;

                     }else if(i == 1 && !regPhone2.test(input.value)){ //проверяем телефон
                        addError(input);
                        error++;
                     }
                     
                 }
                 return error;
            }
            function addError(input){
                input.nextElementSibling.style.display = 'inline-block';
                input.nextElementSibling.textContent = 'Поле не заполнено!';
            }
            function removeError(input){
                input.nextElementSibling.style.display = 'none';
                input.nextElementSibling.textContent = '';

            }
            function testEmail(input){
                return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);

            }
      

});