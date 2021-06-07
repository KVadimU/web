'use strict';
window.addEventListener('DOMContentLoaded', function(){
        ////////
      //////////
    ////menu////
    //////////
    ////////
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
    // document.addEventListener('scroll', ()=>{
    //     let sidePanelText = document.querySelector('.sidepanel__text'),
    //         sidePanelDivider = document.querySelector('.sidepanel__divider'),
    //         linkVk = document.querySelectorAll('.sidepanel__link')[0],
    //         linkGitHub = document.querySelectorAll('.sidepanel__link')[1];
    //     //console.log(window.pageYOffset);
    //     if(window.pageYOffset > 300){
    //         sidePanelText.style.color = '#000000';      
    //     };
    //     if(window.pageYOffset > 440){
    //         sidePanelDivider.style.background = '#000000';
    //     };
    //     if(window.pageYOffset > 520){
    //         linkGitHub.firstChild.setAttribute("src", "img/icons/github_green.svg");
    //     };
    //     if(window.pageYOffset > 600){
    //         linkVk.firstChild.setAttribute("src", "img/icons/vk_red2.png");
    //     };
    //     if(window.pageYOffset < 300){
    //         sidePanelText.style.color = '#FFFFFF';
    //     }
    //     if(window.pageYOffset < 440){
    //         sidePanelDivider.style.background = '#FFFFFF';
    //     };
    //     if(window.pageYOffset < 520){
    //         linkGitHub.firstChild.setAttribute("src", "img/icons/github.svg");
    //     };
    //     if(window.pageYOffset < 600){
    //         linkVk.firstChild.setAttribute("src", "img/icons/vk.png");
    //     };
    // });
        ////////////////
      //////////////////
    ////progress bar////
    //////////////////
    ////////////////
        let percents = document.querySelectorAll('.progress__item-percent'),
            line = document.querySelectorAll('.progress__item-bar span'),
            blockProgress = document.querySelector('.progress');

            this.addEventListener('scroll', () => {
                if(offset(blockProgress) > window.pageYOffset){
                    percents.forEach((item, i) => {
                        let count = 0,
                            timer = setInterval(draw, 10);

                        function draw(){
                            if(line[i].style.width == item.innerHTML){
                                clearInterval(timer);
                            }else{
                                count++;
                                line[i].style.width = count+'%' ;
                            }
                        }
                        line[i].style.width = 0 + '%';
                    }); 
                }
            });

            function offset(el) {
                let rect = el.getBoundingClientRect(),
                scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                return (rect.top + scrollTop)- document.documentElement.clientHeight;
            }
            

            
         
        
});