'use strict';
window.addEventListener('DOMContentLoaded', function(){
    let tabs = document.querySelector('.catalog__tabs'),
        tab = document.querySelectorAll('.catalog__tab');

        tabs.addEventListener('click', function(event){
            let li = event.target.closest('li');//closset()-возвращает ближайшего предка
            if(li && !li.classList.contains('catalog__tab_active')){
            for(let i=0; i<tab.length; i++){
                tab[i].classList.remove('catalog__tab_active');
                if(li == tab[i]){
                    li.classList.add('catalog__tab_active');
                }
             }
            }
        });
});