import axios from 'axios';
import { Indicator } from 'mint-ui';
var CryptoJS = require("crypto-js");
var instance = axios.create({
  baseURL: 'http://www.wayperfect.com:888/',
  timeout: 5000,
  headers: {'Content-Type': 'application/x-www-form-urlencoded'}
});
var storage = window.localStorage;
/*storage.setItem("token","27817DC9-E279-4711-949E-6787F4C305E7")*/



/*加密带token的参数*/
function getParam(url,paramsObj){
  var value = storage.getItem("token");
   if(!value){
      alert("未登录！");
      return;
   }
   var apikey = "apikey";
   var expires = JSON.stringify(Math.round(new Date().getTime() / 1000)); 
   var method = "POST";
   var token = value;
   var params = paramsObj;
	   params.token =  token;
	   params.apikey = apikey;
	   params.expires = expires;
   var arr = [];
   if (params != null) {
        for (var p in params) {arr.push(p);}
     }
   arr.sort();
   var sortedParameterKeys = '';
       for (var i = 0; i < arr.length; i++) {sortedParameterKeys += arr[i] + "=" + params[arr[i]];}
    var stringToSign = method + url;
          stringToSign += sortedParameterKeys;
          stringToSign += token;
         /* console.log(stringToSign);*/
      var hash = CryptoJS.SHA256(stringToSign);
      var signature = hash.toString(CryptoJS.enc.Base64);
       if (signature.lastIndexOf('==')) {
            signature = signature.substring(0, signature.length - 1);
        }
      signature = encodeURIComponent(signature); 
      paramsObj.signature = signature;

      return  {
                 "action": url,
                 "args": params
              }   
}

/*不加密的接口参数*/
function getParamN(url,paramsObj){
      return  {
                 "action": url,
                 "args": paramsObj
              }   
}

function fetch(url,atcion,params) {
	  var paramsobj = getParam(atcion,params);
      return new Promise((resolve, reject) => {
          instance.post(url,paramsobj)
             .then(res => {
               resolve(res);
  })
 .catch((error) => {
        Indicator.close();
        reject(error);
       })
    })
  }
 

function fetchLoading(url, atcion,params) {
       var paramsobj = getParam(atcion,params);
       Indicator.open();
      return new Promise((resolve, reject) => {
          instance.post(url, paramsobj)
             .then(res => {
               Indicator.close();
               resolve(res);
  })
 .catch((error) => {
         Indicator.close();
        alert("请求超时请切换页面重试");
        reject(error);
       })
    })
 } 

 function fetchLoadingN(url, atcion,params) {
       var paramsobj = getParamN(atcion,params);
       Indicator.open();
      return new Promise((resolve, reject) => {
          instance.post(url, paramsobj)
             .then(res => {
               Indicator.close();
               resolve(res);
  })
 .catch((error) => {
         Indicator.close();
        alert("请求超时请切换页面重试");
        reject(error);
       })
    })
 } 

 function fetchN(url, atcion,params) {
       var paramsobj = getParamN(atcion,params);
      return new Promise((resolve, reject) => {
          instance.post(url, paramsobj)
             .then(res => {
               Indicator.close();
               resolve(res);
  })
 .catch((error) => {
        alert("请求超时请切换页面重试");
        reject(error);
       })
    })
 } 


  export default {
      ajax(url,atcion,params) {
          return fetch(url,atcion,params);
      },
       ajaxN(url,atcion,params) {
          return fetchN(url,atcion,params);
      },
      ajaxLaoding(url,atcion,params) {
          return fetchLoading(url,atcion,params);
      },
      ajaxLaodingN(url,atcion,params) {
          return fetchLoadingN(url,atcion,params);
      }
  }