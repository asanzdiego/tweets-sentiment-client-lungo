/* QuoJS v2.3.6 - 2013/5/13
   http://quojs.tapquo.com
   Copyright (c) 2013 Javi Jimenez Villar (@soyjavi) - Licensed MIT */
(function(){var e;e=function(){var e,t,n;t=[];e=function(t,r){var i;if(!t){return n()}else if(e.toType(t)==="function"){return e(document).ready(t)}else{i=e.getDOMObject(t,r);return n(i,t)}};n=function(e,r){e=e||t;e.__proto__=n.prototype;e.selector=r||"";return e};e.extend=function(e){Array.prototype.slice.call(arguments,1).forEach(function(t){var n,r;r=[];for(n in t){r.push(e[n]=t[n])}return r});return e};n.prototype=e.fn={};return e}();window.Quo=e;"$$"in window||(window.$$=e)}).call(this);(function(){(function(e){var t,n,r,i,u,a,o,s,c,f,l;t={TYPE:"GET",MIME:"json"};r={script:"text/javascript, application/javascript",json:"application/json",xml:"application/xml, text/xml",html:"text/html",text:"text/plain"};n=0;e.ajaxSettings={type:t.TYPE,async:true,success:{},error:{},context:null,dataType:t.MIME,headers:{},xhr:function(){return new window.XMLHttpRequest},crossDomain:false,timeout:0};e.ajax=function(n){var r,o,f,h;f=e.mix(e.ajaxSettings,n);if(f.type===t.TYPE){f.url+=e.serializeParameters(f.data,"?")}else{f.data=e.serializeParameters(f.data)}if(i(f.url)){return e.jsonp(f)}h=f.xhr();h.onreadystatechange=function(){if(h.readyState===4){clearTimeout(r);return c(h,f)}};h.open(f.type,f.url,f.async);s(h,f);if(f.timeout>0){r=setTimeout(function(){return l(h,f)},f.timeout)}try{h.send(f.data)}catch(d){o=d;h=o;a("Resource not found",h,f)}if(f.async){return h}else{return u(h,f)}};e.jsonp=function(t){var r,i,u,a;if(t.async){i="jsonp"+ ++n;u=document.createElement("script");a={abort:function(){e(u).remove();if(i in window){return window[i]={}}}};r=void 0;window[i]=function(n){clearTimeout(r);e(u).remove();delete window[i];return f(n,a,t)};u.src=t.url.replace(RegExp("=\\?"),"="+i);e("head").append(u);if(t.timeout>0){r=setTimeout(function(){return l(a,t)},t.timeout)}return a}else{return console.error("QuoJS.ajax: Unable to make jsonp synchronous call.")}};e.get=function(t,n,r,i){return e.ajax({url:t,data:n,success:r,dataType:i})};e.post=function(e,t,n,r){return o("POST",e,t,n,r)};e.put=function(e,t,n,r){return o("PUT",e,t,n,r)};e["delete"]=function(e,t,n,r){return o("DELETE",e,t,n,r)};e.json=function(n,r,i){return e.ajax({url:n,data:r,success:i,dataType:t.MIME})};e.serializeParameters=function(e,t){var n,r;if(t==null){t=""}r=t;for(n in e){if(e.hasOwnProperty(n)){if(r!==t){r+="&"}r+=""+encodeURIComponent(n)+"="+encodeURIComponent(e[n])}}if(r===t){return""}else{return r}};c=function(e,t){if(e.status>=200&&e.status<300||e.status===0){if(t.async){f(u(e,t),e,t)}}else{a("QuoJS.ajax: Unsuccesful request",e,t)}};f=function(e,t,n){n.success.call(n.context,e,t)};a=function(e,t,n){n.error.call(n.context,e,t,n)};s=function(e,t){var n;if(t.contentType){t.headers["Content-Type"]=t.contentType}if(t.dataType){t.headers["Accept"]=r[t.dataType]}for(n in t.headers){e.setRequestHeader(n,t.headers[n])}};l=function(e,t){e.onreadystatechange={};e.abort();a("QuoJS.ajax: Timeout exceeded",e,t)};o=function(t,n,r,i,u){return e.ajax({type:t,url:n,data:r,success:i,dataType:u,contentType:"application/x-www-form-urlencoded"})};u=function(e,n){var r,i;i=e.responseText;if(i){if(n.dataType===t.MIME){try{i=JSON.parse(i)}catch(u){r=u;i=r;a("QuoJS.ajax: Parse Error",e,n)}}else{if(n.dataType==="xml"){i=e.responseXML}}}return i};return i=function(e){return RegExp("=\\?").test(e)}})(Quo)}).call(this);(function(){(function(e){var t,n,r,i,u,a,o,s;t=[];i=Object.prototype;r=/^\s*<(\w+|!)[^>]*>/;u=document.createElement("table");a=document.createElement("tr");n={tr:document.createElement("tbody"),tbody:u,thead:u,tfoot:u,td:a,th:a,"*":document.createElement("div")};e.toType=function(e){return i.toString.call(e).match(/\s([a-z|A-Z]+)/)[1].toLowerCase()};e.isOwnProperty=function(e,t){return i.hasOwnProperty.call(e,t)};e.getDOMObject=function(t,n){var i,u,a;i=null;u=[1,9,11];a=e.toType(t);if(a==="array"){i=o(t)}else if(a==="string"&&r.test(t)){i=e.fragment(t.trim(),RegExp.$1);t=null}else if(a==="string"){i=e.query(document,t);if(n){if(i.length===1){i=e.query(i[0],n)}else{i=e.map(function(){return e.query(i,n)})}}}else if(u.indexOf(t.nodeType)>=0||t===window){i=[t];t=null}return i};e.map=function(t,n){var r,i,u,a;a=[];r=void 0;i=void 0;if(e.toType(t)==="array"){r=0;while(r<t.length){u=n(t[r],r);if(u!=null){a.push(u)}r++}}else{for(i in t){u=n(t[i],i);if(u!=null){a.push(u)}}}return s(a)};e.each=function(t,n){var r,i;r=void 0;i=void 0;if(e.toType(t)==="array"){r=0;while(r<t.length){if(n.call(t[r],r,t[r])===false){return t}r++}}else{for(i in t){if(n.call(t[i],i,t[i])===false){return t}}}return t};e.mix=function(){var t,n,r,i,u;r={};t=0;i=arguments.length;while(t<i){n=arguments[t];for(u in n){if(e.isOwnProperty(n,u)&&n[u]!==undefined){r[u]=n[u]}}t++}return r};e.fragment=function(t,r){var i;if(r==null){r="*"}if(!(r in n)){r="*"}i=n[r];i.innerHTML=""+t;return e.each(Array.prototype.slice.call(i.childNodes),function(){return i.removeChild(this)})};e.fn.map=function(t){return e.map(this,function(e,n){return t.call(e,n,e)})};e.fn.instance=function(e){return this.map(function(){return this[e]})};e.fn.filter=function(t){return e([].filter.call(this,function(n){return n.parentNode&&e.query(n.parentNode,t).indexOf(n)>=0}))};e.fn.forEach=t.forEach;e.fn.indexOf=t.indexOf;o=function(e){return e.filter(function(e){return e!==void 0&&e!==null})};return s=function(e){if(e.length>0){return[].concat.apply([],e)}else{return e}}})(Quo)}).call(this);(function(){(function(e){e.fn.attr=function(t,n){if(this.length===0){null}if(e.toType(t)==="string"&&n===void 0){return this[0].getAttribute(t)}else{return this.each(function(){return this.setAttribute(t,n)})}};e.fn.removeAttr=function(e){return this.each(function(){return this.removeAttribute(e)})};e.fn.data=function(e,t){return this.attr("data-"+e,t)};e.fn.removeData=function(e){return this.removeAttr("data-"+e)};e.fn.val=function(t){if(e.toType(t)==="string"){return this.each(function(){return this.value=t})}else{if(this.length>0){return this[0].value}else{return null}}};e.fn.show=function(){return this.style("display","block")};e.fn.hide=function(){return this.style("display","none")};e.fn.height=function(){var e;e=this.offset();return e.height};e.fn.width=function(){var e;e=this.offset();return e.width};e.fn.offset=function(){var e;e=this[0].getBoundingClientRect();return{left:e.left+window.pageXOffset,top:e.top+window.pageYOffset,width:e.width,height:e.height}};return e.fn.remove=function(){return this.each(function(){if(this.parentNode!=null){return this.parentNode.removeChild(this)}})}})(Quo)}).call(this);(function(){(function(e){var t,n,r,i,u,a,o;r=null;t=/WebKit\/([\d.]+)/;n={Android:/(Android)\s+([\d.]+)/,ipad:/(iPad).*OS\s([\d_]+)/,iphone:/(iPhone\sOS)\s([\d_]+)/,Blackberry:/(BlackBerry|BB10|Playbook).*Version\/([\d.]+)/,FirefoxOS:/(Mozilla).*Mobile[^\/]*\/([\d\.]*)/,webOS:/(webOS|hpwOS)[\s\/]([\d.]+)/};e.isMobile=function(){r=r||u();return r.isMobile&&r.os.name!=="firefoxOS"};e.environment=function(){r=r||u();return r};e.isOnline=function(){return navigator.onLine};u=function(){var e,t;t=navigator.userAgent;e={};e.browser=i(t);e.os=a(t);e.isMobile=!!e.os;e.screen=o();return e};i=function(e){var n;n=e.match(t);if(n){return n[0]}else{return e}};a=function(e){var t,r,i;t=null;for(r in n){i=e.match(n[r]);if(i){t={name:r==="iphone"||r==="ipad"?"ios":r,version:i[2].replace("_",".")};break}}return t};return o=function(){return{width:window.innerWidth,height:window.innerHeight}}})(Quo)}).call(this);(function(){(function(e){var t,n,r,i,u,a,o,s,c,f,l,h;t=1;i={};r={preventDefault:"isDefaultPrevented",stopImmediatePropagation:"isImmediatePropagationStopped",stopPropagation:"isPropagationStopped"};n={touchstart:"mousedown",touchmove:"mousemove",touchend:"mouseup",touch:"click",doubletap:"dblclick",orientationchange:"resize"};u=/complete|loaded|interactive/;e.fn.on=function(t,n,r){if(n==="undefined"||e.toType(n)==="function"){return this.bind(t,n)}else{return this.delegate(n,t,r)}};e.fn.off=function(t,n,r){if(n==="undefined"||e.toType(n)==="function"){return this.unbind(t,n)}else{return this.undelegate(n,t,r)}};e.fn.ready=function(t){if(u.test(document.readyState)){return t(e)}else{return e.fn.addEvent(document,"DOMContentLoaded",function(){return t(e)})}};e.Event=function(e,t){var n,r;n=document.createEvent("Events");n.initEvent(e,true,true,null,null,null,null,null,null,null,null,null,null,null,null);if(t){for(r in t){n[r]=t[r]}}return n};e.fn.bind=function(e,t){return this.each(function(){l(this,e,t)})};e.fn.unbind=function(e,t){return this.each(function(){h(this,e,t)})};e.fn.delegate=function(t,n,r){return this.each(function(i,u){l(u,n,r,t,function(n){return function(r){var i,o;o=e(r.target).closest(t,u).get(0);if(o){i=e.extend(a(r),{currentTarget:o,liveFired:u});return n.apply(o,[i].concat([].slice.call(arguments,1)))}}})})};e.fn.undelegate=function(e,t,n){return this.each(function(){h(this,t,n,e)})};e.fn.trigger=function(t,n,r){if(e.toType(t)==="string"){t=e.Event(t,n)}if(r!=null){t.originalEvent=r}return this.each(function(){this.dispatchEvent(t)})};e.fn.addEvent=function(e,t,n){if(e.addEventListener){return e.addEventListener(t,n,false)}else if(e.attachEvent){return e.attachEvent("on"+t,n)}else{return e["on"+t]=n}};e.fn.removeEvent=function(e,t,n){if(e.removeEventListener){return e.removeEventListener(t,n,false)}else if(e.detachEvent){return e.detachEvent("on"+t,n)}else{return e["on"+t]=null}};l=function(t,n,r,u,a){var c,l,h,d;n=s(n);h=f(t);l=i[h]||(i[h]=[]);c=a&&a(r,n);d={event:n,callback:r,selector:u,proxy:o(c,r,t),delegate:c,index:l.length};l.push(d);return e.fn.addEvent(t,d.event,d.proxy)};h=function(t,n,r,u){var a;n=s(n);a=f(t);return c(a,n,r,u).forEach(function(n){delete i[a][n.index];return e.fn.removeEvent(t,n.event,n.proxy)})};f=function(e){return e._id||(e._id=t++)};s=function(t){var r;r=e.isMobile()?t:n[t];return r||t};o=function(e,t,n){var r;t=e||t;r=function(e){var r;r=t.apply(n,[e].concat(e.data));if(r===false){e.preventDefault()}return r};return r};c=function(e,t,n,r){return(i[e]||[]).filter(function(e){return e&&(!t||e.event===t)&&(!n||e.callback===n)&&(!r||e.selector===r)})};return a=function(t){var n;n=e.extend({originalEvent:t},t);e.each(r,function(e,r){n[e]=function(){this[r]=function(){return true};return t[e].apply(t,arguments)};return n[r]=function(){return false}});return n}})(Quo)}).call(this);(function(){(function($$){var CURRENT_TOUCH,EVENT,FIRST_TOUCH,GESTURE,GESTURES,HOLD_DELAY,TAPS,TOUCH_TIMEOUT,_angle,_capturePinch,_captureRotation,_cleanGesture,_distance,_fingersPosition,_getTouches,_hold,_isSwipe,_listenTouches,_onTouchEnd,_onTouchMove,_onTouchStart,_parentIfText,_swipeDirection,_trigger;TAPS=null;EVENT=void 0;GESTURE={};FIRST_TOUCH=[];CURRENT_TOUCH=[];TOUCH_TIMEOUT=void 0;HOLD_DELAY=650;GESTURES=["touch","tap","singleTap","doubleTap","hold","swipe","swiping","swipeLeft","swipeRight","swipeUp","swipeDown","rotate","rotating","rotateLeft","rotateRight","pinch","pinching","pinchIn","pinchOut","drag","dragLeft","dragRight","dragUp","dragDown"];GESTURES.forEach(function(e){$$.fn[e]=function(t){var n;n=e==="touch"?"touchend":e;return $$(document.body).delegate(this.selector,n,t)};return this});$$(document).ready(function(){return _listenTouches()});_listenTouches=function(){var e;e=$$(document.body);e.bind("touchstart",_onTouchStart);e.bind("touchmove",_onTouchMove);e.bind("touchend",_onTouchEnd);return e.bind("touchcancel",_cleanGesture)};_onTouchStart=function(e){var t,n,r,i;EVENT=e;r=Date.now();t=r-(GESTURE.last||r);TOUCH_TIMEOUT&&clearTimeout(TOUCH_TIMEOUT);i=_getTouches(e);n=i.length;FIRST_TOUCH=_fingersPosition(i,n);GESTURE.el=$$(_parentIfText(i[0].target));GESTURE.fingers=n;GESTURE.last=r;if(!GESTURE.taps){GESTURE.taps=0}GESTURE.taps++;if(n===1){if(n>=1){GESTURE.gap=t>0&&t<=250}return setTimeout(_hold,HOLD_DELAY)}else if(n===2){GESTURE.initial_angle=parseInt(_angle(FIRST_TOUCH),10);GESTURE.initial_distance=parseInt(_distance(FIRST_TOUCH),10);GESTURE.angle_difference=0;return GESTURE.distance_difference=0}};_onTouchMove=function(e){var t,n,r;EVENT=e;if(GESTURE.el){r=_getTouches(e);t=r.length;if(t===GESTURE.fingers){CURRENT_TOUCH=_fingersPosition(r,t);n=_isSwipe(e);if(n){GESTURE.prevSwipe=true}if(n||GESTURE.prevSwipe===true){_trigger("swiping")}if(t===2){_captureRotation();_capturePinch();e.preventDefault()}}else{_cleanGesture()}}return true};_isSwipe=function(e){var t,n,r;t=false;if(CURRENT_TOUCH[0]){n=Math.abs(FIRST_TOUCH[0].x-CURRENT_TOUCH[0].x)>30;r=Math.abs(FIRST_TOUCH[0].y-CURRENT_TOUCH[0].y)>30;t=GESTURE.el&&(n||r)}return t};_onTouchEnd=function(e){var t,n,r,i,u;EVENT=e;_trigger("touch");if(GESTURE.fingers===1){if(GESTURE.taps===2&&GESTURE.gap){_trigger("doubleTap");_cleanGesture()}else if(_isSwipe()||GESTURE.prevSwipe){_trigger("swipe");u=_swipeDirection(FIRST_TOUCH[0].x,CURRENT_TOUCH[0].x,FIRST_TOUCH[0].y,CURRENT_TOUCH[0].y);_trigger("swipe"+u);_cleanGesture()}else{_trigger("tap");if(GESTURE.taps===1){TOUCH_TIMEOUT=setTimeout(function(){_trigger("singleTap");return _cleanGesture()},100)}}}else{t=false;if(GESTURE.angle_difference!==0){_trigger("rotate",{angle:GESTURE.angle_difference});i=GESTURE.angle_difference>0?"rotateRight":"rotateLeft";_trigger(i,{angle:GESTURE.angle_difference});t=true}if(GESTURE.distance_difference!==0){_trigger("pinch",{angle:GESTURE.distance_difference});r=GESTURE.distance_difference>0?"pinchOut":"pinchIn";_trigger(r,{distance:GESTURE.distance_difference});t=true}if(!t&&CURRENT_TOUCH[0]){if(Math.abs(FIRST_TOUCH[0].x-CURRENT_TOUCH[0].x)>10||Math.abs(FIRST_TOUCH[0].y-CURRENT_TOUCH[0].y)>10){_trigger("drag");n=_swipeDirection(FIRST_TOUCH[0].x,CURRENT_TOUCH[0].x,FIRST_TOUCH[0].y,CURRENT_TOUCH[0].y);_trigger("drag"+n)}}_cleanGesture()}return EVENT=void 0};_fingersPosition=function(e,t){var n,r;r=[];n=0;e=e[0].targetTouches?e[0].targetTouches:e;while(n<t){r.push({x:e[n].pageX,y:e[n].pageY});n++}return r};_captureRotation=function(){var angle,diff,i,symbol;angle=parseInt(_angle(CURRENT_TOUCH),10);diff=parseInt(GESTURE.initial_angle-angle,10);if(Math.abs(diff)>20||GESTURE.angle_difference!==0){i=0;symbol=GESTURE.angle_difference<0?"-":"+";while(Math.abs(diff-GESTURE.angle_difference)>90&&i++<10){eval("diff "+symbol+"= 180;")}GESTURE.angle_difference=parseInt(diff,10);return _trigger("rotating",{angle:GESTURE.angle_difference})}};_capturePinch=function(){var e,t;t=parseInt(_distance(CURRENT_TOUCH),10);e=GESTURE.initial_distance-t;if(Math.abs(e)>10){GESTURE.distance_difference=e;return _trigger("pinching",{distance:e})}};_trigger=function(e,t){if(GESTURE.el){t=t||{};if(CURRENT_TOUCH[0]){t.iniTouch=GESTURE.fingers>1?FIRST_TOUCH:FIRST_TOUCH[0];t.currentTouch=GESTURE.fingers>1?CURRENT_TOUCH:CURRENT_TOUCH[0]}return GESTURE.el.trigger(e,t,EVENT)}};_cleanGesture=function(e){FIRST_TOUCH=[];CURRENT_TOUCH=[];GESTURE={};return clearTimeout(TOUCH_TIMEOUT)};_angle=function(e){var t,n,r;t=e[0];n=e[1];r=Math.atan((n.y-t.y)*-1/(n.x-t.x))*(180/Math.PI);if(r<0){return r+180}else{return r}};_distance=function(e){var t,n;t=e[0];n=e[1];return Math.sqrt((n.x-t.x)*(n.x-t.x)+(n.y-t.y)*(n.y-t.y))*-1};_getTouches=function(e){if($$.isMobile()){return e.touches}else{return[e]}};_parentIfText=function(e){if("tagName"in e){return e}else{return e.parentNode}};_swipeDirection=function(e,t,n,r){var i,u;i=Math.abs(e-t);u=Math.abs(n-r);if(i>=u){if(e-t>0){return"Left"}else{return"Right"}}else{if(n-r>0){return"Up"}else{return"Down"}}};return _hold=function(){if(GESTURE.last&&Date.now()-GESTURE.last>=HOLD_DELAY){_trigger("hold");return GESTURE.taps=0}}})(Quo)}).call(this);(function(){(function(e){e.fn.text=function(t){if(t||e.toType(t)==="number"){return this.each(function(){return this.textContent=t})}else{return this[0].textContent}};e.fn.html=function(t){var n;n=e.toType(t);if(t||n==="number"||n==="string"){return this.each(function(){var e,r,i,u;if(n==="string"||n==="number"){return this.innerHTML=t}else{this.innerHTML=null;if(n==="array"){u=[];for(r=0,i=t.length;r<i;r++){e=t[r];u.push(this.appendChild(e))}return u}else{return this.appendChild(t)}}})}else{return this[0].innerHTML}};e.fn.append=function(t){var n;n=e.toType(t);return this.each(function(){var e=this;if(n==="string"){return this.insertAdjacentHTML("beforeend",t)}else if(n==="array"){return t.each(function(t,n){return e.appendChild(n)})}else{return this.appendChild(t)}})};e.fn.prepend=function(t){var n;n=e.toType(t);return this.each(function(){var e=this;if(n==="string"){return this.insertAdjacentHTML("afterbegin",t)}else if(n==="array"){return t.each(function(t,n){return e.insertBefore(n,e.firstChild)})}else{return this.insertBefore(t,this.firstChild)}})};e.fn.replaceWith=function(t){var n;n=e.toType(t);this.each(function(){var e=this;if(this.parentNode){if(n==="string"){return this.insertAdjacentHTML("beforeBegin",t)}else if(n==="array"){return t.each(function(t,n){return e.parentNode.insertBefore(n,e)})}else{return this.parentNode.insertBefore(t,this)}}});return this.remove()};return e.fn.empty=function(){return this.each(function(){return this.innerHTML=null})}})(Quo)}).call(this);(function(){(function(e){var t,n,r,i,u,a;r="parentNode";t=/^\.([\w-]+)$/;n=/^#[\w\d-]+$/;i=/^[\w-]+$/;e.query=function(e,r){var u;r=r.trim();if(t.test(r)){u=e.getElementsByClassName(r.replace(".",""))}else if(i.test(r)){u=e.getElementsByTagName(r)}else if(n.test(r)&&e===document){u=e.getElementById(r.replace("#",""));if(!u){u=[]}}else{u=e.querySelectorAll(r)}if(u.nodeType){return[u]}else{return Array.prototype.slice.call(u)}};e.fn.find=function(t){var n;if(this.length===1){n=Quo.query(this[0],t)}else{n=this.map(function(){return Quo.query(this,t)})}return e(n)};e.fn.parent=function(e){var t;t=e?a(this):this.instance(r);return u(t,e)};e.fn.siblings=function(e){var t;t=this.map(function(e,t){return Array.prototype.slice.call(t.parentNode.children).filter(function(e){return e!==t})});return u(t,e)};e.fn.children=function(e){var t;t=this.map(function(){return Array.prototype.slice.call(this.children)});return u(t,e)};e.fn.get=function(e){if(e===undefined){return this}else{return this[e]}};e.fn.first=function(){return e(this[0])};e.fn.last=function(){return e(this[this.length-1])};e.fn.closest=function(t,n){var r,i;i=this[0];r=e(t);if(!r.length){i=null}while(i&&r.indexOf(i)<0){i=i!==n&&i!==document&&i.parentNode}return e(i)};e.fn.each=function(e){this.forEach(function(t,n){return e.call(t,n,t)});return this};a=function(t){var n;n=[];while(t.length>0){t=e.map(t,function(e){if((e=e.parentNode)&&e!==document&&n.indexOf(e)<0){n.push(e);return e}})}return n};return u=function(t,n){if(n===undefined){return e(t)}else{return e(t).filter(n)}}})(Quo)}).call(this);(function(){(function(e){var t,n,r;t=["-webkit-","-moz-","-ms-","-o-",""];e.fn.addClass=function(e){return this.each(function(){if(!r(e,this.className)){this.className+=" "+e;return this.className=this.className.trim()}})};e.fn.removeClass=function(e){return this.each(function(){if(!e){return this.className=""}else{if(r(e,this.className)){return this.className=this.className.replace(e," ").replace(/\s+/g," ").trim()}}})};e.fn.toggleClass=function(e){return this.each(function(){if(r(e,this.className)){return this.className=this.className.replace(e," ")}else{this.className+=" "+e;return this.className=this.className.trim()}})};e.fn.hasClass=function(e){return r(e,this[0].className)};e.fn.style=function(e,t){if(t){return this.each(function(){return this.style[e]=t})}else{return this[0].style[e]||n(this[0],e)}};e.fn.css=function(e,t){return this.style(e,t)};e.fn.vendor=function(e,n){var r,i,u,a;a=[];for(i=0,u=t.length;i<u;i++){r=t[i];a.push(this.style(""+r+e,n))}return a};r=function(e,t){var n;n=t.split(/\s+/g);return n.indexOf(e)>=0};return n=function(e,t){return document.defaultView.getComputedStyle(e,"")[t]}})(Quo)}).call(this);
/* lungo v2.2.1 - 2013/8/14
   http://lungo.tapquo.com
   Copyright (c) 2013 Tapquo S.L. - Licensed GPLv3, Commercial */
!function(){var a;window.Lungo=a={};a.VERSION="2.2.1";a.DEVICE=null;a.Config||(a.Config={});a.Element||(a.Element={});a.Data||(a.Data={});a.Sugar||(a.Sugar={});a.View||(a.View={});a.Boot||(a.Boot={});a.Device||(a.Device={});a.ready||(a.ready=Quo().ready)}.call(this);!function(){Lungo.Attributes={count:{selector:"*",html:'<span class="tag count">{{value}}</span>'},pull:{selector:"*",html:'<div data-control="pull" data-icon="{{value}}" data-loading>\n  <strong></strong>\n</div>'},progress:{selector:"*",html:'<div class="progress">\n  <span class="bar"><span class="value" style="width:{{value}};"></span></span>\n</div>'},label:{selector:"*",html:"<abbr>{{value}}</abbr>"},icon:{selector:"*",html:'<span class="icon {{value}}"></span>'},image:{selector:"*",html:'<img src="{{value}}" class="icon" />'},title:{selector:"header",html:'<h1 class="title centered">{{value}}</h1>'},loading:{selector:"*",html:'<div class="loading {{value}}">\n  <span class="top"></span>\n  <span class="right"></span>\n  <span class="bottom"></span>\n  <span class="left"></span>\n</div>'},back:{selector:"header",html:'<nav class="left"><a href="#" data-view-section="back"><span class="icon {{value}}"></span></a></nav>'}}}.call(this);!function(){Lungo.Cache=function(a){var b,c,d,e,f;f={};e=function(d,e){if(b(d)){return f[d]=a.Core.mix(c(d),e)}else{return f[d]=e}};c=function(a,b){if(arguments.length===1){return f[a]}else{if(f[arguments[0]]){return f[arguments[0]][arguments[1]]}else{return void 0}}};d=function(a,b){if(arguments.length===1){return delete f[a]}else{return delete f[arguments[0]][arguments[1]]}};b=function(a){if(f[a]){return true}else{return false}};return{set:e,get:c,remove:d,exists:b}}(Lungo)}.call(this);!function(){Lungo.Constants={ELEMENT:{SECTION:"section",ARTICLE:"article",ASIDE:"aside",BODY:"body",DIV:"div",LIST:"<ul></ul>",LI:"li"},CONTROL:{MENU:"[data-control=menu]"},QUERY:{ARTICLE_ROUTER:"[data-view-article]",SECTION_ROUTER:"[data-view-section]",ARTICLE_ROUTER_TOUCH:"header [data-view-article], footer [data-view-article], nav[data-control] [data-view-article]",SECTION_ROUTER_TOUCH:"header [data-view-section], footer [data-view-section], nav[data-control] [data-view-section]",ARTICLE_ROUTER_TAP:"article [data-view-article]",SECTION_ROUTER_TAP:"article [data-view-section]",ASIDE_ROUTER:"[data-view-aside]",MENU_ROUTER:"[data-view-menu]",LIST_IN_ELEMENT:"article.list",ELEMENT_SCROLLABLE:"article.scroll",HREF_ASIDE:"section[data-aside].drag",HREF_ROUTER:"a[href][data-router]",MENU_HREF:"[data-control=menu] a[href]",CONTROL_CHECKBOX:"[data-control-checkbox]",NAVIGATION_ITEM:'a[href][data-router="article"]',ARTICLE_REFERENCE:"[data-article]",TITLE:"header .title, footer .title",ACTIVE_LIST_ITEM:"li a.active, li.active"},CLASS:{ACTIVE:"active",ASIDE:"aside",SHOW:"show",HIDE:"hide",HIDING:"hiding",RIGHT:"right",LEFT:"left",HORIZONTAL:"horizontal",SMALL:"small",LAST:"last"},TRIGGER:{LOAD:"load",UNLOAD:"unload"},EVENT:{TRANSITION_END:["webkitAnimationEnd","animationend"],CHANGE:"change"},TRANSITION:{DURATION:400,ORIGIN:"transition-origin",ATTR:"transition"},ASIDE:{NORMAL:264},ATTRIBUTE:{ID:"id",HREF:"href",TITLE:"title",ARTICLE:"article",CLASS:"class",WIDTH:"width",HEIGHT:"height",PIXEL:"px",PERCENT:"%",ROUTER:"router",FIRST:"first",LAST:"last",EMPTY:"",CHILDREN:"children",TRANSITION:"transition",STATE:"state",DIRECTION:"direction"},BINDING:{START:"{{",END:"}}",KEY:"value",SELECTOR:"{{value}}"},DEVICE:{PHONE:"phone",TABLET:"tablet",TV:"tv"},ERROR:{DATABASE:"ERROR: Connecting to Data.Sql.",DATABASE_TRANSACTION:"ERROR: Data.Sql >> ",ROUTER:"ERROR: The target does not exists >>",LOADING_RESOURCE:"ERROR: Loading resource: "}}}.call(this);!function(){Lungo.Core=function(a,b){var c,d,e,f,g,h,i,j,k,l,m,n;c=Array.prototype;j=function(b,c){if(!a.Core.isMobile()){return console[b===1?"log":b===2?"warn":"error"](c)}};f=function(){var a,b;a=m(arguments);b=a.shift();if(n(b)==="function"){return b.apply(null,a)}};d=function(a,b){return function(){return b.apply(a,m(arguments))}};k=function(){var a,b,c,d,e;c=c||{};a=0;d=arguments.length;while(a<d){b=arguments[a];for(e in b){if(i(b,e)){c[e]=b[e]}}a++}return c};i=function(a,c){return b.isOwnProperty(a,c)};n=function(a){return b.toType(a)};m=function(a){return c.slice.call(a,0)};h=function(){return b.isMobile()};e=function(){return b.environment()};l=function(a,b,c){var d;d=c==="desc"?-1:1;return a.sort(function(a,c){if(a[b]<c[b]){return-d}else{if(a[b]>c[b]){return d}else{return 0}}})};g=function(a,b,c){var d,e,f,g;g=null;e=0;f=a.length;while(e<f){d=a[e];if(d[b]===c){g=d;break}e++}return g};return{log:j,execute:f,bind:d,mix:k,isOwnProperty:i,toType:n,toArray:m,isMobile:h,environment:e,orderByProperty:l,findByProperty:g}}(Lungo,Quo)}.call(this);!function(){Lungo.dom=function(a){return $$(a)}}.call(this);!function(){Lungo.Events=function(a){var b,c;b=" ";c=function(c){var d,e,f,g,h;h=[];for(e in c){g=e.indexOf(b);if(g>0){f=e.substring(0,g);d=e.substring(g+1);h.push(a.dom(document.body).delegate(d,f,c[e]))}else{h.push(void 0)}}return h};return{init:c}}(Lungo)}.call(this);!function(){Lungo.Fallback=function(a){var b;b=function(){var b,c;b=a.Core.environment();c=b.isMobile&&b.os.name==="Android"&&b.os.version<"3"?"absolute":"fixed";return a.dom(document.body).data("position",c)};return{fixPositionInAndroid:b}}(Lungo)}.call(this);!function(){Lungo.init=function(a){var b;Lungo.Config=a;if(a&&a.resources){Lungo.Resource.load(a.resources)}Lungo.Boot.Device.init();b=Lungo.DEVICE===Lungo.Constants.DEVICE.PHONE;Lungo.Router=b?Lungo.RouterPhone:Lungo.RouterTablet;Lungo.Boot.Events.init();Lungo.Boot.Data.init();return Lungo.Boot.Layout.init()}}.call(this);!function(){Lungo.Notification=function(a){var b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y;v=[];q=null;y=null;d=1;b=a.Constants.ATTRIBUTE;c=a.Constants.BINDING;h=a.Constants.TRANSITION;f={BODY:"body",NOTIFICATION:".notification",MODAL:".notification .window",MODAL_HREF:".notification .window a",WINDOW_CLOSABLE:".notification [data-action=close], .notification > .error, .notification > .success",CONFIRM_BUTTONS:".notification .confirm button, .notification .push"};g={MODAL:"modal",VISIBLE:"visible",SHOW:"show",WORKING:"working",INPUT:"input"};e='<div class="notification"><div class="window"></div></div>';n=function(b,d,e,f){var g,h;h=void 0;if(b!=null){h=t(d,null,b)}else{g=a.Attributes.loading.html;h=g.replace(c.START+c.KEY+c.END,"white")}w(h,"growl");return r(e,f)};k=function(){y.removeClass("show");return setTimeout(function(){return q.removeClass("show").removeClass("html").removeClass("confirm").removeClass("notify").removeClass("growl")},h.DURATION/2)};i=function(a){var b;v=a;b=t(a.title,a.description,a.icon);b+=p(a.accept,"accept");b+=p(a.cancel,"cancel");return w(b,"confirm")};o=function(a,b,c,d,e){if(c==null){c="ok"}return u(a,b,c,"success",d,e)};j=function(a,b,c,d,e){if(c==null){c="remove-sign"}return u(a,b,c,"error",d,e)};l=function(a,b,c,d){if(b){a+='<button class="anchor" data-action="close">'+b+"</button>"}w(a,"html "+c);return r(d)};m=function(a,b,c){w(t(a,null,b),"push "+c,false);return r(5)};s=function(){a.dom(f.BODY).append(e);q=a.dom(f.NOTIFICATION);y=q.children(".window");return x()};w=function(a,b,c){if(c==null){c=true}if(c){q.removeClass("push")}else{q.addClass("push")}if(!y.hasClass("show")){q.addClass("show")}else{y.removeClass(g.SHOW)}return setTimeout(function(){y.html(a);return y.attr("class","window "+b+" show")},h.DURATION/2)};r=function(a,b){var c=this;if(a!=null&&a>0){return setTimeout(function(){if(b){return b.call(void 0,b)}else{return k()}},a*1e3)}};u=function(a,b,c,d,e,f){w(t(a,b,c),d);return r(e,f)};t=function(a,b,c){b=!b?"&nbsp;":b;a=!a?"&nbsp;":a;return'<span class="icon '+c+'"></span><strong class="text bold">'+a+"</strong><small>"+b+"</small>"};p=function(a,b){return'<button data-callback="'+b+'" class="anchor">'+a.label+"</a>"};x=function(){a.dom(f.CONFIRM_BUTTONS).touch(function(b){var c,d;c=a.dom(this);if(v[c.data("callback")]!=null){d=v[c.data("callback")].callback;v=null;if(d!=null){d.call(void 0,d)}}return k()});return a.dom(f.WINDOW_CLOSABLE).tap(k)};s();return{show:n,hide:k,error:j,success:o,confirm:i,html:l,push:m}}(Lungo)}.call(this);!function(){Lungo.Resource=function(a,b){var c,d,e,f,g,h;c=a.Constants.ELEMENT;d=a.Constants.ERROR;e=function(b,c){var d,e,g;if(a.Core.toType(b)==="array"){d=0;e=b.length;g=[];while(d<e){f(b[d]);g.push(d++)}return g}else{return f(b,c)}};f=function(b,c){var d;try{return h(g(b),c)}catch(e){d=e;return a.Core.log(3,d.message)}};g=function(a){return b.ajax({url:a,async:false,dataType:"html",error:function(){return console.error(d.LOADING_RESOURCE+a)}})};h=function(b,d){if(a.Core.toType(b)==="string"){d=d?d:c.BODY;return a.dom(d).append(b)}};return{load:e}}(Lungo,Quo)}.call(this);!function(){!function(a,b){var c,d,e,f,g,h,i,j,k,l,m,n;g=a.document;h=g.documentElement;d="scroll-enabled";c="ontouchmove"in g;l="WebkitOverflowScrolling"in h.style||!c&&a.screen.width>1200||function(){var b,c,d,e;b=a.navigator.userAgent;c=b.match(/AppleWebKit\/([0-9]+)/);e=c&&c[1];d=c&&e>=534;return b.match(/Android ([0-9]+)/)&&RegExp.$1>=3&&d||b.match(RegExp(" Version\\/([0-9]+)"))&&RegExp.$1>=0&&a.blackberry&&d||b.indexOf(/PlayBook/)>-1&&RegExp.$1>=0&&d||b.match(/Fennec\/([0-9]+)/)&&RegExp.$1>=4||b.match(/wOSBrowser\/([0-9]+)/)&&RegExp.$1>=233&&d||b.match(/NokiaBrowser\/([0-9\.]+)/)&&parseFloat(RegExp.$1)===7.3&&c&&e>=533}();f=function(a,b,c,d){return c*((a=a/d-1)*a*a+1)+b};j=false;m=void 0;n=function(b,c){var d,e,f,g,h,i,j;f=0;i=b.scrollLeft;j=b.scrollTop;h={top:"+0",left:"+0",duration:100,easing:a.overthrow.easing};d=void 0;e=void 0;if(c){for(g in h){if(c[g]!==void 0){h[g]=c[g]}}}if(typeof h.left==="string"){h.left=parseFloat(h.left);d=h.left+i}else{d=h.left;h.left=h.left-i}if(typeof h.top==="string"){h.top=parseFloat(h.top);e=h.top+j}else{e=h.top;h.top=h.top-j}m=setInterval(function(){if(f++<h.duration){b.scrollLeft=h.easing(f,i,h.left,h.duration);return b.scrollTop=h.easing(f,j,h.top,h.duration)}else{if(d!==b.scrollLeft){b.scrollLeft=d}if(e!==b.scrollTop){b.scrollTop=e}return k()}},1);return{top:e,left:d,duration:h.duration,easing:h.easing}};e=function(a,b){return!b&&a.className&&a.className.indexOf("scroll")>-1&&a||e(a.parentNode)};k=function(){return clearInterval(m)};i=function(){var b,i,m,o,p,q,r,s,t,u,v,w;if(j){return}j=true;if(l||c){h.className+=" "+d}a.overthrow.forget=function(){h.className=h.className.replace(d,"");if(g.removeEventListener){g.removeEventListener("touchstart",w,false)}a.overthrow.easing=f;return j=false};if(l||!c){return}i=void 0;s=[];q=[];p=void 0;r=void 0;u=function(){s=[];return p=null};t=function(){q=[];return r=null};m=function(){var a,b,c;c=(s[0]-s[s.length-1])*8;b=(q[0]-q[q.length-1])*8;a=Math.max(Math.abs(b),Math.abs(c))/8;c=(c>0?"+":"")+c;b=(b>0?"+":"")+b;if(!isNaN(a)&&a>0&&(Math.abs(b)>80||Math.abs(c)>80)){return n(i,{left:b,top:c,duration:a})}};o=void 0;v=function(a){var b,c,d;o=i.querySelectorAll("textarea, input");b=0;c=o.length;d=[];while(b<c){o[b].style.pointerEvents=a;d.push(b++)}return d};b=function(a,b){var c,d;if(g.createEvent){c=(!b||b===void 0)&&i.parentNode||i.touchchild||i;d=void 0;if(c!==i){d=g.createEvent("HTMLEvents");d.initEvent("touchend",true,true);i.dispatchEvent(d);c.touchchild=i;i=c;return c.dispatchEvent(a)}}};w=function(a){var c,d,f,g,j,l,n,o,w,x,y;k();u();t();i=e(a.target);if(!i||i===h||a.touches.length>1){return}v("none");x=a;l=i.scrollTop;j=i.scrollLeft;d=i.offsetHeight;y=i.offsetWidth;w=a.touches[0].pageY;o=a.touches[0].pageX;g=i.scrollHeight;n=i.scrollWidth;f=function(a){var c,e,f,h;h=l+w-a.touches[0].pageY;f=j+o-a.touches[0].pageX;c=h>=(s.length?s[0]:0);e=f>=(q.length?q[0]:0);if(h>0&&h<g-d||f>0&&f<n-y){a.preventDefault()}else{b(x)}if(p&&c!==p){u()}if(r&&e!==r){t()}p=c;r=e;i.scrollTop=h;i.scrollLeft=f;s.unshift(h);q.unshift(f);if(s.length>3){s.pop()}if(q.length>3){return q.pop()}};c=function(a){m();v("auto");setTimeout(function(){return v("none")},450);i.removeEventListener("touchmove",f,false);return i.removeEventListener("touchend",c,false)};i.addEventListener("touchmove",f,false);return i.addEventListener("touchend",c,false)};return g.addEventListener("touchstart",w,false)};a.overthrow={set:i,forget:function(){},easing:f,toss:n,intercept:k,closest:e,support:l?"native":c&&"polyfilled"||"none"};return i()}(this)}.call(this);!function(){Lungo.Service=function(a,b){var c,d,e,f,g,h,i,j,k,l,m;d="lungojs_service_cache";c={MINUTE:"minute",HOUR:"hour",DAY:"day"};f=function(a,c,d,e){return b.get(a,c,d,e)};h=function(a,c,d,e){return b.post(a,c,d,e)};g=function(a,c,d){return b.json(a,c,d)};e=function(c,d,e,f,g){var h,i;h=c+b.serializeParameters(d);if(m(h,e)){i=a.Data.Storage.persistent(h);if(i){return f.call(f,i)}}else{return b.get(c,d,function(a){l(h,a);return f.call(f,a)},g)}};m=function(b,c){var e,f,g;e=false;g=a.Data.Storage.persistent(d);if(g){f=j(g[b]);e=k(f,c)}return e};j=function(a){var b,c;b=(new Date).getTime();c=new Date(a).getTime();return b-c};k=function(a,b){var c,d;d=b.split(" ");c=i(d[1],a);if(c<d[0]){return true}else{return false}};i=function(a,b){var d;d=b/1e3/60;if(a.indexOf(c.HOUR)>=0){d=d/60}else{if(a.indexOf(c.DAY)>=0){d=d/60/24}}return d};l=function(b,c){var e;e=a.Data.Storage.persistent(d)||{};e[b]=new Date;a.Data.Storage.persistent(d,e);return a.Data.Storage.persistent(b,c)};return{get:f,post:h,json:g,cache:e,Settings:b.ajaxSettings}}(Lungo,Quo)}.call(this);!function(){Lungo.RouterPhone=function(a){var b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r;b=a.Constants;c="#";k=[];j=false;h=function(d){var e,f,g;if(j){return false}e=a.Element.Cache.section;if(l(e,d)){g=b.ELEMENT.SECTION+c+d;f=e?e.siblings(g):a.dom(g);if(f.length){n(f,e);a.Router.step(d);if(Lungo.Config.history!==false){return r()}}}else if(a.Element.Cache.aside){return a.Aside.hide()}};f=function(){var d,e,f;if(j){return false}m();d=a.Element.Cache.section;f=b.ELEMENT.SECTION+c+g();e=d.siblings(f);if(e.length){n(e,d,true);if(Lungo.Config.history!==false){r()}return q()}};e=function(c,d,e){var f;if(l(a.Element.Cache.article,d)){a.Router.section(c);f=a.Element.Cache.section.find("#"+d);if(f.length>0){a.Element.Cache.article.removeClass(b.CLASS.ACTIVE).trigger(b.TRIGGER.UNLOAD);a.Element.Cache.article=f.addClass(b.CLASS.ACTIVE).trigger(b.TRIGGER.LOAD);if((e!=null?e.data(b.ATTRIBUTE.TITLE):void 0)!=null){a.Element.Cache.section.find(b.QUERY.TITLE).text(e.data(b.ATTRIBUTE.TITLE))}if(Lungo.Config.history!==false){r()}return q()}}};d=function(c){var d;h=a.dom(c.target);d=h.data(b.ATTRIBUTE.DIRECTION);if(h.data("original-transition")){h.data(b.TRANSITION.ATTR,h.data("original-transition"));h.removeAttr("data-original-transition")}if(d==="out"||d==="back-out"){h.removeClass(b.CLASS.SHOW)}h.removeAttr("data-"+b.ATTRIBUTE.DIRECTION);return j=false};i=function(a){if(a!==g()){return k.push(a)}};g=function(){return k[k.length-1]};n=function(b,c,d){var e;if(d==null){d=false}e=function(){p(b,c,d);return q()};if(a.Element.Cache.aside){return a.Aside.hide(e)}else{return e()}};p=function(b,c,d){a.Section.show(c,b);if(c!=null){return o(b,c,d)}};o=function(a,c,d){var e;if(d==null){d=false}if(c==null||!a.length){return false}j=true;e=d?"back-":"";if(!d){c.data("original-transition",c.data(b.TRANSITION.ATTR));c.data(b.TRANSITION.ATTR,a.data(b.TRANSITION.ATTR))}else{a.data("original-transition",a.data(b.TRANSITION.ATTR));a.data(b.TRANSITION.ATTR,c.data(b.TRANSITION.ATTR))}a.addClass(b.CLASS.SHOW);if(a.data(b.TRANSITION.ATTR)){a.data(b.ATTRIBUTE.DIRECTION,""+e+"in")}if(c.data(b.TRANSITION.ATTR)){return c.data(b.ATTRIBUTE.DIRECTION,""+e+"out")}else{return c.removeClass(b.CLASS.SHOW)}};l=function(a,c){return(a!=null?a.attr(b.ATTRIBUTE.ID):void 0)!==c};r=function(){var b,c,d;b="";for(c=0,d=k.length;c<d;c++){h=k[c];b+=""+h+"/"}b+=a.Element.Cache.article.attr("id");return setTimeout(function(){return window.location.hash=b},0)};q=function(){var c,d,e;c=a.Element.Cache.article.attr(b.ATTRIBUTE.ID);d=a.dom(b.QUERY.ARTICLE_ROUTER).removeClass(b.CLASS.ACTIVE);d.filter("[data-view-article="+c+"]").addClass(b.CLASS.ACTIVE);e=a.Element.Cache.section.find(b.QUERY.ARTICLE_REFERENCE).addClass(b.CLASS.HIDE);return e.filter("[data-article*='"+c+"']").removeClass(b.CLASS.HIDE)};m=function(){if(k.length>1){return k.length-=1}};return{section:h,back:f,article:e,history:g,step:i,animationEnd:d}}(Lungo)}.call(this);!function(){Lungo.RouterTablet=function(a){var b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C;b=a.Constants;c="#";o=[];j=false;l=void 0;n=false;h=function(d){var e,f,g;if(j){return false}e=a.Element.Cache.section;if(r(e,d)){g=b.ELEMENT.SECTION+c+d;f=e?e.siblings(g):a.dom(g);if(f.length){if(e&&q(e)&&q(f)){A(e,f)}else{v(f,e)}i(d);if(Lungo.Config.history!==false){C()}return B()}}};f=function(d){var e,f,h,i,l;if(d==null){d=true}if(j){return false}if(!u()){l=a.dom(event.target).closest(b.ELEMENT.SECTION);if(l.length){h=0;while(g()!==l.attr("id")&&h++<10){k(a.dom(b.ELEMENT.SECTION+c+g()),"back-out");t()}a.Element.Cache.section=l}}t();e=a.Element.Cache.section;i=b.ELEMENT.SECTION+c+g();f=e.siblings(i);if(f.length){if(e&&q(e)&&q(f)){A(e,f)}else{v(f,e,true,d)}if(Lungo.Config.history!==false){C()}return B()}};e=function(c,d,e){var g;if(!u()&&c!==a.Element.Cache.section.attr("id")){f(false)}g=a.dom("article#"+d);if(g.length>0){h=g.closest(b.ELEMENT.SECTION);a.Router.section(h.attr("id"));h=a.Element.Cache.section;h.children(""+b.ELEMENT.ARTICLE+"."+b.CLASS.ACTIVE).removeClass(b.CLASS.ACTIVE).trigger(b.TRIGGER.UNLOAD);a.Element.Cache.article.removeClass(b.CLASS.ACTIVE).trigger(b.TRIGGER.UNLOAD);a.Element.Cache.article=g.addClass(b.CLASS.ACTIVE).trigger(b.TRIGGER.LOAD);if((e!=null?e.data(b.ATTRIBUTE.TITLE):void 0)!=null){h.find(b.QUERY.TITLE).text(e.data(b.ATTRIBUTE.TITLE))}if(Lungo.Config.history!==false){C()}return B(d)}};d=function(c){var d;h=a.dom(c.target);d=h.data(b.ATTRIBUTE.DIRECTION);if(d){if(d==="out"||d==="back-out"){h.removeClass(b.CLASS.SHOW)}h.removeAttr("data-"+b.ATTRIBUTE.DIRECTION);if(l!=null){n=true;v(l,void 0);l=void 0}}if(h.hasClass("asideHidding")){h.removeClass("asideHidding").removeClass("aside")}if(h.hasClass("asideShowing")){h.removeClass("asideShowing").addClass("aside")}if(h.hasClass("shadowing")){h.removeClass("shadowing").addClass("shadow")}if(h.hasClass("unshadowing")){h.removeClass("unshadowing").removeClass("shadow")}return j=false};i=function(a){if(a!==g()){return o.push(a)}};g=function(){return o[o.length-1]};v=function(b,c,d){if(d==null){d=false}if(c==null){a.Section.show(void 0,b);z(b)}else{if(d){x(c,b)}else{y(c,b)}a.Section.show(c,b)}return n=false};q=function(a){return a.data("children")==null&&a.data("aside")==null};A=function(b,c){a.Section.show(b,c);b.removeClass("show");return c.addClass("show")};z=function(c){var d;if(!n||!((d=a.Element.Cache.section)!=null?d.data("aside"):void 0)){c.addClass(b.CLASS.SHOW)}else{k(c,"in")}return m(void 0,c)};y=function(c,d){var e,f,g;if(p(c,d)){k(d,"in")}else{f="section."+b.CLASS.SHOW;g=s(d);if(g){f+=":not(#"+g+")"}e=a.dom(f);k(e,"back-out");l=d}return m(c,d)};x=function(c,d){var e;k(c,"back-out");e=a.dom("section."+b.CLASS.SHOW+":not(#"+c.attr("id")+")");if(e.length===1&&e.first().data("children")!=null){a.Aside.show(e.first().data("aside"))}return l=d};m=function(b,c){var d,e;d=c.data("aside");e=a.Element.Cache.aside;if(d){if(!(b!=null&&a.Element.Cache.aside!=null)){return w(d,c)}else if(!e.hasClass("box")){return a.Aside.hide()}}else{return a.Aside.hide()}};w=function(b,c){var d;d=c.data("children")?false:true;return a.Aside.show(b,d)};s=function(b){var c;c=a.dom("[data-children~="+b.attr("id")+"]");if(c.length){return c.attr("id")}return null};p=function(a,b){var c,d;c=a.data("children");if(!c){return false}d=b.attr("id");return c.indexOf(d)!==-1};k=function(a,c){var d,e;e=c.indexOf("in")>=0;d=false;if(e){if(!a.hasClass(b.CLASS.SHOW)){d=true}}else{d=true}if(d){if(e){a.addClass(b.CLASS.HIDE);a.addClass(b.CLASS.SHOW);return setTimeout(function(){return a.data(b.ATTRIBUTE.DIRECTION,c).removeClass(b.CLASS.HIDE)},10)}else{a.addClass(b.CLASS.SHOW);return a.data(b.ATTRIBUTE.DIRECTION,c)}}};u=function(){var b,c;if(!event||!a.Element.Cache.section){return true}b=a.dom(event.target).closest("section,aside");if(b.length){c=b.attr("id")===a.Element.Cache.section.attr("id")}else{c=true}return c};r=function(a,c){return(a!=null?a.attr(b.ATTRIBUTE.ID):void 0)!==c};C=function(){var b,c,d;b="";for(c=0,d=o.length;c<d;c++){h=o[c];b+=""+h+"/"}b+=a.Element.Cache.article.attr("id");return setTimeout(function(){return window.location.hash=b},0)};B=function(c){var d,e,f,g,h;if(!c){c=(h=a.Element.Cache.article)!=null?h.attr(b.ATTRIBUTE.ID):void 0}a.Element.Cache.section.find(b.QUERY.ARTICLE_ROUTER).removeClass(b.CLASS.ACTIVE);if(a.Element.Cache.section.data("aside")!=null){g=a.dom("aside#"+a.Element.Cache.section.data("aside"));g.find(b.QUERY.ARTICLE_ROUTER).removeClass(b.CLASS.ACTIVE)}a.dom("[data-view-article="+c+"]").addClass(b.CLASS.ACTIVE);f=a.Element.Cache.section.find(b.QUERY.ARTICLE_REFERENCE).addClass(b.CLASS.HIDE);f.filter("[data-article~='"+c+"']").removeClass(b.CLASS.HIDE);if(a.Element.Cache.aside){e=a.Element.Cache.section.attr("id");d=a.Element.Cache.aside;d.find(b.QUERY.SECTION_ROUTER+"."+b.CLASS.ACTIVE).removeClass("active");return d.find("[data-view-section="+e+"]").addClass(b.CLASS.ACTIVE)}};t=function(){if(o.length>1){return o.length-=1}};return{section:h,back:f,article:e,history:g,step:i,animationEnd:d,historys:function(){return o}}}(Lungo)}.call(this);!function(){Lungo.Aside=function(a){var b,c,d,e,f,g,h,i,j,k,l,m,n,o,p;c=a.Constants;m=void 0;e="__customKFShow__";d="__customKFHide__";b="300ms";o=void 0;p="";a.ready(function(){var b,c;b=((c=a.Core.environment().browser.match(/mozilla|firefox/gi))!=null?c.length:void 0)>0;return p=b?"":"-webkit-"});i=function(d,e,f){var g,h,i,j,l,m,o,q,r;if(e==null){e=false}if(f==null){f=-1}h=a.dom("#"+d);if(h.length){if(!k(d)){if(!e){a.Element.Cache.aside=h;if(a.DEVICE===c.DEVICE.PHONE){h.addClass(c.CLASS.SHOW);if(f!==-1){g=n(f)+" "+b;return a.Element.Cache.section.style(""+p+"animation",g)}else{j=h.data(c.TRANSITION.ATTR)||"left";return a.Element.Cache.section.data("aside-"+j,"show")}}else{h.addClass(c.CLASS.SHOW);i=a.dom("[data-aside="+d+"][data-children]");if(i.attr("id")!==((r=a.Element.Cache.section)!=null?r.attr("id"):void 0)){a.Element.Cache.section.addClass("shadowing");m=i.data("children");m=m.split(" ");for(o=0,q=m.length;o<q;o++){l=m[o];l=a.dom(c.ELEMENT.SECTION+"#"+l);if(l.length&&l.hasClass(c.CLASS.SHOW)){l.addClass("shadowing")}}}return i.removeClass("aside").addClass("asideShowing")}}else{a.Element.Cache.aside=h;return h.addClass(c.CLASS.SHOW).addClass("box")}}}};h=function(d,e){var f,g,h;if(e==null){e=null}if(a.Element.Cache.aside||e){m=d;g=((h=a.Element.Cache.aside)!=null?h.data(c.TRANSITION.ATTR):void 0)||"left";if(a.DEVICE===c.DEVICE.PHONE){if(e>0){a.Element.Cache.section.removeClass("aside").removeClass("aside-right");f=n(e,true)+" "+b;return a.Element.Cache.section.style(""+p+"animation",f)}else{a.Element.Cache.section.removeClass("aside").removeClass("aside-right");return a.Element.Cache.section.data("aside-"+g,"hide")}}else{a.dom(".aside").removeClass("aside").addClass("asideHidding");a.Element.Cache.aside=null;if(d){d.call(d)}return a.dom(".shadow").removeClass("shadow").addClass("unshadowing")}}else if(d){return d.call(d)}};j=function(b){if(a.Element.Cache.aside){return this.hide()}else{return this.show(b)}};f=function(b){var e,f,g,h;g=a.dom(b.target);e=((h=a.Element.Cache.aside)!=null?h.data(c.TRANSITION.ATTR):void 0)||"left";if(g.data("aside-"+e)==="hide"){a.Element.Cache.aside.removeClass(c.CLASS.SHOW);a.Element.Cache.aside=null;g.removeAttr("data-aside-"+e);if(m){m.call(m)}m=void 0}else{if(g.style(""+p+"animation").indexOf(d)===-1){f=e.indexOf("right")===-1?"aside":"aside-right";g.addClass(f)}g.removeAttr("style").removeAttr("data-aside-"+e)}if(o){g.removeAttr("style");o.parentNode.removeChild(o);return o=void 0}};g=function(){var b;if(a.DEVICE!==c.DEVICE.PHONE){return false}b=96;return a.dom(c.QUERY.HREF_ASIDE).each(function(){var d,e,f,g;g=false;e=a.dom(this);f=e.closest("section");d=a.dom("aside#"+e.data("aside"));f.swiping(function(a){var b,e;a.originalEvent.preventDefault();if(!(f.hasClass("aside")||f.hasClass("aside-right"))){b=a.currentTouch.x-a.iniTouch.x;e=Math.abs(a.currentTouch.y-a.iniTouch.y);g=g?true:b>3*e&&b<50;if(g){b=b>256?256:b<0?0:b;d.addClass(c.CLASS.SHOW);f.vendor("transform","translateX("+b+"px)");return f.vendor("transition-duration","0s")}else{return f.attr("style","")}}});return f.swipe(function(a){var c,e;c=a.currentTouch.x-a.iniTouch.x;if(c>256){c=256}e=Math.abs(a.currentTouch.y-a.iniTouch.y);f.attr("style","");if(c>b&&g){i(d.attr("id"),false,c)}else{if(g){h(void 0,c)}else{h()}}return g=false})})};k=function(b){var c;return((c=a.Element.Cache.aside)!=null?c.attr("id"):void 0)===b};l=function(){var b;if((b=a.Element.Cache.aside)!=null?b.hasClass(c.CLASS.RIGHT):void 0){return""+c.CLASS.RIGHT}else{return" "}};n=function(a,b){var c,f;if(b==null){b=false}c=b?d:e;o=document.createElement("style");o.type="text/css";if(!b){f="@"+p+"keyframes "+c+" {\n  0%   { "+p+"transform: translateX("+a+"px); }\n  60%  { "+p+"transform: translateX(262px);  }\n  100% { "+p+"transform: translateX(256px);  }\n}"}else{f="@"+p+"keyframes "+c+" {\n  0%   { "+p+"transform: translateX("+a+"px); }\n  100% { "+p+"transform: translateX(0);      }\n}"}o.appendChild(document.createTextNode(f));document.getElementsByTagName("head")[0].appendChild(o);return c};return{show:i,hide:h,toggle:j,draggable:g,animationEnd:f}}(Lungo)}.call(this);!function(){Lungo.Section=function(a){var b,c,d,e;b=a.Constants;c=function(c,f){var g;if(a.DEVICE===b.DEVICE.PHONE){d(f)}else{e(c,f)}a.Element.Cache.section=f;g=f.find(""+b.ELEMENT.ARTICLE+"."+b.CLASS.ACTIVE);if(g.length===0){g=f.find(b.ELEMENT.ARTICLE).first().addClass(b.CLASS.ACTIVE)}a.Element.Cache.article=g;if(c){c.trigger(b.TRIGGER.UNLOAD)}return f.trigger(b.TRIGGER.LOAD)};d=function(a){return a.addClass(b.CLASS.SHOW)};e=function(a,b){return this};return{show:c}}(Lungo)}.call(this);!function(){Lungo.Article=function(a){var b,c;b=a.Constants;c=function(c,d,e,f,g){var h,i;if(f==null){f=""}if(g==null){g=null}if(h=a.dom(""+b.ELEMENT.ARTICLE+"#"+c)){i="";if(d!=null){i='<div class="empty">\n  <span class="icon '+d+'"></span>\n  <strong>'+e+"</strong>\n  <small>"+f+"</small>\n</div>"}h.html(i);if(g){return h.children().append("<button class='anchor'><abbr>"+g+"</abbr></button>")}}};return{clean:c}}(Lungo)}.call(this);!function(){Lungo.Boot.Data=function(a){var b,c,d,e,f;b=a.Constants.BINDING;c=function(b){var c;c=a.dom(b||document.body);if(c.length>0){return e(c)}};e=function(b){var c,d;d=[];for(c in a.Attributes){if(a.Core.isOwnProperty(a.Attributes,c)){d.push(f(b,c))}else{d.push(void 0)}}return d};f=function(b,c){var e,f;e=a.Attributes[c];f=e.selector+"[data-"+c+"]";b.find(f).each(function(b,f){var g;g=a.dom(f);return d(g,g.data(c),e.html)});if(b.data(c)!=null){return d(b,b.data(c),e.html)}};d=function(a,b,c){return a.prepend(c.replace(/\{\{value\}\}/g,b))};return{init:c}}(Lungo)}.call(this);!function(){Lungo.Boot.Device=function(a){var b,c;b=a.Constants.DEVICE;c=function(){var c,d;d=a.Core.environment();a.DEVICE=d.screen.width<768?b.PHONE:b.TABLET;c=a.dom(document.body);c.data("device",a.DEVICE);if(d.os){c.data("os",d.os.name.toLowerCase())}if(a.DEVICE===a.Constants.DEVICE.PHONE){return a.Aside.draggable()}};return{init:c}}(Lungo)}.call(this);!function(){Lungo.Boot.Events=function(a){var b,c,d,e,f,g,h,i,j,k,l,m,n;c=a.Constants;b=a.Constants.ATTRIBUTE;d=a.Constants.CLASS;e=a.Constants.ELEMENT;f=a.Constants.QUERY;g=function(){var b,d,e,g,k;a.dom(c.QUERY.SECTION_ROUTER_TOUCH).touch(m);a.dom(c.QUERY.SECTION_ROUTER_TAP).tap(m);a.dom(c.QUERY.ARTICLE_ROUTER_TOUCH).touch(i);a.dom(c.QUERY.ARTICLE_ROUTER_TAP).tap(i);a.dom(c.QUERY.ASIDE_ROUTER).touch(j);a.dom(c.QUERY.MENU_ROUTER).touch(l);a.dom(f.MENU_HREF).touch(h);g=c.EVENT.TRANSITION_END;k=[];for(d=0,e=g.length;d<e;d++){b=g[d];a.dom("body").delegate(c.ELEMENT.SECTION,b,n);k.push(a.dom("body").delegate(c.ELEMENT.ASIDE,b,n))}return k};m=function(b){var d,e;b.preventDefault();d=a.dom(this);if(d.data("async")){return k(d,c.ELEMENT.SECTION)}else{e=d.data("view-section");if(e!=="back"){return a.Router.section(e)}else{return a.Router.back()}}};i=function(b){var d;b.preventDefault();d=a.dom(this);if(d.data("async")){return k(d,c.ELEMENT.ARTICLE)}else{return a.Router.article(a.Router.history(),d.data("view-article"),d)}};k=function(b,d){var e,f,g,h,i,j,k;h=b.data("async");e=b.data("view-"+d);a.Notification.show();if(d===c.ELEMENT.ARTICLE){g=a.Element.Cache.section.attr(c.ATTRIBUTE.ID);a.Resource.load(h,c.ELEMENT.SECTION+"#"+g)}else{a.Resource.load(h)}a.Boot.Data.init("#"+e);k=a.dom("[data-async='"+h+"']");for(i=0,j=k.length;i<j;i++){f=k[i];f.removeAttribute("data-async")}if(d===c.ELEMENT.ARTICLE){a.Router.article(g,e);a.Aside.hide()}else{a.Router.section(e)}return a.Notification.hide()};j=function(b){var d;b.preventDefault();d=a.dom(b.target).closest(c.QUERY.ASIDE_ROUTER).data("view-aside");return a.Aside.toggle(d)};l=function(b){var c;b.preventDefault();c=a.dom(this).data("view-menu");return a.Element.Menu.show(c)};h=function(b){var d,e;b.preventDefault();d=a.dom(this);e=d.parent(c.CONTROL.MENU).attr(c.ATTRIBUTE.ID);a.Element.Menu.hide(e);return a.dom("[data-view-menu="+e+"] > .icon").attr("class","icon "+d.data("icon"))};n=function(b){var c,d,e,f;e=a.dom(b.target);d=e.data("direction");c=e.hasClass("asideHidding")||e.hasClass("asideShowing");f=e.hasClass("shadowing")||e.hasClass("unshadowing");if(d||c||f){return a.Router.animationEnd(b)}else{return a.Aside.animationEnd(b)}};return{init:g}}(Lungo)}.call(this);!function(){Lungo.Boot.Layout=function(a){var b,c,d,e,f,g,h,i;b=a.Constants;c="#";d=function(){var c;a.Fallback.fixPositionInAndroid();if(Lungo.Config.history&&((c=window.location.hash)!=null?c.length:void 0)>=2){h()}else{g()}f(b.QUERY.LIST_IN_ELEMENT,e);return f(b.QUERY.ELEMENT_SCROLLABLE,i)};h=function(){var b,d,e,f,g,h;d=window.location.hash.replace(c,"").split("/");f=d[d.length-2];b=d[d.length-1];if(d.length>2){d.length-=2;for(g=0,h=d.length;g<h;g++){e=d[g];a.Router.step(e)}}a.Router.section(f);return a.Router.article(f,b)};g=function(){var c;c=a.dom(b.ELEMENT.SECTION).first();if(c){return a.Router.section(c.attr(b.ATTRIBUTE.ID))}};f=function(b,c){var d,e,f,g,h;e=a.dom(b);f=0;g=e.length;h=[];while(f<g){d=a.dom(e[f]);a.Core.execute(c,d);h.push(f++)}return h};e=function(a){var c;if(a.children().length===0){c=a.attr(b.ATTRIBUTE.ID);return a.append(b.ELEMENT.LIST)}};i=function(a){return a[0].addEventListener("touchstart",function(a){var b;b=this.scrollTop;if(b<=1){this.scrollTop=1}if(b+this.offsetHeight>=this.scrollHeight){return this.scrollTop=this.scrollHeight-this.offsetHeight-1}},false)};return{init:d}}(Lungo)}.call(this);!function(){Lungo.Element.Cache={section:null,article:null,aside:null,navigation:null}}.call(this);!function(){Lungo.Element.Carousel=function(a,b){var c,d,e,f,g,h,i,j,k,l,m,n;h={index:0,speed:300,callback:b,container:a,element:a.children[0],slide:void 0,slides:[],slides_length:0,width:0,start:{},isScrolling:void 0,deltaX:0};e=function(a){if(h.index){return j(h.index-1,h.speed)}};c=function(a){if(h.index<h.slides_length-1){return j(h.index+1,h.speed)}else{return j(0,h.speed)}};d=function(){return h.index};f=function(){return i()};i=function(){var a,b;h.slides=h.element.children;h.slides_length=h.slides.length;if(h.slides_length<2){return null}h.width="getBoundingClientRect"in h.container?h.container.getBoundingClientRect().width:h.container.offsetWidth;if(!h.width){return null}h.element.style.width=h.slides.length*h.width+"px";b=h.slides.length;while(b--){a=h.slides[b];a.style.width=h.width+"px";a.style.display="table-cell";a.style.verticalAlign="top"}j(h.index,0);return h.container.style.visibility="visible"};j=function(a,b){var c;c=h.element.style;if(b===void 0){b=h.speed}c.webkitTransitionDuration=c.MozTransitionDuration=c.msTransitionDuration=c.OTransitionDuration=c.transitionDuration=b+"ms";
c.MozTransform=c.webkitTransform="translate3d("+-(a*h.width)+"px,0,0)";c.msTransform=c.OTransform="translateX("+-(a*h.width)+"px)";return h.index=a};g=function(){h.element.addEventListener("touchstart",m,false);h.element.addEventListener("touchmove",l,false);h.element.addEventListener("touchend",k,false);h.element.addEventListener("webkitTransitionEnd",n,false);h.element.addEventListener("msTransitionEnd",n,false);h.element.addEventListener("oTransitionEnd",n,false);h.element.addEventListener("transitionend",n,false);return window.addEventListener("resize",i,false)};m=function(a){h.start={pageX:a.touches[0].pageX,pageY:a.touches[0].pageY,time:Number(new Date)};h.isScrolling=void 0;h.deltaX=0;h.element.style.MozTransitionDuration=h.element.style.webkitTransitionDuration=0;return a.stopPropagation()};l=function(a){var b,c;if(a.touches.length>1||a.scale&&a.scale!==1){return}h.deltaX=a.touches[0].pageX-h.start.pageX;if(typeof h.isScrolling==="undefined"){h.isScrolling=!!(h.isScrolling||Math.abs(h.deltaX)<Math.abs(a.touches[0].pageY-h.start.pageY))}if(!h.isScrolling){a.preventDefault();b=!h.index&&h.deltaX>0||h.index===h.slides_length-1&&h.deltaX<0?Math.abs(h.deltaX)/h.width+1:1;h.deltaX=h.deltaX/b;c=h.deltaX-h.index*h.width;h.element.style.MozTransform=h.element.style.webkitTransform="translate3d("+c+"px,0,0)";return a.stopPropagation()}};k=function(a){var b,c;c=Number(new Date)-h.start.time<250&&Math.abs(h.deltaX)>20||Math.abs(h.deltaX)>h.width/2;b=!h.index&&h.deltaX>0||h.index===h.slides_length-1&&h.deltaX<0;if(!h.isScrolling){j(h.index+(c&&!b?h.deltaX<0?1:-1:0),h.speed)}return a.stopPropagation()};n=function(a){if(h.callback){return h.callback.apply(h.callback,[h.index,h.slides[h.index]])}};i();g();return{prev:e,next:c,position:d,refresh:f}}}.call(this);!function(){Lungo.Element.count=function(a,b){var c,d,e;d=Lungo.dom(a);if(d){d.children(".tag.count").remove();if(b){c=Lungo.Constants.BINDING.SELECTOR;e=Lungo.Attributes.count.html.replace(c,b);return d.append(e)}}}}.call(this);!function(){Lungo.Element.loading=function(a,b){var c,d,e;d=Lungo.dom(a);if(d){e=null;if(b){c=Lungo.Constants.BINDING.SELECTOR;e=Lungo.Attributes.loading.html.replace(c,b)}return d.html(e)}}}.call(this);!function(){Lungo.Element.Menu=function(a){var b,c,d,e;b=a.Constants;d=function(a){var c;c=this._instance(a);if(c){return c.addClass(b.CLASS.SHOW)}};c=function(a){var c;c=this._instance(a);if(c){return c.removeClass(b.CLASS.SHOW)}};e=function(a){var c;c=this._instance(a);if(c){if(c.hasClass(b.CLASS.SHOW)){return this.show(a)}else{return this.hide(a)}}};return{_instance:function(a){return Lungo.dom(""+b.CONTROL.MENU+"#"+a)},show:d,hide:c,toggle:e}}(Lungo)}.call(this);!function(){Lungo.Element.progress=function(a,b){var c;c=Lungo.dom(a);if(c){b+=Lungo.Constants.ATTRIBUTE.PERCENT;return c.find(".value").style(Lungo.Constants.ATTRIBUTE.WIDTH,b)}}}.call(this);!function(){Lungo.Element.Pull=function(a,b){var c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u;k=68;i=80;c=300;g=0;j=false;h=$$(a);f=h.siblings('div[data-control="pull"]');d=void 0;e={onPull:"Pull down to refresh",onRelease:"Release to...",onRefresh:"Loading...",callback:void 0};d=Lungo.Core.mix(e,b);l=function(){q(0,true);setTimeout(function(){j=false;f.attr("class","");return h[0].removeEventListener("touchmove",m,true)},c);return g=0};q=function(a,b){var d;d=a>i?i:a;if(b){h.addClass("pull")}else{h.removeClass("pull")}h.style("-webkit-transform","translate(0, "+d+"px)");if(b){return setTimeout(function(){return h.removeClass("pull")},c)}};r=function(a){j=true;h[0].addEventListener("touchmove",m,true);u(d.onRefresh);s(true);q(k,true);if(d.callback){return d.callback.apply(this)}};u=function(a){return f.find("strong").html(a)};s=function(a){if(a){return f.addClass("refresh")}else{return f.removeClass("refresh")}};t=function(a){if(a){return f.addClass("rotate")}else{return f.removeClass("rotate")}};m=function(a){return a.preventDefault()};p=function(a){q(g,false);s(false);if(g>k){u(d.onRelease);return t(true)}else{u(d.onPull);return t(false)}};o=function(a){if(g>k){r()}else{l()}return this};n=function(a){if($$.isMobile()){return a.touches[0].pageY}else{return a.pageY}};!function(){var a,b;b=false;a=0;return h.bind("touchstart",function(c){if(h[0].scrollTop<=1){b=true;a=n(c)}return true}).bind("touchmove",function(c){var d;if(!j&&b){d=n(c);g=d-a;if(g>=0){p(c);c.preventDefault()}}return true}).bind("touchend",function(){if(b){o()}b=false;return true})}();return{hide:l}}}.call(this);
// moment.js
// version : 2.1.0
// author : Tim Wood
// license : MIT
// momentjs.com

(function (undefined) {

    /************************************
        Constants
    ************************************/

    var moment,
        VERSION = "2.1.0",
        round = Math.round, i,
        // internal storage for language config files
        languages = {},

        // check for nodeJS
        hasModule = (typeof module !== 'undefined' && module.exports),

        // ASP.NET json date format regex
        aspNetJsonRegex = /^\/?Date\((\-?\d+)/i,
        aspNetTimeSpanJsonRegex = /(\-)?(\d*)?\.?(\d+)\:(\d+)\:(\d+)\.?(\d{3})?/,

        // format tokens
        formattingTokens = /(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|SS?S?|X|zz?|ZZ?|.)/g,
        localFormattingTokens = /(\[[^\[]*\])|(\\)?(LT|LL?L?L?|l{1,4})/g,

        // parsing token regexes
        parseTokenOneOrTwoDigits = /\d\d?/, // 0 - 99
        parseTokenOneToThreeDigits = /\d{1,3}/, // 0 - 999
        parseTokenThreeDigits = /\d{3}/, // 000 - 999
        parseTokenFourDigits = /\d{1,4}/, // 0 - 9999
        parseTokenSixDigits = /[+\-]?\d{1,6}/, // -999,999 - 999,999
        parseTokenWord = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i, // any word (or two) characters or numbers including two/three word month in arabic.
        parseTokenTimezone = /Z|[\+\-]\d\d:?\d\d/i, // +00:00 -00:00 +0000 -0000 or Z
        parseTokenT = /T/i, // T (ISO seperator)
        parseTokenTimestampMs = /[\+\-]?\d+(\.\d{1,3})?/, // 123456789 123456789.123

        // preliminary iso regex
        // 0000-00-00 + T + 00 or 00:00 or 00:00:00 or 00:00:00.000 + +00:00 or +0000
        isoRegex = /^\s*\d{4}-\d\d-\d\d((T| )(\d\d(:\d\d(:\d\d(\.\d\d?\d?)?)?)?)?([\+\-]\d\d:?\d\d)?)?/,
        isoFormat = 'YYYY-MM-DDTHH:mm:ssZ',

        // iso time formats and regexes
        isoTimes = [
            ['HH:mm:ss.S', /(T| )\d\d:\d\d:\d\d\.\d{1,3}/],
            ['HH:mm:ss', /(T| )\d\d:\d\d:\d\d/],
            ['HH:mm', /(T| )\d\d:\d\d/],
            ['HH', /(T| )\d\d/]
        ],

        // timezone chunker "+10:00" > ["10", "00"] or "-1530" > ["-15", "30"]
        parseTimezoneChunker = /([\+\-]|\d\d)/gi,

        // getter and setter names
        proxyGettersAndSetters = 'Date|Hours|Minutes|Seconds|Milliseconds'.split('|'),
        unitMillisecondFactors = {
            'Milliseconds' : 1,
            'Seconds' : 1e3,
            'Minutes' : 6e4,
            'Hours' : 36e5,
            'Days' : 864e5,
            'Months' : 2592e6,
            'Years' : 31536e6
        },

        unitAliases = {
            ms : 'millisecond',
            s : 'second',
            m : 'minute',
            h : 'hour',
            d : 'day',
            w : 'week',
            M : 'month',
            y : 'year'
        },

        // format function strings
        formatFunctions = {},

        // tokens to ordinalize and pad
        ordinalizeTokens = 'DDD w W M D d'.split(' '),
        paddedTokens = 'M D H h m s w W'.split(' '),

        formatTokenFunctions = {
            M    : function () {
                return this.month() + 1;
            },
            MMM  : function (format) {
                return this.lang().monthsShort(this, format);
            },
            MMMM : function (format) {
                return this.lang().months(this, format);
            },
            D    : function () {
                return this.date();
            },
            DDD  : function () {
                return this.dayOfYear();
            },
            d    : function () {
                return this.day();
            },
            dd   : function (format) {
                return this.lang().weekdaysMin(this, format);
            },
            ddd  : function (format) {
                return this.lang().weekdaysShort(this, format);
            },
            dddd : function (format) {
                return this.lang().weekdays(this, format);
            },
            w    : function () {
                return this.week();
            },
            W    : function () {
                return this.isoWeek();
            },
            YY   : function () {
                return leftZeroFill(this.year() % 100, 2);
            },
            YYYY : function () {
                return leftZeroFill(this.year(), 4);
            },
            YYYYY : function () {
                return leftZeroFill(this.year(), 5);
            },
            gg   : function () {
                return leftZeroFill(this.weekYear() % 100, 2);
            },
            gggg : function () {
                return this.weekYear();
            },
            ggggg : function () {
                return leftZeroFill(this.weekYear(), 5);
            },
            GG   : function () {
                return leftZeroFill(this.isoWeekYear() % 100, 2);
            },
            GGGG : function () {
                return this.isoWeekYear();
            },
            GGGGG : function () {
                return leftZeroFill(this.isoWeekYear(), 5);
            },
            e : function () {
                return this.weekday();
            },
            E : function () {
                return this.isoWeekday();
            },
            a    : function () {
                return this.lang().meridiem(this.hours(), this.minutes(), true);
            },
            A    : function () {
                return this.lang().meridiem(this.hours(), this.minutes(), false);
            },
            H    : function () {
                return this.hours();
            },
            h    : function () {
                return this.hours() % 12 || 12;
            },
            m    : function () {
                return this.minutes();
            },
            s    : function () {
                return this.seconds();
            },
            S    : function () {
                return ~~(this.milliseconds() / 100);
            },
            SS   : function () {
                return leftZeroFill(~~(this.milliseconds() / 10), 2);
            },
            SSS  : function () {
                return leftZeroFill(this.milliseconds(), 3);
            },
            Z    : function () {
                var a = -this.zone(),
                    b = "+";
                if (a < 0) {
                    a = -a;
                    b = "-";
                }
                return b + leftZeroFill(~~(a / 60), 2) + ":" + leftZeroFill(~~a % 60, 2);
            },
            ZZ   : function () {
                var a = -this.zone(),
                    b = "+";
                if (a < 0) {
                    a = -a;
                    b = "-";
                }
                return b + leftZeroFill(~~(10 * a / 6), 4);
            },
            z : function () {
                return this.zoneAbbr();
            },
            zz : function () {
                return this.zoneName();
            },
            X    : function () {
                return this.unix();
            }
        };

    function padToken(func, count) {
        return function (a) {
            return leftZeroFill(func.call(this, a), count);
        };
    }
    function ordinalizeToken(func, period) {
        return function (a) {
            return this.lang().ordinal(func.call(this, a), period);
        };
    }

    while (ordinalizeTokens.length) {
        i = ordinalizeTokens.pop();
        formatTokenFunctions[i + 'o'] = ordinalizeToken(formatTokenFunctions[i], i);
    }
    while (paddedTokens.length) {
        i = paddedTokens.pop();
        formatTokenFunctions[i + i] = padToken(formatTokenFunctions[i], 2);
    }
    formatTokenFunctions.DDDD = padToken(formatTokenFunctions.DDD, 3);


    /************************************
        Constructors
    ************************************/

    function Language() {

    }

    // Moment prototype object
    function Moment(config) {
        extend(this, config);
    }

    // Duration Constructor
    function Duration(duration) {
        var years = duration.years || duration.year || duration.y || 0,
            months = duration.months || duration.month || duration.M || 0,
            weeks = duration.weeks || duration.week || duration.w || 0,
            days = duration.days || duration.day || duration.d || 0,
            hours = duration.hours || duration.hour || duration.h || 0,
            minutes = duration.minutes || duration.minute || duration.m || 0,
            seconds = duration.seconds || duration.second || duration.s || 0,
            milliseconds = duration.milliseconds || duration.millisecond || duration.ms || 0;

        // store reference to input for deterministic cloning
        this._input = duration;

        // representation for dateAddRemove
        this._milliseconds = milliseconds +
            seconds * 1e3 + // 1000
            minutes * 6e4 + // 1000 * 60
            hours * 36e5; // 1000 * 60 * 60
        // Because of dateAddRemove treats 24 hours as different from a
        // day when working around DST, we need to store them separately
        this._days = days +
            weeks * 7;
        // It is impossible translate months into days without knowing
        // which months you are are talking about, so we have to store
        // it separately.
        this._months = months +
            years * 12;

        this._data = {};

        this._bubble();
    }


    /************************************
        Helpers
    ************************************/


    function extend(a, b) {
        for (var i in b) {
            if (b.hasOwnProperty(i)) {
                a[i] = b[i];
            }
        }
        return a;
    }

    function absRound(number) {
        if (number < 0) {
            return Math.ceil(number);
        } else {
            return Math.floor(number);
        }
    }

    // left zero fill a number
    // see http://jsperf.com/left-zero-filling for performance comparison
    function leftZeroFill(number, targetLength) {
        var output = number + '';
        while (output.length < targetLength) {
            output = '0' + output;
        }
        return output;
    }

    // helper function for _.addTime and _.subtractTime
    function addOrSubtractDurationFromMoment(mom, duration, isAdding, ignoreUpdateOffset) {
        var milliseconds = duration._milliseconds,
            days = duration._days,
            months = duration._months,
            minutes,
            hours,
            currentDate;

        if (milliseconds) {
            mom._d.setTime(+mom._d + milliseconds * isAdding);
        }
        // store the minutes and hours so we can restore them
        if (days || months) {
            minutes = mom.minute();
            hours = mom.hour();
        }
        if (days) {
            mom.date(mom.date() + days * isAdding);
        }
        if (months) {
            mom.month(mom.month() + months * isAdding);
        }
        if (milliseconds && !ignoreUpdateOffset) {
            moment.updateOffset(mom);
        }
        // restore the minutes and hours after possibly changing dst
        if (days || months) {
            mom.minute(minutes);
            mom.hour(hours);
        }
    }

    // check if is an array
    function isArray(input) {
        return Object.prototype.toString.call(input) === '[object Array]';
    }

    // compare two arrays, return the number of differences
    function compareArrays(array1, array2) {
        var len = Math.min(array1.length, array2.length),
            lengthDiff = Math.abs(array1.length - array2.length),
            diffs = 0,
            i;
        for (i = 0; i < len; i++) {
            if (~~array1[i] !== ~~array2[i]) {
                diffs++;
            }
        }
        return diffs + lengthDiff;
    }

    function normalizeUnits(units) {
        return units ? unitAliases[units] || units.toLowerCase().replace(/(.)s$/, '$1') : units;
    }


    /************************************
        Languages
    ************************************/


    Language.prototype = {
        set : function (config) {
            var prop, i;
            for (i in config) {
                prop = config[i];
                if (typeof prop === 'function') {
                    this[i] = prop;
                } else {
                    this['_' + i] = prop;
                }
            }
        },

        _months : "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
        months : function (m) {
            return this._months[m.month()];
        },

        _monthsShort : "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
        monthsShort : function (m) {
            return this._monthsShort[m.month()];
        },

        monthsParse : function (monthName) {
            var i, mom, regex;

            if (!this._monthsParse) {
                this._monthsParse = [];
            }

            for (i = 0; i < 12; i++) {
                // make the regex if we don't have it already
                if (!this._monthsParse[i]) {
                    mom = moment([2000, i]);
                    regex = '^' + this.months(mom, '') + '|^' + this.monthsShort(mom, '');
                    this._monthsParse[i] = new RegExp(regex.replace('.', ''), 'i');
                }
                // test the regex
                if (this._monthsParse[i].test(monthName)) {
                    return i;
                }
            }
        },

        _weekdays : "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
        weekdays : function (m) {
            return this._weekdays[m.day()];
        },

        _weekdaysShort : "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
        weekdaysShort : function (m) {
            return this._weekdaysShort[m.day()];
        },

        _weekdaysMin : "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
        weekdaysMin : function (m) {
            return this._weekdaysMin[m.day()];
        },

        weekdaysParse : function (weekdayName) {
            var i, mom, regex;

            if (!this._weekdaysParse) {
                this._weekdaysParse = [];
            }

            for (i = 0; i < 7; i++) {
                // make the regex if we don't have it already
                if (!this._weekdaysParse[i]) {
                    mom = moment([2000, 1]).day(i);
                    regex = '^' + this.weekdays(mom, '') + '|^' + this.weekdaysShort(mom, '') + '|^' + this.weekdaysMin(mom, '');
                    this._weekdaysParse[i] = new RegExp(regex.replace('.', ''), 'i');
                }
                // test the regex
                if (this._weekdaysParse[i].test(weekdayName)) {
                    return i;
                }
            }
        },

        _longDateFormat : {
            LT : "h:mm A",
            L : "MM/DD/YYYY",
            LL : "MMMM D YYYY",
            LLL : "MMMM D YYYY LT",
            LLLL : "dddd, MMMM D YYYY LT"
        },
        longDateFormat : function (key) {
            var output = this._longDateFormat[key];
            if (!output && this._longDateFormat[key.toUpperCase()]) {
                output = this._longDateFormat[key.toUpperCase()].replace(/MMMM|MM|DD|dddd/g, function (val) {
                    return val.slice(1);
                });
                this._longDateFormat[key] = output;
            }
            return output;
        },

        isPM : function (input) {
            return ((input + '').toLowerCase()[0] === 'p');
        },

        _meridiemParse : /[ap]\.?m?\.?/i,
        meridiem : function (hours, minutes, isLower) {
            if (hours > 11) {
                return isLower ? 'pm' : 'PM';
            } else {
                return isLower ? 'am' : 'AM';
            }
        },

        _calendar : {
            sameDay : '[Today at] LT',
            nextDay : '[Tomorrow at] LT',
            nextWeek : 'dddd [at] LT',
            lastDay : '[Yesterday at] LT',
            lastWeek : '[Last] dddd [at] LT',
            sameElse : 'L'
        },
        calendar : function (key, mom) {
            var output = this._calendar[key];
            return typeof output === 'function' ? output.apply(mom) : output;
        },

        _relativeTime : {
            future : "in %s",
            past : "%s ago",
            s : "a few seconds",
            m : "a minute",
            mm : "%d minutes",
            h : "an hour",
            hh : "%d hours",
            d : "a day",
            dd : "%d days",
            M : "a month",
            MM : "%d months",
            y : "a year",
            yy : "%d years"
        },
        relativeTime : function (number, withoutSuffix, string, isFuture) {
            var output = this._relativeTime[string];
            return (typeof output === 'function') ?
                output(number, withoutSuffix, string, isFuture) :
                output.replace(/%d/i, number);
        },
        pastFuture : function (diff, output) {
            var format = this._relativeTime[diff > 0 ? 'future' : 'past'];
            return typeof format === 'function' ? format(output) : format.replace(/%s/i, output);
        },

        ordinal : function (number) {
            return this._ordinal.replace("%d", number);
        },
        _ordinal : "%d",

        preparse : function (string) {
            return string;
        },

        postformat : function (string) {
            return string;
        },

        week : function (mom) {
            return weekOfYear(mom, this._week.dow, this._week.doy).week;
        },
        _week : {
            dow : 0, // Sunday is the first day of the week.
            doy : 6  // The week that contains Jan 1st is the first week of the year.
        }
    };

    // Loads a language definition into the `languages` cache.  The function
    // takes a key and optionally values.  If not in the browser and no values
    // are provided, it will load the language file module.  As a convenience,
    // this function also returns the language values.
    function loadLang(key, values) {
        values.abbr = key;
        if (!languages[key]) {
            languages[key] = new Language();
        }
        languages[key].set(values);
        return languages[key];
    }

    // Determines which language definition to use and returns it.
    //
    // With no parameters, it will return the global language.  If you
    // pass in a language key, such as 'en', it will return the
    // definition for 'en', so long as 'en' has already been loaded using
    // moment.lang.
    function getLangDefinition(key) {
        if (!key) {
            return moment.fn._lang;
        }
        if (!languages[key] && hasModule) {
            try {
                require('./lang/' + key);
            } catch (e) {
                // call with no params to set to default
                return moment.fn._lang;
            }
        }
        return languages[key];
    }


    /************************************
        Formatting
    ************************************/


    function removeFormattingTokens(input) {
        if (input.match(/\[.*\]/)) {
            return input.replace(/^\[|\]$/g, "");
        }
        return input.replace(/\\/g, "");
    }

    function makeFormatFunction(format) {
        var array = format.match(formattingTokens), i, length;

        for (i = 0, length = array.length; i < length; i++) {
            if (formatTokenFunctions[array[i]]) {
                array[i] = formatTokenFunctions[array[i]];
            } else {
                array[i] = removeFormattingTokens(array[i]);
            }
        }

        return function (mom) {
            var output = "";
            for (i = 0; i < length; i++) {
                output += array[i] instanceof Function ? array[i].call(mom, format) : array[i];
            }
            return output;
        };
    }

    // format date using native date object
    function formatMoment(m, format) {
        var i = 5;

        function replaceLongDateFormatTokens(input) {
            return m.lang().longDateFormat(input) || input;
        }

        while (i-- && localFormattingTokens.test(format)) {
            format = format.replace(localFormattingTokens, replaceLongDateFormatTokens);
        }

        if (!formatFunctions[format]) {
            formatFunctions[format] = makeFormatFunction(format);
        }

        return formatFunctions[format](m);
    }


    /************************************
        Parsing
    ************************************/


    // get the regex to find the next token
    function getParseRegexForToken(token, config) {
        switch (token) {
        case 'DDDD':
            return parseTokenThreeDigits;
        case 'YYYY':
            return parseTokenFourDigits;
        case 'YYYYY':
            return parseTokenSixDigits;
        case 'S':
        case 'SS':
        case 'SSS':
        case 'DDD':
            return parseTokenOneToThreeDigits;
        case 'MMM':
        case 'MMMM':
        case 'dd':
        case 'ddd':
        case 'dddd':
            return parseTokenWord;
        case 'a':
        case 'A':
            return getLangDefinition(config._l)._meridiemParse;
        case 'X':
            return parseTokenTimestampMs;
        case 'Z':
        case 'ZZ':
            return parseTokenTimezone;
        case 'T':
            return parseTokenT;
        case 'MM':
        case 'DD':
        case 'YY':
        case 'HH':
        case 'hh':
        case 'mm':
        case 'ss':
        case 'M':
        case 'D':
        case 'd':
        case 'H':
        case 'h':
        case 'm':
        case 's':
            return parseTokenOneOrTwoDigits;
        default :
            return new RegExp(token.replace('\\', ''));
        }
    }

    function timezoneMinutesFromString(string) {
        var tzchunk = (parseTokenTimezone.exec(string) || [])[0],
            parts = (tzchunk + '').match(parseTimezoneChunker) || ['-', 0, 0],
            minutes = +(parts[1] * 60) + ~~parts[2];

        return parts[0] === '+' ? -minutes : minutes;
    }

    // function to convert string input to date
    function addTimeToArrayFromToken(token, input, config) {
        var a, datePartArray = config._a;

        switch (token) {
        // MONTH
        case 'M' : // fall through to MM
        case 'MM' :
            datePartArray[1] = (input == null) ? 0 : ~~input - 1;
            break;
        case 'MMM' : // fall through to MMMM
        case 'MMMM' :
            a = getLangDefinition(config._l).monthsParse(input);
            // if we didn't find a month name, mark the date as invalid.
            if (a != null) {
                datePartArray[1] = a;
            } else {
                config._isValid = false;
            }
            break;
        // DAY OF MONTH
        case 'D' : // fall through to DDDD
        case 'DD' : // fall through to DDDD
        case 'DDD' : // fall through to DDDD
        case 'DDDD' :
            if (input != null) {
                datePartArray[2] = ~~input;
            }
            break;
        // YEAR
        case 'YY' :
            datePartArray[0] = ~~input + (~~input > 68 ? 1900 : 2000);
            break;
        case 'YYYY' :
        case 'YYYYY' :
            datePartArray[0] = ~~input;
            break;
        // AM / PM
        case 'a' : // fall through to A
        case 'A' :
            config._isPm = getLangDefinition(config._l).isPM(input);
            break;
        // 24 HOUR
        case 'H' : // fall through to hh
        case 'HH' : // fall through to hh
        case 'h' : // fall through to hh
        case 'hh' :
            datePartArray[3] = ~~input;
            break;
        // MINUTE
        case 'm' : // fall through to mm
        case 'mm' :
            datePartArray[4] = ~~input;
            break;
        // SECOND
        case 's' : // fall through to ss
        case 'ss' :
            datePartArray[5] = ~~input;
            break;
        // MILLISECOND
        case 'S' :
        case 'SS' :
        case 'SSS' :
            datePartArray[6] = ~~ (('0.' + input) * 1000);
            break;
        // UNIX TIMESTAMP WITH MS
        case 'X':
            config._d = new Date(parseFloat(input) * 1000);
            break;
        // TIMEZONE
        case 'Z' : // fall through to ZZ
        case 'ZZ' :
            config._useUTC = true;
            config._tzm = timezoneMinutesFromString(input);
            break;
        }

        // if the input is null, the date is not valid
        if (input == null) {
            config._isValid = false;
        }
    }

    // convert an array to a date.
    // the array should mirror the parameters below
    // note: all values past the year are optional and will default to the lowest possible value.
    // [year, month, day , hour, minute, second, millisecond]
    function dateFromArray(config) {
        var i, date, input = [];

        if (config._d) {
            return;
        }

        for (i = 0; i < 7; i++) {
            config._a[i] = input[i] = (config._a[i] == null) ? (i === 2 ? 1 : 0) : config._a[i];
        }

        // add the offsets to the time to be parsed so that we can have a clean array for checking isValid
        input[3] += ~~((config._tzm || 0) / 60);
        input[4] += ~~((config._tzm || 0) % 60);

        date = new Date(0);

        if (config._useUTC) {
            date.setUTCFullYear(input[0], input[1], input[2]);
            date.setUTCHours(input[3], input[4], input[5], input[6]);
        } else {
            date.setFullYear(input[0], input[1], input[2]);
            date.setHours(input[3], input[4], input[5], input[6]);
        }

        config._d = date;
    }

    // date from string and format string
    function makeDateFromStringAndFormat(config) {
        // This array is used to make a Date, either with `new Date` or `Date.UTC`
        var tokens = config._f.match(formattingTokens),
            string = config._i,
            i, parsedInput;

        config._a = [];

        for (i = 0; i < tokens.length; i++) {
            parsedInput = (getParseRegexForToken(tokens[i], config).exec(string) || [])[0];
            if (parsedInput) {
                string = string.slice(string.indexOf(parsedInput) + parsedInput.length);
            }
            // don't parse if its not a known token
            if (formatTokenFunctions[tokens[i]]) {
                addTimeToArrayFromToken(tokens[i], parsedInput, config);
            }
        }

        // add remaining unparsed input to the string
        if (string) {
            config._il = string;
        }

        // handle am pm
        if (config._isPm && config._a[3] < 12) {
            config._a[3] += 12;
        }
        // if is 12 am, change hours to 0
        if (config._isPm === false && config._a[3] === 12) {
            config._a[3] = 0;
        }
        // return
        dateFromArray(config);
    }

    // date from string and array of format strings
    function makeDateFromStringAndArray(config) {
        var tempConfig,
            tempMoment,
            bestMoment,

            scoreToBeat = 99,
            i,
            currentScore;

        for (i = 0; i < config._f.length; i++) {
            tempConfig = extend({}, config);
            tempConfig._f = config._f[i];
            makeDateFromStringAndFormat(tempConfig);
            tempMoment = new Moment(tempConfig);

            currentScore = compareArrays(tempConfig._a, tempMoment.toArray());

            // if there is any input that was not parsed
            // add a penalty for that format
            if (tempMoment._il) {
                currentScore += tempMoment._il.length;
            }

            if (currentScore < scoreToBeat) {
                scoreToBeat = currentScore;
                bestMoment = tempMoment;
            }
        }

        extend(config, bestMoment);
    }

    // date from iso format
    function makeDateFromString(config) {
        var i,
            string = config._i,
            match = isoRegex.exec(string);

        if (match) {
            // match[2] should be "T" or undefined
            config._f = 'YYYY-MM-DD' + (match[2] || " ");
            for (i = 0; i < 4; i++) {
                if (isoTimes[i][1].exec(string)) {
                    config._f += isoTimes[i][0];
                    break;
                }
            }
            if (parseTokenTimezone.exec(string)) {
                config._f += " Z";
            }
            makeDateFromStringAndFormat(config);
        } else {
            config._d = new Date(string);
        }
    }

    function makeDateFromInput(config) {
        var input = config._i,
            matched = aspNetJsonRegex.exec(input);

        if (input === undefined) {
            config._d = new Date();
        } else if (matched) {
            config._d = new Date(+matched[1]);
        } else if (typeof input === 'string') {
            makeDateFromString(config);
        } else if (isArray(input)) {
            config._a = input.slice(0);
            dateFromArray(config);
        } else {
            config._d = input instanceof Date ? new Date(+input) : new Date(input);
        }
    }


    /************************************
        Relative Time
    ************************************/


    // helper function for moment.fn.from, moment.fn.fromNow, and moment.duration.fn.humanize
    function substituteTimeAgo(string, number, withoutSuffix, isFuture, lang) {
        return lang.relativeTime(number || 1, !!withoutSuffix, string, isFuture);
    }

    function relativeTime(milliseconds, withoutSuffix, lang) {
        var seconds = round(Math.abs(milliseconds) / 1000),
            minutes = round(seconds / 60),
            hours = round(minutes / 60),
            days = round(hours / 24),
            years = round(days / 365),
            args = seconds < 45 && ['s', seconds] ||
                minutes === 1 && ['m'] ||
                minutes < 45 && ['mm', minutes] ||
                hours === 1 && ['h'] ||
                hours < 22 && ['hh', hours] ||
                days === 1 && ['d'] ||
                days <= 25 && ['dd', days] ||
                days <= 45 && ['M'] ||
                days < 345 && ['MM', round(days / 30)] ||
                years === 1 && ['y'] || ['yy', years];
        args[2] = withoutSuffix;
        args[3] = milliseconds > 0;
        args[4] = lang;
        return substituteTimeAgo.apply({}, args);
    }


    /************************************
        Week of Year
    ************************************/


    // firstDayOfWeek       0 = sun, 6 = sat
    //                      the day of the week that starts the week
    //                      (usually sunday or monday)
    // firstDayOfWeekOfYear 0 = sun, 6 = sat
    //                      the first week is the week that contains the first
    //                      of this day of the week
    //                      (eg. ISO weeks use thursday (4))
    function weekOfYear(mom, firstDayOfWeek, firstDayOfWeekOfYear) {
        var end = firstDayOfWeekOfYear - firstDayOfWeek,
            daysToDayOfWeek = firstDayOfWeekOfYear - mom.day(),
            adjustedMoment;


        if (daysToDayOfWeek > end) {
            daysToDayOfWeek -= 7;
        }

        if (daysToDayOfWeek < end - 7) {
            daysToDayOfWeek += 7;
        }

        adjustedMoment = moment(mom).add('d', daysToDayOfWeek);
        return {
            week: Math.ceil(adjustedMoment.dayOfYear() / 7),
            year: adjustedMoment.year()
        };
    }


    /************************************
        Top Level Functions
    ************************************/

    function makeMoment(config) {
        var input = config._i,
            format = config._f;

        if (input === null || input === '') {
            return null;
        }

        if (typeof input === 'string') {
            config._i = input = getLangDefinition().preparse(input);
        }

        if (moment.isMoment(input)) {
            config = extend({}, input);
            config._d = new Date(+input._d);
        } else if (format) {
            if (isArray(format)) {
                makeDateFromStringAndArray(config);
            } else {
                makeDateFromStringAndFormat(config);
            }
        } else {
            makeDateFromInput(config);
        }

        return new Moment(config);
    }

    moment = function (input, format, lang) {
        return makeMoment({
            _i : input,
            _f : format,
            _l : lang,
            _isUTC : false
        });
    };

    // creating with utc
    moment.utc = function (input, format, lang) {
        return makeMoment({
            _useUTC : true,
            _isUTC : true,
            _l : lang,
            _i : input,
            _f : format
        });
    };

    // creating with unix timestamp (in seconds)
    moment.unix = function (input) {
        return moment(input * 1000);
    };

    // duration
    moment.duration = function (input, key) {
        var isDuration = moment.isDuration(input),
            isNumber = (typeof input === 'number'),
            duration = (isDuration ? input._input : (isNumber ? {} : input)),
            matched = aspNetTimeSpanJsonRegex.exec(input),
            sign,
            ret;

        if (isNumber) {
            if (key) {
                duration[key] = input;
            } else {
                duration.milliseconds = input;
            }
        } else if (matched) {
            sign = (matched[1] === "-") ? -1 : 1;
            duration = {
                y: 0,
                d: ~~matched[2] * sign,
                h: ~~matched[3] * sign,
                m: ~~matched[4] * sign,
                s: ~~matched[5] * sign,
                ms: ~~matched[6] * sign
            };
        }

        ret = new Duration(duration);

        if (isDuration && input.hasOwnProperty('_lang')) {
            ret._lang = input._lang;
        }

        return ret;
    };

    // version number
    moment.version = VERSION;

    // default format
    moment.defaultFormat = isoFormat;

    // This function will be called whenever a moment is mutated.
    // It is intended to keep the offset in sync with the timezone.
    moment.updateOffset = function () {};

    // This function will load languages and then set the global language.  If
    // no arguments are passed in, it will simply return the current global
    // language key.
    moment.lang = function (key, values) {
        if (!key) {
            return moment.fn._lang._abbr;
        }
        if (values) {
            loadLang(key, values);
        } else if (!languages[key]) {
            getLangDefinition(key);
        }
        moment.duration.fn._lang = moment.fn._lang = getLangDefinition(key);
    };

    // returns language data
    moment.langData = function (key) {
        if (key && key._lang && key._lang._abbr) {
            key = key._lang._abbr;
        }
        return getLangDefinition(key);
    };

    // compare moment object
    moment.isMoment = function (obj) {
        return obj instanceof Moment;
    };

    // for typechecking Duration objects
    moment.isDuration = function (obj) {
        return obj instanceof Duration;
    };


    /************************************
        Moment Prototype
    ************************************/


    moment.fn = Moment.prototype = {

        clone : function () {
            return moment(this);
        },

        valueOf : function () {
            return +this._d + ((this._offset || 0) * 60000);
        },

        unix : function () {
            return Math.floor(+this / 1000);
        },

        toString : function () {
            return this.format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ");
        },

        toDate : function () {
            return this._offset ? new Date(+this) : this._d;
        },

        toISOString : function () {
            return formatMoment(moment(this).utc(), 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
        },

        toArray : function () {
            var m = this;
            return [
                m.year(),
                m.month(),
                m.date(),
                m.hours(),
                m.minutes(),
                m.seconds(),
                m.milliseconds()
            ];
        },

        isValid : function () {
            if (this._isValid == null) {
                if (this._a) {
                    this._isValid = !compareArrays(this._a, (this._isUTC ? moment.utc(this._a) : moment(this._a)).toArray());
                } else {
                    this._isValid = !isNaN(this._d.getTime());
                }
            }
            return !!this._isValid;
        },

        utc : function () {
            return this.zone(0);
        },

        local : function () {
            this.zone(0);
            this._isUTC = false;
            return this;
        },

        format : function (inputString) {
            var output = formatMoment(this, inputString || moment.defaultFormat);
            return this.lang().postformat(output);
        },

        add : function (input, val) {
            var dur;
            // switch args to support add('s', 1) and add(1, 's')
            if (typeof input === 'string') {
                dur = moment.duration(+val, input);
            } else {
                dur = moment.duration(input, val);
            }
            addOrSubtractDurationFromMoment(this, dur, 1);
            return this;
        },

        subtract : function (input, val) {
            var dur;
            // switch args to support subtract('s', 1) and subtract(1, 's')
            if (typeof input === 'string') {
                dur = moment.duration(+val, input);
            } else {
                dur = moment.duration(input, val);
            }
            addOrSubtractDurationFromMoment(this, dur, -1);
            return this;
        },

        diff : function (input, units, asFloat) {
            var that = this._isUTC ? moment(input).zone(this._offset || 0) : moment(input).local(),
                zoneDiff = (this.zone() - that.zone()) * 6e4,
                diff, output;

            units = normalizeUnits(units);

            if (units === 'year' || units === 'month') {
                // average number of days in the months in the given dates
                diff = (this.daysInMonth() + that.daysInMonth()) * 432e5; // 24 * 60 * 60 * 1000 / 2
                // difference in months
                output = ((this.year() - that.year()) * 12) + (this.month() - that.month());
                // adjust by taking difference in days, average number of days
                // and dst in the given months.
                output += ((this - moment(this).startOf('month')) -
                        (that - moment(that).startOf('month'))) / diff;
                // same as above but with zones, to negate all dst
                output -= ((this.zone() - moment(this).startOf('month').zone()) -
                        (that.zone() - moment(that).startOf('month').zone())) * 6e4 / diff;
                if (units === 'year') {
                    output = output / 12;
                }
            } else {
                diff = (this - that);
                output = units === 'second' ? diff / 1e3 : // 1000
                    units === 'minute' ? diff / 6e4 : // 1000 * 60
                    units === 'hour' ? diff / 36e5 : // 1000 * 60 * 60
                    units === 'day' ? (diff - zoneDiff) / 864e5 : // 1000 * 60 * 60 * 24, negate dst
                    units === 'week' ? (diff - zoneDiff) / 6048e5 : // 1000 * 60 * 60 * 24 * 7, negate dst
                    diff;
            }
            return asFloat ? output : absRound(output);
        },

        from : function (time, withoutSuffix) {
            return moment.duration(this.diff(time)).lang(this.lang()._abbr).humanize(!withoutSuffix);
        },

        fromNow : function (withoutSuffix) {
            return this.from(moment(), withoutSuffix);
        },

        calendar : function () {
            var diff = this.diff(moment().startOf('day'), 'days', true),
                format = diff < -6 ? 'sameElse' :
                diff < -1 ? 'lastWeek' :
                diff < 0 ? 'lastDay' :
                diff < 1 ? 'sameDay' :
                diff < 2 ? 'nextDay' :
                diff < 7 ? 'nextWeek' : 'sameElse';
            return this.format(this.lang().calendar(format, this));
        },

        isLeapYear : function () {
            var year = this.year();
            return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
        },

        isDST : function () {
            return (this.zone() < this.clone().month(0).zone() ||
                this.zone() < this.clone().month(5).zone());
        },

        day : function (input) {
            var day = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
            if (input != null) {
                if (typeof input === 'string') {
                    input = this.lang().weekdaysParse(input);
                    if (typeof input !== 'number') {
                        return this;
                    }
                }
                return this.add({ d : input - day });
            } else {
                return day;
            }
        },

        month : function (input) {
            var utc = this._isUTC ? 'UTC' : '',
                dayOfMonth,
                daysInMonth;

            if (input != null) {
                if (typeof input === 'string') {
                    input = this.lang().monthsParse(input);
                    if (typeof input !== 'number') {
                        return this;
                    }
                }

                dayOfMonth = this.date();
                this.date(1);
                this._d['set' + utc + 'Month'](input);
                this.date(Math.min(dayOfMonth, this.daysInMonth()));

                moment.updateOffset(this);
                return this;
            } else {
                return this._d['get' + utc + 'Month']();
            }
        },

        startOf: function (units) {
            units = normalizeUnits(units);
            // the following switch intentionally omits break keywords
            // to utilize falling through the cases.
            switch (units) {
            case 'year':
                this.month(0);
                /* falls through */
            case 'month':
                this.date(1);
                /* falls through */
            case 'week':
            case 'day':
                this.hours(0);
                /* falls through */
            case 'hour':
                this.minutes(0);
                /* falls through */
            case 'minute':
                this.seconds(0);
                /* falls through */
            case 'second':
                this.milliseconds(0);
                /* falls through */
            }

            // weeks are a special case
            if (units === 'week') {
                this.weekday(0);
            }

            return this;
        },

        endOf: function (units) {
            return this.startOf(units).add(units, 1).subtract('ms', 1);
        },

        isAfter: function (input, units) {
            units = typeof units !== 'undefined' ? units : 'millisecond';
            return +this.clone().startOf(units) > +moment(input).startOf(units);
        },

        isBefore: function (input, units) {
            units = typeof units !== 'undefined' ? units : 'millisecond';
            return +this.clone().startOf(units) < +moment(input).startOf(units);
        },

        isSame: function (input, units) {
            units = typeof units !== 'undefined' ? units : 'millisecond';
            return +this.clone().startOf(units) === +moment(input).startOf(units);
        },

        min: function (other) {
            other = moment.apply(null, arguments);
            return other < this ? this : other;
        },

        max: function (other) {
            other = moment.apply(null, arguments);
            return other > this ? this : other;
        },

        zone : function (input) {
            var offset = this._offset || 0;
            if (input != null) {
                if (typeof input === "string") {
                    input = timezoneMinutesFromString(input);
                }
                if (Math.abs(input) < 16) {
                    input = input * 60;
                }
                this._offset = input;
                this._isUTC = true;
                if (offset !== input) {
                    addOrSubtractDurationFromMoment(this, moment.duration(offset - input, 'm'), 1, true);
                }
            } else {
                return this._isUTC ? offset : this._d.getTimezoneOffset();
            }
            return this;
        },

        zoneAbbr : function () {
            return this._isUTC ? "UTC" : "";
        },

        zoneName : function () {
            return this._isUTC ? "Coordinated Universal Time" : "";
        },

        daysInMonth : function () {
            return moment.utc([this.year(), this.month() + 1, 0]).date();
        },

        dayOfYear : function (input) {
            var dayOfYear = round((moment(this).startOf('day') - moment(this).startOf('year')) / 864e5) + 1;
            return input == null ? dayOfYear : this.add("d", (input - dayOfYear));
        },

        weekYear : function (input) {
            var year = weekOfYear(this, this.lang()._week.dow, this.lang()._week.doy).year;
            return input == null ? year : this.add("y", (input - year));
        },

        isoWeekYear : function (input) {
            var year = weekOfYear(this, 1, 4).year;
            return input == null ? year : this.add("y", (input - year));
        },

        week : function (input) {
            var week = this.lang().week(this);
            return input == null ? week : this.add("d", (input - week) * 7);
        },

        isoWeek : function (input) {
            var week = weekOfYear(this, 1, 4).week;
            return input == null ? week : this.add("d", (input - week) * 7);
        },

        weekday : function (input) {
            var weekday = (this._d.getDay() + 7 - this.lang()._week.dow) % 7;
            return input == null ? weekday : this.add("d", input - weekday);
        },

        isoWeekday : function (input) {
            // behaves the same as moment#day except
            // as a getter, returns 7 instead of 0 (1-7 range instead of 0-6)
            // as a setter, sunday should belong to the previous week.
            return input == null ? this.day() || 7 : this.day(this.day() % 7 ? input : input - 7);
        },

        // If passed a language key, it will set the language for this
        // instance.  Otherwise, it will return the language configuration
        // variables for this instance.
        lang : function (key) {
            if (key === undefined) {
                return this._lang;
            } else {
                this._lang = getLangDefinition(key);
                return this;
            }
        }
    };

    // helper for adding shortcuts
    function makeGetterAndSetter(name, key) {
        moment.fn[name] = moment.fn[name + 's'] = function (input) {
            var utc = this._isUTC ? 'UTC' : '';
            if (input != null) {
                this._d['set' + utc + key](input);
                moment.updateOffset(this);
                return this;
            } else {
                return this._d['get' + utc + key]();
            }
        };
    }

    // loop through and add shortcuts (Month, Date, Hours, Minutes, Seconds, Milliseconds)
    for (i = 0; i < proxyGettersAndSetters.length; i ++) {
        makeGetterAndSetter(proxyGettersAndSetters[i].toLowerCase().replace(/s$/, ''), proxyGettersAndSetters[i]);
    }

    // add shortcut for year (uses different syntax than the getter/setter 'year' == 'FullYear')
    makeGetterAndSetter('year', 'FullYear');

    // add plural methods
    moment.fn.days = moment.fn.day;
    moment.fn.months = moment.fn.month;
    moment.fn.weeks = moment.fn.week;
    moment.fn.isoWeeks = moment.fn.isoWeek;

    // add aliased format methods
    moment.fn.toJSON = moment.fn.toISOString;

    /************************************
        Duration Prototype
    ************************************/


    moment.duration.fn = Duration.prototype = {
        _bubble : function () {
            var milliseconds = this._milliseconds,
                days = this._days,
                months = this._months,
                data = this._data,
                seconds, minutes, hours, years;

            // The following code bubbles up values, see the tests for
            // examples of what that means.
            data.milliseconds = milliseconds % 1000;

            seconds = absRound(milliseconds / 1000);
            data.seconds = seconds % 60;

            minutes = absRound(seconds / 60);
            data.minutes = minutes % 60;

            hours = absRound(minutes / 60);
            data.hours = hours % 24;

            days += absRound(hours / 24);
            data.days = days % 30;

            months += absRound(days / 30);
            data.months = months % 12;

            years = absRound(months / 12);
            data.years = years;
        },

        weeks : function () {
            return absRound(this.days() / 7);
        },

        valueOf : function () {
            return this._milliseconds +
              this._days * 864e5 +
              (this._months % 12) * 2592e6 +
              ~~(this._months / 12) * 31536e6;
        },

        humanize : function (withSuffix) {
            var difference = +this,
                output = relativeTime(difference, !withSuffix, this.lang());

            if (withSuffix) {
                output = this.lang().pastFuture(difference, output);
            }

            return this.lang().postformat(output);
        },

        add : function (input, val) {
            // supports only 2.0-style add(1, 's') or add(moment)
            var dur = moment.duration(input, val);

            this._milliseconds += dur._milliseconds;
            this._days += dur._days;
            this._months += dur._months;

            this._bubble();

            return this;
        },

        subtract : function (input, val) {
            var dur = moment.duration(input, val);

            this._milliseconds -= dur._milliseconds;
            this._days -= dur._days;
            this._months -= dur._months;

            this._bubble();

            return this;
        },

        get : function (units) {
            units = normalizeUnits(units);
            return this[units.toLowerCase() + 's']();
        },

        as : function (units) {
            units = normalizeUnits(units);
            return this['as' + units.charAt(0).toUpperCase() + units.slice(1) + 's']();
        },

        lang : moment.fn.lang
    };

    function makeDurationGetter(name) {
        moment.duration.fn[name] = function () {
            return this._data[name];
        };
    }

    function makeDurationAsGetter(name, factor) {
        moment.duration.fn['as' + name] = function () {
            return +this / factor;
        };
    }

    for (i in unitMillisecondFactors) {
        if (unitMillisecondFactors.hasOwnProperty(i)) {
            makeDurationAsGetter(i, unitMillisecondFactors[i]);
            makeDurationGetter(i.toLowerCase());
        }
    }

    makeDurationAsGetter('Weeks', 6048e5);
    moment.duration.fn.asMonths = function () {
        return (+this - this.years() * 31536e6) / 2592e6 + this.years() * 12;
    };


    /************************************
        Default Lang
    ************************************/


    // Set default language, other languages will inherit from English.
    moment.lang('en', {
        ordinal : function (number) {
            var b = number % 10,
                output = (~~ (number % 100 / 10) === 1) ? 'th' :
                (b === 1) ? 'st' :
                (b === 2) ? 'nd' :
                (b === 3) ? 'rd' : 'th';
            return number + output;
        }
    });


    /************************************
        Exposing Moment
    ************************************/


    // CommonJS module is defined
    if (hasModule) {
        module.exports = moment;
    }
    /*global ender:false */
    if (typeof ender === 'undefined') {
        // here, `this` means `window` in the browser, or `global` on the server
        // add `moment` as a global object via a string identifier,
        // for Closure Compiler "advanced" mode
        this['moment'] = moment;
    }
    /*global define:false */
    if (typeof define === "function" && define.amd) {
        define("moment", [], function () {
            return moment;
        });
    }
}).call(this);

/*!
 * Chart.js
 * http://chartjs.org/
 *
 * Copyright 2013 Nick Downie
 * Released under the MIT license
 * https://github.com/nnnick/Chart.js/blob/master/LICENSE.md
 */

//Define the global Chart Variable as a class.
window.Chart = function(context){

	var chart = this;
	
	
	//Easing functions adapted from Robert Penner's easing equations
	//http://www.robertpenner.com/easing/
	
	var animationOptions = {
		linear : function (t){
			return t;
		},
		easeInQuad: function (t) {
			return t*t;
		},
		easeOutQuad: function (t) {
			return -1 *t*(t-2);
		},
		easeInOutQuad: function (t) {
			if ((t/=1/2) < 1) return 1/2*t*t;
			return -1/2 * ((--t)*(t-2) - 1);
		},
		easeInCubic: function (t) {
			return t*t*t;
		},
		easeOutCubic: function (t) {
			return 1*((t=t/1-1)*t*t + 1);
		},
		easeInOutCubic: function (t) {
			if ((t/=1/2) < 1) return 1/2*t*t*t;
			return 1/2*((t-=2)*t*t + 2);
		},
		easeInQuart: function (t) {
			return t*t*t*t;
		},
		easeOutQuart: function (t) {
			return -1 * ((t=t/1-1)*t*t*t - 1);
		},
		easeInOutQuart: function (t) {
			if ((t/=1/2) < 1) return 1/2*t*t*t*t;
			return -1/2 * ((t-=2)*t*t*t - 2);
		},
		easeInQuint: function (t) {
			return 1*(t/=1)*t*t*t*t;
		},
		easeOutQuint: function (t) {
			return 1*((t=t/1-1)*t*t*t*t + 1);
		},
		easeInOutQuint: function (t) {
			if ((t/=1/2) < 1) return 1/2*t*t*t*t*t;
			return 1/2*((t-=2)*t*t*t*t + 2);
		},
		easeInSine: function (t) {
			return -1 * Math.cos(t/1 * (Math.PI/2)) + 1;
		},
		easeOutSine: function (t) {
			return 1 * Math.sin(t/1 * (Math.PI/2));
		},
		easeInOutSine: function (t) {
			return -1/2 * (Math.cos(Math.PI*t/1) - 1);
		},
		easeInExpo: function (t) {
			return (t==0) ? 1 : 1 * Math.pow(2, 10 * (t/1 - 1));
		},
		easeOutExpo: function (t) {
			return (t==1) ? 1 : 1 * (-Math.pow(2, -10 * t/1) + 1);
		},
		easeInOutExpo: function (t) {
			if (t==0) return 0;
			if (t==1) return 1;
			if ((t/=1/2) < 1) return 1/2 * Math.pow(2, 10 * (t - 1));
			return 1/2 * (-Math.pow(2, -10 * --t) + 2);
			},
		easeInCirc: function (t) {
			if (t>=1) return t;
			return -1 * (Math.sqrt(1 - (t/=1)*t) - 1);
		},
		easeOutCirc: function (t) {
			return 1 * Math.sqrt(1 - (t=t/1-1)*t);
		},
		easeInOutCirc: function (t) {
			if ((t/=1/2) < 1) return -1/2 * (Math.sqrt(1 - t*t) - 1);
			return 1/2 * (Math.sqrt(1 - (t-=2)*t) + 1);
		},
		easeInElastic: function (t) {
			var s=1.70158;var p=0;var a=1;
			if (t==0) return 0;  if ((t/=1)==1) return 1;  if (!p) p=1*.3;
			if (a < Math.abs(1)) { a=1; var s=p/4; }
			else var s = p/(2*Math.PI) * Math.asin (1/a);
			return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*1-s)*(2*Math.PI)/p ));
		},
		easeOutElastic: function (t) {
			var s=1.70158;var p=0;var a=1;
			if (t==0) return 0;  if ((t/=1)==1) return 1;  if (!p) p=1*.3;
			if (a < Math.abs(1)) { a=1; var s=p/4; }
			else var s = p/(2*Math.PI) * Math.asin (1/a);
			return a*Math.pow(2,-10*t) * Math.sin( (t*1-s)*(2*Math.PI)/p ) + 1;
		},
		easeInOutElastic: function (t) {
			var s=1.70158;var p=0;var a=1;
			if (t==0) return 0;  if ((t/=1/2)==2) return 1;  if (!p) p=1*(.3*1.5);
			if (a < Math.abs(1)) { a=1; var s=p/4; }
			else var s = p/(2*Math.PI) * Math.asin (1/a);
			if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*1-s)*(2*Math.PI)/p ));
			return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*1-s)*(2*Math.PI)/p )*.5 + 1;
		},
		easeInBack: function (t) {
			var s = 1.70158;
			return 1*(t/=1)*t*((s+1)*t - s);
		},
		easeOutBack: function (t) {
			var s = 1.70158;
			return 1*((t=t/1-1)*t*((s+1)*t + s) + 1);
		},
		easeInOutBack: function (t) {
			var s = 1.70158; 
			if ((t/=1/2) < 1) return 1/2*(t*t*(((s*=(1.525))+1)*t - s));
			return 1/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2);
		},
		easeInBounce: function (t) {
			return 1 - animationOptions.easeOutBounce (1-t);
		},
		easeOutBounce: function (t) {
			if ((t/=1) < (1/2.75)) {
				return 1*(7.5625*t*t);
			} else if (t < (2/2.75)) {
				return 1*(7.5625*(t-=(1.5/2.75))*t + .75);
			} else if (t < (2.5/2.75)) {
				return 1*(7.5625*(t-=(2.25/2.75))*t + .9375);
			} else {
				return 1*(7.5625*(t-=(2.625/2.75))*t + .984375);
			}
		},
		easeInOutBounce: function (t) {
			if (t < 1/2) return animationOptions.easeInBounce (t*2) * .5;
			return animationOptions.easeOutBounce (t*2-1) * .5 + 1*.5;
		}
	};

	//Variables global to the chart
	var width = context.canvas.width;
	var height = context.canvas.height;


	//High pixel density displays - multiply the size of the canvas height/width by the device pixel ratio, then scale.
	if (window.devicePixelRatio) {
		context.canvas.style.width = width + "px";
		context.canvas.style.height = height + "px";
		context.canvas.height = height * window.devicePixelRatio;
		context.canvas.width = width * window.devicePixelRatio;
		context.scale(window.devicePixelRatio, window.devicePixelRatio);
	}

	this.PolarArea = function(data,options){
	
		chart.PolarArea.defaults = {
			scaleOverlay : true,
			scaleOverride : false,
			scaleSteps : null,
			scaleStepWidth : null,
			scaleStartValue : null,
			scaleShowLine : true,
			scaleLineColor : "rgba(0,0,0,.1)",
			scaleLineWidth : 1,
			scaleShowLabels : true,
			scaleLabel : "<%=value%>",
			scaleFontFamily : "'Arial'",
			scaleFontSize : 12,
			scaleFontStyle : "normal",
			scaleFontColor : "#666",
			scaleShowLabelBackdrop : true,
			scaleBackdropColor : "rgba(255,255,255,0.75)",
			scaleBackdropPaddingY : 2,
			scaleBackdropPaddingX : 2,
			segmentShowStroke : true,
			segmentStrokeColor : "#fff",
			segmentStrokeWidth : 2,
			animation : true,
			animationSteps : 100,
			animationEasing : "easeOutBounce",
			animateRotate : true,
			animateScale : false,
			onAnimationComplete : null
		};
		
		var config = (options)? mergeChartConfig(chart.PolarArea.defaults,options) : chart.PolarArea.defaults;
		
		return new PolarArea(data,config,context);
	};

	this.Radar = function(data,options){
	
		chart.Radar.defaults = {
			scaleOverlay : false,
			scaleOverride : false,
			scaleSteps : null,
			scaleStepWidth : null,
			scaleStartValue : null,
			scaleShowLine : true,
			scaleLineColor : "rgba(0,0,0,.1)",
			scaleLineWidth : 1,
			scaleShowLabels : false,
			scaleLabel : "<%=value%>",
			scaleFontFamily : "'Arial'",
			scaleFontSize : 12,
			scaleFontStyle : "normal",
			scaleFontColor : "#666",
			scaleShowLabelBackdrop : true,
			scaleBackdropColor : "rgba(255,255,255,0.75)",
			scaleBackdropPaddingY : 2,
			scaleBackdropPaddingX : 2,
			angleShowLineOut : true,
			angleLineColor : "rgba(0,0,0,.1)",
			angleLineWidth : 1,			
			pointLabelFontFamily : "'Arial'",
			pointLabelFontStyle : "normal",
			pointLabelFontSize : 12,
			pointLabelFontColor : "#666",
			pointDot : true,
			pointDotRadius : 3,
			pointDotStrokeWidth : 1,
			datasetStroke : true,
			datasetStrokeWidth : 2,
			datasetFill : true,
			animation : true,
			animationSteps : 60,
			animationEasing : "easeOutQuart",
			onAnimationComplete : null
		};
		
		var config = (options)? mergeChartConfig(chart.Radar.defaults,options) : chart.Radar.defaults;

		return new Radar(data,config,context);
	};
	
	this.Pie = function(data,options){
		chart.Pie.defaults = {
			segmentShowStroke : true,
			segmentStrokeColor : "#fff",
			segmentStrokeWidth : 2,
			animation : true,
			animationSteps : 100,
			animationEasing : "easeOutBounce",
			animateRotate : true,
			animateScale : false,
			onAnimationComplete : null
		};		

		var config = (options)? mergeChartConfig(chart.Pie.defaults,options) : chart.Pie.defaults;
		
		return new Pie(data,config,context);				
	};
	
	this.Doughnut = function(data,options){
	
		chart.Doughnut.defaults = {
			segmentShowStroke : true,
			segmentStrokeColor : "#fff",
			segmentStrokeWidth : 2,
			percentageInnerCutout : 50,
			animation : true,
			animationSteps : 100,
			animationEasing : "easeOutBounce",
			animateRotate : true,
			animateScale : false,
			onAnimationComplete : null
		};		

		var config = (options)? mergeChartConfig(chart.Doughnut.defaults,options) : chart.Doughnut.defaults;
		
		return new Doughnut(data,config,context);			
		
	};

	this.Line = function(data,options){
	
		chart.Line.defaults = {
			scaleOverlay : false,
			scaleOverride : false,
			scaleSteps : null,
			scaleStepWidth : null,
			scaleStartValue : null,
			scaleLineColor : "rgba(0,0,0,.1)",
			scaleLineWidth : 1,
			scaleShowLabels : true,
			scaleLabel : "<%=value%>",
			scaleFontFamily : "'Arial'",
			scaleFontSize : 12,
			scaleFontStyle : "normal",
			scaleFontColor : "#666",
			scaleShowGridLines : true,
			scaleGridLineColor : "rgba(0,0,0,.05)",
			scaleGridLineWidth : 1,
			bezierCurve : true,
			pointDot : true,
			pointDotRadius : 4,
			pointDotStrokeWidth : 2,
			datasetStroke : true,
			datasetStrokeWidth : 2,
			datasetFill : true,
			animation : true,
			animationSteps : 60,
			animationEasing : "easeOutQuart",
			onAnimationComplete : null
		};		
		var config = (options) ? mergeChartConfig(chart.Line.defaults,options) : chart.Line.defaults;
		
		return new Line(data,config,context);
	}
	
	this.Bar = function(data,options){
		chart.Bar.defaults = {
			scaleOverlay : false,
			scaleOverride : false,
			scaleSteps : null,
			scaleStepWidth : null,
			scaleStartValue : null,
			scaleLineColor : "rgba(0,0,0,.1)",
			scaleLineWidth : 1,
			scaleShowLabels : true,
			scaleLabel : "<%=value%>",
			scaleFontFamily : "'Arial'",
			scaleFontSize : 12,
			scaleFontStyle : "normal",
			scaleFontColor : "#666",
			scaleShowGridLines : true,
			scaleGridLineColor : "rgba(0,0,0,.05)",
			scaleGridLineWidth : 1,
			barShowStroke : true,
			barStrokeWidth : 2,
			barValueSpacing : 5,
			barDatasetSpacing : 1,
			animation : true,
			animationSteps : 60,
			animationEasing : "easeOutQuart",
			onAnimationComplete : null
		};		
		var config = (options) ? mergeChartConfig(chart.Bar.defaults,options) : chart.Bar.defaults;
		
		return new Bar(data,config,context);		
	}
	
	var clear = function(c){
		c.clearRect(0, 0, width, height);
	};

	var PolarArea = function(data,config,ctx){
		var maxSize, scaleHop, calculatedScale, labelHeight, scaleHeight, valueBounds, labelTemplateString;		
		
		
		calculateDrawingSizes();
		
		valueBounds = getValueBounds();

		labelTemplateString = (config.scaleShowLabels)? config.scaleLabel : null;

		//Check and set the scale
		if (!config.scaleOverride){
			
			calculatedScale = calculateScale(scaleHeight,valueBounds.maxSteps,valueBounds.minSteps,valueBounds.maxValue,valueBounds.minValue,labelTemplateString);
		}
		else {
			calculatedScale = {
				steps : config.scaleSteps,
				stepValue : config.scaleStepWidth,
				graphMin : config.scaleStartValue,
				labels : []
			}
			populateLabels(labelTemplateString, calculatedScale.labels,calculatedScale.steps,config.scaleStartValue,config.scaleStepWidth);
		}
		
		scaleHop = maxSize/(calculatedScale.steps);

		//Wrap in an animation loop wrapper
		animationLoop(config,drawScale,drawAllSegments,ctx);

		function calculateDrawingSizes(){
			maxSize = (Min([width,height])/2);
			//Remove whatever is larger - the font size or line width.
			
			maxSize -= Max([config.scaleFontSize*0.5,config.scaleLineWidth*0.5]);
			
			labelHeight = config.scaleFontSize*2;
			//If we're drawing the backdrop - add the Y padding to the label height and remove from drawing region.
			if (config.scaleShowLabelBackdrop){
				labelHeight += (2 * config.scaleBackdropPaddingY);
				maxSize -= config.scaleBackdropPaddingY*1.5;
			}
			
			scaleHeight = maxSize;
			//If the label height is less than 5, set it to 5 so we don't have lines on top of each other.
			labelHeight = Default(labelHeight,5);
		}
		function drawScale(){
			for (var i=0; i<calculatedScale.steps; i++){
				//If the line object is there
				if (config.scaleShowLine){
					ctx.beginPath();
					ctx.arc(width/2, height/2, scaleHop * (i + 1), 0, (Math.PI * 2), true);
					ctx.strokeStyle = config.scaleLineColor;
					ctx.lineWidth = config.scaleLineWidth;
					ctx.stroke();
				}

				if (config.scaleShowLabels){
					ctx.textAlign = "center";
					ctx.font = config.scaleFontStyle + " " + config.scaleFontSize + "px " + config.scaleFontFamily;
 					var label =  calculatedScale.labels[i];
					//If the backdrop object is within the font object
					if (config.scaleShowLabelBackdrop){
						var textWidth = ctx.measureText(label).width;
						ctx.fillStyle = config.scaleBackdropColor;
						ctx.beginPath();
						ctx.rect(
							Math.round(width/2 - textWidth/2 - config.scaleBackdropPaddingX),     //X
							Math.round(height/2 - (scaleHop * (i + 1)) - config.scaleFontSize*0.5 - config.scaleBackdropPaddingY),//Y
							Math.round(textWidth + (config.scaleBackdropPaddingX*2)), //Width
							Math.round(config.scaleFontSize + (config.scaleBackdropPaddingY*2)) //Height
						);
						ctx.fill();
					}
					ctx.textBaseline = "middle";
					ctx.fillStyle = config.scaleFontColor;
					ctx.fillText(label,width/2,height/2 - (scaleHop * (i + 1)));
				}
			}
		}
		function drawAllSegments(animationDecimal){
			var startAngle = -Math.PI/2,
			angleStep = (Math.PI*2)/data.length,
			scaleAnimation = 1,
			rotateAnimation = 1;
			if (config.animation) {
				if (config.animateScale) {
					scaleAnimation = animationDecimal;
				}
				if (config.animateRotate){
					rotateAnimation = animationDecimal;
				}
			}

			for (var i=0; i<data.length; i++){

				ctx.beginPath();
				ctx.arc(width/2,height/2,scaleAnimation * calculateOffset(data[i].value,calculatedScale,scaleHop),startAngle, startAngle + rotateAnimation*angleStep, false);
				ctx.lineTo(width/2,height/2);
				ctx.closePath();
				ctx.fillStyle = data[i].color;
				ctx.fill();

				if(config.segmentShowStroke){
					ctx.strokeStyle = config.segmentStrokeColor;
					ctx.lineWidth = config.segmentStrokeWidth;
					ctx.stroke();
				}
				startAngle += rotateAnimation*angleStep;
			}
		}
		function getValueBounds() {
			var upperValue = Number.MIN_VALUE;
			var lowerValue = Number.MAX_VALUE;
			for (var i=0; i<data.length; i++){
				if (data[i].value > upperValue) {upperValue = data[i].value;}
				if (data[i].value < lowerValue) {lowerValue = data[i].value;}
			};

			var maxSteps = Math.floor((scaleHeight / (labelHeight*0.66)));
			var minSteps = Math.floor((scaleHeight / labelHeight*0.5));
			
			return {
				maxValue : upperValue,
				minValue : lowerValue,
				maxSteps : maxSteps,
				minSteps : minSteps
			};
			

		}
	}

	var Radar = function (data,config,ctx) {
		var maxSize, scaleHop, calculatedScale, labelHeight, scaleHeight, valueBounds, labelTemplateString;	
			
		//If no labels are defined set to an empty array, so referencing length for looping doesn't blow up.
		if (!data.labels) data.labels = [];
		
		calculateDrawingSizes();

		var valueBounds = getValueBounds();

		labelTemplateString = (config.scaleShowLabels)? config.scaleLabel : null;

		//Check and set the scale
		if (!config.scaleOverride){
			
			calculatedScale = calculateScale(scaleHeight,valueBounds.maxSteps,valueBounds.minSteps,valueBounds.maxValue,valueBounds.minValue,labelTemplateString);
		}
		else {
			calculatedScale = {
				steps : config.scaleSteps,
				stepValue : config.scaleStepWidth,
				graphMin : config.scaleStartValue,
				labels : []
			}
			populateLabels(labelTemplateString, calculatedScale.labels,calculatedScale.steps,config.scaleStartValue,config.scaleStepWidth);
		}
		
		scaleHop = maxSize/(calculatedScale.steps);
		
		animationLoop(config,drawScale,drawAllDataPoints,ctx);
		
		//Radar specific functions.
		function drawAllDataPoints(animationDecimal){
			var rotationDegree = (2*Math.PI)/data.datasets[0].data.length;

			ctx.save();
			//translate to the centre of the canvas.
			ctx.translate(width/2,height/2);
			
			//We accept multiple data sets for radar charts, so show loop through each set
			for (var i=0; i<data.datasets.length; i++){
				ctx.beginPath();

				ctx.moveTo(0,animationDecimal*(-1*calculateOffset(data.datasets[i].data[0],calculatedScale,scaleHop)));
				for (var j=1; j<data.datasets[i].data.length; j++){
					ctx.rotate(rotationDegree);	
					ctx.lineTo(0,animationDecimal*(-1*calculateOffset(data.datasets[i].data[j],calculatedScale,scaleHop)));
			
				}
				ctx.closePath();
				
				
				ctx.fillStyle = data.datasets[i].fillColor;
				ctx.strokeStyle = data.datasets[i].strokeColor;
				ctx.lineWidth = config.datasetStrokeWidth;
				ctx.fill();
				ctx.stroke();
				
								
				if (config.pointDot){
					ctx.fillStyle = data.datasets[i].pointColor;
					ctx.strokeStyle = data.datasets[i].pointStrokeColor;
					ctx.lineWidth = config.pointDotStrokeWidth;
					for (var k=0; k<data.datasets[i].data.length; k++){
						ctx.rotate(rotationDegree);
						ctx.beginPath();
						ctx.arc(0,animationDecimal*(-1*calculateOffset(data.datasets[i].data[k],calculatedScale,scaleHop)),config.pointDotRadius,2*Math.PI,false);
						ctx.fill();
						ctx.stroke();
					}					
					
				}
				ctx.rotate(rotationDegree);
				
			}
			ctx.restore();
			
			
		}
		function drawScale(){
			var rotationDegree = (2*Math.PI)/data.datasets[0].data.length;
			ctx.save();
		    ctx.translate(width / 2, height / 2);	
			
			if (config.angleShowLineOut){
				ctx.strokeStyle = config.angleLineColor;		    	    
				ctx.lineWidth = config.angleLineWidth;
				for (var h=0; h<data.datasets[0].data.length; h++){
					
				    ctx.rotate(rotationDegree);
					ctx.beginPath();
					ctx.moveTo(0,0);
					ctx.lineTo(0,-maxSize);
					ctx.stroke();
				}
			}

			for (var i=0; i<calculatedScale.steps; i++){
				ctx.beginPath();
				
				if(config.scaleShowLine){
					ctx.strokeStyle = config.scaleLineColor;
					ctx.lineWidth = config.scaleLineWidth;
					ctx.moveTo(0,-scaleHop * (i+1));					
					for (var j=0; j<data.datasets[0].data.length; j++){
					    ctx.rotate(rotationDegree);
						ctx.lineTo(0,-scaleHop * (i+1));
					}
					ctx.closePath();
					ctx.stroke();			
							
				}
				
				if (config.scaleShowLabels){				
					ctx.textAlign = 'center';
					ctx.font = config.scaleFontStyle + " " + config.scaleFontSize+"px " + config.scaleFontFamily; 
					ctx.textBaseline = "middle";
					
					if (config.scaleShowLabelBackdrop){
						var textWidth = ctx.measureText(calculatedScale.labels[i]).width;
						ctx.fillStyle = config.scaleBackdropColor;
						ctx.beginPath();
						ctx.rect(
							Math.round(- textWidth/2 - config.scaleBackdropPaddingX),     //X
							Math.round((-scaleHop * (i + 1)) - config.scaleFontSize*0.5 - config.scaleBackdropPaddingY),//Y
							Math.round(textWidth + (config.scaleBackdropPaddingX*2)), //Width
							Math.round(config.scaleFontSize + (config.scaleBackdropPaddingY*2)) //Height
						);
						ctx.fill();
					}						
					ctx.fillStyle = config.scaleFontColor;
					ctx.fillText(calculatedScale.labels[i],0,-scaleHop*(i+1));
				}

			}
			for (var k=0; k<data.labels.length; k++){				
			ctx.font = config.pointLabelFontStyle + " " + config.pointLabelFontSize+"px " + config.pointLabelFontFamily;
			ctx.fillStyle = config.pointLabelFontColor;
				var opposite = Math.sin(rotationDegree*k) * (maxSize + config.pointLabelFontSize);
				var adjacent = Math.cos(rotationDegree*k) * (maxSize + config.pointLabelFontSize);
				
				if(rotationDegree*k == Math.PI || rotationDegree*k == 0){
					ctx.textAlign = "center";
				}
				else if(rotationDegree*k > Math.PI){
					ctx.textAlign = "right";
				}
				else{
					ctx.textAlign = "left";
				}
				
				ctx.textBaseline = "middle";
				
				ctx.fillText(data.labels[k],opposite,-adjacent);
				
			}
			ctx.restore();
		};
		function calculateDrawingSizes(){
			maxSize = (Min([width,height])/2);

			labelHeight = config.scaleFontSize*2;
			
			var labelLength = 0;
			for (var i=0; i<data.labels.length; i++){
				ctx.font = config.pointLabelFontStyle + " " + config.pointLabelFontSize+"px " + config.pointLabelFontFamily;
				var textMeasurement = ctx.measureText(data.labels[i]).width;
				if(textMeasurement>labelLength) labelLength = textMeasurement;
			}
			
			//Figure out whats the largest - the height of the text or the width of what's there, and minus it from the maximum usable size.
			maxSize -= Max([labelLength,((config.pointLabelFontSize/2)*1.5)]);				
			
			maxSize -= config.pointLabelFontSize;
			maxSize = CapValue(maxSize, null, 0);
			scaleHeight = maxSize;
			//If the label height is less than 5, set it to 5 so we don't have lines on top of each other.
			labelHeight = Default(labelHeight,5);
		};
		function getValueBounds() {
			var upperValue = Number.MIN_VALUE;
			var lowerValue = Number.MAX_VALUE;
			
			for (var i=0; i<data.datasets.length; i++){
				for (var j=0; j<data.datasets[i].data.length; j++){
					if (data.datasets[i].data[j] > upperValue){upperValue = data.datasets[i].data[j]}
					if (data.datasets[i].data[j] < lowerValue){lowerValue = data.datasets[i].data[j]}
				}
			}

			var maxSteps = Math.floor((scaleHeight / (labelHeight*0.66)));
			var minSteps = Math.floor((scaleHeight / labelHeight*0.5));
			
			return {
				maxValue : upperValue,
				minValue : lowerValue,
				maxSteps : maxSteps,
				minSteps : minSteps
			};
			

		}
	}

	var Pie = function(data,config,ctx){
		var segmentTotal = 0;
		
		//In case we have a canvas that is not a square. Minus 5 pixels as padding round the edge.
		var pieRadius = Min([height/2,width/2]) - 5;
		
		for (var i=0; i<data.length; i++){
			segmentTotal += data[i].value;
		}
		
		
		animationLoop(config,null,drawPieSegments,ctx);
				
		function drawPieSegments (animationDecimal){
			var cumulativeAngle = -Math.PI/2,
			scaleAnimation = 1,
			rotateAnimation = 1;
			if (config.animation) {
				if (config.animateScale) {
					scaleAnimation = animationDecimal;
				}
				if (config.animateRotate){
					rotateAnimation = animationDecimal;
				}
			}
			for (var i=0; i<data.length; i++){
				var segmentAngle = rotateAnimation * ((data[i].value/segmentTotal) * (Math.PI*2));
				ctx.beginPath();
				ctx.arc(width/2,height/2,scaleAnimation * pieRadius,cumulativeAngle,cumulativeAngle + segmentAngle);
				ctx.lineTo(width/2,height/2);
				ctx.closePath();
				ctx.fillStyle = data[i].color;
				ctx.fill();
				
				if(config.segmentShowStroke){
					ctx.lineWidth = config.segmentStrokeWidth;
					ctx.strokeStyle = config.segmentStrokeColor;
					ctx.stroke();
				}
				cumulativeAngle += segmentAngle;
			}			
		}		
	}

	var Doughnut = function(data,config,ctx){
		var segmentTotal = 0;
		
		//In case we have a canvas that is not a square. Minus 5 pixels as padding round the edge.
		var doughnutRadius = Min([height/2,width/2]) - 5;
		
		var cutoutRadius = doughnutRadius * (config.percentageInnerCutout/100);
		
		for (var i=0; i<data.length; i++){
			segmentTotal += data[i].value;
		}
		
		
		animationLoop(config,null,drawPieSegments,ctx);
		
		
		function drawPieSegments (animationDecimal){
			var cumulativeAngle = -Math.PI/2,
			scaleAnimation = 1,
			rotateAnimation = 1;
			if (config.animation) {
				if (config.animateScale) {
					scaleAnimation = animationDecimal;
				}
				if (config.animateRotate){
					rotateAnimation = animationDecimal;
				}
			}
			for (var i=0; i<data.length; i++){
				var segmentAngle = rotateAnimation * ((data[i].value/segmentTotal) * (Math.PI*2));
				ctx.beginPath();
				ctx.arc(width/2,height/2,scaleAnimation * doughnutRadius,cumulativeAngle,cumulativeAngle + segmentAngle,false);
				ctx.arc(width/2,height/2,scaleAnimation * cutoutRadius,cumulativeAngle + segmentAngle,cumulativeAngle,true);
				ctx.closePath();
				ctx.fillStyle = data[i].color;
				ctx.fill();
				
				if(config.segmentShowStroke){
					ctx.lineWidth = config.segmentStrokeWidth;
					ctx.strokeStyle = config.segmentStrokeColor;
					ctx.stroke();
				}
				cumulativeAngle += segmentAngle;
			}			
		}			
		
		
		
	}

	var Line = function(data,config,ctx){
		var maxSize, scaleHop, calculatedScale, labelHeight, scaleHeight, valueBounds, labelTemplateString, valueHop,widestXLabel, xAxisLength,yAxisPosX,xAxisPosY, rotateLabels = 0;
			
		calculateDrawingSizes();
		
		valueBounds = getValueBounds();
		//Check and set the scale
		labelTemplateString = (config.scaleShowLabels)? config.scaleLabel : "";
		if (!config.scaleOverride){
			
			calculatedScale = calculateScale(scaleHeight,valueBounds.maxSteps,valueBounds.minSteps,valueBounds.maxValue,valueBounds.minValue,labelTemplateString);
		}
		else {
			calculatedScale = {
				steps : config.scaleSteps,
				stepValue : config.scaleStepWidth,
				graphMin : config.scaleStartValue,
				labels : []
			}
			populateLabels(labelTemplateString, calculatedScale.labels,calculatedScale.steps,config.scaleStartValue,config.scaleStepWidth);
		}
		
		scaleHop = Math.floor(scaleHeight/calculatedScale.steps);
		calculateXAxisSize();
		animationLoop(config,drawScale,drawLines,ctx);		
		
		function drawLines(animPc){
			for (var i=0; i<data.datasets.length; i++){
				ctx.strokeStyle = data.datasets[i].strokeColor;
				ctx.lineWidth = config.datasetStrokeWidth;
				ctx.beginPath();
				ctx.moveTo(yAxisPosX, xAxisPosY - animPc*(calculateOffset(data.datasets[i].data[0],calculatedScale,scaleHop)))

				for (var j=1; j<data.datasets[i].data.length; j++){
					if (config.bezierCurve){
						ctx.bezierCurveTo(xPos(j-0.5),yPos(i,j-1),xPos(j-0.5),yPos(i,j),xPos(j),yPos(i,j));
					}
					else{
						ctx.lineTo(xPos(j),yPos(i,j));
					}
				}
				ctx.stroke();
				if (config.datasetFill){
					ctx.lineTo(yAxisPosX + (valueHop*(data.datasets[i].data.length-1)),xAxisPosY);
					ctx.lineTo(yAxisPosX,xAxisPosY);
					ctx.closePath();
					ctx.fillStyle = data.datasets[i].fillColor;
					ctx.fill();
				}
				else{
					ctx.closePath();
				}
				if(config.pointDot){
					ctx.fillStyle = data.datasets[i].pointColor;
					ctx.strokeStyle = data.datasets[i].pointStrokeColor;
					ctx.lineWidth = config.pointDotStrokeWidth;
					for (var k=0; k<data.datasets[i].data.length; k++){
						ctx.beginPath();
						ctx.arc(yAxisPosX + (valueHop *k),xAxisPosY - animPc*(calculateOffset(data.datasets[i].data[k],calculatedScale,scaleHop)),config.pointDotRadius,0,Math.PI*2,true);
						ctx.fill();
						ctx.stroke();
					}
				}
			}
			
			function yPos(dataSet,iteration){
				return xAxisPosY - animPc*(calculateOffset(data.datasets[dataSet].data[iteration],calculatedScale,scaleHop));			
			}
			function xPos(iteration){
				return yAxisPosX + (valueHop * iteration);
			}
		}
		function drawScale(){
			//X axis line
			ctx.lineWidth = config.scaleLineWidth;
			ctx.strokeStyle = config.scaleLineColor;
			ctx.beginPath();
			ctx.moveTo(width-widestXLabel/2+5,xAxisPosY);
			ctx.lineTo(width-(widestXLabel/2)-xAxisLength-5,xAxisPosY);
			ctx.stroke();
			
			
			if (rotateLabels > 0){
				ctx.save();
				ctx.textAlign = "right";
			}
			else{
				ctx.textAlign = "center";
			}
			ctx.fillStyle = config.scaleFontColor;
			for (var i=0; i<data.labels.length; i++){
				ctx.save();
				if (rotateLabels > 0){
					ctx.translate(yAxisPosX + i*valueHop,xAxisPosY + config.scaleFontSize);
					ctx.rotate(-(rotateLabels * (Math.PI/180)));
					ctx.fillText(data.labels[i], 0,0);
					ctx.restore();
				}
				
				else{
					ctx.fillText(data.labels[i], yAxisPosX + i*valueHop,xAxisPosY + config.scaleFontSize+3);					
				}

				ctx.beginPath();
				ctx.moveTo(yAxisPosX + i * valueHop, xAxisPosY+3);
				
				//Check i isnt 0, so we dont go over the Y axis twice.
				if(config.scaleShowGridLines && i>0){
					ctx.lineWidth = config.scaleGridLineWidth;
					ctx.strokeStyle = config.scaleGridLineColor;					
					ctx.lineTo(yAxisPosX + i * valueHop, 5);
				}
				else{
					ctx.lineTo(yAxisPosX + i * valueHop, xAxisPosY+3);				
				}
				ctx.stroke();
			}
			
			//Y axis
			ctx.lineWidth = config.scaleLineWidth;
			ctx.strokeStyle = config.scaleLineColor;
			ctx.beginPath();
			ctx.moveTo(yAxisPosX,xAxisPosY+5);
			ctx.lineTo(yAxisPosX,5);
			ctx.stroke();
			
			ctx.textAlign = "right";
			ctx.textBaseline = "middle";
			for (var j=0; j<calculatedScale.steps; j++){
				ctx.beginPath();
				ctx.moveTo(yAxisPosX-3,xAxisPosY - ((j+1) * scaleHop));
				if (config.scaleShowGridLines){
					ctx.lineWidth = config.scaleGridLineWidth;
					ctx.strokeStyle = config.scaleGridLineColor;
					ctx.lineTo(yAxisPosX + xAxisLength + 5,xAxisPosY - ((j+1) * scaleHop));					
				}
				else{
					ctx.lineTo(yAxisPosX-0.5,xAxisPosY - ((j+1) * scaleHop));
				}
				
				ctx.stroke();
				
				if (config.scaleShowLabels){
					ctx.fillText(calculatedScale.labels[j],yAxisPosX-8,xAxisPosY - ((j+1) * scaleHop));
				}
			}
			
			
		}
		function calculateXAxisSize(){
			var longestText = 1;
			//if we are showing the labels
			if (config.scaleShowLabels){
				ctx.font = config.scaleFontStyle + " " + config.scaleFontSize+"px " + config.scaleFontFamily;
				for (var i=0; i<calculatedScale.labels.length; i++){
					var measuredText = ctx.measureText(calculatedScale.labels[i]).width;
					longestText = (measuredText > longestText)? measuredText : longestText;
				}
				//Add a little extra padding from the y axis
				longestText +=10;
			}
			xAxisLength = width - longestText - widestXLabel;
			valueHop = Math.floor(xAxisLength/(data.labels.length-1));	
				
			yAxisPosX = width-widestXLabel/2-xAxisLength;
			xAxisPosY = scaleHeight + config.scaleFontSize/2;				
		}		
		function calculateDrawingSizes(){
			maxSize = height;

			//Need to check the X axis first - measure the length of each text metric, and figure out if we need to rotate by 45 degrees.
			ctx.font = config.scaleFontStyle + " " + config.scaleFontSize+"px " + config.scaleFontFamily;
			widestXLabel = 1;
			for (var i=0; i<data.labels.length; i++){
				var textLength = ctx.measureText(data.labels[i]).width;
				//If the text length is longer - make that equal to longest text!
				widestXLabel = (textLength > widestXLabel)? textLength : widestXLabel;
			}
			if (width/data.labels.length < widestXLabel){
				rotateLabels = 45;
				if (width/data.labels.length < Math.cos(rotateLabels) * widestXLabel){
					rotateLabels = 90;
					maxSize -= widestXLabel; 
				}
				else{
					maxSize -= Math.sin(rotateLabels) * widestXLabel;
				}
			}
			else{
				maxSize -= config.scaleFontSize;
			}
			
			//Add a little padding between the x line and the text
			maxSize -= 5;
			
			
			labelHeight = config.scaleFontSize;
			
			maxSize -= labelHeight;
			//Set 5 pixels greater than the font size to allow for a little padding from the X axis.
			
			scaleHeight = maxSize;
			
			//Then get the area above we can safely draw on.
			
		}		
		function getValueBounds() {
			var upperValue = Number.MIN_VALUE;
			var lowerValue = Number.MAX_VALUE;
			for (var i=0; i<data.datasets.length; i++){
				for (var j=0; j<data.datasets[i].data.length; j++){
					if ( data.datasets[i].data[j] > upperValue) { upperValue = data.datasets[i].data[j] };
					if ( data.datasets[i].data[j] < lowerValue) { lowerValue = data.datasets[i].data[j] };
				}
			};
	
			var maxSteps = Math.floor((scaleHeight / (labelHeight*0.66)));
			var minSteps = Math.floor((scaleHeight / labelHeight*0.5));
			
			return {
				maxValue : upperValue,
				minValue : lowerValue,
				maxSteps : maxSteps,
				minSteps : minSteps
			};
			
	
		}

		
	}
	
	var Bar = function(data,config,ctx){
		var maxSize, scaleHop, calculatedScale, labelHeight, scaleHeight, valueBounds, labelTemplateString, valueHop,widestXLabel, xAxisLength,yAxisPosX,xAxisPosY,barWidth, rotateLabels = 0;
			
		calculateDrawingSizes();
		
		valueBounds = getValueBounds();
		//Check and set the scale
		labelTemplateString = (config.scaleShowLabels)? config.scaleLabel : "";
		if (!config.scaleOverride){
			
			calculatedScale = calculateScale(scaleHeight,valueBounds.maxSteps,valueBounds.minSteps,valueBounds.maxValue,valueBounds.minValue,labelTemplateString);
		}
		else {
			calculatedScale = {
				steps : config.scaleSteps,
				stepValue : config.scaleStepWidth,
				graphMin : config.scaleStartValue,
				labels : []
			}
			populateLabels(labelTemplateString, calculatedScale.labels,calculatedScale.steps,config.scaleStartValue,config.scaleStepWidth);
		}
		
		scaleHop = Math.floor(scaleHeight/calculatedScale.steps);
		calculateXAxisSize();
		animationLoop(config,drawScale,drawBars,ctx);		
		
		function drawBars(animPc){
			ctx.lineWidth = config.barStrokeWidth;
			for (var i=0; i<data.datasets.length; i++){
					ctx.fillStyle = data.datasets[i].fillColor;
					ctx.strokeStyle = data.datasets[i].strokeColor;
				for (var j=0; j<data.datasets[i].data.length; j++){
					var barOffset = yAxisPosX + config.barValueSpacing + valueHop*j + barWidth*i + config.barDatasetSpacing*i + config.barStrokeWidth*i;
					
					ctx.beginPath();
					ctx.moveTo(barOffset, xAxisPosY);
					ctx.lineTo(barOffset, xAxisPosY - animPc*calculateOffset(data.datasets[i].data[j],calculatedScale,scaleHop)+(config.barStrokeWidth/2));
					ctx.lineTo(barOffset + barWidth, xAxisPosY - animPc*calculateOffset(data.datasets[i].data[j],calculatedScale,scaleHop)+(config.barStrokeWidth/2));
					ctx.lineTo(barOffset + barWidth, xAxisPosY);
					if(config.barShowStroke){
						ctx.stroke();
					}
					ctx.closePath();
					ctx.fill();
				}
			}
			
		}
		function drawScale(){
			//X axis line
			ctx.lineWidth = config.scaleLineWidth;
			ctx.strokeStyle = config.scaleLineColor;
			ctx.beginPath();
			ctx.moveTo(width-widestXLabel/2+5,xAxisPosY);
			ctx.lineTo(width-(widestXLabel/2)-xAxisLength-5,xAxisPosY);
			ctx.stroke();
			
			
			if (rotateLabels > 0){
				ctx.save();
				ctx.textAlign = "right";
			}
			else{
				ctx.textAlign = "center";
			}
			ctx.fillStyle = config.scaleFontColor;
			for (var i=0; i<data.labels.length; i++){
				ctx.save();
				if (rotateLabels > 0){
					ctx.translate(yAxisPosX + i*valueHop,xAxisPosY + config.scaleFontSize);
					ctx.rotate(-(rotateLabels * (Math.PI/180)));
					ctx.fillText(data.labels[i], 0,0);
					ctx.restore();
				}
				
				else{
					ctx.fillText(data.labels[i], yAxisPosX + i*valueHop + valueHop/2,xAxisPosY + config.scaleFontSize+3);					
				}

				ctx.beginPath();
				ctx.moveTo(yAxisPosX + (i+1) * valueHop, xAxisPosY+3);
				
				//Check i isnt 0, so we dont go over the Y axis twice.
					ctx.lineWidth = config.scaleGridLineWidth;
					ctx.strokeStyle = config.scaleGridLineColor;					
					ctx.lineTo(yAxisPosX + (i+1) * valueHop, 5);
				ctx.stroke();
			}
			
			//Y axis
			ctx.lineWidth = config.scaleLineWidth;
			ctx.strokeStyle = config.scaleLineColor;
			ctx.beginPath();
			ctx.moveTo(yAxisPosX,xAxisPosY+5);
			ctx.lineTo(yAxisPosX,5);
			ctx.stroke();
			
			ctx.textAlign = "right";
			ctx.textBaseline = "middle";
			for (var j=0; j<calculatedScale.steps; j++){
				ctx.beginPath();
				ctx.moveTo(yAxisPosX-3,xAxisPosY - ((j+1) * scaleHop));
				if (config.scaleShowGridLines){
					ctx.lineWidth = config.scaleGridLineWidth;
					ctx.strokeStyle = config.scaleGridLineColor;
					ctx.lineTo(yAxisPosX + xAxisLength + 5,xAxisPosY - ((j+1) * scaleHop));					
				}
				else{
					ctx.lineTo(yAxisPosX-0.5,xAxisPosY - ((j+1) * scaleHop));
				}
				
				ctx.stroke();
				if (config.scaleShowLabels){
					ctx.fillText(calculatedScale.labels[j],yAxisPosX-8,xAxisPosY - ((j+1) * scaleHop));
				}
			}
			
			
		}
		function calculateXAxisSize(){
			var longestText = 1;
			//if we are showing the labels
			if (config.scaleShowLabels){
				ctx.font = config.scaleFontStyle + " " + config.scaleFontSize+"px " + config.scaleFontFamily;
				for (var i=0; i<calculatedScale.labels.length; i++){
					var measuredText = ctx.measureText(calculatedScale.labels[i]).width;
					longestText = (measuredText > longestText)? measuredText : longestText;
				}
				//Add a little extra padding from the y axis
				longestText +=10;
			}
			xAxisLength = width - longestText - widestXLabel;
			valueHop = Math.floor(xAxisLength/(data.labels.length));	
			
			barWidth = (valueHop - config.scaleGridLineWidth*2 - (config.barValueSpacing*2) - (config.barDatasetSpacing*data.datasets.length-1) - ((config.barStrokeWidth/2)*data.datasets.length-1))/data.datasets.length;
			
			yAxisPosX = width-widestXLabel/2-xAxisLength;
			xAxisPosY = scaleHeight + config.scaleFontSize/2;				
		}		
		function calculateDrawingSizes(){
			maxSize = height;

			//Need to check the X axis first - measure the length of each text metric, and figure out if we need to rotate by 45 degrees.
			ctx.font = config.scaleFontStyle + " " + config.scaleFontSize+"px " + config.scaleFontFamily;
			widestXLabel = 1;
			for (var i=0; i<data.labels.length; i++){
				var textLength = ctx.measureText(data.labels[i]).width;
				//If the text length is longer - make that equal to longest text!
				widestXLabel = (textLength > widestXLabel)? textLength : widestXLabel;
			}
			if (width/data.labels.length < widestXLabel){
				rotateLabels = 45;
				if (width/data.labels.length < Math.cos(rotateLabels) * widestXLabel){
					rotateLabels = 90;
					maxSize -= widestXLabel; 
				}
				else{
					maxSize -= Math.sin(rotateLabels) * widestXLabel;
				}
			}
			else{
				maxSize -= config.scaleFontSize;
			}
			
			//Add a little padding between the x line and the text
			maxSize -= 5;
			
			
			labelHeight = config.scaleFontSize;
			
			maxSize -= labelHeight;
			//Set 5 pixels greater than the font size to allow for a little padding from the X axis.
			
			scaleHeight = maxSize;
			
			//Then get the area above we can safely draw on.
			
		}		
		function getValueBounds() {
			var upperValue = Number.MIN_VALUE;
			var lowerValue = Number.MAX_VALUE;
			for (var i=0; i<data.datasets.length; i++){
				for (var j=0; j<data.datasets[i].data.length; j++){
					if ( data.datasets[i].data[j] > upperValue) { upperValue = data.datasets[i].data[j] };
					if ( data.datasets[i].data[j] < lowerValue) { lowerValue = data.datasets[i].data[j] };
				}
			};
	
			var maxSteps = Math.floor((scaleHeight / (labelHeight*0.66)));
			var minSteps = Math.floor((scaleHeight / labelHeight*0.5));
			
			return {
				maxValue : upperValue,
				minValue : lowerValue,
				maxSteps : maxSteps,
				minSteps : minSteps
			};
			
	
		}
	}
	
	function calculateOffset(val,calculatedScale,scaleHop){
		var outerValue = calculatedScale.steps * calculatedScale.stepValue;
		var adjustedValue = val - calculatedScale.graphMin;
		var scalingFactor = CapValue(adjustedValue/outerValue,1,0);
		return (scaleHop*calculatedScale.steps) * scalingFactor;
	}
	
	function animationLoop(config,drawScale,drawData,ctx){
		var animFrameAmount = (config.animation)? 1/CapValue(config.animationSteps,Number.MAX_VALUE,1) : 1,
			easingFunction = animationOptions[config.animationEasing],
			percentAnimComplete =(config.animation)? 0 : 1;
		
	
		
		if (typeof drawScale !== "function") drawScale = function(){};
		
		requestAnimFrame(animLoop);
		
		function animateFrame(){
			var easeAdjustedAnimationPercent =(config.animation)? CapValue(easingFunction(percentAnimComplete),null,0) : 1;
			clear(ctx);
			if(config.scaleOverlay){
				drawData(easeAdjustedAnimationPercent);
				drawScale();
			} else {
				drawScale();
				drawData(easeAdjustedAnimationPercent);
			}				
		}
		function animLoop(){
			//We need to check if the animation is incomplete (less than 1), or complete (1).
				percentAnimComplete += animFrameAmount;
				animateFrame();	
				//Stop the loop continuing forever
				if (percentAnimComplete <= 1){
					requestAnimFrame(animLoop);
				}
				else{
					if (typeof config.onAnimationComplete == "function") config.onAnimationComplete();
				}
			
		}		
		
	}

	//Declare global functions to be called within this namespace here.
	
	
	// shim layer with setTimeout fallback
	var requestAnimFrame = (function(){
		return window.requestAnimationFrame ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame ||
			window.oRequestAnimationFrame ||
			window.msRequestAnimationFrame ||
			function(callback) {
				window.setTimeout(callback, 1000 / 60);
			};
	})();

	function calculateScale(drawingHeight,maxSteps,minSteps,maxValue,minValue,labelTemplateString){
			var graphMin,graphMax,graphRange,stepValue,numberOfSteps,valueRange,rangeOrderOfMagnitude,decimalNum;
			
			valueRange = maxValue - minValue;
			
			rangeOrderOfMagnitude = calculateOrderOfMagnitude(valueRange);

        	graphMin = Math.floor(minValue / (1 * Math.pow(10, rangeOrderOfMagnitude))) * Math.pow(10, rangeOrderOfMagnitude);
            
            graphMax = Math.ceil(maxValue / (1 * Math.pow(10, rangeOrderOfMagnitude))) * Math.pow(10, rangeOrderOfMagnitude);
            
            graphRange = graphMax - graphMin;
            
            stepValue = Math.pow(10, rangeOrderOfMagnitude);
            
	        numberOfSteps = Math.round(graphRange / stepValue);
	        
	        //Compare number of steps to the max and min for that size graph, and add in half steps if need be.	        
	        while(numberOfSteps < minSteps || numberOfSteps > maxSteps) {
	        	if (numberOfSteps < minSteps){
			        stepValue /= 2;
			        numberOfSteps = Math.round(graphRange/stepValue);
		        }
		        else{
			        stepValue *=2;
			        numberOfSteps = Math.round(graphRange/stepValue);
		        }
	        };

	        var labels = [];
	        populateLabels(labelTemplateString, labels, numberOfSteps, graphMin, stepValue);
		
	        return {
		        steps : numberOfSteps,
				stepValue : stepValue,
				graphMin : graphMin,
				labels : labels		        
		        
	        }
		
			function calculateOrderOfMagnitude(val){
			  return Math.floor(Math.log(val) / Math.LN10);
			}		


	}

    //Populate an array of all the labels by interpolating the string.
    function populateLabels(labelTemplateString, labels, numberOfSteps, graphMin, stepValue) {
        if (labelTemplateString) {
            //Fix floating point errors by setting to fixed the on the same decimal as the stepValue.
            for (var i = 1; i < numberOfSteps + 1; i++) {
                labels.push(tmpl(labelTemplateString, {value: (graphMin + (stepValue * i)).toFixed(getDecimalPlaces(stepValue))}));
            }
        }
    }
	
	//Max value from array
	function Max( array ){
		return Math.max.apply( Math, array );
	};
	//Min value from array
	function Min( array ){
		return Math.min.apply( Math, array );
	};
	//Default if undefined
	function Default(userDeclared,valueIfFalse){
		if(!userDeclared){
			return valueIfFalse;
		} else {
			return userDeclared;
		}
	};
	//Is a number function
	function isNumber(n) {
		return !isNaN(parseFloat(n)) && isFinite(n);
	}
	//Apply cap a value at a high or low number
	function CapValue(valueToCap, maxValue, minValue){
		if(isNumber(maxValue)) {
			if( valueToCap > maxValue ) {
				return maxValue;
			}
		}
		if(isNumber(minValue)){
			if ( valueToCap < minValue ){
				return minValue;
			}
		}
		return valueToCap;
	}
	function getDecimalPlaces (num){
		var numberOfDecimalPlaces;
		if (num%1!=0){
			return num.toString().split(".")[1].length
		}
		else{
			return 0;
		}
		
	} 
	
	function mergeChartConfig(defaults,userDefined){
		var returnObj = {};
	    for (var attrname in defaults) { returnObj[attrname] = defaults[attrname]; }
	    for (var attrname in userDefined) { returnObj[attrname] = userDefined[attrname]; }
	    return returnObj;
	}
	
	//Javascript micro templating by John Resig - source at http://ejohn.org/blog/javascript-micro-templating/
	  var cache = {};
	 
	  function tmpl(str, data){
	    // Figure out if we're getting a template, or if we need to
	    // load the template - and be sure to cache the result.
	    var fn = !/\W/.test(str) ?
	      cache[str] = cache[str] ||
	        tmpl(document.getElementById(str).innerHTML) :
	     
	      // Generate a reusable function that will serve as a template
	      // generator (and which will be cached).
	      new Function("obj",
	        "var p=[],print=function(){p.push.apply(p,arguments);};" +
	       
	        // Introduce the data as local variables using with(){}
	        "with(obj){p.push('" +
	       
	        // Convert the template into pure JavaScript
	        str
	          .replace(/[\r\t\n]/g, " ")
	          .split("<%").join("\t")
	          .replace(/((^|%>)[^\t]*)'/g, "$1\r")
	          .replace(/\t=(.*?)%>/g, "',$1,'")
	          .split("\t").join("');")
	          .split("%>").join("p.push('")
	          .split("\r").join("\\'")
	      + "');}return p.join('');");
	   
	    // Provide some basic currying to the user
	    return data ? fn( data ) : fn;
	  };
}



