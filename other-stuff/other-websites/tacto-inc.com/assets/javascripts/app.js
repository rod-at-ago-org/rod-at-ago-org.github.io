function sleep(msec){
  return new Promise(resolve => setTimeout(resolve, msec));
}

async function typewriter(params){
  let el = document.querySelector(params.el);
  let speed = params.speed;
  let strings = params.strings;
  let spaceReplace = params.spaceReplace;
  let mtAfter = params.mtAfter;
  if(!spaceReplace){
    spaceReplace = ' ';
  }
  await sleep(speed * 2);
  for(let i = 0; i < strings.length; i++){
    let string = strings[i];
    let randomDuration = Math.floor((Math.random() * speed));
    //書き出し
    for(let j = 0; j < string.length; j++){
      let rSpeed = speed;
      if(Math.random() > 0.2){
        rSpeed = rSpeed - randomDuration;
        if(randomDuration < rSpeed/2){
          rSpeed = rSpeed / 2.0;
        }
      }else{
        rSpeed = rSpeed + randomDuration;
      }
      el.innerHTML = string.slice(0, j).replaceAll(' ', spaceReplace);
      await sleep(rSpeed);
    }
    el.innerHTML = string.replaceAll(' ', spaceReplace);
    await sleep(speed * 2);
    if(strings.length == (i + 1)){
      el.classList.add('complete');
      return;
    }
    //消し込み
    for(let j = 0; j < string.length; j++){
      el.innerHTML = string.slice(0, -1 * (j+1)).replaceAll(' ', spaceReplace);
      await sleep(100);
    }
    await sleep(speed * 2);
    if(mtAfter){
      const elems = document.querySelectorAll('.mt-after');
      for(var k = 0; k < elems.length; k++){
        elems[k].classList.add('active');
      }
      await sleep(speed * 4);
    }
  }
}

const returnTop = document.getElementById('return-top');
var leaveController = new ScrollMagic.Controller({
  globalSceneOptions: {
    triggerHook: 'onLeave'
  }
});

var enterController = new ScrollMagic.Controller({
  globalSceneOptions: {
    triggerHook: 'onEnter'
  }
});

new ScrollMagic.Scene({
  offset: 80,
  triggerElement: '#fv'
}).on('enter', function(){
  returnTop.classList.add('active');
}).on('leave', function(){
  returnTop.classList.remove('active');
}).addTo(leaveController);

new ScrollMagic.Scene({
  offset: 100,
  triggerElement: 'footer'
}).on('enter', function(){
  returnTop.classList.remove('active');
}).on('leave', function(){
  returnTop.classList.add('active');
}).addTo(enterController);