(function(){try{
var gadgets=gadgets||{},shindig=shindig||{},osapi=osapi||{};
;
gadgets.config=function(){var A={};
var B;
return{register:function(E,D,C){var F=A[E];
if(!F){F=[];
A[E]=F
}F.push({validators:D||{},callback:C})
},get:function(C){if(C){return B[C]||{}
}return B
},init:function(E,L){B=E;
for(var C in A){if(A.hasOwnProperty(C)){var D=A[C],I=E[C];
for(var H=0,G=D.length;
H<G;
++H){var J=D[H];
if(I&&!L){var F=J.validators;
for(var K in F){if(F.hasOwnProperty(K)){if(!F[K](I[K])){throw new Error('Invalid config value "'+I[K]+'" for parameter "'+K+'" in component "'+C+'"')
}}}}if(J.callback){J.callback(E)
}}}}},EnumValidator:function(F){var E=[];
if(arguments.length>1){for(var D=0,C;
(C=arguments[D]);
++D){E.push(C)
}}else{E=F
}return function(H){for(var G=0,I;
(I=E[G]);
++G){if(H===E[G]){return true
}}return false
}
},RegExValidator:function(C){return function(D){return C.test(D)
}
},ExistsValidator:function(C){return typeof C!=="undefined"
},NonEmptyStringValidator:function(C){return typeof C==="string"&&C.length>0
},BooleanValidator:function(C){return typeof C==="boolean"
},LikeValidator:function(C){return function(E){for(var F in C){if(C.hasOwnProperty(F)){var D=C[F];
if(!D(E[F])){return false
}}}return true
}
}}
}();;
gadgets.config.isGadget=false;
gadgets.config.isContainer=true;;
gadgets.util=function(){function G(K){var L;
var I=K.indexOf("?");
var J=K.indexOf("#");
if(J===-1){L=K.substr(I+1)
}else{L=[K.substr(I+1,J-I-1),"&",K.substr(J+1)].join("")
}return L.split("&")
}var E=null;
var D={};
var C={};
var F=[];
var A={0:false,10:true,13:true,34:true,39:true,60:true,62:true,92:true,8232:true,8233:true};
function B(I,J){return String.fromCharCode(J)
}function H(I){D=I["core.util"]||{}
}if(gadgets.config){gadgets.config.register("core.util",null,H)
}return{getUrlParameters:function(R){var J=typeof R==="undefined";
if(E!==null&&J){return E
}var N={};
var K=G(R||document.location.href);
var P=window.decodeURIComponent?decodeURIComponent:unescape;
for(var M=0,L=K.length;
M<L;
++M){var O=K[M].indexOf("=");
if(O===-1){continue
}var I=K[M].substring(0,O);
var Q=K[M].substring(O+1);
Q=Q.replace(/\+/g," ");
N[I]=P(Q)
}if(J){E=N
}return N
},makeClosure:function(L,N,M){var K=[];
for(var J=2,I=arguments.length;
J<I;
++J){K.push(arguments[J])
}return function(){var O=K.slice();
for(var Q=0,P=arguments.length;
Q<P;
++Q){O.push(arguments[Q])
}return N.apply(L,O)
}
},makeEnum:function(J){var K,I,L={};
for(K=0;
(I=J[K]);
++K){L[I]=I
}return L
},getFeatureParameters:function(I){return typeof D[I]==="undefined"?null:D[I]
},hasFeature:function(I){return typeof D[I]!=="undefined"
},getServices:function(){return C
},registerOnLoadHandler:function(I){F.push(I)
},runOnLoadHandlers:function(){for(var J=0,I=F.length;
J<I;
++J){F[J]()
}},escape:function(I,M){if(!I){return I
}else{if(typeof I==="string"){return gadgets.util.escapeString(I)
}else{if(typeof I==="array"){for(var L=0,J=I.length;
L<J;
++L){I[L]=gadgets.util.escape(I[L])
}}else{if(typeof I==="object"&&M){var K={};
for(var N in I){if(I.hasOwnProperty(N)){K[gadgets.util.escapeString(N)]=gadgets.util.escape(I[N],true)
}}return K
}}}}return I
},escapeString:function(M){if(!M){return M
}var J=[],L,N;
for(var K=0,I=M.length;
K<I;
++K){L=M.charCodeAt(K);
N=A[L];
if(N===true){J.push("&#",L,";")
}else{if(N!==false){J.push(M.charAt(K))
}}}return J.join("")
},unescapeString:function(I){if(!I){return I
}return I.replace(/&#([0-9]+);/g,B)
},attachBrowserEvent:function(K,J,L,I){if(typeof K.addEventListener!="undefined"){K.addEventListener(J,L,I)
}else{if(typeof K.attachEvent!="undefined"){K.attachEvent("on"+J,L)
}else{gadgets.warn("cannot attachBrowserEvent: "+J)
}}},removeBrowserEvent:function(K,J,L,I){if(K.removeEventListener){K.removeEventListener(J,L,I)
}else{if(K.detachEvent){K.detachEvent("on"+J,L)
}else{gadgets.warn("cannot removeBrowserEvent: "+J)
}}}}
}();
gadgets.util.getUrlParameters();;
var tamings___=tamings___||[];
tamings___.push(function(A){caja___.whitelistFuncs([[gadgets.util,"escapeString"],[gadgets.util,"getFeatureParameters"],[gadgets.util,"getUrlParameters"],[gadgets.util,"hasFeature"],[gadgets.util,"registerOnLoadHandler"],[gadgets.util,"unescapeString"]])
});;
gadgets.log=(function(){var E=1;
var A=2;
var F=3;
var C=4;
var D=function(I){B(E,I)
};
gadgets.warn=function(I){B(A,I)
};
gadgets.error=function(I){B(F,I)
};
gadgets.setLogLevel=function(I){H=I
};
function B(J,I){if(J<H||!G){return 
}if(J===A&&G.warn){G.warn(I)
}else{if(J===F&&G.error){G.error(I)
}else{if(G.log){G.log(I)
}}}}D.INFO=E;
D.WARNING=A;
D.NONE=C;
var H=E;
var G=window.console?window.console:window.opera?window.opera.postError:undefined;
return D
})();;
var tamings___=tamings___||[];
tamings___.push(function(A){___.grantRead(gadgets.log,"INFO");
___.grantRead(gadgets.log,"WARNING");
___.grantRead(gadgets.log,"ERROR");
___.grantRead(gadgets.log,"NONE");
caja___.whitelistFuncs([[gadgets,"log"],[gadgets,"warn"],[gadgets,"error"],[gadgets,"setLogLevel"]])
});;
if(window.JSON&&window.JSON.parse&&window.JSON.stringify){gadgets.json=(function(){var A=/___$/;
return{parse:function(C){try{return window.JSON.parse(C)
}catch(B){return false
}},stringify:function(C){try{return window.JSON.stringify(C,function(E,D){return !A.test(E)?D:null
})
}catch(B){return null
}}}
})()
}else{gadgets.json=function(){function f(n){return n<10?"0"+n:n
}Date.prototype.toJSON=function(){return[this.getUTCFullYear(),"-",f(this.getUTCMonth()+1),"-",f(this.getUTCDate()),"T",f(this.getUTCHours()),":",f(this.getUTCMinutes()),":",f(this.getUTCSeconds()),"Z"].join("")
};
var m={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"};
function stringify(value){var a,i,k,l,r=/["\\\x00-\x1f\x7f-\x9f]/g,v;
switch(typeof value){case"string":return r.test(value)?'"'+value.replace(r,function(a){var c=m[a];
if(c){return c
}c=a.charCodeAt();
return"\\u00"+Math.floor(c/16).toString(16)+(c%16).toString(16)
})+'"':'"'+value+'"';
case"number":return isFinite(value)?String(value):"null";
case"boolean":case"null":return String(value);
case"object":if(!value){return"null"
}a=[];
if(typeof value.length==="number"&&!value.propertyIsEnumerable("length")){l=value.length;
for(i=0;
i<l;
i+=1){a.push(stringify(value[i])||"null")
}return"["+a.join(",")+"]"
}for(k in value){if(k.match("___$")){continue
}if(value.hasOwnProperty(k)){if(typeof k==="string"){v=stringify(value[k]);
if(v){a.push(stringify(k)+":"+v)
}}}}return"{"+a.join(",")+"}"
}return""
}return{stringify:stringify,parse:function(text){if(/^[\],:{}\s]*$/.test(text.replace(/\\["\\\/b-u]/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,""))){return eval("("+text+")")
}return false
}}
}()
}gadgets.json.flatten=function(C){var D={};
if(C===null||C===undefined){return D
}for(var A in C){if(C.hasOwnProperty(A)){var B=C[A];
if(null===B||undefined===B){continue
}D[A]=(typeof B==="string")?B:gadgets.json.stringify(B)
}}return D
};;
var tamings___=tamings___||[];
tamings___.push(function(A){___.tamesTo(gadgets.json.stringify,safeJSON.stringify);
___.tamesTo(gadgets.json.parse,safeJSON.parse)
});;
shindig.Auth=function(){var authToken=null;
var trusted=null;
function addParamsToToken(urlParams){var args=authToken.split("&");
for(var i=0;
i<args.length;
i++){var nameAndValue=args[i].split("=");
if(nameAndValue.length===2){var name=nameAndValue[0];
var value=nameAndValue[1];
if(value==="$"){value=encodeURIComponent(urlParams[name]);
args[i]=name+"="+value
}}}authToken=args.join("&")
}function init(configuration){var urlParams=gadgets.util.getUrlParameters();
var config=configuration["shindig.auth"]||{};
if(config.authToken){authToken=config.authToken
}else{if(urlParams.st){authToken=urlParams.st
}}if(authToken!==null){addParamsToToken(urlParams)
}if(config.trustedJson){trusted=eval("("+config.trustedJson+")")
}}gadgets.config.register("shindig.auth",null,init);
return{getSecurityToken:function(){return authToken
},updateSecurityToken:function(newToken){authToken=newToken
},getTrustedData:function(){return trusted
}}
};;
shindig.auth=new shindig.Auth();;
gadgets.rpctx=gadgets.rpctx||{};
if(!gadgets.rpctx.wpm){gadgets.rpctx.wpm=function(){var F,D;
var C;
var E=false;
var A=false;
var G=false;
function B(){var I=false;
function J(K){if(K.data=="postmessage.test"){I=true;
if(typeof K.origin==="undefined"){A=true
}}}gadgets.util.attachBrowserEvent(window,"message",J,false);
window.postMessage("postmessage.test","*");
if(I){E=true
}gadgets.util.removeBrowserEvent(window,"message",J,false)
}function H(K){var L=gadgets.json.parse(K.data);
if(G){if(!L||!L.f){return 
}var J=gadgets.rpc.getRelayUrl(L.f)||gadgets.util.getUrlParameters()["parent"];
var I=gadgets.rpc.getOrigin(J);
if(!A?K.origin!==I:K.domain!==/^.+:\/\/([^:]+).*/.exec(I)[1]){return 
}}F(L)
}return{getCode:function(){return"wpm"
},isParentVerifiable:function(){return true
},init:function(I,J){F=I;
D=J;
B();
if(!E){C=function(L,M,K){L.postMessage(M,K)
}
}else{C=function(L,M,K){window.setTimeout(function(){L.postMessage(M,K)
},0)
}
}gadgets.util.attachBrowserEvent(window,"message",H,false);
D("..",true);
return true
},setup:function(K,J,I){G=I;
if(K===".."){if(G){gadgets.rpc._createRelayIframe(J)
}else{gadgets.rpc.call(K,gadgets.rpc.ACK)
}}return true
},call:function(J,N,M){var L=gadgets.rpc._getTargetWin(J);
var K=gadgets.rpc.getRelayUrl(J)||gadgets.util.getUrlParameters()["parent"];
var I=gadgets.rpc.getOrigin(K);
if(I){C(L,gadgets.json.stringify(M),I)
}else{gadgets.error("No relay set (used as window.postMessage targetOrigin), cannot send cross-domain message")
}return true
},relayOnload:function(J,I){D(J,true)
}}
}()
};;
;
gadgets.rpctx=gadgets.rpctx||{};
if(!gadgets.rpctx.frameElement){gadgets.rpctx.frameElement=function(){var E="__g2c_rpc";
var B="__c2g_rpc";
var D;
var C;
function A(G,K,J){try{if(K!==".."){var F=window.frameElement;
if(typeof F[E]==="function"){if(typeof F[E][B]!=="function"){F[E][B]=function(L){D(gadgets.json.parse(L))
}
}F[E](gadgets.json.stringify(J));
return true
}}else{var I=document.getElementById(G);
if(typeof I[E]==="function"&&typeof I[E][B]==="function"){I[E][B](gadgets.json.stringify(J));
return true
}}}catch(H){}return false
}return{getCode:function(){return"fe"
},isParentVerifiable:function(){return false
},init:function(F,G){D=F;
C=G;
return true
},setup:function(J,F){if(J!==".."){try{var I=document.getElementById(J);
I[E]=function(K){D(gadgets.json.parse(K))
}
}catch(H){return false
}}if(J===".."){C("..",true);
var G=function(){window.setTimeout(function(){gadgets.rpc.call(J,gadgets.rpc.ACK)
},500)
};
gadgets.util.registerOnLoadHandler(G)
}return true
},call:function(F,H,G){return A(F,H,G)
}}
}()
};;
;
gadgets.rpctx=gadgets.rpctx||{};
if(!gadgets.rpctx.nix){gadgets.rpctx.nix=function(){var E="GRPC____NIXVBS_wrapper";
var F="GRPC____NIXVBS_get_wrapper";
var H="GRPC____NIXVBS_handle_message";
var C="GRPC____NIXVBS_create_channel";
var B=10;
var M=500;
var L={};
var D={};
var K;
var J=0;
function G(){var O=L[".."];
if(O){return 
}if(++J>B){gadgets.warn("Nix transport setup failed, falling back...");
K("..",false);
return 
}if(!O&&window.opener&&"GetAuthToken" in window.opener){O=window.opener;
if(O.GetAuthToken()==gadgets.rpc.getAuthToken("..")){var N=gadgets.rpc.getAuthToken("..");
O.CreateChannel(window[F]("..",N),N);
L[".."]=O;
window.opener=null;
K("..",true);
return 
}}window.setTimeout(function(){G()
},M)
}function I(){var O=window.location.href;
var N=O.indexOf("#");
if(N==-1){return O
}return O.substring(0,N)
}function A(P){var O=(2147483647*Math.random())|0;
var Q=[I(),O];
gadgets.rpc._createRelayIframe(P,Q);
var R=window.location.href.split("#")[1]||"";
function N(){var T=window.location.href.split("#")[1]||"";
if(T!==R){clearInterval(S);
var U=gadgets.util.getUrlParameters(window.location.href);
if(U.childtoken==O){G();
return 
}K("..",false)
}}var S=setInterval(N,100)
}return{getCode:function(){return"nix"
},isParentVerifiable:function(N){if(N){return D[N]
}return false
},init:function(O,P){K=P;
if(typeof window[F]!=="unknown"){window[H]=function(R){window.setTimeout(function(){O(gadgets.json.parse(R))
},0)
};
window[C]=function(R,T,S){if(gadgets.rpc.getAuthToken(R)===S){L[R]=T;
K(R,true)
}};
var N="Class "+E+"\n Private m_Intended\nPrivate m_Auth\nPublic Sub SetIntendedName(name)\n If isEmpty(m_Intended) Then\nm_Intended = name\nEnd If\nEnd Sub\nPublic Sub SetAuth(auth)\n If isEmpty(m_Auth) Then\nm_Auth = auth\nEnd If\nEnd Sub\nPublic Sub SendMessage(data)\n "+H+"(data)\nEnd Sub\nPublic Function GetAuthToken()\n GetAuthToken = m_Auth\nEnd Function\nPublic Sub CreateChannel(channel, auth)\n Call "+C+"(m_Intended, channel, auth)\nEnd Sub\nEnd Class\nFunction "+F+"(name, auth)\nDim wrap\nSet wrap = New "+E+"\nwrap.SetIntendedName name\nwrap.SetAuth auth\nSet "+F+" = wrap\nEnd Function";
try{window.execScript(N,"vbscript")
}catch(Q){return false
}}return true
},setup:function(S,O,N){D[S]=!!N;
if(S===".."){if(N){A(O)
}else{G()
}return true
}try{var Q=document.getElementById(S);
var R=window[F](S,O);
Q.contentWindow.opener=R
}catch(P){return false
}return true
},call:function(N,Q,P){try{if(L[N]){L[N].SendMessage(gadgets.json.stringify(P))
}}catch(O){return false
}return true
},relayOnload:function(Q,O){var P=O[0]+"#childtoken="+O[1];
var N=document.getElementById(Q);
N.src=P
}}
}()
};;
;
gadgets.rpctx=gadgets.rpctx||{};
if(!gadgets.rpctx.rmr){gadgets.rpctx.rmr=function(){var G=500;
var E=10;
var H={};
var B;
var I;
function K(P,N,O,M){var Q=function(){document.body.appendChild(P);
P.src="about:blank";
if(M){P.onload=function(){L(M)
}
}P.src=N+"#"+O
};
if(document.body){Q()
}else{gadgets.util.registerOnLoadHandler(function(){Q()
})
}}function C(O){if(typeof H[O]==="object"){return 
}var P=document.createElement("iframe");
var M=P.style;
M.position="absolute";
M.top="0px";
M.border="0";
M.opacity="0";
M.width="10px";
M.height="1px";
P.id="rmrtransport-"+O;
P.name=P.id;
var N=gadgets.rpc.getRelayUrl(O);
if(!N){N=gadgets.rpc.getOrigin(gadgets.util.getUrlParameters()["parent"])+"/robots.txt"
}H[O]={frame:P,receiveWindow:null,relayUri:N,searchCounter:0,width:10,waiting:true,queue:[],sendId:0,recvId:0};
if(O!==".."){K(P,N,A(O))
}D(O)
}function D(O){var Q=null;
H[O].searchCounter++;
try{var N=gadgets.rpc._getTargetWin(O);
if(O===".."){Q=N.frames["rmrtransport-"+gadgets.rpc.RPC_ID]
}else{Q=N.frames["rmrtransport-.."]
}}catch(P){}var M=false;
if(Q){M=F(O,Q)
}if(!M){if(H[O].searchCounter>E){return 
}window.setTimeout(function(){D(O)
},G)
}}function J(N,P,T,S){var O=null;
if(T!==".."){O=H[".."]
}else{O=H[N]
}if(O){if(P!==gadgets.rpc.ACK){O.queue.push(S)
}if(O.waiting||(O.queue.length===0&&!(P===gadgets.rpc.ACK&&S&&S.ackAlone===true))){return true
}if(O.queue.length>0){O.waiting=true
}var M=O.relayUri+"#"+A(N);
try{O.frame.contentWindow.location=M;
var Q=O.width==10?20:10;
O.frame.style.width=Q+"px";
O.width=Q
}catch(R){return false
}}return true
}function A(N){var O=H[N];
var M={id:O.sendId};
if(O){M.d=Array.prototype.slice.call(O.queue,0);
M.d.push({s:gadgets.rpc.ACK,id:O.recvId})
}return gadgets.json.stringify(M)
}function L(X){var U=H[X];
var Q=U.receiveWindow.location.hash.substring(1);
var Y=gadgets.json.parse(decodeURIComponent(Q))||{};
var N=Y.d||[];
var O=false;
var T=false;
var V=0;
var M=(U.recvId-Y.id);
for(var P=0;
P<N.length;
++P){var S=N[P];
if(S.s===gadgets.rpc.ACK){I(X,true);
if(U.waiting){T=true
}U.waiting=false;
var R=Math.max(0,S.id-U.sendId);
U.queue.splice(0,R);
U.sendId=Math.max(U.sendId,S.id||0);
continue
}O=true;
if(++V<=M){continue
}++U.recvId;
B(S)
}if(O||(T&&U.queue.length>0)){var W=(X==="..")?gadgets.rpc.RPC_ID:"..";
J(X,gadgets.rpc.ACK,W,{ackAlone:O})
}}function F(P,S){var O=H[P];
try{var N=false;
N="document" in S;
if(!N){return false
}N=typeof S.document=="object";
if(!N){return false
}var R=S.location.href;
if(R==="about:blank"){return false
}}catch(M){return false
}O.receiveWindow=S;
function Q(){L(P)
}if(typeof S.attachEvent==="undefined"){S.onresize=Q
}else{S.attachEvent("onresize",Q)
}if(P===".."){K(O.frame,O.relayUri,A(P),P)
}else{L(P)
}return true
}return{getCode:function(){return"rmr"
},isParentVerifiable:function(){return true
},init:function(M,N){B=M;
I=N;
return true
},setup:function(O,M){try{C(O)
}catch(N){gadgets.warn("Caught exception setting up RMR: "+N);
return false
}return true
},call:function(M,O,N){return J(M,N.s,O,N)
}}
}()
};;
;
gadgets.rpctx=gadgets.rpctx||{};
if(!gadgets.rpctx.ifpc){gadgets.rpctx.ifpc=function(){var E=[];
var D=0;
var C;
function B(H){var F=[];
for(var I=0,G=H.length;
I<G;
++I){F.push(encodeURIComponent(gadgets.json.stringify(H[I])))
}return F.join("&")
}function A(I){var G;
for(var F=E.length-1;
F>=0;
--F){var J=E[F];
try{if(J&&(J.recyclable||J.readyState==="complete")){J.parentNode.removeChild(J);
if(window.ActiveXObject){E[F]=J=null;
E.splice(F,1)
}else{J.recyclable=false;
G=J;
break
}}}catch(H){}}if(!G){G=document.createElement("iframe");
G.style.border=G.style.width=G.style.height="0px";
G.style.visibility="hidden";
G.style.position="absolute";
G.onload=function(){this.recyclable=true
};
E.push(G)
}G.src=I;
window.setTimeout(function(){document.body.appendChild(G)
},0)
}return{getCode:function(){return"ifpc"
},isParentVerifiable:function(){return true
},init:function(F,G){C=G;
C("..",true);
return true
},setup:function(G,F){C(G,true);
return true
},call:function(F,K,I){var J=gadgets.rpc.getRelayUrl(F);
++D;
if(!J){gadgets.warn("No relay file assigned for IFPC");
return false
}var H=null;
if(I.l){var G=I.a;
H=[J,"#",B([K,D,1,0,B([K,I.s,"","",K].concat(G))])].join("")
}else{H=[J,"#",F,"&",K,"@",D,"&1&0&",encodeURIComponent(gadgets.json.stringify(I))].join("")
}A(H);
return true
}}
}()
};;
if(!gadgets.rpc){gadgets.rpc=function(){var a="__cb";
var g="";
var h="__ack";
var E=500;
var V=10;
var M={};
var j={};
var S={};
var R={};
var P=0;
var I={};
var J={};
var e={};
var D={};
var K={};
var T={};
var Q=(window.top!==window.self);
var O=window.name;
var Y=function(){};
var d=0;
var m=1;
var A=2;
var f=(function(){function q(r){return function(){gadgets.log("gadgets.rpc."+r+"("+gadgets.json.stringify(Array.prototype.slice.call(arguments))+"): call ignored. [caller: "+document.location+", isChild: "+Q+"]")
}
}return{getCode:function(){return"noop"
},isParentVerifiable:function(){return true
},init:q("init"),setup:q("setup"),call:q("call")}
})();
if(gadgets.util){D=gadgets.util.getUrlParameters()
}function Z(){return typeof window.postMessage==="function"?gadgets.rpctx.wpm:typeof window.postMessage==="object"?gadgets.rpctx.wpm:window.ActiveXObject?gadgets.rpctx.nix:navigator.userAgent.indexOf("WebKit")>0?gadgets.rpctx.rmr:navigator.product==="Gecko"?gadgets.rpctx.frameElement:gadgets.rpctx.ifpc
}function H(v,t){var r=W;
if(!t){r=f
}K[v]=r;
var q=T[v]||[];
for(var s=0;
s<q.length;
++s){var u=q[s];
u.t=U(v);
r.call(v,u.f,u)
}T[v]=[]
}var X=false,i=false;
function b(){if(i){return 
}function q(){X=true
}gadgets.util.attachBrowserEvent(window,"unload",q,false);
i=true
}function G(q,u,r,t,s){if(!R[u]||R[u]!==r){gadgets.error("Invalid auth token. "+R[u]+" vs "+r);
Y(u,A)
}s.onunload=function(){if(J[u]&&!X){Y(u,m);
gadgets.rpc.removeReceiver(u)
}};
b();
t=gadgets.json.parse(decodeURIComponent(t));
W.relayOnload(u,t)
}function n(r){if(r&&typeof r.s==="string"&&typeof r.f==="string"&&r.a instanceof Array){if(R[r.f]){if(R[r.f]!==r.t){gadgets.error("Invalid auth token. "+R[r.f]+" vs "+r.t);
Y(r.f,A)
}}if(r.s===h){window.setTimeout(function(){H(r.f,true)
},0);
return 
}if(r.c){r.callback=function(s){gadgets.rpc.call(r.f,a,null,r.c,s)
}
}var q=(M[r.s]||M[g]).apply(r,r.a);
if(r.c&&typeof q!=="undefined"){gadgets.rpc.call(r.f,a,null,r.c,q)
}}}function N(s){if(!s){return""
}s=s.toLowerCase();
if(s.indexOf("//")==0){s=window.location.protocol+s
}if(s.indexOf("://")==-1){s=window.location.protocol+"//"+s
}var t=s.substring(s.indexOf("://")+3);
var q=t.indexOf("/");
if(q!=-1){t=t.substring(0,q)
}var v=s.substring(0,s.indexOf("://"));
var u="";
var w=t.indexOf(":");
if(w!=-1){var r=t.substring(w+1);
t=t.substring(0,w);
if((v==="http"&&r!=="80")||(v==="https"&&r!=="443")){u=":"+r
}}return v+"://"+t+u
}function p(r){if(typeof r==="undefined"||r===".."){return window.parent
}r=String(r);
var q=window.frames[r];
if(q){return q
}q=document.getElementById(r);
if(q&&q.contentWindow){return q.contentWindow
}return null
}var W=Z();
M[g]=function(){gadgets.warn("Unknown RPC service: "+this.s)
};
M[a]=function(r,q){var s=I[r];
if(s){delete I[r];
s(q)
}};
function l(t,r,q){if(J[t]===true){return 
}if(typeof J[t]==="undefined"){J[t]=0
}var s=document.getElementById(t);
if(t===".."||s!=null){if(W.setup(t,r,q)===true){J[t]=true;
return 
}}if(J[t]!==true&&J[t]++<V){window.setTimeout(function(){l(t,r,q)
},E)
}else{K[t]=f;
J[t]=true
}}function c(r,u){if(typeof e[r]==="undefined"){e[r]=false;
var t=gadgets.rpc.getRelayUrl(r);
if(N(t)!==N(window.location.href)){return false
}var s=p(r);
try{e[r]=s.gadgets.rpc.receiveSameDomain
}catch(q){gadgets.error("Same domain call failed: parent= incorrectly set.")
}}if(typeof e[r]==="function"){e[r](u);
return true
}return false
}function o(r,q,s){if(!/http(s)?:\/\/.+/.test(q)){if(q.indexOf("//")==0){q=window.location.protocol+q
}else{if(q.charAt(0)=="/"){q=window.location.protocol+"//"+window.location.host+q
}else{if(q.indexOf("://")==-1){q=window.location.protocol+"//"+q
}}}}j[r]=q;
S[r]=!!s
}function U(q){return R[q]
}function C(q,s,r){s=s||"";
R[q]=String(s);
l(q,s,r)
}function B(q,s){function t(x){var z=x?x.rpc:{};
var v=z.parentRelayUrl;
if(v.substring(0,7)!=="http://"&&v.substring(0,8)!=="https://"&&v.substring(0,2)!=="//"){if(typeof D.parent==="string"&&D.parent!==""){if(v.substring(0,1)!=="/"){var u=D.parent.lastIndexOf("/");
v=D.parent.substring(0,u+1)+v
}else{v=N(D.parent)+v
}}}var y=!!z.useLegacyProtocol;
o("..",v,y);
if(y){W=gadgets.rpctx.ifpc;
W.init(n,H)
}var w=s||D.forcesecure||false;
C("..",q,w)
}var r={parentRelayUrl:gadgets.config.NonEmptyStringValidator};
gadgets.config.register("rpc",r,t)
}function k(t,q,u){var r=u||D.forcesecure||false;
var s=q||D.parent;
if(s){o("..",s);
C("..",t,r)
}}function L(s,u,q,t){if(!gadgets.util){return 
}var y=document.getElementById(s);
if(!y){throw new Error("Cannot set up gadgets.rpc receiver with ID: "+s+", element not found.")
}var w=u||y.src;
o(s,w);
var x=gadgets.util.getUrlParameters(y.src);
var r=q||x.rpctoken;
var v=t||x.forcesecure;
C(s,r,v)
}function F(q,s,u,t){if(q===".."){var r=u||D.rpctoken||D.ifpctok||"";
if(window.__isgadget===true){B(r,t)
}else{k(r,s,t)
}}else{L(q,s,u,t)
}}return{config:function(q){if(typeof q.securityCallback==="function"){Y=q.securityCallback
}},register:function(r,q){if(r===a||r===h){throw new Error("Cannot overwrite callback/ack service")
}if(r===g){throw new Error("Cannot overwrite default service: use registerDefault")
}M[r]=q
},unregister:function(q){if(q===a||q===h){throw new Error("Cannot delete callback/ack service")
}if(q===g){throw new Error("Cannot delete default service: use unregisterDefault")
}delete M[q]
},registerDefault:function(q){M[g]=q
},unregisterDefault:function(){delete M[g]
},forceParentVerifiable:function(){if(!W.isParentVerifiable()){W=gadgets.rpctx.ifpc
}},call:function(q,r,w,u){q=q||"..";
var v="..";
if(q===".."){v=O
}++P;
if(w){I[P]=w
}var t={s:r,f:v,c:w?P:0,a:Array.prototype.slice.call(arguments,3),t:R[q],l:S[q]};
if(q!==".."&&!document.getElementById(q)){gadgets.log("WARNING: attempted send to nonexistent frame: "+q);
return 
}if(c(q,t)){return 
}var s=K[q];
if(!s){if(!T[q]){T[q]=[t]
}else{T[q].push(t)
}return 
}if(S[q]){s=gadgets.rpctx.ifpc
}if(s.call(q,v,t)===false){K[q]=f;
W.call(q,v,t)
}},getRelayUrl:function(r){var q=j[r];
if(q&&q.substring(0,1)==="/"){if(q.substring(1,2)==="/"){q=document.location.protocol+q
}else{q=document.location.protocol+"//"+document.location.host+q
}}return q
},setRelayUrl:o,setAuthToken:C,setupReceiver:F,getAuthToken:U,removeReceiver:function(q){delete j[q];
delete S[q];
delete R[q];
delete J[q];
delete e[q];
delete K[q]
},getRelayChannel:function(){return W.getCode()
},receive:function(r,q){if(r.length>4){n(gadgets.json.parse(decodeURIComponent(r[r.length-1])))
}else{G.apply(null,r.concat(q))
}},receiveSameDomain:function(q){q.a=Array.prototype.slice.call(q.a);
window.setTimeout(function(){n(q)
},0)
},getOrigin:N,getReceiverOrigin:function(s){var r=K[s];
if(!r){return null
}if(!r.isParentVerifiable(s)){return null
}var q=gadgets.rpc.getRelayUrl(s)||gadgets.util.getUrlParameters().parent;
return gadgets.rpc.getOrigin(q)
},init:function(){if(W.init(n,H)===false){W=f
}if(Q){F("..")
}},_getTargetWin:p,_createRelayIframe:function(q,s){var v=gadgets.rpc.getRelayUrl("..");
if(!v){return null
}var u=v+"#..&"+O+"&"+q+"&"+encodeURIComponent(gadgets.json.stringify(s));
var r=document.createElement("iframe");
r.style.border=r.style.width=r.style.height="0px";
r.style.visibility="hidden";
r.style.position="absolute";
function t(){document.body.appendChild(r);
r.src='javascript:"<html></html>"';
r.src=u
}if(document.body){t()
}else{gadgets.util.registerOnLoadHandler(function(){t()
})
}return r
},ACK:h,RPC_ID:O,SEC_ERROR_LOAD_TIMEOUT:d,SEC_ERROR_FRAME_PHISH:m,SEC_ERROR_FORGED_MSG:A}
}();
gadgets.rpc.init()
};;
gadgets.io=function(){var config={};
var oauthState;
function makeXhr(){var x;
if(typeof shindig!="undefined"&&shindig.xhrwrapper&&shindig.xhrwrapper.createXHR){return shindig.xhrwrapper.createXHR()
}else{if(typeof ActiveXObject!="undefined"){x=new ActiveXObject("Msxml2.XMLHTTP");
if(!x){x=new ActiveXObject("Microsoft.XMLHTTP")
}return x
}else{if(typeof XMLHttpRequest!="undefined"||window.XMLHttpRequest){return new window.XMLHttpRequest()
}else{throw ("no xhr available")
}}}}function hadError(xobj,callback){if(xobj.readyState!==4){return true
}try{if(xobj.status!==200){var error=(""+xobj.status);
if(xobj.responseText){error=error+" "+xobj.responseText
}callback({errors:[error],rc:xobj.status,text:xobj.responseText});
return true
}}catch(e){callback({errors:[e.number+" Error not specified"],rc:e.number,text:e.description});
return true
}return false
}function processNonProxiedResponse(url,callback,params,xobj){if(hadError(xobj,callback)){return 
}var data={body:xobj.responseText};
callback(transformResponseData(params,data))
}var UNPARSEABLE_CRUFT="throw 1; < don't be evil' >";
function processResponse(url,callback,params,xobj){if(hadError(xobj,callback)){return 
}var txt=xobj.responseText;
var offset=txt.indexOf(UNPARSEABLE_CRUFT)+UNPARSEABLE_CRUFT.length;
if(offset<UNPARSEABLE_CRUFT.length){return 
}txt=txt.substr(offset);
var data=eval("("+txt+")");
data=data[url];
if(data.oauthState){oauthState=data.oauthState
}if(data.st){shindig.auth.updateSecurityToken(data.st)
}callback(transformResponseData(params,data))
}function transformResponseData(params,data){var resp={text:data.body,rc:data.rc||200,headers:data.headers,oauthApprovalUrl:data.oauthApprovalUrl,oauthError:data.oauthError,oauthErrorText:data.oauthErrorText,errors:[]};
if(resp.rc<200||resp.rc>=400){resp.errors=[resp.rc+" Error"]
}else{if(resp.text){if(resp.rc>=300&&resp.rc<400){params.CONTENT_TYPE="TEXT"
}switch(params.CONTENT_TYPE){case"JSON":case"FEED":resp.data=gadgets.json.parse(resp.text);
if(!resp.data){resp.errors.push("500 Failed to parse JSON");
resp.rc=500;
resp.data=null
}break;
case"DOM":var dom;
if(typeof ActiveXObject!="undefined"){dom=new ActiveXObject("Microsoft.XMLDOM");
dom.async=false;
dom.validateOnParse=false;
dom.resolveExternals=false;
if(!dom.loadXML(resp.text)){resp.errors.push("500 Failed to parse XML");
resp.rc=500
}else{resp.data=dom
}}else{var parser=new DOMParser();
dom=parser.parseFromString(resp.text,"text/xml");
if("parsererror"===dom.documentElement.nodeName){resp.errors.push("500 Failed to parse XML");
resp.rc=500
}else{resp.data=dom
}}break;
default:resp.data=resp.text;
break
}}}return resp
}function makeXhrRequest(realUrl,proxyUrl,callback,paramData,method,params,processResponseFunction,opt_contentType){var xhr=makeXhr();
if(proxyUrl.indexOf("//")==0){proxyUrl=document.location.protocol+proxyUrl
}xhr.open(method,proxyUrl,true);
if(callback){xhr.onreadystatechange=gadgets.util.makeClosure(null,processResponseFunction,realUrl,callback,params,xhr)
}if(paramData!==null){xhr.setRequestHeader("Content-Type",opt_contentType||"application/x-www-form-urlencoded");
xhr.send(paramData)
}else{xhr.send(null)
}}function respondWithPreload(postData,params,callback){if(gadgets.io.preloaded_&&postData.httpMethod==="GET"){for(var i=0;
i<gadgets.io.preloaded_.length;
i++){var preload=gadgets.io.preloaded_[i];
if(preload&&(preload.id===postData.url)){delete gadgets.io.preloaded_[i];
if(preload.rc!==200){callback({rc:preload.rc,errors:[preload.rc+" Error"]})
}else{if(preload.oauthState){oauthState=preload.oauthState
}var resp={body:preload.body,rc:preload.rc,headers:preload.headers,oauthApprovalUrl:preload.oauthApprovalUrl,oauthError:preload.oauthError,oauthErrorText:preload.oauthErrorText,errors:[]};
callback(transformResponseData(params,resp))
}return true
}}}return false
}function init(configuration){config=configuration["core.io"]||{}
}var requiredConfig={proxyUrl:new gadgets.config.RegExValidator(/.*%(raw)?url%.*/),jsonProxyUrl:gadgets.config.NonEmptyStringValidator};
gadgets.config.register("core.io",requiredConfig,init);
return{makeRequest:function(url,callback,opt_params){var params=opt_params||{};
var httpMethod=params.METHOD||"GET";
var refreshInterval=params.REFRESH_INTERVAL;
var auth,st;
if(params.AUTHORIZATION&&params.AUTHORIZATION!=="NONE"){auth=params.AUTHORIZATION.toLowerCase();
st=shindig.auth.getSecurityToken()
}else{if(httpMethod==="GET"&&refreshInterval===undefined){refreshInterval=3600
}}var signOwner=true;
if(typeof params.OWNER_SIGNED!=="undefined"){signOwner=params.OWNER_SIGNED
}var signViewer=true;
if(typeof params.VIEWER_SIGNED!=="undefined"){signViewer=params.VIEWER_SIGNED
}var headers=params.HEADERS||{};
if(httpMethod==="POST"&&!headers["Content-Type"]){headers["Content-Type"]="application/x-www-form-urlencoded"
}var urlParams=gadgets.util.getUrlParameters();
var paramData={url:url,httpMethod:httpMethod,headers:gadgets.io.encodeValues(headers,false),postData:params.POST_DATA||"",authz:auth||"",st:st||"",contentType:params.CONTENT_TYPE||"TEXT",numEntries:params.NUM_ENTRIES||"3",getSummaries:!!params.GET_SUMMARIES,signOwner:signOwner,signViewer:signViewer,gadget:urlParams.url,container:urlParams.container||urlParams.synd||"default",bypassSpecCache:gadgets.util.getUrlParameters().nocache||"",getFullHeaders:!!params.GET_FULL_HEADERS};
if(auth==="oauth"||auth==="signed"){if(gadgets.io.oauthReceivedCallbackUrl_){paramData.OAUTH_RECEIVED_CALLBACK=gadgets.io.oauthReceivedCallbackUrl_;
gadgets.io.oauthReceivedCallbackUrl_=null
}paramData.oauthState=oauthState||"";
for(var opt in params){if(params.hasOwnProperty(opt)){if(opt.indexOf("OAUTH_")===0){paramData[opt]=params[opt]
}}}}var proxyUrl=config.jsonProxyUrl.replace("%host%",document.location.host);
if(!respondWithPreload(paramData,params,callback,processResponse)){if(httpMethod==="GET"&&refreshInterval>0){var extraparams="?refresh="+refreshInterval+"&"+gadgets.io.encodeValues(paramData);
makeXhrRequest(url,proxyUrl+extraparams,callback,null,"GET",params,processResponse)
}else{makeXhrRequest(url,proxyUrl,callback,gadgets.io.encodeValues(paramData),"POST",params,processResponse)
}}},makeNonProxiedRequest:function(relativeUrl,callback,opt_params,opt_contentType){var params=opt_params||{};
makeXhrRequest(relativeUrl,relativeUrl,callback,params.POST_DATA,params.METHOD,params,processNonProxiedResponse,opt_contentType)
},clearOAuthState:function(){oauthState=undefined
},encodeValues:function(fields,opt_noEscaping){var escape=!opt_noEscaping;
var buf=[];
var first=false;
for(var i in fields){if(fields.hasOwnProperty(i)&&!/___$/.test(i)){if(!first){first=true
}else{buf.push("&")
}buf.push(escape?encodeURIComponent(i):i);
buf.push("=");
buf.push(escape?encodeURIComponent(fields[i]):fields[i])
}}return buf.join("")
},getProxyUrl:function(url,opt_params){var params=opt_params||{};
var refresh=params.REFRESH_INTERVAL;
if(refresh===undefined){refresh="3600"
}var urlParams=gadgets.util.getUrlParameters();
var rewriteMimeParam=params.rewriteMime?"&rewriteMime="+encodeURIComponent(params.rewriteMime):"";
var ret=config.proxyUrl.replace("%url%",encodeURIComponent(url)).replace("%host%",document.location.host).replace("%rawurl%",url).replace("%refresh%",encodeURIComponent(refresh)).replace("%gadget%",encodeURIComponent(urlParams.url)).replace("%container%",encodeURIComponent(urlParams.container||urlParams.synd||"default")).replace("%rewriteMime%",rewriteMimeParam);
if(ret.indexOf("//")==0){ret=window.location.protocol+ret
}return ret
}}
}();
gadgets.io.RequestParameters=gadgets.util.makeEnum(["METHOD","CONTENT_TYPE","POST_DATA","HEADERS","AUTHORIZATION","NUM_ENTRIES","GET_SUMMARIES","GET_FULL_HEADERS","REFRESH_INTERVAL","OAUTH_SERVICE_NAME","OAUTH_USE_TOKEN","OAUTH_TOKEN_NAME","OAUTH_REQUEST_TOKEN","OAUTH_REQUEST_TOKEN_SECRET","OAUTH_RECEIVED_CALLBACK"]);
gadgets.io.MethodType=gadgets.util.makeEnum(["GET","POST","PUT","DELETE","HEAD"]);
gadgets.io.ContentType=gadgets.util.makeEnum(["TEXT","DOM","JSON","FEED"]);
gadgets.io.AuthorizationType=gadgets.util.makeEnum(["NONE","SIGNED","OAUTH"]);;
var tamings___=tamings___||[];
tamings___.push(function(A){caja___.whitelistFuncs([[gadgets.io,"encodeValues"],[gadgets.io,"getProxyUrl"],[gadgets.io,"makeRequest"]])
});;
(function(){osapi._registerMethod=function(G,F){var A=typeof ___!=="undefined";
if(G=="newBatch"){return 
}var D=G.split(".");
var C=osapi;
for(var B=0;
B<D.length-1;
B++){C[D[B]]=C[D[B]]||{};
C=C[D[B]]
}var E=function(J){var I=osapi.newBatch();
var H={};
H.execute=function(M){var K=A?___.untame(M):M;
var L=A?___.USELESS:this;
I.add(G,this);
I.execute(function(N){if(N.error){K.call(L,N.error)
}else{K.call(L,N[G])
}})
};
if(A){___.markInnocent(H.execute,"execute")
}J=J||{};
J.userId=J.userId||"@viewer";
J.groupId=J.groupId||"@self";
H.method=G;
H.transport=F;
H.rpc=J;
return H
};
if(A&&typeof ___.markInnocent!=="undefined"){___.markInnocent(E,G)
}if(C[D[D.length-1]]){gadgets.warn("Skipping duplicate osapi method definition "+G+" on transport "+F.name)
}else{C[D[D.length-1]]=E
}}
})();;
(function(){var A=function(){var C={};
var B=[];
var F=function(G,H){if(H&&G){B.push({key:G,request:H})
}return C
};
var E=function(H){var G={method:H.request.method,id:H.key};
if(H.request.rpc){G.params=H.request.rpc
}return G
};
var D=function(G){var H={};
var O={};
var J=0;
var K=[];
for(var M=0;
M<B.length;
M++){var I=B[M].request.transport;
if(!O[I.name]){K.push(I);
J++
}O[I.name]=O[I.name]||[];
O[I.name].push(E(B[M]))
}var N=function(S){if(S.error){H.error=S.error
}for(var R=0;
R<B.length;
R++){var Q=B[R].key;
var P=S[Q];
if(P){if(P.error){H[Q]=P
}else{H[Q]=P.data||P.result
}}}J--;
if(J===0){G(H)
}};
for(var L=0;
L<K.length;
L++){K[L].execute(O[K[L].name],N)
}if(J==0){window.setTimeout(function(){G(H)
},0)
}};
C.execute=D;
C.add=F;
return C
};
osapi.newBatch=A
})();;
(function(){function A(H,G){function F(J){if(J.errors[0]){G({error:{code:J.rc,message:J.text}})
}else{var K=J.result||J.data;
if(K.error){G(K)
}else{var I={};
for(var L=0;
L<K.length;
L++){I[K[L].id]=K[L]
}G(I)
}}}var E={POST_DATA:gadgets.json.stringify(H),CONTENT_TYPE:"JSON",METHOD:"POST",AUTHORIZATION:"SIGNED"};
var C=this.name;
var D=shindig.auth.getSecurityToken();
if(D){C+="?st=";
C+=encodeURIComponent(D)
}gadgets.io.makeNonProxiedRequest(C,F,E,"application/json")
}function B(F){var H=F["osapi.services"];
if(H){for(var E in H){if(H.hasOwnProperty(E)){if(E.indexOf("http")==0||E.indexOf("//")==0){var C=E.replace("%host%",document.location.host);
var I={name:C,execute:A};
var D=H[E];
for(var G=0;
G<D.length;
G++){osapi._registerMethod(D[G],I)
}}}}}}if(gadgets.config){gadgets.config.register("osapi.services",null,B)
}})();;
if(gadgets&&gadgets.rpc){(function(){function A(E,D){var C=function(G){if(!G){D({code:500,message:"Container refused the request"})
}else{if(G.error){D(G)
}else{var F={};
for(var H=0;
H<G.length;
H++){F[G[H].id]=G[H]
}D(F)
}}};
gadgets.rpc.call("..","osapi._handleGadgetRpcMethod",C,E)
}function B(C){var F={name:"gadgets.rpc",execute:A};
var K=C["osapi.services"];
if(K){for(var D in K){if(K.hasOwnProperty(D)){if(D==="gadgets.rpc"){var E=K[D];
for(var H=0;
H<E.length;
H++){osapi._registerMethod(E[H],F)
}}}}}if(osapi.container&&osapi.container.listMethods){var G=gadgets.util.runOnLoadHandlers;
var I=2;
var J=function(){I--;
if(I==0){G()
}};
gadgets.util.runOnLoadHandlers=J;
osapi.container.listMethods({}).execute(function(L){if(!L.error){for(var M=0;
M<L.length;
M++){if(L[M]!="container.listMethods"){osapi._registerMethod(L[M],F)
}}}J()
});
window.setTimeout(J,500)
}}if(gadgets.config&&gadgets.config.isGadget){gadgets.config.register("osapi.services",null,B)
}})()
};;
gadgets.util.registerOnLoadHandler(function(){if(osapi&&osapi.people&&osapi.people.get){osapi.people.getViewer=function(A){A=A||{};
A.userId="@viewer";
A.groupId="@self";
return osapi.people.get(A)
};
osapi.people.getViewerFriends=function(A){A=A||{};
A.userId="@viewer";
A.groupId="@friends";
return osapi.people.get(A)
};
osapi.people.getOwner=function(A){A=A||{};
A.userId="@owner";
A.groupId="@self";
return osapi.people.get(A)
};
osapi.people.getOwnerFriends=function(A){A=A||{};
A.userId="@owner";
A.groupId="@friends";
return osapi.people.get(A)
}
}});;
var tamings___=tamings___||[];
tamings___.push(function(A){___.tamesTo(osapi.newBatch,___.markFuncFreeze(function(){var C=osapi.newBatch();
___.markInnocent(C.add,"add");
___.markInnocent(C.execute,"execute");
return ___.tame(C)
}));
A.outers.osapi=___.tame(osapi);
___.grantRead(A.outers,"osapi");
var B=A;
gadgets.util.registerOnLoadHandler(function(){if(osapi&&osapi.people&&osapi.people.get){caja___.whitelistFuncs([[osapi.people,"getViewer"],[osapi.people,"getViewerFriends"],[osapi.people,"getOwner"],[osapi.people,"getOwnerFriends"]]);
B.outers.osapi.people.getViewer=___.tame(osapi.people.getViewer);
B.outers.osapi.people.getViewerFriends=___.tame(osapi.people.getViewerFriends);
B.outers.osapi.people.getOwner=___.tame(osapi.people.getOwner);
B.outers.osapi.people.getOwnerFriends=___.tame(osapi.people.getOwnerFriends)
}})
});;
gadgets.window=gadgets.window||{};
(function(){gadgets.window.getViewportDimensions=function(){var A=0;
var B=0;
if(self.innerHeight){A=self.innerWidth;
B=self.innerHeight
}else{if(document.documentElement&&document.documentElement.clientHeight){A=document.documentElement.clientWidth;
B=document.documentElement.clientHeight
}else{if(document.body){A=document.body.clientWidth;
B=document.body.clientHeight
}}}return{width:A,height:B}
}
})();;
var apia=true,api=null,apib=false,apic=this,apid=function(j,h,d){j=j.split(".");d=d||apic;!(j[0]in d)&&d.execScript&&d.execScript("var "+j[0]);for(var g;j.length&&(g=j.shift());)if(!j.length&&h!==undefined)d[g]=h;else d=d[g]?d[g]:d[g]={}};Math.floor(Math.random()*2147483648).toString(36);var apie=Date.now||function(){return+new Date};var apif=function(j){var h=j.b,d=j.d,g=j.e;h-=d;h-=g;h^=g>>>13;d-=g;d-=h;d^=h<<8;g-=h;g-=d;g^=d>>>13;h-=d;h-=g;h^=g>>>12;d-=g;d-=h;d^=h<<16;g-=h;g-=d;g^=d>>>5;h-=d;h-=g;h^=g>>>3;d-=g;d-=h;d^=h<<10;g-=h;g-=d;g^=d>>>15;j.b=h;j.d=d;return j.e=g},apig=function(j,h){return(j[h+0]>127?j[h+0]-256:j[h+0])+((j[h+1]>127?j[h+1]-256:j[h+1])<<8)+((j[h+2]>127?j[h+2]-256:j[h+2])<<16)+((j[h+3]>127?j[h+3]-256:j[h+3])<<24)};var apih,apii,apij,apik,apil=function(){return apic.navigator?apic.navigator.userAgent:api},apim=function(){return apic.navigator};apik=apij=apii=apih=apib;var apin;if(apin=apil()){var apio=apim();apih=apin.indexOf("Opera")==0;apii=!apih&&apin.indexOf("MSIE")!=-1;(apij=!apih&&apin.indexOf("WebKit")!=-1)&&apin.indexOf("Mobile");apik=!apih&&!apij&&apio.product=="Gecko"}var apip=apih,apiq=apii,apir=apik,apis=apij,apit=apim(),apiu=apit&&apit.platform||"";apiu.indexOf("Mac");apiu.indexOf("Win");apiu.indexOf("Linux");
apim()&&(apim().appVersion||"").indexOf("X11");var apiv="",apiw;if(apip&&apic.opera){var apix=apic.opera.version;apiv=typeof apix=="function"?apix():apix}else{if(apir)apiw=/rv\:([^\);]+)(\)|;)/;else if(apiq)apiw=/MSIE\s+([^\);]+)(\)|;)/;else if(apis)apiw=/WebKit\/(\S+)/;if(apiw){var apiy=apiw.exec(apil());apiv=apiy?apiy[1]:""}}apiq&&parseFloat(apiv);var apiz=/\s*;\s*/,apiA=function(j,h,d,g,k){if(/[;=\s]/.test(j))throw Error('Invalid cookie name "'+j+'"');if(/[;\r\n]/.test(h))throw Error('Invalid cookie value "'+h+'"');d!==undefined||(d=-1);k=k?";domain="+k:"";g=g?";path="+g:"";d=d<0?"":d==0?";expires="+(new Date(1970,1,1)).toUTCString():";expires="+(new Date(apie()+d*1E3)).toUTCString();document.cookie=j+"="+h+k+g+d},apiB=function(j,h){for(var d=j+"=",g=(document.cookie||"").split(apiz),k=0,q;q=g[k];k++)if(q.indexOf(d)==0)return q.substr(d.length);
return h};function apiC(){function j(a,b){var c=a.lastIndexOf(b);return c!=-1&&c+b.length==a.length}function h(a,b){for(var c=0,e=b.length;c<e;c++)if(j(a,b[c]))return apia;return apib}function d(){}function g(){}function k(a){this.a=a}function q(a){this.m=a||"googleapis.";this.a=api;if(k.w.isSupported())this.a=k.w;else if(k.t.isSupported())this.a=k.t;else if(k.z.isSupported())this.a=k.z}function m(){}function p(){}function n(){}function t(){}function y(){this.B={};this.g=osapi.newBatch()}function x(){this.g=
new y;this.D=1E4;this.h=api}d.j="google.api";d.c="__GOOGLEAPIS";d.i="MPRF";d.O=function(a){var b=apiB(d.i);if(b){b=b.split("|");for(var c=0;c<b.length;c++){var e=b[c].indexOf("="),f=b[c].substring(0,e);e=b[c].substring(e+1);if(f==d.j+"."+a)return e}}return api};d.ba=function(a,b){var c=d.j+"."+a,e=apiB(d.i),f=[];if(e){e=e.split("|");for(var l=0;l<e.length;l++)e[l].indexOf(c)!=0&&f.push(e[l])}f.push(c+"="+b);apiA(d.i,f.join("|"),36E5,"/","google.com")};d.n=function(a,b){for(var c in b){var e=b[c];
if(typeof e==="object"&&e!=api){a[c]||(a[c]={});d.n(a[c],e)}else a[c]=e}};d.N=function(){var a=gadgets.config.get();window[d.c]&&d.n(a,window[d.c]);window.localStorage&&window.localStorage[d.c]&&d.n(a,gadgets.json.parse(window.localStorage[d.c]));for(var b=["proxy","rpc"],c=0;c<b.length;c++){var e=b[c],f=d.O(e);if(f)a[d.j][e]=f}return a};d.getFeatureConfig=function(a){return d.N()[a]};d.get=function(){return d.getFeatureConfig(d.j)||{}};d.q=function(a){if(!a)return api;var b=a;if(typeof a==="string")b=
a.split(".");a=d.get();for(var c=0;c<b.length;c++){if(typeof a!=="object"){a=api;break}var e=b[c];if(e in a)a=a[e];else{a=api;break}}return a};d.configure=function(a,b){for(var c in a){window[d.c]=window[d.c]||{};d.n(window[d.c],a);b&&d.ba(c,a[c])}};d.K=function(){var a=d.i;apiB(a);apiA(a,"",0,"/","google.com")};g.o="apiproxy";g.r=api;g.u=apib;g.v=[];g.R=function(){return window.__PVT};g.s=function(){return d.q("requestCache.enabled")};g.da=function(){if(!g.r){var a=d.get().proxy;a+="#parent="+encodeURIComponent(document.location.href);
a+="&rpctoken="+Number(new Date);var b=g.R();if(b)a+="&pvt="+encodeURIComponent(b);if(b=g.s())a+="&cache="+b;b=document.createElement("iframe");b.style.width="1px";b.style.height="1px";b.style.position="absolute";b.style.left="-100px";b.src="about:blank";b.name=g.o;b.id=g.o;document.body.appendChild(b);b.src=a;gadgets.rpc.setupReceiver(b.id);g.r=b}};g.F=function(a,b){g.r||g.da();g.u?gadgets.rpc.call(g.o,"makeRequest",function(c){c=gadgets.json.parse(c);for(var e={},f=0;f<c.length;f++)e[c[f].id]=c[f];
b(e)},a):g.v.push({aa:a,J:b})};g.Z=function(){if(!g.u){g.u=apia;for(var a=0;a<g.v.length;a++){var b=g.v[a];g.F(b.aa,b.J)}}};k.prototype.isSupported=function(){return this.a in window&&window[this.a]!==api};k.prototype.set=function(a,b){window[this.a].setItem(a,b)};k.prototype.get=function(a){return window[this.a].getItem(a)};k.prototype.remove=function(a){window[this.a].removeItem(a)};k.prototype.clear=function(){window[this.a].clear()};k.prototype.p=function(a){a=a||api;for(var b=[],c=0,e=window[this.a].length;c<
e;c++){var f=window[this.a].key(c);if(a==api||f.indexOf(a)===0)b.push(f)}return b};k.t=new k("localStorage");k.w=new k("sessionStorage");k.z={isSupported:function(){return apib}};q.prototype.f=function(a){return this.m+a};q.prototype.set=function(a,b,c){if(this.a!==api){var e=(new Date).getTime(),f=api;if(c)f=e+c*1E3;b={item:b,added:e,expiration:f};this.a.set(this.f(a),gadgets.json.stringify(b))}};q.prototype.get=function(a){if(this.a===api)return api;a=this.f(a);var b=this.a.get(a);if(!b)return api;
b=gadgets.json.parse(b);var c=b.expiration;if(c&&(new Date).getTime()>c){this.a.remove(a);return api}return b.item};q.prototype.remove=function(a){this.a!==api&&this.a.remove(this.f(a))};q.prototype.p=function(){if(this.a===api)return[];var a=this.a.p(this.m);if(this.m)for(var b=0,c=a.length;b<c;b++)a[b]=a[b].substring(this.m.length);return a};m.H=[".count",".get",".list",".search"];m.I=[".insert",".update",".delete"];m.l=api;m.X=function(){if(m.l==api){var a={},b=d.get(),c;for(c in b.methods){var e=
d.q(["methods",c,"cache"])||{};a[c]=m.C(c,e.enabled,e.expiration,e.invalidates)}m.l=a}};m.P=function(){return 300};m.s=function(a){return h(a,m.H)};m.Q=function(a){var b=[];if(h(a,m.I)){a=a.substring(0,a.lastIndexOf("."));b.push(a)}return b};m.C=function(a,b,c,e){b=b||m.s(a);c=c||m.P(a);a=e||m.Q(a);return{enabled:b,expiration:c,invalidates:a}};m.get=function(a){m.X();var b=m.l[a];if(!b){b=m.C(a);m.l[a]=b}return b};p.k=new q;p.f=function(a,b){b=b||{};var c=gadgets.json.stringify(a),e=b.sid;if(e)c+=
e;e=(a.method||"")+"|";var f=c;c=[];for(var l=0,i=0;i<f.length;i++){for(var o=f.charCodeAt(i);o>255;){c[l++]=o&255;o>>=8}c[l++]=o}f=0;l=c.length;i={b:-1640531527,d:-1640531527,e:314159265};for(o=l;o>=12;o-=12,f+=12){i.b+=apig(c,f);i.d+=apig(c,f+4);i.e+=apig(c,f+8);apif(i)}i.e+=l;switch(o){case 11:i.e+=c[f+10]<<24;case 10:i.e+=(c[f+9]&255)<<16;case 9:i.e+=(c[f+8]&255)<<8;case 8:i.d+=apig(c,f+4);i.b+=apig(c,f);break;case 7:i.d+=(c[f+6]&255)<<16;case 6:i.d+=(c[f+5]&255)<<8;case 5:i.d+=c[f+4]&255;case 4:i.b+=
apig(c,f);break;case 3:i.b+=(c[f+2]&255)<<16;case 2:i.b+=(c[f+1]&255)<<8;case 1:i.b+=c[f+0]&255}c=apif(i);return e+c};p.Y=function(a){for(var b={},c=0;c<a.length;c++){var e=a[c];b[e.id]=e}return b};p.$=function(a,b,c){b=p.Y(b);for(var e=0;e<a.length;e++){var f=a[e],l=m.get(f.method);if(l.enabled){var i=b[f.id];if(i)i.result&&i.result.error||p.k.set(p.f(f,c),i,l.expiration)}}};p.get=function(a,b){return p.k.get(p.f(a,b))};p.V=function(a){for(var b={},c=apib,e=0,f=a.length;e<f;e++)for(var l=m.get(a[e].method).invalidates,
i=0,o=l.length;i<o;i++){c=apia;b[l[i]]=apia}if(c){a=p.k.p();c=0;for(e=a.length;c<e;c++){f=a[c];for(var r in b)f.indexOf(r)>-1&&p.k.remove(f)}}};n.A=".delete";n.G={};n.register=function(a){osapi._registerMethod(a,{name:"google.api",execute:n.M});var b;a:{var c=osapi;b=a.split(".");c=c||apic;for(var e;e=b.shift();)if(c[e])c=c[e];else{b=api;break a}b=c}apid(a,b,void 0);a=a.substring(a.indexOf(".")+1);if(j(a,n.A))a=a.replace(n.A,".remove");apid("googleapis."+a,b,void 0);apid("google."+a,b,void 0)};n.ca=
function(a){for(var b in a)if(a.hasOwnProperty(b))n.G[b]=a[b]};n.ea=function(){if(d.q("auth.useInterimAuth")===apib)return apib;return apia};n.S=function(a){return a.substring(0,a.indexOf("."))};n.U=function(a){return(a=n.G[a])?a:"v1"};n.M=function(a,b){for(var c=0;c<a.length;c++){var e=a[c],f=n.S(e.method);e.jsonrpc="2.0";e.key=e.id;e.apiVersion=n.U(f);delete e.params.userId}e={"Content-Type":"application/json"};if(n.ea())e.Authorization="InterimServerLogin service=google,auth="+apiB("SID");if(window.navigator){f=
["appVersion","platform","userAgent"];var l=[];for(c=0;c<f.length;c++)window.navigator[f[c]]&&l.push(encodeURIComponent(f[c])+"="+encodeURIComponent(window.navigator[f[c]]));e["X-ClientDetails"]=l.join("&")}c={requests:a,headers:e,uri:d.get().rpc,method:"POST",body:gadgets.json.stringify(a)};g.F(c,b)};n.init=function(){var a=d.get(),b;for(b in a.methods)n.register(b);"versions"in a&&n.ca(a.versions);gadgets.rpc.register("ready",function(){g.Z()})};gadgets.config.register("google.api",api,function(){n.init()});
t.W=function(a){return a==="Authorization"||a==="Content-Type"||a==="OriginToken"||a==="X-ClientDetails"};t.L=function(){try{return new XMLHttpRequest}catch(a){}try{return new ActiveXObject("Msxml2.XMLHTTP")}catch(b){}return api};t.T=function(){return apiB("SID")};t.makeRequest=function(a,b){var c=[],e={sid:t.T()};a=a||{};var f="/rpc",l="POST",i={},o=a.headers||{},r=a.requests||[];if(r.length===0){f=a.uri||"";l=a.method||"GET";i=a.parameters||{};var u=a.body||api;if(u)r=gadgets.json.parse(u);f+=f.indexOf("?")==
-1?"?":"&";for(var s in i){u=i[s];f+=encodeURI(s)+"="+encodeURI(u)+"&"}}i=(s=gadgets.util.getUrlParameters())?s.pvt:api;var B=s?s.cache:apib;if(B){p.V(r);s=[];for(u=0;u<r.length;u++){var C=r[u],D=p.get(C,e);if(D){gadgets.log("Cache HIT");c.push(D)}else{gadgets.log("Cache MISS");s.push(C)}}if(s.length===0){b(gadgets.json.stringify(c));return}r=s}o["Content-Type"]="application/json";if(i)o.OriginToken=i;var v=t.L();if(!v)throw Error("XHR not supported");v.open(l,f);v.onreadystatechange=function(){if(v.readyState==
4){var w=v.responseText;if(B){w=gadgets.json.parse(w);p.$(r,w,e);for(var z=0;z<c.length;z++)w.push(c[z]);w=gadgets.json.stringify(w)}b(w)}};for(var A in o)t.W(A)&&v.setRequestHeader(A,o[A]);v.send(gadgets.json.stringify(r))};y.prototype.add=function(a,b,c){this.B[a]=c;this.g.add(a,b);return this};y.prototype.execute=function(a){var b=this;this.g.execute(function(c){var e={},f=apib,l;for(l in c)if(c.hasOwnProperty(l)){var i=c[l],o=b.B[l];if(o)o(i);else{e[l]=i;f=apia}}f&&a&&a(e)})};x.prototype.add=
function(a,b,c){this.g.add(a,b,c);return this};x.prototype.setInterval=function(a){this.D=a*1E3};x.prototype.execute=function(a){if(this.h)throw Error("Polling has already started.");var b=this,c=function(){b.g.execute(a);b.h=window.setTimeout(function(){c()},b.D)};c()};x.prototype.cancel=function(){if(this.h){window.clearTimeout(this.h);this.h=api}};return{init:function(){n.init()},register:function(a){n.register(a)},configure:function(a,b){d.configure(a,b)},clearconfig:function(){d.K()},getFeatureConfig:function(a){return d.getFeatureConfig(a)},
newBatch:function(){return new y},newPoll:function(){return new x},server:{init:function(){gadgets.rpc.register("makeRequest",function(a){t.makeRequest(a,this.callback)});gadgets.rpc.call("..","ready")}},browserStorage:{local:k.t,session:k.w,userData:k.z}}}window.googleapis=window.googleapis||apiC();window.google=window.google||{};window.google.api=window.google.api||window.googleapis;
;
shindig.sha1=(function(){var E=[];
var B=[];
var H=[];
var J=[];
J[0]=128;
for(var D=1;
D<64;
++D){J[D]=0
}function F(){E[0]=1732584193;
E[1]=4023233417;
E[2]=2562383102;
E[3]=271733878;
E[4]=3285377520;
inbuf_=0;
total_=0
}function I(K,L){return((K<<L)|(K>>>(32-L)))&4294967295
}function A(K){var L=H;
for(var N=0;
N<64;
N+=4){var U=(K[N]<<24)|(K[N+1]<<16)|(K[N+2]<<8)|(K[N+3]);
L[N/4]=U
}for(var N=16;
N<80;
N++){L[N]=I(L[N-3]^L[N-8]^L[N-14]^L[N-16],1)
}var T=E[0];
var S=E[1];
var R=E[2];
var Q=E[3];
var P=E[4];
var O,M;
for(var N=0;
N<80;
N++){if(N<40){if(N<20){O=Q^(S&(R^Q));
M=1518500249
}else{O=S^R^Q;
M=1859775393
}}else{if(N<60){O=(S&R)|(Q&(S|R));
M=2400959708
}else{O=S^R^Q;
M=3395469782
}}var V=(I(T,5)+O+P+M+L[N])&4294967295;
P=Q;
Q=R;
R=I(S,30);
S=T;
T=V
}E[0]=(E[0]+T)&4294967295;
E[1]=(E[1]+S)&4294967295;
E[2]=(E[2]+R)&4294967295;
E[3]=(E[3]+Q)&4294967295;
E[4]=(E[4]+P)&4294967295
}function C(K,L){if(!L){L=K.length
}var M=0;
if(inbuf_==0){while(M+64<L){A(K.slice(M,M+64));
M+=64;
total_+=64
}}while(M<L){B[inbuf_++]=K[M++];
total_++;
if(inbuf_==64){inbuf_=0;
A(B);
while(M+64<L){A(K.slice(M,M+64));
M+=64;
total_+=64
}}}}function G(){var N=[];
var M=total_*8;
if(inbuf_<56){C(J,56-inbuf_)
}else{C(J,64-(inbuf_-56))
}for(var L=63;
L>=56;
L--){B[L]=M&255;
M>>>=8
}A(B);
var O=0;
for(var L=0;
L<5;
L++){for(var K=24;
K>=0;
K-=8){N[O++]=(E[L]>>K)&255
}}return N
}F();
return{reset:F,update:C,digest:G}
});;
shindig.random=(function(){var D=Math.random();
var E="0123456789ABCDEF";
var G=1;
var B=((screen.width*screen.width)+screen.height)*1000000;
function F(L){var J=shindig.sha1();
J.update(L);
var H=J.digest();
var K="";
for(var I=0;
I<H.length;
I++){K+=E.charAt(Math.floor(H[I]/16))+E.charAt(H[I]%16)
}return K
}var A=window.onmousemove||function(){return false
};
window.onmousemove=function(I){if(window.event){I=event
}var H=(I.screenX+I.clientX)<<16;
H+=(I.screenY+I.clientY);
H*=new Date().getTime()%1000000;
G=(G*H)%B;
return A.call(window,Array.prototype.slice.call(arguments))
};
var C=F(document.cookie+"|"+document.location+"|"+(new Date()).getTime()+"|"+D);
return function(){var H=G;
H+=parseInt(C.substr(0,20),16);
C=F(C);
return H/(B+Math.pow(16,20))
}
})();;
(function(){function getTopMostAccessibleWindow(q){var r=q.parent,m;if(m=q!=r)m=!!r.document;if(m)return getTopMostAccessibleWindow(r);return q};function newIframesObject(){function q(){var a=getTopMostAccessibleWindow(window),b={height:0,name:"friendlyIframe",style:"left:0;position:absolute;top:0",width:0,zIndex:-1E4},c=a.document.createElement("ins");c.className="friendlyIframeContainer";c.innerHTML=z("","about:blank",b);a.document.body.appendChild(c);a=c.firstChild.contentWindow;A.push(a);return a}function r(a){var b=iframes.getGoogleConnectJsUri();a.open();a.write('<html><body><script src="'+b+'"><\/script></body></html>');a.close()}function m(){D++;
return"I"+D+"_"+(new Date).getTime()}function E(){var a;a=gadgets.window.getViewportDimensions().height;var b=document.body,c=document.documentElement;if(document.compatMode=="CSS1Compat"&&c.scrollHeight)a=c.scrollHeight!=a?c.scrollHeight:c.offsetHeight;else{var e=c.scrollHeight,d=c.offsetHeight;if(c.clientHeight!=d){e=b.scrollHeight;d=b.offsetHeight}a=e>a?e>d?e:d:e<d?e:d}return a}function z(a,b,c){c=c||{};a={allowtransparency:"true",frameborder:0,hspace:0,id:a,marginheight:0,marginwidth:0,name:a,
scrolling:"no",src:b,style:"",vspace:0,width:"100%"};for(var e in c)a[e]=c[e];b=[];b.push("<iframe ");for(e in a)b.push(e+'="'+a[e]+'" ');b.push("></iframe>");return b.join("")}function K(a){if(a.indexOf("http")==0)return a;if(a.indexOf("//")==0)return window.location.protocol+a;if(a.indexOf("/")==0)return window.location.protocol+"//"+window.location.host+a;var b=window.location.protocol+"//"+window.location.host+window.location.pathname,c=b.lastIndexOf("/");return b.substring(0,c+1)+a}function L(a){var b=
{},c=a.indexOf("#");if(c==-1){b.hash=null;b.base=a}else{b.hash=a.substring(c+1);b.base=a.substring(0,c)}a=b.base.indexOf("?");if(a==-1)b.query=null;else{b.query=b.base.substring(a+1);b.base=b.base.substring(0,a)}b.toString=function(){return this.base+(this.query?"?"+this.query:"")+(this.hash?"#"+this.hash:"")};return b}function F(a,b,c){a=L(a);for(var e in b){var d=b[e];d=d instanceof Array?d.join(","):encodeURIComponent(d);d=encodeURIComponent(e)+"="+d;if(c){a.hash=a.hash?a.hash+"&":"";a.hash+=d}else{a.query=
a.query?a.query+"&":"";a.query+=d}}return a.toString()}function G(){var a=window.gbar;return v||a&&a.mdc&&a.mdc.gc&&a.mdc.gc.version}function k(a,b){var c=b||{},e;for(e in a)c[e]=a[e];return c}function H(a){if(!s[a]){s[a]={};gadgets.rpc.register(a,function(b){var c=s[a][this.f];if(c=c&&c[b]||w[a]){var e=Array.prototype.slice.call(arguments,1);return c.apply(null,e)}else{gadgets.error("Unregistered call in window="+window.name+" for method="+a+" and proxyId="+b+" from "+this.f);return null}})}return s[a]}
function l(a,b,c,e,d){var f=[],g;for(g in a){var j=b,x=c,t=a[g],M=e,B=H(g);B[j]=B[j]||{};B[j][x]=gadgets.util.makeClosure(M,t);f.push(g)}if(d)for(g in w)f.push(g);return f.join(",")}function N(a,b,c){return function(){var e=Array.prototype.slice.call(arguments,0),d=e[e.length-1];if(typeof d==="function"){var f=d;e.pop()}e.unshift(b,a,f,c);(d=O(b))?d.gadgets.rpc.call.apply(d.gadgets.rpc,e):gadgets.error("RPC not sent: target iframeId="+b+" not found.")}}function O(a){if(a=="..")return window;else if(document.getElementById(a))return window;
else for(var b=0;b<A.length;b++)try{var c=A[b];if(c&&c.document)if(c.document.getElementById(a))return c}catch(e){}return null}function o(a,b,c){var e={};if(a&&a._methods){a=a._methods.split(",");for(var d=0;d<a.length;d++){var f=a[d];e[f]=N(f,b,c)}}return e}function I(a){var b;if(b=h){if(b=h._open){if(b=a.style!="inline"){if(b=a.inline!==true){a:{if(a=a.container)if(typeof a=="string"&&document.getElementById(a)){a=true;break a}else if(document==(a.ownerDocument||a.document)){a=true;break a}a=false}b=
!a}b=b}b=b}b=b}return b}function C(a){a&&a.parentNode&&a.parentNode.removeChild(a)}function n(a,b,c,e,d){a=a;if(a.indexOf(":")==0){a=googleapis.getFeatureConfig("iframes")[a.substring(1)]||{};a.params=a.params||{}}else a={url:a};a.url=K(a.url);this.config=a=a;this.openParams=b;this.params=c||{};this.methods=e;this.callbacks_={};this.openedBy_=d}function J(a,b){function c(){}c.prototype=b.prototype;a.prototype=new c}function i(a,b,c,e,d,f){n.call(this,a,b,c,e,f);this.id=b.id||m();this.usingFixedRpcToken=
!!b.rpcToken;this.rpctoken=b.rpcToken||Math.round(shindig.random()*1E9);var g;a=this.params;b={};c=this.config.params||{};for(g in a){if(g.indexOf("#")==0)b[g.substring(1)]=a[g];if(c[g]=="#")b[g]=a[g]}for(var j in b){delete a["#"+j];delete a[j]}this.hashParams=g=b;this.exposedMethods_={};this.addStyleHandlerAsCallbacks_(P);d&&this.addCallback("close",d);this.handleCallbacks_("open");k(this.exposedMethods_,this)}function p(a,b,c,e,d,f){n.call(this,a,b,c,e,f);this.url=a;this.targetIframeId=null;this.proxyId=
m();this.addStyleHandlerAsCallbacks_(Q);d&&this.addCallback("close",d);this.handleCallbacks_("beforeparentopen");a=k(this.methods);a._onopen=this.onopen_;a._ready=this.onready_;a._onclose=this.onclose_;this.params._methods=l(a,"..",this.proxyId,this,true);a={url:this.config.url,openParams:this.openParams,params:this.params,proxyId:this.proxyId};h._open(a)}var u={},D=0,v,y={},R={open:function(a){return a.openInto(a.openParams.container||a.openParams.element)},close:function(a){a.remove()}},s={},w=
{},A=[],h=function(){if(window.parent==window)return null;var a=gadgets.util.getUrlParameters();if(a.gcv)v=a.gcv;var b=o(a,"..","");k(a,b);return b}();n.prototype.addStyleHandlerAsCallbacks_=function(a){var b=this.openParams.style;b&&!y[b]&&gadgets.error("missing handler for style: "+b);b=y[b]||R;var c;if(typeof b==="function")c=b(this);else{b=b;var e={};for(c in b){var d=b[c];e[c]=typeof d==="function"?gadgets.util.makeClosure(b,d,this):d}c=e}c=c;for(var f in a){b=c[f];typeof b==="function"&&this.addCallback(a[f],
gadgets.util.makeClosure(c,b))}};n.prototype.addCallback=function(a,b){this.callbacks_[a]=this.callbacks_[a]||[];this.callbacks_[a].push(b)};n.prototype.handleCallbacks_=function(a){var b,c=this.callbacks_[a];if(c)for(var e=Array.prototype.slice.call(arguments,1),d=0,f=c.length;d<f;++d)try{b=c[d].apply(null,e)}catch(g){gadgets.error("Exception when calling callback: "+a+" : "+g)}return b};J(i,n);var P={open:"open",onready:"ready",close:"close",onresize:"resize"};i.prototype.openInto=function(a,b){var c=
this.config.url,e=window.location.protocol+"//"+window.location.host,d=this.id;gadgets.rpc.setAuthToken(d,this.rpctoken);var f=this.params,g=G();if(!f.gcv&&g)f.gcv=g;f=k(this.methods);f._ready=this.onready_;f._close=this.close;f._open=this.requestedOpen_;f._resizeMe=this.resizeMe_;g=this.hashParams;g.id=d;g.parent=e;g.rpctoken=this.rpctoken;g._methods=l(f,d,"",this,true);c=F(c,this.params,false);c=F(c,g,true);a=typeof a==="string"?document.getElementById(a):a;if(this.usingFixedRpcToken)a.innerHTML=
z(d,c,b);else{a.innerHTML=z(d,"about:blank",b);a.firstChild.src=c}this.el=a;this.iframeEl=a.firstChild;u[d]=this;gadgets.rpc.setRelayUrl(d,c);return this};i.prototype.onready_=function(a){var b=o(a,this.id,"");if(this.openedBy_&&typeof this.methods._ready=="function"){a._methods=l(b,this.openedBy_.id,this.id,this,false);this.methods._ready(a)}k(a,this);k(b,this);this.handleCallbacks_("ready")};i.prototype.relayRpc_=function(a,b,c){var e=o(c,a,"");c._methods=l(e,this.id,a,this,false);b(c)};i.prototype.close=
function(a){a=this.handleCallbacks_("close",a);if(window.frameElement&&window.frameElement.name=="friendlyIframe"){var b=window.frameElement,c=b.parentNode;c.className=="friendlyIframeContainer"?C(c):C(b)}delete u[this.id];return a};i.prototype.remove=function(){var a=document.getElementById(this.id);C(a)};i.prototype.requestedOpen_=function(a){var b=o(a.params,this.id,a.proxyId);delete a.params._methods;if(a.openParams.anchor=="_parent")a.openParams.anchor=this.el;if(I(a.openParams))new p(a.url,
a.openParams,a.params,b,b._onclose,this);else if(getTopMostAccessibleWindow(window)!=window&&a.openParams.inline!==true)this.openInNewFriendlyIframe_(a,b);else{a=new i(a.url,a.openParams,a.params,b,b._onclose,this);a=this.buildOpenResponseObject_(a);b._onopen(a)}};i.prototype.openInNewFriendlyIframe_=function(a,b){function c(j,x){if(!j.iframes||typeof j.iframes.open!="function")return false;var t=j.iframes.open(a.url,a.openParams,a.params,b,b._onclose,x);t=x.buildOpenResponseObject_(t);b._onopen(t);
return true}var e=q();r(e.document);var d=a.openParams.id||m();a.openParams.id=d;d=gadgets.util.makeClosure(this,this.relayRpc_,d,b._ready);b._ready=d;var f=gadgets.util.makeClosure(e,c,e,this),g=window.setInterval(function(){f()&&window.clearInterval(g)},10)};i.prototype.buildOpenResponseObject_=function(a){var b={childId:a.id},c=a.exposedMethods_;c._toclose=a.close;b._methods=l(c,this.id,a.id,a,false);return b};i.prototype.resizeMe_=function(a){if(this.handleCallbacks_("resize",a)===undefined)if(this.iframeEl){if(typeof a.width!=
"undefined")this.iframeEl.style.width=a.width+"px";if(typeof a.height!="undefined")this.iframeEl.style.height=a.height+"px"}};J(p,n);var Q={onBeforeParentOpen:"beforeparentopen"};p.prototype.onopen_=function(a){this.targetIframeId=a.childId;var b=o(a,"..",this.targetIframeId);k(b,this);this.close=b._toclose;u[this.targetIframeId]=this;if(this.openedBy_&&this.methods._onopen){a._methods=l(b,this.openedBy_.id,this.targetIframeId,this,false);this.methods._onopen(a)}};p.prototype.onready_=function(a){var b=
this.targetIframeId,c=o(a,"..",b);k(a,this);k(c,this);this.handleCallbacks_("ready");if(this.openedBy_&&this.methods._ready){a._methods=l(c,this.openedBy_.id,b,this,false);this.methods._ready(a)}};p.prototype.onclose_=function(a){if(this.openedBy_&&this.methods._onclose)this.methods._onclose(a);else{a=this.handleCallbacks_("close",a);delete u[this.targetIframeId];return a}};return{handlers:{get:function(a){return y[a]},set:function(a,b){y[a]=b}},allow:function(a,b){H(a);w[a]=b||window[a]},disallow:function(a){delete w[a]},
el:function(a){if(typeof a=="string")return document.getElementById(a);return a},open:function(a,b,c,e,d,f){if(arguments.length==3)e={};else if(arguments.length==4&&typeof e==="function"){d=e;e={}}return I(b)?new p(a,b,c,e,d,f):new i(a,b,c,e,d,f)},close:function(a,b){h&&h._close&&h._close(a,b)},ready:function(a,b,c){if(arguments.length==2&&typeof b==="function"){c=b;b={}}a=a||{};if(!("height"in a))a.height=E();a._methods=l(b,"..","",h,true);h&&h._ready&&h._ready(a,c)},resizeMe:function(a){a=a||{};
if(a.height==="auto")a.height=E();h&&h._resizeMe&&h._resizeMe(a)},getGoogleConnectJsUri:function(){if(window.localStorage&&window.localStorage["__GOOGLEAPIS.jsurl"])return window.localStorage["__GOOGLEAPIS.jsurl"];return"https://ssl.gstatic.com/gb/js/"+G()},setVersionOverride:function(a){v=a},reset:function(){s={};u={};v=""},iframer:h}}window.iframes=window.iframes||newIframesObject();window.iframer=window.iframer||window.iframes.iframer;})();
;
(function(){var ixpca=true,ixpcb=null,ixpcc=false,ixpc,ixpcd=this,ixpce=function(){},ixpcf=function(a){var b=typeof a;if(b=="object")if(a){if(a instanceof Array||!(a instanceof Object)&&Object.prototype.toString.call(a)=="[object Array]"||typeof a.length=="number"&&typeof a.splice!="undefined"&&typeof a.propertyIsEnumerable!="undefined"&&!a.propertyIsEnumerable("splice"))return"array";if(!(a instanceof Object)&&(Object.prototype.toString.call(a)=="[object Function]"||typeof a.call!="undefined"&&typeof a.propertyIsEnumerable!=
"undefined"&&!a.propertyIsEnumerable("call")))return"function"}else return"null";else if(b=="function"&&typeof a.call=="undefined")return"object";return b},ixpcaa=function(a){var b=ixpcf(a);return b=="array"||b=="object"&&typeof a.length=="number"},ixpcg=function(a){return typeof a=="string"},ixpch=function(a){return ixpcf(a)=="function"},ixpcba=function(a){a=ixpcf(a);return a=="object"||a=="array"||a=="function"},ixpci="closure_uid_"+Math.floor(Math.random()*2147483648).toString(36),ixpcca=0,ixpcda=
function(a,b){var c=b||ixpcd;if(arguments.length>2){var d=Array.prototype.slice.call(arguments,2);return function(){var e=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(e,d);return a.apply(c,e)}}else return function(){return a.apply(c,arguments)}},ixpcea=function(a){var b=Array.prototype.slice.call(arguments,1);return function(){var c=Array.prototype.slice.call(arguments);c.unshift.apply(c,b);return a.apply(this,c)}},ixpcj=function(a,b){function c(){}c.prototype=b.prototype;a.N=
b.prototype;a.prototype=new c};var ixpck=function(a,b){this.x=a!==undefined?a:0;this.y=b!==undefined?b:0};ixpck.prototype.q=function(){return new ixpck(this.x,this.y)};ixpck.prototype.toString=function(){return"("+this.x+", "+this.y+")"};var ixpcl=function(a,b){return new ixpck(a.x-b.x,a.y-b.y)};var ixpcm=function(a,b,c,d){this.top=a;this.right=b;this.bottom=c;this.left=d};ixpcm.prototype.q=function(){return new ixpcm(this.top,this.right,this.bottom,this.left)};ixpcm.prototype.toString=function(){return"("+this.top+"t, "+this.right+"r, "+this.bottom+"b, "+this.left+"l)"};ixpcm.prototype.contains=function(a){a=!this||!a?ixpcc:a instanceof ixpcm?a.left>=this.left&&a.right<=this.right&&a.top>=this.top&&a.bottom<=this.bottom:a.x>=this.left&&a.x<=this.right&&a.y>=this.top&&a.y<=this.bottom;return a};var ixpcn=function(a,b){this.width=a;this.height=b};ixpcn.prototype.q=function(){return new ixpcn(this.width,this.height)};ixpcn.prototype.toString=function(){return"("+this.width+" x "+this.height+")"};ixpcn.prototype.floor=function(){this.width=Math.floor(this.width);this.height=Math.floor(this.height);return this};ixpcn.prototype.round=function(){this.width=Math.round(this.width);this.height=Math.round(this.height);return this};var ixpco=function(a){this.stack=Error().stack||"";if(a)this.message=String(a)};ixpcj(ixpco,Error);ixpco.prototype.name="CustomError";var ixpcfa=function(a){for(var b=1;b<arguments.length;b++){var c=String(arguments[b]).replace(/\$/g,"$$$$");a=a.replace(/\%s/,c)}return a},ixpcla=function(a,b){if(b)return a.replace(ixpcga,"&amp;").replace(ixpcha,"&lt;").replace(ixpcia,"&gt;").replace(ixpcja,"&quot;");else{if(!ixpcka.test(a))return a;if(a.indexOf("&")!=-1)a=a.replace(ixpcga,"&amp;");if(a.indexOf("<")!=-1)a=a.replace(ixpcha,"&lt;");if(a.indexOf(">")!=-1)a=a.replace(ixpcia,"&gt;");if(a.indexOf('"')!=-1)a=a.replace(ixpcja,"&quot;");
return a}},ixpcga=/&/g,ixpcha=/</g,ixpcia=/>/g,ixpcja=/\"/g,ixpcka=/[&<>\"]/,ixpcna=function(a,b){for(var c=0,d=String(a).replace(/^[\s\xa0]+|[\s\xa0]+$/g,"").split("."),e=String(b).replace(/^[\s\xa0]+|[\s\xa0]+$/g,"").split("."),f=Math.max(d.length,e.length),g=0;c==0&&g<f;g++){var h=d[g]||"",i=e[g]||"",j=RegExp("(\\d*)(\\D*)","g"),n=RegExp("(\\d*)(\\D*)","g");do{var l=j.exec(h)||["","",""],k=n.exec(i)||["","",""];if(l[0].length==0&&k[0].length==0)break;c=l[1].length==0?0:parseInt(l[1],10);var m=
k[1].length==0?0:parseInt(k[1],10);c=ixpcma(c,m)||ixpcma(l[2].length==0,k[2].length==0)||ixpcma(l[2],k[2])}while(c==0)}return c},ixpcma=function(a,b){if(a<b)return-1;else if(a>b)return 1;return 0};var ixpcoa=function(a,b){b.unshift(a);ixpco.call(this,ixpcfa.apply(ixpcb,b));b.shift();this.ca=a};ixpcj(ixpcoa,ixpco);ixpcoa.prototype.name="AssertionError";var ixpcp=function(a,b){if(!a){var c=Array.prototype.slice.call(arguments,2),d="Assertion failed";if(b){d+=": "+b;var e=c}throw new ixpcoa(""+d,e||[]);}return a};var ixpcq=Array.prototype,ixpcr=ixpcq.indexOf?function(a,b,c){ixpcp(a.length!=ixpcb);return ixpcq.indexOf.call(a,b,c)}:function(a,b,c){c=c==ixpcb?0:c<0?Math.max(0,a.length+c):c;if(ixpcg(a)){if(!ixpcg(b)||b.length!=1)return-1;return a.indexOf(b,c)}for(c=c;c<a.length;c++)if(c in a&&a[c]===b)return c;return-1},ixpcpa=ixpcq.forEach?function(a,b,c){ixpcp(a.length!=ixpcb);ixpcq.forEach.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=ixpcg(a)?a.split(""):a,f=0;f<d;f++)f in e&&b.call(c,e[f],f,a)},ixpcqa=
function(){return ixpcq.concat.apply(ixpcq,arguments)},ixpcra=function(a){if(ixpcf(a)=="array")return ixpcqa(a);else{for(var b=[],c=0,d=a.length;c<d;c++)b[c]=a[c];return b}},ixpcsa=function(a,b,c){ixpcp(a.length!=ixpcb);return arguments.length<=2?ixpcq.slice.call(a,b):ixpcq.slice.call(a,b,c)};var ixpcta=function(a,b,c){for(var d in a)b.call(c,a[d],d,a)},ixpcs=function(a,b){for(var c in a)if(a[c]==b)return ixpca;return ixpcc},ixpcua=["constructor","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","toLocaleString","toString","valueOf"],ixpcva=function(a){for(var b,c,d=1;d<arguments.length;d++){c=arguments[d];for(b in c)a[b]=c[b];for(var e=0;e<ixpcua.length;e++){b=ixpcua[e];if(Object.prototype.hasOwnProperty.call(c,b))a[b]=c[b]}}};var ixpct,ixpcwa,ixpcu,ixpcxa,ixpcya,ixpcza,ixpcAa=function(){return ixpcd.navigator?ixpcd.navigator.userAgent:ixpcb},ixpcv=function(){return ixpcd.navigator};ixpcya=ixpcxa=ixpcu=ixpcwa=ixpct=ixpcc;var ixpcw;if(ixpcw=ixpcAa()){var ixpcBa=ixpcv();ixpct=ixpcw.indexOf("Opera")==0;ixpcwa=!ixpct&&ixpcw.indexOf("MSIE")!=-1;ixpcxa=(ixpcu=!ixpct&&ixpcw.indexOf("WebKit")!=-1)&&ixpcw.indexOf("Mobile")!=-1;ixpcya=!ixpct&&!ixpcu&&ixpcBa.product=="Gecko"}
var ixpcx=ixpct,ixpcy=ixpcwa,ixpcz=ixpcya,ixpcA=ixpcu,ixpcCa=ixpcxa,ixpcDa=ixpcv(),ixpcEa=ixpcDa&&ixpcDa.platform||"";ixpcza=ixpcEa.indexOf("Mac")!=-1;ixpcEa.indexOf("Win");ixpcEa.indexOf("Linux");var ixpcFa=!!ixpcv()&&(ixpcv().appVersion||"").indexOf("X11")!=-1,ixpcGa;
a:{var ixpcB="",ixpcC;if(ixpcx&&ixpcd.opera){var ixpcHa=ixpcd.opera.version;ixpcB=typeof ixpcHa=="function"?ixpcHa():ixpcHa}else{if(ixpcz)ixpcC=/rv\:([^\);]+)(\)|;)/;else if(ixpcy)ixpcC=/MSIE\s+([^\);]+)(\)|;)/;else if(ixpcA)ixpcC=/WebKit\/(\S+)/;if(ixpcC){var ixpcIa=ixpcC.exec(ixpcAa());ixpcB=ixpcIa?ixpcIa[1]:""}}if(ixpcy){var ixpcJa,ixpcKa=ixpcd.document;ixpcJa=ixpcKa?ixpcKa.documentMode:undefined;if(ixpcJa>parseFloat(ixpcB)){ixpcGa=String(ixpcJa);break a}}ixpcGa=ixpcB}
var ixpcLa=ixpcGa,ixpcMa={},ixpcD=function(a){return ixpcMa[a]||(ixpcMa[a]=ixpcna(ixpcLa,a)>=0)};var ixpcNa,ixpcOa=!ixpcy||ixpcD("9");ixpcy&&ixpcD("9");var ixpcPa=function(a){return(a=a.className)&&typeof a.split=="function"?a.split(/\s+/):[]},ixpcQa=function(a){var b=ixpcPa(a),c;c=ixpcsa(arguments,1);for(var d=0,e=0;e<c.length;e++)if(!(ixpcr(b,c[e])>=0)){b.push(c[e]);d++}c=d==c.length;a.className=b.join(" ");return c};var ixpcG=function(a){return a?new ixpcE(ixpcF(a)):ixpcNa||(ixpcNa=new ixpcE)},ixpcH=function(a){return ixpcg(a)?document.getElementById(a):a},ixpcSa=function(a,b){ixpcta(b,function(c,d){if(d=="style")a.style.cssText=c;else if(d=="class")a.className=c;else if(d=="for")a.htmlFor=c;else if(d in ixpcRa)a.setAttribute(ixpcRa[d],c);else a[d]=c})},ixpcRa={cellpadding:"cellPadding",cellspacing:"cellSpacing",colspan:"colSpan",rowspan:"rowSpan",valign:"vAlign",height:"height",width:"width",usemap:"useMap",
frameborder:"frameBorder",type:"type"},ixpcTa=function(a){var b=a.document;if(ixpcA&&!ixpcD("500")&&!ixpcCa){if(typeof a.innerHeight=="undefined")a=window;b=a.innerHeight;var c=a.document.documentElement.scrollHeight;if(a==a.top)if(c<b)b-=15;return new ixpcn(a.innerWidth,b)}a=ixpcI(b);if(ixpcx&&!ixpcD("9.50"))a=ixpcc;a=a?b.documentElement:b.body;return new ixpcn(a.clientWidth,a.clientHeight)},ixpcVa=function(a,b,c,d){function e(g){if(g)b.appendChild(ixpcg(g)?a.createTextNode(g):g)}for(d=d;d<c.length;d++){var f=
c[d];ixpcaa(f)&&!(ixpcba(f)&&f.nodeType>0)?ixpcpa(ixpcUa(f)?ixpcra(f):f,e):e(f)}},ixpcI=function(a){return a.compatMode=="CSS1Compat"},ixpcF=function(a){return a.nodeType==9?a:a.ownerDocument||a.document},ixpcXa=function(a,b){var c=[];return ixpcWa(a,b,c,ixpca)?c[0]:undefined},ixpcWa=function(a,b,c,d){if(a!=ixpcb)for(var e=0,f;f=a.childNodes[e];e++){if(b(f)){c.push(f);if(d)return ixpca}if(ixpcWa(f,b,c,d))return ixpca}return ixpcc},ixpcUa=function(a){if(a&&typeof a.length=="number")if(ixpcba(a))return typeof a.item==
"function"||typeof a.item=="string";else if(ixpch(a))return typeof a.item=="function";return ixpcc},ixpcE=function(a){this.b=a||ixpcd.document||document},ixpcYa=function(a,b,c,d){a=d||a.b;var e=b&&b!="*"?b.toUpperCase():"";if(a.querySelectorAll&&a.querySelector&&(!ixpcA||ixpcI(document)||ixpcD("528"))&&(e||c))c=a.querySelectorAll(e+(c?"."+c:""));else if(c&&a.getElementsByClassName){b=a.getElementsByClassName(c);if(e){a={};for(var f=d=0,g;g=b[f];f++)if(e==g.nodeName)a[d++]=g;a.length=d;c=a}else c=
b}else{b=a.getElementsByTagName(e||"*");if(c){a={};for(f=d=0;g=b[f];f++){e=g.className;var h;if(h=typeof e.split=="function"){e=e.split(/\s+/);h=ixpcr(e,c)>=0}if(h)a[d++]=g}a.length=d;c=a}else c=b}return c};
ixpcE.prototype.D=function(){var a=this.b,b=arguments,c=b[0],d=b[1];if(!ixpcOa&&d&&(d.name||d.type)){c=["<",c];d.name&&c.push(' name="',ixpcla(d.name),'"');if(d.type){c.push(' type="',ixpcla(d.type),'"');var e={};ixpcva(e,d);d=e;delete d.type}c.push(">");c=c.join("")}c=a.createElement(c);if(d)if(ixpcg(d))c.className=d;else ixpcf(d)=="array"?ixpcQa.apply(ixpcb,[c].concat(d)):ixpcSa(c,d);b.length>2&&ixpcVa(a,c,b,2);return c};ixpcE.prototype.createElement=function(a){return this.b.createElement(a)};
ixpcE.prototype.createTextNode=function(a){return this.b.createTextNode(a)};var ixpcZa=function(a){a=!ixpcA&&ixpcI(a.b)?a.b.documentElement:a.b.body;return new ixpck(a.scrollLeft,a.scrollTop)};ixpcE.prototype.appendChild=function(a,b){a.appendChild(b)};ixpcE.prototype.contains=function(a,b){if(a.contains&&b.nodeType==1)return a==b||a.contains(b);if(typeof a.compareDocumentPosition!="undefined")return a==b||Boolean(a.compareDocumentPosition(b)&16);for(;b&&a!=b;)b=b.parentNode;return b==a};var ixpcJ=function(a,b,c,d){this.left=a;this.top=b;this.width=c;this.height=d};ixpcJ.prototype.q=function(){return new ixpcJ(this.left,this.top,this.width,this.height)};ixpcJ.prototype.toString=function(){return"("+this.left+", "+this.top+" - "+this.width+"w x "+this.height+"h)"};
ixpcJ.prototype.contains=function(a){return a instanceof ixpcJ?this.left<=a.left&&this.left+this.width>=a.left+a.width&&this.top<=a.top&&this.top+this.height>=a.top+a.height:a.x>=this.left&&a.x<=this.left+this.width&&a.y>=this.top&&a.y<=this.top+this.height};var ixpcK=function(a,b,c){ixpcg(b)?ixpc_a(a,c,b):ixpcta(b,ixpcea(ixpc_a,a))},ixpc_a=function(a,b,c){a.style[ixpc0a(c)]=b},ixpcL=function(a,b){var c=ixpcF(a);if(c.defaultView&&c.defaultView.getComputedStyle)if(c=c.defaultView.getComputedStyle(a,""))return c[b];return ixpcb},ixpcM=function(a,b){return ixpcL(a,b)||(a.currentStyle?a.currentStyle[b]:ixpcb)||a.style[b]},ixpc1a=function(a){var b=a.getBoundingClientRect();if(ixpcy){a=a.ownerDocument;b.left-=a.documentElement.clientLeft+a.body.clientLeft;
b.top-=a.documentElement.clientTop+a.body.clientTop}return b},ixpc2a=function(a){if(ixpcy)return a.offsetParent;var b=ixpcF(a),c=ixpcM(a,"position"),d=c=="fixed"||c=="absolute";for(a=a.parentNode;a&&a!=b;a=a.parentNode){c=ixpcM(a,"position");d=d&&c=="static"&&a!=b.documentElement&&a!=b.body;if(!d&&(a.scrollWidth>a.clientWidth||a.scrollHeight>a.clientHeight||c=="fixed"||c=="absolute"))return a}return ixpcb},ixpcN=function(a){var b,c=ixpcF(a),d=ixpcM(a,"position"),e=ixpcz&&c.getBoxObjectFor&&!a.getBoundingClientRect&&
d=="absolute"&&(b=c.getBoxObjectFor(a))&&(b.screenX<0||b.screenY<0),f=new ixpck(0,0),g;b=c?c.nodeType==9?c:ixpcF(c):document;if(g=ixpcy){g=ixpcG(b);g=!ixpcI(g.b)}g=g?b.body:b.documentElement;if(a==g)return f;if(a.getBoundingClientRect){b=ixpc1a(a);a=ixpcZa(ixpcG(c));f.x=b.left+a.x;f.y=b.top+a.y}else if(c.getBoxObjectFor&&!e){b=c.getBoxObjectFor(a);a=c.getBoxObjectFor(g);f.x=b.screenX-a.screenX;f.y=b.screenY-a.screenY}else{e=a;do{f.x+=e.offsetLeft;f.y+=e.offsetTop;if(e!=a){f.x+=e.clientLeft||0;f.y+=
e.clientTop||0}if(ixpcA&&ixpcM(e,"position")=="fixed"){f.x+=c.body.scrollLeft;f.y+=c.body.scrollTop;break}e=e.offsetParent}while(e&&e!=a);if(ixpcx||ixpcA&&d=="absolute")f.y-=c.body.offsetTop;for(e=a;(e=ixpc2a(e))&&e!=c.body&&e!=g;){f.x-=e.scrollLeft;if(!ixpcx||e.tagName!="TR")f.y-=e.scrollTop}}return f},ixpc4a=function(a,b){var c=new ixpck(0,0),d=ixpcF(a)?ixpcF(a).parentWindow||ixpcF(a).defaultView:window,e=a;do{var f=d==b?ixpcN(e):ixpc3a(e);c.x+=f.x;c.y+=f.y}while(d&&d!=b&&(e=d.frameElement)&&(d=
d.parent));return c},ixpc3a=function(a){var b=new ixpck;if(a.nodeType==1)if(a.getBoundingClientRect){var c=ixpc1a(a);b.x=c.left;b.y=c.top}else{c=ixpcZa(ixpcG(a));a=ixpcN(a);b.x=a.x-c.x;b.y=a.y-c.y}else{b.x=a.clientX;b.y=a.clientY}return b},ixpcO=function(a,b){if(typeof a=="number")a=(b?Math.round(a):a)+"px";return a},ixpc5a=function(a){var b=ixpcx&&!ixpcD("10");if(ixpcM(a,"display")!="none")return b?new ixpcn(a.offsetWidth||a.clientWidth,a.offsetHeight||a.clientHeight):new ixpcn(a.offsetWidth,a.offsetHeight);
var c=a.style,d=c.display,e=c.visibility,f=c.position;c.visibility="hidden";c.position="absolute";c.display="inline";if(b){b=a.offsetWidth||a.clientWidth;a=a.offsetHeight||a.clientHeight}else{b=a.offsetWidth;a=a.offsetHeight}c.display=d;c.position=f;c.visibility=e;return new ixpcn(b,a)},ixpcP=function(a){var b=ixpcN(a);a=ixpc5a(a);return new ixpcJ(b.x,b.y,a.width,a.height)},ixpc6a={},ixpc0a=function(a){return ixpc6a[a]||(ixpc6a[a]=String(a).replace(/\-([a-z])/g,function(b,c){return c.toUpperCase()}))},
ixpc7a=function(a,b){if(ixpcy)a.cssText=b;else a[ixpcA?"innerText":"innerHTML"]=b},ixpc8a=function(a){return"rtl"==ixpcM(a,"direction")};var ixpc9a;!ixpcy||ixpcD("9");ixpcy&&ixpcD("8");var ixpcQ=function(){};ixpcQ.prototype.G=ixpcc;ixpcQ.prototype.r=function(){if(!this.G){this.G=ixpca;this.l()}};ixpcQ.prototype.l=function(){};var ixpcR=function(a,b){this.type=a;this.currentTarget=this.target=b};ixpcj(ixpcR,ixpcQ);ixpcR.prototype.l=function(){delete this.type;delete this.target;delete this.currentTarget};ixpcR.prototype.w=ixpcc;ixpcR.prototype.$=ixpca;var ixpcS=function(a,b){a&&this.init(a,b)};ixpcj(ixpcS,ixpcR);ixpc=ixpcS.prototype;ixpc.target=ixpcb;ixpc.relatedTarget=ixpcb;ixpc.offsetX=0;ixpc.offsetY=0;ixpc.clientX=0;ixpc.clientY=0;ixpc.screenX=0;ixpc.screenY=0;ixpc.button=0;ixpc.keyCode=0;ixpc.charCode=0;ixpc.ctrlKey=ixpcc;ixpc.altKey=ixpcc;ixpc.shiftKey=ixpcc;ixpc.metaKey=ixpcc;ixpc.Y=ixpcc;ixpc.H=ixpcb;
ixpc.init=function(a,b){var c=this.type=a.type;this.target=a.target||a.srcElement;this.currentTarget=b;var d=a.relatedTarget;if(d){if(ixpcz)try{d=d.nodeName&&d}catch(e){d=ixpcb}}else if(c=="mouseover")d=a.fromElement;else if(c=="mouseout")d=a.toElement;this.relatedTarget=d;this.offsetX=a.offsetX!==undefined?a.offsetX:a.layerX;this.offsetY=a.offsetY!==undefined?a.offsetY:a.layerY;this.clientX=a.clientX!==undefined?a.clientX:a.pageX;this.clientY=a.clientY!==undefined?a.clientY:a.pageY;this.screenX=
a.screenX||0;this.screenY=a.screenY||0;this.button=a.button;this.keyCode=a.keyCode||0;this.charCode=a.charCode||(c=="keypress"?a.keyCode:0);this.ctrlKey=a.ctrlKey;this.altKey=a.altKey;this.shiftKey=a.shiftKey;this.metaKey=a.metaKey;this.Y=ixpcza?a.metaKey:a.ctrlKey;this.H=a;delete this.$;delete this.w};ixpc.l=function(){ixpcS.N.l.call(this);this.relatedTarget=this.currentTarget=this.target=this.H=ixpcb};var ixpcT=function(a,b){this.K=b;this.j=[];if(a>this.K)throw Error("[goog.structs.SimplePool] Initial cannot be greater than max");for(var c=0;c<a;c++)this.j.push(this.g?this.g():{})};ixpcj(ixpcT,ixpcQ);ixpcT.prototype.g=ixpcb;ixpcT.prototype.F=ixpcb;var ixpcU=function(a){if(a.j.length)return a.j.pop();return a.g?a.g():{}},ixpcV=function(a,b){a.j.length<a.K?a.j.push(b):ixpc$a(a,b)},ixpc$a=function(a,b){if(a.F)a.F(b);else if(ixpcba(b))if(ixpch(b.r))b.r();else for(var c in b)delete b[c]};
ixpcT.prototype.l=function(){ixpcT.N.l.call(this);for(var a=this.j;a.length;)ixpc$a(this,a.pop());delete this.j};var ixpcab;var ixpcbb=(ixpcab="ScriptEngine"in ixpcd&&ixpcd.ScriptEngine()=="JScript")?ixpcd.ScriptEngineMajorVersion()+"."+ixpcd.ScriptEngineMinorVersion()+"."+ixpcd.ScriptEngineBuildVersion():"0";var ixpccb=function(){},ixpcdb=0;ixpc=ixpccb.prototype;ixpc.m=0;ixpc.o=ixpcc;ixpc.A=ixpcc;ixpc.init=function(a,b,c,d,e,f){if(ixpch(a))this.J=ixpca;else if(a&&a.handleEvent&&ixpch(a.handleEvent))this.J=ixpcc;else throw Error("Invalid listener argument");this.s=a;this.M=b;this.src=c;this.type=d;this.V=!!e;this.I=f;this.A=ixpcc;this.m=++ixpcdb;this.o=ixpcc};ixpc.handleEvent=function(a){if(this.J)return this.s.call(this.I||this.src,a);return this.s.handleEvent.call(this.s,a)};var ixpcW,ixpcX,ixpcY,ixpcZ,ixpceb,ixpcfb,ixpcgb,ixpchb,ixpcib,ixpcjb,ixpckb;
(function(){function a(){return{i:0,n:0}}function b(){return[]}function c(){var k=function(m){return g.call(k.src,k.m,m)};return k}function d(){return new ixpccb}function e(){return new ixpcS}var f=ixpcab&&!(ixpcna(ixpcbb,"5.7")>=0),g;ixpcfb=function(k){g=k};if(f){ixpcW=function(){return ixpcU(h)};ixpcX=function(k){ixpcV(h,k)};ixpcY=function(){return ixpcU(i)};ixpcZ=function(k){ixpcV(i,k)};ixpceb=function(){return ixpcU(j)};ixpcgb=function(){ixpcV(j,c())};ixpchb=function(){return ixpcU(n)};ixpcib=
function(k){ixpcV(n,k)};ixpcjb=function(){return ixpcU(l)};ixpckb=function(k){ixpcV(l,k)};var h=new ixpcT(0,600);h.g=a;var i=new ixpcT(0,600);i.g=b;var j=new ixpcT(0,600);j.g=c;var n=new ixpcT(0,600);n.g=d;var l=new ixpcT(0,600);l.g=e}else{ixpcW=a;ixpcX=ixpce;ixpcY=b;ixpcZ=ixpce;ixpceb=c;ixpcgb=ixpce;ixpchb=d;ixpcib=ixpce;ixpcjb=e;ixpckb=ixpce}})();var ixpc_={},ixpc0={},ixpc1={},ixpclb={},ixpcmb=function(a,b,c,d,e){if(b)if(ixpcf(b)=="array"){for(var f=0;f<b.length;f++)ixpcmb(a,b[f],c,d,e);return ixpcb}else{d=!!d;var g=ixpc0;b in g||(g[b]=ixpcW());g=g[b];if(!(d in g)){g[d]=ixpcW();g.i++}g=g[d];var h=a[ixpci]||(a[ixpci]=++ixpcca),i;g.n++;if(g[h]){i=g[h];for(f=0;f<i.length;f++){g=i[f];if(g.s==c&&g.I==e){if(g.o)break;return i[f].m}}}else{i=g[h]=ixpcY();g.i++}f=ixpceb();f.src=a;g=ixpchb();g.init(c,f,a,b,d,e);c=g.m;f.m=c;i.push(g);ixpc_[c]=g;ixpc1[h]||
(ixpc1[h]=ixpcY());ixpc1[h].push(g);if(a.addEventListener){if(a==ixpcd||!a.X)a.addEventListener(b,f,d)}else a.attachEvent(ixpcnb(b),f);return c}else throw Error("Invalid event type");},ixpcpb=function(a){if(!ixpc_[a])return ixpcc;var b=ixpc_[a];if(b.o)return ixpcc;var c=b.src,d=b.type,e=b.M,f=b.V;if(c.removeEventListener){if(c==ixpcd||!c.X)c.removeEventListener(d,e,f)}else c.detachEvent&&c.detachEvent(ixpcnb(d),e);c=c[ixpci]||(c[ixpci]=++ixpcca);e=ixpc0[d][f][c];if(ixpc1[c]){var g=ixpc1[c],h=ixpcr(g,
b);if(h>=0){ixpcp(g.length!=ixpcb);ixpcq.splice.call(g,h,1)}g.length==0&&delete ixpc1[c]}b.o=ixpca;e.L=ixpca;ixpcob(d,f,c,e);delete ixpc_[a];return ixpca},ixpcob=function(a,b,c,d){if(!d.t)if(d.L){for(var e=0,f=0;e<d.length;e++)if(d[e].o){var g=d[e].M;g.src=ixpcb;ixpcgb(g);ixpcib(d[e])}else{if(e!=f)d[f]=d[e];f++}d.length=f;d.L=ixpcc;if(f==0){ixpcZ(d);delete ixpc0[a][b][c];ixpc0[a][b].i--;if(ixpc0[a][b].i==0){ixpcX(ixpc0[a][b]);delete ixpc0[a][b];ixpc0[a].i--}if(ixpc0[a].i==0){ixpcX(ixpc0[a]);delete ixpc0[a]}}}},
ixpcnb=function(a){if(a in ixpclb)return ixpclb[a];return ixpclb[a]="on"+a},ixpcrb=function(a,b,c,d,e){var f=1;b=b[ixpci]||(b[ixpci]=++ixpcca);if(a[b]){a.n--;a=a[b];if(a.t)a.t++;else a.t=1;try{for(var g=a.length,h=0;h<g;h++){var i=a[h];if(i&&!i.o)f&=ixpcqb(i,e)!==ixpcc}}finally{a.t--;ixpcob(c,d,b,a)}}return Boolean(f)},ixpcqb=function(a,b){var c=a.handleEvent(b);a.A&&ixpcpb(a.m);return c};
ixpcfb(function(a,b){if(!ixpc_[a])return ixpca;var c=ixpc_[a],d=c.type,e=ixpc0;if(!(d in e))return ixpca;e=e[d];var f,g;if(ixpc9a===undefined)ixpc9a=ixpcy&&!ixpcd.addEventListener;if(ixpc9a){var h;if(!(h=b))a:{h="window.event".split(".");for(var i=ixpcd;f=h.shift();)if(i[f])i=i[f];else{h=ixpcb;break a}h=i}f=h;h=ixpca in e;i=ixpcc in e;if(h){if(f.keyCode<0||f.returnValue!=undefined)return ixpca;a:{var j=ixpcc;if(f.keyCode==0)try{f.keyCode=-1;break a}catch(n){j=ixpca}if(j||f.returnValue==undefined)f.returnValue=
ixpca}}j=ixpcjb();j.init(f,this);f=ixpca;try{if(h){for(var l=ixpcY(),k=j.currentTarget;k;k=k.parentNode)l.push(k);g=e[ixpca];g.n=g.i;for(var m=l.length-1;!j.w&&m>=0&&g.n;m--){j.currentTarget=l[m];f&=ixpcrb(g,l[m],d,ixpca,j)}if(i){g=e[ixpcc];g.n=g.i;for(m=0;!j.w&&m<l.length&&g.n;m++){j.currentTarget=l[m];f&=ixpcrb(g,l[m],d,ixpcc,j)}}}else f=ixpcqb(c,j)}finally{if(l){l.length=0;ixpcZ(l)}j.r();ixpckb(j)}return f}d=new ixpcS(b,this);try{f=ixpcqb(c,d)}finally{d.r()}return f});function ixpc2(a){var b=a.parent;if(a!=b&&b.document)return ixpc2(b);return a}function ixpcsb(a){return ixpc2(a)!=a&&a.frameElement&&a.frameElement.name=="friendlyIframe"};var ixpc3=function(a){this.a=a;this.ops=a.openParams};ixpc3.prototype.onBeforeParentOpen=function(){ixpctb(this)};ixpc3.prototype.onBeforeParentOpen=ixpc3.prototype.onBeforeParentOpen;
var ixpctb=function(a){if(a.ops.f&&a.a.openedBy_&&a.a.openedBy_.iframeEl){var b=ixpcN(a.a.openedBy_.iframeEl);a.ops.f.left+=b.x;a.ops.f.top+=b.y}else{b=a.ops.anchor;if(b!="_default")if(b=="_iframe"){b=ixpcTa(window);a.ops.f=new ixpcJ(0,0,b.width,b.height)}else{var c=ixpcH(b);if(c)a.ops.f=ixpcP(c);else{gadgets.error("Anchor not found in DOM: "+b+'. Falling back to "_default".');a.ops.anchor="_default";return}}}a.ops.anchor=""};
ixpc3.prototype.open=function(){var a=document.createElement("ins");iframes.el(this.ops.container).appendChild(a);a.style.display="block";ixpcK(a,this.ops.containerCss);this.a.containerDiv=a;this.a.openInto(a)};ixpc3.prototype.onready=function(){document.getElementById(this.a.id).style.height=this.a.height+"px"};ixpc3.prototype.close=function(){this.a.containerDiv&&this.a.containerDiv.parentNode&&this.a.containerDiv.parentNode.removeChild(this.a.containerDiv);this.v&&this.v.parentNode&&this.v.parentNode.removeChild(this.v)};
var ixpcub=function(a){!a.ops.f&&a.ops.anchor&&ixpctb(a);if(a.ops.anchor=="_default"&&a.a.openedBy_)a.ops.f=ixpcP(ixpcH(a.a.openedBy_.containerDiv||a.a.openedBy_.el));if(a.ops.f){var b=new ixpck(a.ops.f.left,a.ops.f.top),c=ixpc2(window);if(a.a.openedBy_){var d=ixpc4a(a.a.openedBy_.el,c);b.x+=d.x;b.y+=d.y}b={position:"absolute",left:b.x+"px",top:b.y+"px",width:a.ops.f.width+"px",height:a.ops.f.height+"px",zIndex:-1E4};c=c.document;d=c.createElement("ins");ixpcK(d,b);c.body.appendChild(d);return a.v=
d}else gadgets.error("No anchor box defined.")};var ixpcvb={"bottom-center":1,"bottom-end":7,"bottom-left":1,"bottom-right":3,"bottom-start":5,"left-bottom":1,"left-center":0,"left-top":0,"right-bottom":3,"right-center":2,"right-top":2,"top-center":0,"top-end":6,"top-left":0,"top-right":2,"top-start":4},ixpcwb=function(a,b,c,d,e){var f={"bottom-center":ixpca,"top-center":ixpca},g={"left-center":ixpca,"right-center":ixpca};e=e||{x:0,y:0};if(f.hasOwnProperty(b)){var h=ixpcP(a).width/2;if(d=="top-right"||d=="bottom-right")e.x+=h;else e.x-=h}if(f.hasOwnProperty(d)){h=
ixpcP(c).width/2;e.x+=h}if(g.hasOwnProperty(b)){h=ixpcP(a).height/2;if(d=="right-bottom"||d=="left-bottom")e.y+=h;else e.y-=h}if(g.hasOwnProperty(d))e.y+=ixpcP(c).height/2;d=ixpcvb[d];b=ixpcvb[b];var i;if(f=a.offsetParent){g=f.tagName=="HTML"||f.tagName=="BODY";if(!g||ixpcM(f,"position")!="static"){i=ixpcN(f);g||(i=ixpcl(i,new ixpck(f.scrollLeft,f.scrollTop)))}}f=ixpcP(c);var j;g=new ixpcm(0,Infinity,Infinity,0);h=ixpcG(c);for(var n=h.b.body,l=!ixpcA&&ixpcI(h.b)?h.b.documentElement:h.b.body,k=c;k=
ixpc2a(k);)if((!ixpcy||k.clientWidth!=0)&&(!ixpcA||k.clientHeight!=0||k!=n)&&(k.scrollWidth!=k.clientWidth||k.scrollHeight!=k.clientHeight)&&ixpcM(k,"overflow")!="visible"){var m=ixpcN(k),o;o=k;if(ixpcz&&!ixpcD("1.9")){var p=parseFloat(ixpcL(o,"borderLeftWidth"));if(ixpc8a(o)){var q=o.offsetWidth-o.clientWidth-p-parseFloat(ixpcL(o,"borderRightWidth"));p+=q}o=new ixpck(p,parseFloat(ixpcL(o,"borderTopWidth")))}else o=new ixpck(o.clientLeft,o.clientTop);m.x+=o.x;m.y+=o.y;g.top=Math.max(g.top,m.y);g.right=
Math.min(g.right,m.x+k.clientWidth);g.bottom=Math.min(g.bottom,m.y+k.clientHeight);g.left=Math.max(g.left,m.x);j=j||k!=l}n=l.scrollLeft;l=l.scrollTop;if(ixpcA){g.left+=n;g.top+=l}else{g.left=Math.max(g.left,n);g.top=Math.max(g.top,l)}if(!j||ixpcA){g.right+=n;g.bottom+=l}j=ixpcTa(h.b.parentWindow||h.b.defaultView||window);g.right=Math.min(g.right,n+j.width);g.bottom=Math.min(g.bottom,l+j.height);if(j=g.top>=0&&g.left>=0&&g.bottom>g.top&&g.right>g.left?g:ixpcb){l=new ixpcJ(j.left,j.top,j.right-j.left,
j.bottom-j.top);j=Math.max(f.left,l.left);g=Math.min(f.left+f.width,l.left+l.width);if(j<=g){h=Math.max(f.top,l.top);l=Math.min(f.top+f.height,l.top+l.height);if(h<=l){f.left=j;f.top=h;f.width=g-j;f.height=l-h}}}j=ixpcG(c);h=ixpcG(a);if(j.b!=h.b){g=j.b.body;h=ixpc4a(g,h.b.parentWindow||h.b.defaultView);h=ixpcl(h,ixpcN(g));if(ixpcy&&!ixpcI(j.b))h=ixpcl(h,ixpcZa(j));f.left+=h.x;f.top+=h.y}c=(d&4&&ixpc8a(c)?d^2:d)&-5;d=new ixpck(c&2?f.left+f.width:f.left,c&1?f.top+f.height:f.top);if(i)d=ixpcl(d,i);if(e){d.x+=
(c&2?-1:1)*e.x;d.y+=(c&1?-1:1)*e.y}e=d;e=e.q();c=(b&4&&ixpc8a(a)?b^2:b)&-5;i=ixpc5a(a);if(c!=0){if(c&2)e.x-=i.width+0;if(c&1)e.y-=i.height+0}b=e;c=ixpcz&&(ixpcza||ixpcFa)&&ixpcD("1.9");if(b instanceof ixpck){e=b.x;b=b.y}else{e=b;b=void 0}a.style.left=ixpcO(e,c);a.style.top=ixpcO(b,c);e=i==i?ixpca:!i||!i?ixpcc:i.width==i.width&&i.height==i.height;if(!e){i=i;if(i instanceof ixpcn){e=i.height;i=i.width}else throw Error("missing height argument");a.style.width=ixpcO(i,ixpca);a.style.height=ixpcO(e,ixpca)}};var ixpc4=function(a){ixpc3.call(this,a.a);this.u=a;this.B=ixpcb};ixpcj(ixpc4,ixpc3);ixpc=ixpc4.prototype;ixpc.onBeforeParentOpen=function(){this.u.onBeforeParentOpen()};ixpc.open=function(){this.u.open()};ixpc.onready=function(){this.u.onready();if(this.ops.closeClickDetection)this.B=ixpcmb(document,"click",ixpcda(this.W,this),ixpcc)};ixpc.close=function(){if(this.ops.closeClickDetection){ixpcpb(this.B);this.aa=ixpcb}this.u.close()};
ixpc.W=function(a){var b;b=ixpcP(this.a.containerDiv);b=new ixpcm(b.top,b.left+b.width,b.top+b.height,b.left);a=new ixpck(a.clientX,a.clientY);b&&b.contains(a)||this.a.close()};(function(){var a={};a.open=function(b){var c=iframes.el(b.openParams.container);return b.openInto(c,{style:"position:absolute;left:-1000px;top:-1000px;width:"+(c.clientWidth||300)+"px;visibility:hidden"})};a.onready=function(b){b.iframeEl.style.height=b.height+"px";b.iframeEl.style.position="static";b.iframeEl.style.left=0;b.iframeEl.style.top=0;b.iframeEl.style.visibility="visible"};a.close=function(b){b.el&&b.el.removeChild(b.iframeEl)};iframes.handlers.set("inline",a)})();var ixpc5=function(a){ixpc3.call(this,a)};ixpcj(ixpc5,ixpc3);
ixpc5.prototype.open=function(){var a=this.ops.widgetWidth||this.ops.width||"200";this.ops.targetPos=this.ops.targetPos||"top-start";this.ops.anchorPos=this.ops.anchorPos||"bottom-start";var b=ixpcub(this,this.a);if(this.a.containerDiv){ixpcK(this.a.containerDiv,{visibility:"hidden",position:"absolute"});b.parentNode.appendChild(this.a.containerDiv)}else{var c=document.createElement("div");this.a.containerDiv=c;ixpcK(c,{left:"-1000px",top:"-1000px",position:"absolute",width:a+"px",zIndex:1E4});ixpcK(c,
this.ops.containerCss||{});b.parentNode.appendChild(c);this.a.openInto(c)}};ixpc5.prototype.onready=function(){var a=this.a.containerDiv||this.a.el;iframes.el(this.a.id).style.height=this.a.height+"px";ixpcwb(a,this.ops.targetPos,ixpcub(this,this.a),this.ops.anchorPos,{x:this.ops.ba||0,y:this.ops.da||0});a.style.visibility="visible"};iframes.handlers.set("float",function(a){a=new ixpc5(a);return a=new ixpc4(a)});var ixpc6=ixpcG(void 0),ixpc7=ixpcb;
if(ixpcy){ixpc7=ixpc6.b.createStyleSheet();ixpc7a(ixpc7,".azurebubble,.azurebubble *{border:0 none;border-collapse:collapse;border-spacing:0;margin:0;padding:0;}.azurebubble .bubr1 .bubd1{height:7px;width:7px;background-image:url(https://ssl.gstatic.com/s2/oz/images/iframes/styles/graybubble/topleft.png);background-position:right bottom;background-repeat:no-repeat;}.azurebubble .bubr1 .bubd2{background-image:url(https://ssl.gstatic.com/s2/oz/images/iframes/styles/graybubble/top.png);background-position:left bottom;background-repeat:repeat-x;position:relative;}.goog-bubble-bottomarrow .bubr1 .bubd2 span{width:17px;height:7px;border:0;display:inline-block;background-image:url(https://ssl.gstatic.com/s2/oz/images/iframes/styles/graybubble/arrowup.png);position:absolute;top:0;}.goog-bubble-toparrow .bubr3 .bubd2 span{width:17px;height:7px;border:0;display:inline-block;background-image:url(https://ssl.gstatic.com/s2/oz/images/iframes/styles/graybubble/arrowdown.png);position:absolute;top:0;}.azurebubble .bubr1 .bubd3{height:7px;width:7px;background-image:url(https://ssl.gstatic.com/s2/oz/images/iframes/styles/graybubble/topright.png);background-position:left bottom;background-repeat:no-repeat;}.goog-bubble-rightarrow .bubr2 .bubd1 span{width:7px;height:17px;border:0;display:inline-block;background-image:url(https://ssl.gstatic.com/s2/oz/images/iframes/styles/graybubble/arrowleft.png);position:absolute;left:0;background-position:right center;}.azurebubble .bubr2 .bubd1{background-image:url(https://ssl.gstatic.com/s2/oz/images/iframes/styles/graybubble/left.png);background-repeat:repeat-y;background-position:right center;}.goog-bubble-leftarrow .bubr2 .bubd3 span{width:7px;height:17px;border:0;display:inline-block;background-image:url(https://ssl.gstatic.com/s2/oz/images/iframes/styles/graybubble/arrowright.png);position:absolute;left:0;}.azurebubble .bubr2 .bubd3{background-image:url(https://ssl.gstatic.com/s2/oz/images/iframes/styles/graybubble/right.png);background-repeat:repeat-y;}.azurebubble .bubr3 .bubd1{height:7px;width:7px;background-image:url(https://ssl.gstatic.com/s2/oz/images/iframes/styles/graybubble/botleft.png);background-position:right top;background-repeat:no-repeat;}.azurebubble .bubr3 .bubd2{background-image:url(https://ssl.gstatic.com/s2/oz/images/iframes/styles/graybubble/bot.png);background-repeat:repeat-x;position:relative;}.azurebubble .bubr3 .bubd3{height:7px;width:7px;background-image:url(https://ssl.gstatic.com/s2/oz/images/iframes/styles/graybubble/botright.png);}.azurebubble .relwrapper{position:relative;}.azurebubble .bubble_content{position:relative;border:0;z-index:10000;margin:0;padding:0;}.azurebubble .bubble_content iframe{position:absolute;border:0;z-index:10000;margin:0;padding:0;}.bubr1 .relwrapper,.bubr3 .relwrapper{height:7px;}")}else{var ixpc8=ixpcYa(ixpc6,
"head")[0];if(!ixpc8){var ixpcxb=ixpcYa(ixpc6,"body")[0];ixpc8=ixpc6.D("head");ixpcxb.parentNode.insertBefore(ixpc8,ixpcxb)}ixpc7=ixpc6.D("style");ixpc7a(ixpc7,".azurebubble,.azurebubble *{border:0 none;border-collapse:collapse;border-spacing:0;margin:0;padding:0;}.azurebubble .bubr1 .bubd1{height:7px;width:7px;background-image:url(https://ssl.gstatic.com/s2/oz/images/iframes/styles/graybubble/topleft.png);background-position:right bottom;background-repeat:no-repeat;}.azurebubble .bubr1 .bubd2{background-image:url(https://ssl.gstatic.com/s2/oz/images/iframes/styles/graybubble/top.png);background-position:left bottom;background-repeat:repeat-x;position:relative;}.goog-bubble-bottomarrow .bubr1 .bubd2 span{width:17px;height:7px;border:0;display:inline-block;background-image:url(https://ssl.gstatic.com/s2/oz/images/iframes/styles/graybubble/arrowup.png);position:absolute;top:0;}.goog-bubble-toparrow .bubr3 .bubd2 span{width:17px;height:7px;border:0;display:inline-block;background-image:url(https://ssl.gstatic.com/s2/oz/images/iframes/styles/graybubble/arrowdown.png);position:absolute;top:0;}.azurebubble .bubr1 .bubd3{height:7px;width:7px;background-image:url(https://ssl.gstatic.com/s2/oz/images/iframes/styles/graybubble/topright.png);background-position:left bottom;background-repeat:no-repeat;}.goog-bubble-rightarrow .bubr2 .bubd1 span{width:7px;height:17px;border:0;display:inline-block;background-image:url(https://ssl.gstatic.com/s2/oz/images/iframes/styles/graybubble/arrowleft.png);position:absolute;left:0;background-position:right center;}.azurebubble .bubr2 .bubd1{background-image:url(https://ssl.gstatic.com/s2/oz/images/iframes/styles/graybubble/left.png);background-repeat:repeat-y;background-position:right center;}.goog-bubble-leftarrow .bubr2 .bubd3 span{width:7px;height:17px;border:0;display:inline-block;background-image:url(https://ssl.gstatic.com/s2/oz/images/iframes/styles/graybubble/arrowright.png);position:absolute;left:0;}.azurebubble .bubr2 .bubd3{background-image:url(https://ssl.gstatic.com/s2/oz/images/iframes/styles/graybubble/right.png);background-repeat:repeat-y;}.azurebubble .bubr3 .bubd1{height:7px;width:7px;background-image:url(https://ssl.gstatic.com/s2/oz/images/iframes/styles/graybubble/botleft.png);background-position:right top;background-repeat:no-repeat;}.azurebubble .bubr3 .bubd2{background-image:url(https://ssl.gstatic.com/s2/oz/images/iframes/styles/graybubble/bot.png);background-repeat:repeat-x;position:relative;}.azurebubble .bubr3 .bubd3{height:7px;width:7px;background-image:url(https://ssl.gstatic.com/s2/oz/images/iframes/styles/graybubble/botright.png);}.azurebubble .relwrapper{position:relative;}.azurebubble .bubble_content{position:relative;border:0;z-index:10000;margin:0;padding:0;}.azurebubble .bubble_content iframe{position:absolute;border:0;z-index:10000;margin:0;padding:0;}.bubr1 .relwrapper,.bubr3 .relwrapper{height:7px;}");
ixpc6.appendChild(ixpc8,ixpc7)}var ixpc9=function(a){ixpc3.call(this,a);if(this.ops.position){if(!ixpcs(ixpcyb,this.ops.position)){gadgets.warn("Invalid position parameter: "+this.ops.position+". Ignoring position and offset params.");ixpczb(this)}}else ixpczb(this)};ixpcj(ixpc9,ixpc3);var ixpczb=function(a){a.ops.position="bottom";a.ops.offset=ixpcb},ixpcyb={O:"bottom",Q:"left",R:"right",S:"top"},ixpc$={};ixpc$.top="bottom";ixpc$.bottom="top";ixpc$.left="right";ixpc$.right="left";
var ixpcAb={P:"center",Q:"left",R:"right"},ixpcBb={O:"bottom",P:"center",S:"top"},ixpcCb=['<table class="azurebubble" cellspacing="0" cellpadding="0" style="width:',"",';" frame="void" rules="none" border="0">',"<thead></thead><tbody>",'<tr class="bubr1"><td class="bubd1"></td><td class="bubd2" >','<div class="relwrapper">','<span class="goog-bubble-pointer-bottom goog-bubble-p"/></div>','</td><td class="bubd3"></td></tr>','<tr class="bubr2"><td class="bubd1">','<div class="relwrapper">','<span class="goog-bubble-pointer-right goog-bubble-p"/></div></td>',
'<td><div class="bubble_content"</div></td>','<td class="bubd3"><div class="relwrapper">','<span class="goog-bubble-pointer-left goog-bubble-p"/></div>','</td></tr><tr class="bubr3"><td class="bubd1"></td>','<td class="bubd2"><div class="relwrapper">','<span class="goog-bubble-pointer-top goog-bubble-p"/></div>','</td><td class="bubd3"></td></tr></tbody></table>'],ixpcDb=function(a,b){return ixpcXa(a,function(c){c=ixpcPa(c);return ixpcr(c,b)>=0})};
ixpc9.prototype.Z=function(a){var b=parseInt(this.k.style.width,10),c=parseInt(this.k.style.height,10),d=+a.width||b,e=+a.height||c,f=d+14,g=e+14,h=ixpcsb(window),i=window.frameElement;if(this.c=="left"){b=d-b;b=parseInt(this.a.containerDiv.style.left,10)-b;if(h)i.style.left=b+"px";else this.a.containerDiv.style.left=b+"px"}if(this.c=="top"){b=e-c;b=parseInt(this.a.containerDiv.style.top,10)-b;if(h)i.style.top=b+"px";else this.a.containerDiv.style.top=b+"px"}c=ixpcH(this.a.id);if(a.contentWidth)c.style.width=
a.contentWidth+"px";if(a.contentHeight)c.style.height=a.contentHeight+"px";this.k.style.width=d+"px";this.k.style.height=e+"px";this.p.style.width=f+"px";this.p.style.height=g+"px";this.a.containerDiv.style.width=f+"px";this.a.containerDiv.style.height=g+"px";if(h){i.style.width=f+"px";i.style.height=g+"px"}return ixpca};
ixpc9.prototype.open=function(){this.a.addCallback("resize",ixpcda(this.Z,this));var a=document.createElement("div"),b=(+this.ops.width||100)+14,c={visibility:"hidden",position:"absolute",width:b+"px",zIndex:1E4,left:"-1000px",top:"-1000px"};if(this.ops.height)c.height=+this.ops.height+14+"px";ixpcK(a,c);ixpcCb[1]=b?b+"px":"100%";b=ixpcCb.join("");a.innerHTML=b;document.body.appendChild(a);this.p=a.firstChild;this.k=ixpcDb(this.p,"bubble_content");this.a.containerDiv?this.k.appendChild(this.a.containerDiv):
this.a.openInto(this.k);this.a.containerDiv=a};
ixpc9.prototype.onready=function(){var a=ixpc2(window),b=ixpcH(this.a.id);b.style.height=(this.a.contentHeight||+this.ops.contentHeight||+this.a.height)+"px";var c=+this.a.contentWidth||+this.ops.contentWidth;b.style.width=c?c+"px":"100%";c=+this.a.width||+this.ops.width;b=this.a.height||this.ops.height;ixpcK(this.k,{width:c+"px",height:b+"px"});c=c+14;var d=b+14;this.p.style.width=c+"px";this.a.containerDiv.style.width=c+"px";b=this.a.containerDiv;if(ixpcsb(window)){b.style.left=0;b.style.top=0;
var e=window.frameElement;e.style.height=d+"px";e.style.width=c+"px";e.style.zIndex=b.style.zIndex;b=e}c=ixpcub(this,this.a);var f=ixpc3a(c);d=ixpcP(b);e=ixpcP(c);var g=ixpcTa(a||window);this.c=ixpcEb(f,d,e,g,this.ops.position);if(this.c!=this.ops.position)this.ops.offset=ixpcb;this.d=this.ops.anchorPosition;this.e=this.ops.targetPosition;if(this.c=="top"||this.c=="bottom"){if(!ixpcs(ixpcAb,this.d)||!ixpcs(ixpcAb,this.e))this.e=this.d="left"}else if(!ixpcs(ixpcBb,this.d)||!ixpcs(ixpcBb,this.e))this.e=
this.d="center";if(this.h=this.ops.arrowPosition)if(this.c=="top"||this.c=="bottom"){if(!ixpcs(ixpcAb,this.h))this.h="center"}else{if(!ixpcs(ixpcBb,this.h))this.h="center"}else this.h="center";a=this.c;var h=this.e,i={};i.anchor=a+"-"+this.d;i.target=ixpc$[a]+"-"+h;this.C=i;ixpcQa(this.p,"goog-bubble-"+this.c+"arrow");this.T=ixpcDb(this.p,"goog-bubble-pointer-"+this.c);a=this.ops.offset||{x:0,y:0};if(this.c=="top"||this.c=="bottom"){h=17;i=7}else{h=7;i=17}h={x:-(h/2)-7,y:-i/2};i={x:0,y:0};if(this.c==
"top"||this.c=="bottom"){f=f.x;var j=this.d=="right"?e.width:this.d=="center"?e.width/2:0,n=this.e=="right"?d.width:this.e=="center"?d.width/2:0;f+=j-n;if(f+d.width>g.width){g=f+d.width-g.width;i.x-=g;f-=g}if(f<0)i.x-=f}else{f=f.y;j=this.d=="bottom"?e.height:this.d=="center"?e.height/2:0;n=this.e=="bottom"?d.height:this.e=="center"?d.height/2:0;f+=j-n;if(f+d.height>g.height){g=f+d.height-g.height;i.y-=g;f+=g}if(f<0)i.y-=f}a.x+=i.x;a.y+=i.y;h.x-=i.x;h.y-=i.y;if(this.d=="right")a.x*=-1;else if(this.d==
"bottom")a.y*=-1;g={x:0,y:0};if(this.c=="top"||this.c=="bottom"){switch(this.h){case "left":g.x+=8.5;break;case "right":g.x+=e.width-8.5;break;default:g.x+=e.width/2}if(this.e=="center")g.x+=d.width/2;else if(this.e=="right")g.x+=d.width;if(this.d=="center")g.x-=e.width/2;else if(this.d=="right")g.x-=e.width}else{g.y-=d.height/2;switch(this.h){case "top":g.y+=8.5;break;case "bottom":g.y+=e.height-8.5;break;default:g.y+=e.height/2}if(this.e=="center")g.y+=d.height/2;else if(this.e=="bottom")g.y+=d.height;
if(this.d=="center")g.y-=e.height/2;else if(this.d=="bottom")g.y-=e.height}e=this.c;e=e=="right"||e=="left"?0:Math.min(Math.max(4,h.x+g.x),d.width-17-22);f=this.c;d=d.height;d=f=="top"||f=="bottom"?0:Math.min(Math.max(-(d/2-11),h.y+g.y),d/2-11-17);d={U:a,z:{x:e,y:d}};ixpcK(this.T,{left:d.z.x+"px",top:d.z.y+"px"});ixpcwb(b,this.C.target,c,this.C.anchor,d.U);this.a.containerDiv.style.visibility="visible"};
var ixpcEb=function(a,b,c,d,e){var f=[];if(a.y+c.height+b.height<=d.height){f.push("bottom");if(e=="bottom")return e}if(a.y-b.height>=0){f.push("top");if(e=="top")return e}if(a.x-b.width>=0){f.push("left");if(e=="left")return e}if(a.x+b.width+c.width<=d.width){f.push("right");if(e=="right")return e}a=ixpc$[e];for(b=0;c=f[b++];)if(c==a)return a;return f[0]?f[0]:e};iframes.handlers.set("bubble",function(a){a=new ixpc9(a);return a=new ixpc4(a)});})();
;
gadgets.config.init({"iframes":{"annotator.options":{"url":"https://oz-alpha.corp.google.com/oz/_/stars/options","params":{"url":"#"}},"annotator":{"url":"https://oz-alpha.corp.google.com/oz/_/stars/get","params":{"url":"#"}}},"google.api":{"methods":{"chili.people.list":true,"chili.entities.starred.insert":true,"chili.entities.list":true,"chili.entities.starred.add":true,"chili.entities.starred.delete":true,"chili.people.get":true,"chili.entities.get":true,"chili.activities.list":true,"chili.entities.starred.list":true,"chili.activities.get":true,"chili.activities.search":true},"jsurl":"https://static.corp.google.com/gb/js/gc.js","rpc":"/rpc","proxy":"http://www-googleapis-test.sandbox.google.com/static/proxy.html"},"osapi.services":{}});
;window.gadgets=window.gadgets||gadgets;
}catch(e){window.gbar.logger.ml(e);}})();
(function(){var a=a||{};a.a=false;var b=window.gbar&&window.gbar.qd&&window.gbar.qd.gc;if(b){window.gbar.qd.gc=[];for(var c=0,d;d=b[c];++c)try{d()}catch(e){window.gbar.logger.ml(e)}};})();