// AJAX - Get
var util_ajaxGet = function(url, data, callback) {
    console.log("GET to ", util_server_url+url);
    console.log("data=", data);
    $$.get(util_server_url+url, data, function(json) {
        console.log("json=", json);
        callback(json);
    }, 'json');
};

// AJAX - Post
var util_ajaxPost = function(url, data, callback) {
    console.log("POST to ", util_server_url+url);
    console.log("data=", data);
    $$.post(util_server_url+url, data, function(json) {
        console.log("json=", json);
        callback(json);
    }, 'json');
};

// AJAX - Put
var util_ajaxPut = function(url, data, callback) {
    console.log("PUT to ", util_server_url+url);
    console.log("data=", data);
    $$.put(util_server_url+url, data, function(json) {
        console.log("json=", json);
        callback(json);
    }, 'json');
};

// AJAX - Delete
var util_ajaxDelete = function(url, data, callback) {
    console.log("DELETE to ", util_server_url+url);
    console.log("data=", data);
    $$.delete(util_server_url+url, data, function(json) {
        console.log("json=", json);
        callback(json);
    }, 'json');
};

// Date format
var util_dateFormat = "DD/MM/YYYY HH:mm:ss";

// Date format mini
var util_dateFormatMini = "DD/MM/YY HH:mm";

