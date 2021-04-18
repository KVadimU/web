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
                        console.log(item.lastElementChild);
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
    let modal = document.getElementsByTagName('button')[0],
        overlay = document.querySelector('.overlay'),
        modalConsultatin = document.getElementById('consultation'),
        modalClose = document.querySelectorAll('.modal__close')[0];

        modal.getAttribute("consultation");
       // modal.style.display = 'none';
       function closeModal(){
            modalConsultatin.style.display = 'none';
            overlay.style.display = 'none';
       }
       modal.addEventListener('click', function(){
                overlay.style.display = 'block';
                modalConsultatin.style.display = 'block';
       });
       modalClose.addEventListener('click', function(){
                modalConsultatin.style.display = 'none';
                overlay.style.display = 'none';

               
        });

});