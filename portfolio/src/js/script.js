'use strict';
window.addEventListener('DOMContentLoaded', function(){
    let hamburger = document.querySelector('.hamburger'),
        menu = document.querySelector('.menu'),
        close = document.querySelector('.menu__close');
    hamburger.addEventListener('click',()=>{
        menu.classList.add('active');
    });
    close.addEventListener('click',()=>{
        menu.classList.remove('active');
    });
        /////////////
      ///////////////
    ////sidepanel////
    ///////////////
    /////////////
    document.addEventListener('scroll', ()=>{
        let sidePanelText = document.querySelector('.sidepanel__text'),
            sidePanelDivider = document.querySelector('.sidepanel__divider'),
            linkVk = document.querySelectorAll('.sidepanel__link')[0],
            linkGitHub = document.querySelectorAll('.sidepanel__link')[1];
        //console.log(window.pageYOffset);
        if(window.pageYOffset > 300){
            sidePanelText.style.color = '#000000';      
        };
        if(window.pageYOffset > 440){
            sidePanelDivider.style.background = '#000000';
        };
        if(window.pageYOffset > 520){
            linkGitHub.firstChild.setAttribute("src", "img/icons/github_green.svg");
        };
        if(window.pageYOffset > 600){
            linkVk.firstChild.setAttribute("src", "img/icons/vk_red2.png");
        };
        if(window.pageYOffset < 300){
            sidePanelText.style.color = '#FFFFFF';
        }
        if(window.pageYOffset < 440){
            sidePanelDivider.style.background = '#FFFFFF';
        };
        if(window.pageYOffset < 520){
            linkGitHub.firstChild.setAttribute("src", "img/icons/github.svg");
        };
        if(window.pageYOffset < 600){
            linkVk.firstChild.setAttribute("src", "img/icons/vk.png");
        };
    });
});