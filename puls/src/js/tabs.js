'use strict';
window.addEventListener('DOMContentLoaded', function(){
    let tabs = document.querySelector('.catalog__tabs'),
        tab = document.querySelectorAll('.catalog__tab'),
        catalog = document.querySelectorAll('.catalog__content');
       
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
});