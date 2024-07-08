$(function (event) {

  var parseJson = function (data) {
    var returnJson = {};
    for (idx = 0; idx < data.length; idx++) {
      returnJson[data[idx].name] = data[idx].value;
    }
    return returnJson;
  };

  $("#button").on("click", function () {
    ///// フォームの入力チェック
    $("#mailForm").validate({
      errorElement: "span",
      errorClass: "alert",
      rules: {
        subject: {
          required: true,
          maxlength: 50,
        },
        email: {
          required: true,
          email: true,
        },
        body: {
          required: true,
        },
      },
      messages: {
        subject: {
          required: "表題を入力してください",
          maxlength: "表題は50文字以内にしてください",
        },
        email: {
          required: "メールアドレスを入力してください",
          email: "有効なメールアドレスを入力してください",
        },
        body: {
          required: "本文を入力してください",
        },
      },
    });
    //// フォーム入力OK時の処理（メール送信）
    if ($("#mailForm").valid()) { 
      $("#button").text("送信中です");
      var data = $("form").serializeArray();
      data = parseJson(data);
      console.log(data);
      $.ajax({
        url: "https://yfl2fc9wb2.execute-api.ap-northeast-1.amazonaws.com/v1/send-email",
        type: "post",
        dataType: "json",
        contentType: "application/json",
        scriptCharset: "utf-8",
        data: JSON.stringify(data),
      }).then(
        function (data) {
          ///// メール送信成功時の処理
          alert("送信に成功しました");
          location.reload();
        },
        function (data) {
          ///// メール送信失敗時の処理
          alert("送信に失敗しました");
          location.reload();
        }
      );
    }
  });

}); //// function END