// Max data show in graphs
var util_maxGraphData = 15;

// Max number of request retries
var util_requestRetries = 4;

// Milleseconds between request retries
var util_millBetweenRequestRetries = 5000;

var util__dateToString = function(date, dateFormat) {
    if(!date) {
        return "--";
    } else {
        return moment(date).format(dateFormat);
    }
};

var util__stringToDate = function(string, dateFormat) {
    if(!string) {
        return "";
    } else {
        return moment(string, dateFormat);
    }
};

var util_dateToString = function(date) {
    return util__dateToString(date, util_dateFormat);
};
var util_stringToDate = function(string) {
    return util__stringToDate(string, util_dateFormat);
};

var util_dateToStringMini = function(date) {
    return util__dateToString(date, util_dateFormatMini);
};
var util_stringToDateMini = function(string) {
    return util__stringToDate(string, util_dateFormatMini);
};


/****************************
 * ENVIRONMENT = PRODUCTION *
 ****************************/

// version
var util_version = "jue nov 28 14:07:13 CET 2013"

// Server URL
var util_server_url = "http://tweetssentiment.herokuapp.com";


var util_drawGraphic = function(canvasElement, labels, data) {

    var dataMock    = [];
    var dataMockMin = [];
    var dataMockMax = [];

    for (var i = 0; i < data.length; i++) {

        dataMock.push(0);
        dataMockMin.push(-100);
        dataMockMax.push(100);
    }

    var lineChartData = {
        labels : labels,
        datasets : [
            {
                fillColor        : "rgba(103,230,103,0.1)",
                strokeColor      : "33FF33",
                pointColor       : "33FF33",
                pointStrokeColor : "#fff",
                data             : dataMockMax
            },
            {
                fillColor        : "rgba(255,115,115,0.5)",
                strokeColor      : "FF3333",
                pointColor       : "FF3333",
                pointStrokeColor : "#fff",
                data             : dataMock
            },
            {
                fillColor        : "rgba(255,115,115,0.1)",
                strokeColor      : "FF3333",
                pointColor       : "FF3333",
                pointStrokeColor : "#fff",
                data             : dataMockMin
            },
            {
                fillColor        : "rgba(103,230,103,0.5)",
                strokeColor      : "33FF33",
                pointColor       : "33FF33",
                pointStrokeColor : "#fff",
                data             : data
            }
        ]
    }

    var options = {
        pointDot : false
    };

    var myLine = new Chart(document.getElementById(canvasElement)
        .getContext("2d")).Line(lineChartData, options);

};

