$(function(){
  var search_list = $("#user-search-result");
    function append_user_name(user){
                  var html  =`<div class="chat-group-user clearfix">
                                <p class="chat-group-user__name">${user.name}</p>
                                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id=${user.id} data-user-name=${user.name}>追加</div>
                              </div>`
    search_list.append(html);
    }

    function user_name_error(user){
          var html =`<div class = "chat-group-user clearfix">${user}</div> `
      search_list.append(html);
    }
    function add_user(id, name){
      
          var html =`<div class='chat-group-user'>
                        <input name='group[user_ids][]' type='hidden' value=${id}>
                          <p class='chat-group-user__name'>${name}</p>
                        <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
                      </div>`
    $('.chat-group-users').append(html);
    }
    
  $('#user-search-field').on('keyup',function(){
    var input = $('#user-search-field').val();

    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })

    .done(function(datas){
      $('#user-search-result').empty();
      if (datas.length !== 0){
        datas.forEach(function(user){
          append_user_name(user);
        });
      }
      else{
        user_name_error("一致する名前はありません")
      }
    })
    .fail(function(){
      alert('ユーザー検索に失敗しました');
    })
  });

  $(document).on("click", ".chat-group-user__btn--add", function(){
    var id = $(this).data('user-id');
    var name = $(this).data('user-name');
    add_user(id, name);
    $(this).parent().remove();
  });
    $(document).on("click", ".js-remove-btn", function(){
    $(this).parent().remove();
    });

    $('.chat-group-form__action-btn').on("click", function(){
      $('.chat-group-form__action-btn').removeAttr('disabled');
    });
  });
