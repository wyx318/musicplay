var musicList = [
    {
      src: 'http://cloud.hunger-valley.com/music/玫瑰.mp3',
      title: '玫瑰',
      auther: '贰佰',
      img: 'http://cloud.hunger-valley.com/17-9-22/28212907.jpg'
    },
    {
      src: 'http://cloud.hunger-valley.com/music/ifyou.mp3',
      title: 'IF YOU',
      auther: 'Big Bang',
      img: 'http://cloud.hunger-valley.com/17-9-22/87786461.jpg'
    }
    
  ]
  //方便查找
  function $(selector){
    return document.querySelector(selector);
  }
  //先设置自动播放 进到页面就开始播放(第一步)
  var song = musicList[0]
  var audio = new Audio(song.src);
  //自动播放
  var currentIndex = 0;
   audio.autoplay = true;
  //封装音乐地址函数 从第一首开始播放
  loadMusic(musicList[currentIndex])
  
  function loadMusic(musicObj){
    console.log(musicObj);
    //设置歌手以及歌名
    $('.musicbox .title').innerText = musicObj.title ; 
    $('.musicbox .auther').innerText = musicObj.auther;
    $('.cover').style.backgroundImage = 'url(' + musicObj.img + ')';
    audio.src = musicObj.src; 
  }
  
  //设置进度条
  audio.ontimeupdate = function (){
    //动画api
    console.log(this.currentTime);
    $('.musicbox .progress-now').style.width = (this.currentTime / this.duration)*100 +'%';
  }
  //设置时间 显示不是很准确  异步回调一下
  audio.onplay = function (){
    clock = setInterval(function(){ 
    var min = Math.floor(audio.currentTime/60);
    //变成字符串
    var sec = Math.floor(audio.currentTime%60) + '';
    sec = sec.length === 2 ? sec : '0' + sec;
    $('.musicbox .time').innerText = min + ':' + sec;
    },1000);
  }
  //转换歌曲的时候 就清除重新开始计时 
  audio.onpause = function(){
    clearInterval(clock);
  }
  // 播放完成事件 自动播放下一曲 
   audio.onended = function(){
     currentIndex = (++currentIndex)%musicList.length;
    loadMusic(musicList[currentIndex]);
   }
  //点击事件
  $('.musicbox .play').onclick = function(){
    //进行判断当前是什么状态 播放就暂停 暂停就播放 换掉对应的图标
    if(audio.paused){
      audio.play();
      //换掉图标
      this.querySelector('.fa').classList.remove('fa-play');
      this.querySelector('.fa').classList.add('fa-pause');
    }else{
      audio.pause();
      //换掉图标
      this.querySelector('.fa').classList.remove('fa-pause');
      this.querySelector('.fa').classList.add('fa-play');
    }
  }
  //事件上一曲 下一曲  用当前歌曲的lenggth % 总length 会一直循环 
  $('.musicbox .forward').onclick = function (){
    currentIndex = (++currentIndex)%musicList.length;
  //   console.log(currentIndex);
    loadMusic(musicList[currentIndex]);
  }
  //下一曲 事件 
  $('.musicbox .back').onclick = function (){
    currentIndex = (musicList.length + --currentIndex) %musicList.length;
    console.log(currentIndex);
    loadMusic(musicList[currentIndex]);
  }
  //进度条快进 
  $('.musicbox .bar').onclick = function(e){
    var percent = e.offsetX / parseInt(getComputedStyle(this).width);
    audio.currentTime = audio.duration * percent;
  }