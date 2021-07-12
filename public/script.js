const socket = io('/');
const peer = new Peer();


var constraints = { audio: true, video: true };
const videoGrid = document.getElementById("video-grid");
const myVideo = document.createElement("video");
myVideo.muted = false;
let myVideoStream;



var myName = prompt("Enter your Name");
navigator.mediaDevices.getUserMedia(constraints)
  .then(function(stream) {
      myVideoStream = stream;
      addMyVideo(myVideo,stream);
      
      peer.on('call',function(call){
        //  myName = prompt('your name here');
        //  console.log(myName);
          call.answer(stream);
          const video = document.createElement("video");
          call.on('stream',function(userStream){
            addMyVideo(video,userStream)
          })
        })

      socket.on('user-connected',function(user_id){
         
        connectUser(user_id,stream);
     })
});


peer.on('open', function(id) {
    socket.emit('join',meet_id,id,myName);
    // socket.emit('disconnect',id);
  });



//for connecting peer to room id
function connectUser(user_id,stream){
    
    var call = peer.call(user_id,stream);
    const video = document.createElement("video");
    call.on('stream',function(userStream){
         addMyVideo(video,userStream)
    })
    
};

//for adding your stream to html element
function addMyVideo(video,stream){
    video.srcObject = stream;
    video.addEventListener('loadedmetadata',function(){
        video.play();
    })
    videoGrid.append(video);
}





const scrollBottom = () => {
  let d = $('.chat-window');
  d.scrollTop(d.prop("scrollHeight"));
}

// let myName = $('.focus-input100');
// console.log(myName.value);

// var data = $("input #data");
//   console.log(data.val());
//generate link
// var myLink = document.querySelector('.meet_link');
// myLink.innerHTML = "http://localhost:3000/" ;
// console.log(meet_id);


let msg = $('input');


$('html').keydown(function(e){
   if(e.which == 13 && msg.val().length !=0){
     console.log(msg.val())
       socket.emit('message',msg.val());
       msg.val('')
   }
})

socket.on('updateMessage',function(message,userName){
    $('.messages').append(`<li class="message-drop"><b>${userName === myName ? "You" : userName}</b><br>${message}</li>`);
    if(userName === myName)
    {
      $('li').style.cssText = 'justify-content: right'
    }
     
})

//Mute or Unmute
const voice = function(){
  const enable = myVideoStream.getAudioTracks()[0].enabled;
  if(enable){
    myVideoStream.getAudioTracks()[0].enabled = false;
    muteButton();
  }
  else
  {
    unmuteButton();
    myVideoStream.getAudioTracks()[0].enabled=true;
  }
}

const muteButton = function(){
  const html = `<i class="fas fa-microphone-slash"></i>`
  document.querySelector('.mute-button').innerHTML = html;
  document.querySelector('.mute-button').style.cssText = 'background-color: white; color: #4a4a4a'
  document.querySelector('video').style.cssText = 'border: 6px solid #4a4a4a'
}

const unmuteButton = function(){
  const html = `<i class=" fas fa-microphone "></i>`
  document.querySelector('.mute-button').innerHTML = html;
  document.querySelector('.mute-button').style.cssText = 'background-color:#4a4a4a ; color: white'
  document.querySelector('video').style.cssText = 'border: 4px solid #7df9ff'
}

//Video open or close
const video = ()=>{
  let enable = myVideoStream.getVideoTracks()[0].enabled;
  if(enable)
  {
    myVideoStream.getVideoTracks()[0].enabled=false;
    stopVideo();
  }
  else
  {
    playVideo();
    myVideoStream.getVideoTracks()[0].enabled=true;

  }
}

const stopVideo = function(){
  const html = `<i class="fas fa-video-slash"></i>`
  document.querySelector('.stop-video').innerHTML=html;
  document.querySelector('.stop-video').style.cssText = 'background-color: white; color: #4a4a4a';
//   document.querySelector('video').style.cssText = 'border: 5px solid #4a4a4a'//
}

const playVideo = function(){
  const html = `<i class="fas fa-video "></i>`
  document.querySelector('.stop-video').innerHTML = html;
  document.querySelector('.stop-video').style.cssText = 'background-color:#4a4a4a ; color: white';
  // document.querySelector('video').style.cssText = 'none'
}

//chat open or close
const chat = function(){
  var y = document.querySelector('.hand');
  var x = document.querySelector('.right');
  
  if(x.style.display === "none")
       {
         if(y.style.display === 'flex')
          {
            y.style.display = 'none'
            document.querySelector('.raise').style.cssText = 'background-color: #4a4a4a ; color: white'
          }
        x.style.display = "flex";
         openChat();
       } 
  else
    {
       x.style.display = "none";
       closeChat();
    }
  
}

const openChat = function(){
        // const html = `<i class="fas fa-comment"></i>`
        // document.querySelector('.chat').innerHTML=html;
        document.querySelector('.chat').style.cssText = 'background-color:white ; color: #4a4a4a'
        
        if(window.innerWidth <= 605)
        {
          document.querySelector('.right').style.cssText = 'display: flex; flex: 1;'
          document.querySelector('.left').style.cssText = 'flex: 1 ; display: none; flex-direction: none;'
          
        }
        else
        {
          document.querySelector('.main').style.cssText = 'display: flex;'
        }
        
        // document.querySelector('.left').style.cssText = 'flex: 0.8 ; display: flex; flex-direction: column;'
        
} 

const closeChat = function(){
  // const html = `<i class="fas fa-comment-slash"></i>`
  // document.querySelector('.chat').innerHTML=html
  document.querySelector('.chat').style.cssText = 'background-color: #4a4a4a; color: white'
  document.querySelector('.left').style.cssText = 'flex: 1 ; display: inline; flex-direction: none;'
  
  
}
//exit msg
const exitMsg = function(){
  document.querySelector('.right').style.cssText = 'display: none;'
  document.querySelector('.chat').style.cssText = 'background-color: #4a4a4a; color: white'
  document.querySelector('.left').style.cssText = 'flex: 1 ; display: inline; flex-direction: none;'
}

const handRaise = function(val){
  socket.emit('raise',val);
  
}

socket.on('handRaise',function(userName,myVal){
 
   var h = document.querySelector('.hand');

  if(h.style.display === 'none')
  {
    
     h.style.display = 'flex';
    
    
    openHand()
  }
  else
  {
     h.style.display = 'none';
    closeHand()
  }
  ;
})

const openHand = function(){
  document.querySelector('.raise').style.cssText = 'background-color:white ; color: #4a4a4a'
  document.querySelector('video').style.cssText = 'border: 4px solid #ffff00'
}

const closeHand = function(){
  document.querySelector('.raise').style.cssText = 'background-color: #4a4a4a ; color: white'
  // document.querySelector('.left').style.cssText = 'flex: 1 ; display: inline; flex-direction: none;'
  document.querySelector('video').style.cssText = 'none'
}

const exitHand = function(){
  document.querySelector('.hand').style.cssText = 'display: none;'
  document.querySelector('.raise').style.cssText = 'background-color: #4a4a4a; color: white'
  document.querySelector('.left').style.cssText = 'flex: 1 ; display: inline; flex-direction: none;'
}

const getLink = function(){
  socket.emit('shareLink');
}

socket.on('gettingLink',function(id_room,name_room,port){
  let text = document.querySelector("#input").value;
  text = "https://meet-here-app.herokuapp.com/room="+name_room+"_"+id_room;
  navigator.clipboard.writeText(text);
})

