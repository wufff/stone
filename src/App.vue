<template>
  <div id="app">

      <router-view></router-view>

  </div>
</template>

<script>
export default {
  name: 'app',
   beforeCreate:function(){  
     var storage = window.localStorage;
     storage.setItem("token","27817DC9-E279-4711-949E-6787F4C305E7");
      function ajax(method, url, data, success) {
            var xhr = null;
            try {
                xhr = new XMLHttpRequest();
            } catch (e) {
                xhr = new ActiveXObject('Microsoft.XMLHTTP');
            }
            if (method == 'get' && data) {
                url += '?' + data;
            }
            xhr.open(method, url, true);
            if (method == 'get') {
                xhr.send();
            } else {
                xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
                xhr.send(data);
            }
            xhr.onreadystatechange = function() {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        success && success(xhr.responseText);
                    } else {
                        alert('登录出错了,错误码：' + xhr.status);
                    }
                }
            };
        }
   
    function getUrlParameter(sParam) {
            var sPageURL = decodeURIComponent(window.location.search.substring(1)),
                sURLVariables = sPageURL.split('&'),
                sParameterName,
                i;

            for (i = 0; i < sURLVariables.length; i++) {
                sParameterName = sURLVariables[i].split('=');

                if (sParameterName[0] === sParam) {
                    return sParameterName[1] === undefined ? true : sParameterName[1];
                }
            }
        };
   
    function weixin() {
            var code = getUrlParameter("code");
            var state = getUrlParameter("state");
            if (code == undefined) {
                var postJsonOauth = { "action": "OAuth/Authorize", "args": null };
                var strOauthPost = JSON.stringify(postJsonOauth);
                ajax("post", "http://www.wapdoor.com:888/", strOauthPost,
                    function (data) {
                        console.log("发起授权");                        
                        var resultJson = JSON.parse(data);
                        window.location.href = resultJson.result;
                    });
            }
            var postJson = {
                "action": "OAuth/GetUserInfo",
                "args":
                {
                    "state": state,
                    "code": code
                }
            };
            var strPost = JSON.stringify(postJson);
            if (code == undefined) {
                console.log("code's length is 0");
                return;
            }
            //TODO 将以下步骤改为服务器端完成，在302重定向时，服务器就能够完成授权过程，不必再重复以下步骤
            ajax("post", "http://www.wapdoor.com:888/", strPost,
                function (result) {
                    console.log("授权完成");
                    ////alert(result);
                    var resultJson = JSON.parse(result);
                    //获得token，写入localStorage
                    var token = resultJson.result.token;
                    storage.setItem("token", token);
                    wxLogin();
                });
        }

      function wxLogin() {
            var isLogin = storage.getItem("token");
            if (!isLogin) {
                weixin();
            } else {
                //check token valid
                var postJson = {
                    "action": "OAuth/CheckToken",
                    "args":
                    {
                        "token": isLogin,
                    }
                };
                var strPost = JSON.stringify(postJson);
                ajax("post", "http://www.wapdoor.com:888/", strPost,
                    function (result) {
                        var resultJson = JSON.parse(result);
                        if (!resultJson.result) {
                            weixin();
                        } else {
                            console.log("已经是登录状态");
                        }
                    });
            }
        }   
     
      wxLogin();

  },
}
</script>

<style lang="less">
@import '../static/style/reset.less';
@import '../static/style/Cvux.less';
@import '../static/style/style-font.css';
@import '../static/style/skin.less';

.fade-enter-active, .fade-leave-active {
  opacity: 1;
  transition: opacity .3s
}
.fade-enter, .fade-leave-active {
  opacity: 0
}
</style>
