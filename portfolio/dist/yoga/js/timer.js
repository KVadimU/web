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