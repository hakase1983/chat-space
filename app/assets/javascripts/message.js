$(document).on('turbolinks:load',function(){
  function new_message(message){
    var img = message.image.url ? `<img src= ${ message.image.url }>` : "";
    var html= `<div class="message">
                <div data-id=${message.id}>
                  <div class="upper-message">
                    <div class="upper_info_user">
                      ${message.name}
                        <span class="upper_info_data">
                        ${message.created_at}
                      </span>
                    </div>                
                  </div>
                </div>
              <div class="lower-message">
                  <p class="lower-message__content">
                    ${message.content}
                    ${img}
                  </p>
                </div>
              </div>`

    return html;
  }  
  $('#new_message').on('submit',function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action'); 
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
      .done(function(message){
      var html = new_message(message);
      $('.messages').append(html);
      $('form')[0].reset();
      $('.form__submit').prop('disabled',false);
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight},'fast');
      })
      .fail(function(message){
        alert('error');
        });
      })
      
  var reloadMessages = function() {
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
      var last_message_id = $('.message:last').data("id");
        $.ajax({
        url: "api/messages",
        type: 'get',
        dataType: 'json',
        data: {last_id: last_message_id}
      })
      .done(function(messages) {
        var insertHTML='';
        messages.forEach(function (message) {
        insertHTML = new_message(message);
        $('.messages').append(insertHTML);
        $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
        // $("どこを？").animate({なにを？},"fast")
      });
      })
      .fail(function(){
        alert(this);
      });
    }
  };
  setInterval(reloadMessages, 5000);
});