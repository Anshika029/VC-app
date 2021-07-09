
(function ($) {
    "use strict";

    
    /*==================================================================
    [ Validate ]*/
    var input = $('.validate-input .input100');

    $('.validate-form').on('submit',function(){
        var check = true;

        for(var i=0; i<input.length; i++) {
            if(validate(input[i]) == false){
                showValidate(input[i]);
                check=false;
            }
        }

        return check;
    });


    $('.validate-form .input100').each(function(){
        $(this).focus(function(){
           hideValidate(this);
        });
    });

    function validate (input) {
        if($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
            if($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                return false;
            }
        }
        else {
            if($(input).val().trim() == ''){
                return false;
            }
        }
    }

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }
    
    

})(jQuery);
// const roomCreated = function(){
  
//     console.log("room created")
//     let roomName = document.querySelector('#room-name').value;
//     let yourName = document.querySelector('#your-name').value;
//     console.log(roomName);
//     if(roomName && yourName){
//         //remove error message, if any
//         document.querySelector('#err-msg').innerHTML = "";
  
//         //save the user's name in sessionStorage
//         sessionStorage.setItem('username', yourName);
  
//         //create room link
//         let roomLink = `${location.origin}?room=${roomName.trim().replace(' ', '_')}_${Math.random().toString(36).slice(2).substring(0, 15)}`;
  
//         //show message with link to room
//         document.querySelector('#room-created').innerHTML = `Room successfully created. Click <a href='${roomLink}'>here</a> to enter room. 
//             Share the room link with your partners.`;
  
//         //empty the values
//         document.querySelector('#room-name').value = '';
//         document.querySelector('#your-name').value = '';
//     }
  
//     else{
//         document.querySelector('#err-msg').innerHTML = "All fields are required";
//     }
//   };