// Error Notification
var util_errorNotification = function(message, error, callback) {
    console.log(message, error);
    Lungo.Notification.error(message, "", "warning-sign", 0, callback);
};

// Success Notification
var util_successNotification = function(message, callback) {
    console.log(message);
    Lungo.Notification.success(message, "", "thumbs-up", 0, callback);
};

// URL Params
var util_urlParams = {};
(function () {
    var match,
        pl     = /\+/g,
        search = /([^&=]+)=?([^&]*)/g,
        decode = function (s) {
            return decodeURIComponent(s.replace(pl, " "));
        },
        query  = window.location.search.substring(1);

    while (match = search.exec(query)) {
       util_urlParams[decode(match[1])] = decode(match[2]);
    }
})();

// score image and color
var util_scoreImageAndColor  = function(score, scoreTag) {

    var scoreIcon   = "./img/hand-neutral.png";
    var scoreColor  = "909090";
    var scoreText   = "neutral";
    var scoreStars  = "★★★☆☆";

    switch (scoreTag) {
        case "P+":
            scoreIcon   = "./img/hand-positive+.png";
            scoreColor  = "67E667";
            scoreText   = "very positive";
            scoreStars  = "★★★★★";
            break;
        case "P":
            scoreIcon   = "./img/hand-positive.png";
            scoreColor  = "67E667";
            scoreText   = "positive";
            scoreStars  = "★★★★☆";
            break;
        case "N":
            scoreIcon   = "./img/hand-negative.png";
            scoreColor  = "FF7373";
            scoreText   = "negative";
            scoreStars  = "★★☆☆☆";
            break;
        case "N-":
            scoreIcon   = "./img/hand-negative-.png";
            scoreColor  = "FF7373";
            scoreText   = "very negative";
            scoreStars  = "★☆☆☆☆";
            break;
    }

    var sentiment = 'positive';
    if ( score.lastScore < 0 ) {
        sentiment = 'negative';
    }

    var score = {
        scoreIcon   : scoreIcon,
        scoreColor  : scoreColor,
        scoreText   : scoreText,
        scoreStars  : scoreStars,
        sentiment   : sentiment
    };

    //console.log('score =',score);

    return score;
};

// Searh
$$('document').ready(function(){
    Lungo.dom('input[type=search]').on('keyup', function() {
        Lungo.dom('li[data-action=search]').each(function() {
            toSearch = Lungo.dom('input[type=search]').val().toLowerCase();
            elementText = $$(this).text().toLowerCase();
            if (elementText.match(toSearch)) {
                $$(this).show();
            } else {
                $$(this).hide();
            };
        });
    });
});

// share link
$$('document').ready(function(){

    var url         = 'http://tweetssentiment.com/';

    var tweetText   = 'Tweets Sentiment helps you to know '
                    + 'if the general tweets feeling is positive or negative.';

    var href        = 'https://twitter.com/share?'
                    + 'url=' + encodeURIComponent(url)
                    + '&via=TweetsSentiment'
                    + '&text=' + encodeURIComponent(tweetText)

    $$('#share-link').attr('href', href);
});



// String startsWith
if (typeof String.prototype.startsWith != 'function') {
  String.prototype.startsWith = function (str){
    return this.indexOf(str) == 0;
  };
}

// Random
var util_random = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
