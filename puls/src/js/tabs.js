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
                
            });
            modalConsultatin.firstElementChild.addEventListener('click', function(){
                modalConsultatin.style.display = 'none';
                overlay.style.display = 'none';
                
               
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
        ////////////////////////////////////////////////////////////////////////
        //mask input
        ////////////////////////////////////////////////////////////////////////
        let input = document.querySelectorAll('[name="phone"]');
            //input.addEventListener("input", mask, false);
            input.forEach(function(item, i, input){
            item.addEventListener('input', mask, false);
           
        function setCursorPosition(pos, item) {
                item.focus();
                if (item.setSelectionRange) item.setSelectionRange(pos, pos);
                else if (item.createTextRange) {
            let range = item.createTextRange();
            range.collapse(true);
            range.moveEnd("character", pos);
            range.moveStart("character", pos);
            range.select()
           }
            }
        
            function mask(event){
                let matrix = this.defaultValue,
                    i = 0,
                    def = matrix.replace(/\D/g, ""),
                    val = this.value.replace(/\D/g, "");
                    def.length >= val.length && (val = def);
                matrix = matrix.replace(/[_\d]/g, function(a) {
                    return val.charAt(i++) || "_"
                });
                this.value = matrix;
                i = matrix.lastIndexOf(val.substr(-1));
                i < matrix.length && matrix != this.defaultValue ? i++ : i = matrix.indexOf("_");
                setCursorPosition(i, this)
        
            }
        });
        ////////////////////////////////////////////////////////////////////////
        //validationForm
        ///////////////////////////////////////////////////////////////////////

        let formsConsultation = document.querySelectorAll('.feed-form'),
            regPhone2 = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){6,14}(\s*)?$/,
            regName = /^[a-zA-Zа-яА-Я '.-]*$/;

            formsConsultation.forEach(function(item,i,formsConsultation){     
            item.addEventListener('submit', formSend);
           
            async function formSend(e){
                e.preventDefault();
                let error = formValidate(item),
                    formData = new FormData(item);
                if(error === 0){
                    item.classList.add('feed-form_sending');
                    let response = await fetch('sendmail.php',{
                        method: 'POST',
                        body: formData
                    });
                    if(response.ok){
                        let result = await response.json();
                        alert(result.message);
                        item.reset();
                        item.classList.remove('feed-form_sending');
                    }else{
                        alert("Ошибка!");
                        item.classList.remove('feed-form_sending');
                    }
                }else{
                   alert("Заполните все поля!");
                }
            }
        
            function formValidate(item){
                   console.log(item);
                   let formInp = item.querySelectorAll('input'),
                        error = 0;
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
                     }else if(i == 0 && !regName.test(input.value)){//проверяем имя
                         addError(input);
                         error++;
                     }
                 }
                 return error;
            }
        });
            function addError(input){
                input.classList.add('_error');
            }
            function removeError(input){
                input.classList.remove('_error');
            }
            function testEmail(input){
                return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
            }
        
});