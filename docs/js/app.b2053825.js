(function(t){function e(e){for(var r,i,c=e[0],u=e[1],s=e[2],p=0,f=[];p<c.length;p++)i=c[p],a[i]&&f.push(a[i][0]),a[i]=0;for(r in u)Object.prototype.hasOwnProperty.call(u,r)&&(t[r]=u[r]);l&&l(e);while(f.length)f.shift()();return o.push.apply(o,s||[]),n()}function n(){for(var t,e=0;e<o.length;e++){for(var n=o[e],r=!0,c=1;c<n.length;c++){var u=n[c];0!==a[u]&&(r=!1)}r&&(o.splice(e--,1),t=i(i.s=n[0]))}return t}var r={},a={app:0},o=[];function i(e){if(r[e])return r[e].exports;var n=r[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=t,i.c=r,i.d=function(t,e,n){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},i.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)i.d(n,r,function(e){return t[e]}.bind(null,r));return n},i.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="/assembly/";var c=window["webpackJsonp"]=window["webpackJsonp"]||[],u=c.push.bind(c);c.push=e,c=c.slice();for(var s=0;s<c.length;s++)e(c[s]);var l=u;o.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("cd49")},"0acc":function(t,e,n){"use strict";var r=n("2bb9"),a=n.n(r);a.a},"2bb9":function(t,e,n){},bb93:function(t,e,n){},cd49:function(t,e,n){"use strict";n.r(e);n("cadf"),n("551c"),n("f751"),n("097d");var r=n("2b0e"),a=n("bb71");n("da64");r["default"].use(a["a"],{iconfont:"md"});var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-app",[n("v-content",[n("router-view")],1)],1)},i=[],c=n("d225"),u=n("308d"),s=n("6bb5"),l=n("4e2b"),p=n("9ab4"),f=n("60a3"),d=function(t){function e(){return Object(c["a"])(this,e),Object(u["a"])(this,Object(s["a"])(e).apply(this,arguments))}return Object(l["a"])(e,t),e}(f["c"]);d=p["a"]([f["a"]],d);var v=d,h=v,b=(n("cf25"),n("2877")),m=n("6544"),y=n.n(m),w=n("7496"),g=n("549c"),j=Object(b["a"])(h,o,i,!1,null,null,null),O=j.exports;y()(j,{VApp:w["a"],VContent:g["a"]});var x=n("8c4f"),k=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticStyle:{display:"flex","flex-direction":"column"},attrs:{id:"app"}},[n("div",{staticClass:"banner"},[t._v("JACOBS TEXT MAGIC")]),n("div",{staticClass:"row grow"},[n("editor",{staticClass:"input grow col",attrs:{outline:"",autofocus:"",copy:""},on:{copy:t.copyUrl},model:{value:t.input,callback:function(e){t.input=e},expression:"input"}}),n("editor",{staticClass:"output grow col",attrs:{outline:"",value:t.output,readonly:""}})],1),n("v-snackbar",{model:{value:t.show,callback:function(e){t.show=e},expression:"show"}},[t._v("Copied URL to clipboard.")])],1)},E=[],_=(n("386d"),n("b0b4")),C=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"editor"},[n("v-textarea",t._b({ref:"input",staticClass:"textarea",attrs:{value:t.value,"no-resize":"","append-icon":t.copy?"file_copy":void 0},on:{input:t.input,keydown:t.keydown,"click:append":t.appendCb}},"v-textarea",t.$attrs,!1))],1)},$=[],S=function(t){function e(){return Object(c["a"])(this,e),Object(u["a"])(this,Object(s["a"])(e).apply(this,arguments))}return Object(l["a"])(e,t),Object(_["a"])(e,[{key:"input",value:function(t){this.$emit("input",t)}},{key:"keydown",value:function(t){9===t.which&&(t.preventDefault(),this.$emit("input",this.value+"    "))}},{key:"appendCb",value:function(t){this.copy&&this.$emit("copy",t)}}]),e}(f["c"]);p["a"]([Object(f["b"])({type:String,required:!0})],S.prototype,"value",void 0),p["a"]([Object(f["b"])(Boolean)],S.prototype,"copy",void 0),S=p["a"]([f["a"]],S);var A=S,M=A,U=(n("ec6e"),n("a844")),P=Object(b["a"])(M,C,$,!1,null,"0e9c5a9d",null),T=P.exports;y()(P,{VTextarea:U["a"]});var z=n("5d73"),V=n.n(z),q=n("a4bb"),J=n.n(q),L=n("e814"),R=n.n(L),B=n("768b"),D=(n("28a5"),n("4917"),n("6b54"),n("3b2b"),n("ac6a"),n("75fc")),I=(n("6c7b"),Array(Math.pow(2,4)).fill(0)),X=Array(Math.pow(2,8)).fill(0),Z=[],G=0,H=/^([0-9a-zA-Z]+)(.*?)$/,K=function(t){return Object(D["a"])(Array(t).keys())},F="([a-zA-Z0-9_]+)",N="^#define +".concat(F," +").concat(F,"$"),Q=function(t){var e=[];return K(t.registers||0).forEach(function(){e.push("R([0-9]+)")}),t.immediate&&e.push("([0-9]+)"),new RegExp("^".concat(e.join(" +"),"$"))},W=function(t,e){I[t]=X[e]},Y=function(t,e){X[e]=I[t]},tt=function(t,e){X[I[t]]=I[e]},et=function(t,e){X[t]=e},nt=function(t,e,n){I[t]=I[e]+I[n]},rt=function(t,e,n){I[t]=I[e]-I[n]},at=function(t,e){0!==I[t]&&e},ot=function(){return!0},it=function(t,e,n){I[t]=I[e]*I[n]},ct=function(t,e){I[t]=X[I[e]]},ut=function(t){Z[G]=t},st={mov1:[{registers:1,immediate:!0},W],mov2:[{registers:1,immediate:!0},Y],mov3:[{registers:2},tt],mov4:[{registers:1,immediate:!0},et],add:[{registers:3},nt],subt:[{registers:3},rt],jz:[{registers:1,immediate:!0},at],halt:[{},ot],mul:[{registers:3},it],load:[{registers:2},ct],readm:[{immediate:!0},ut]},lt={mov1:0,mov2:1,mov3:2,mov4:3,add:4,subt:5,jz:6,halt:15,mul:8,load:10,readm:7},pt=function(t,e){if(t>=Math.pow(16,e))throw Error("Unable to convert ".concat(t," to HEX as it is too big"));var n=t.toString(16);while(n.length<e)n="0"+n;return n},ft={},dt=function(t){t=t.trim();var e=t.match(N);if(e)return ft[e[1]]=e[2],null;if(t=t.split("#")[0].trim(),!t)return null;for(var n=J()(ft),r=0;r<n.length;r++){var a=n[r];t=t.split(a).join(ft[a])}var o=t.match(H);if(!o)throw Error("Unable to parse instruction name for line: ".concat(t));var i=o[1];if(t=o[2].trim(),!(i in st))throw Error("Unknown instruction: ".concat(i));var c=i,u=lt[c];if(u>15)throw Error("Invalid instruction number: ".concat(u));var s=lt[c]<<12,l=st[c],p=Object(B["a"])(l,2),f=p[0],d=p[1],v=f.registers,h=void 0===v?0:v,b=f.immediate,m=void 0!==b&&b,y=Q(f);if(o=t.match(y),null===o)throw Error('Unable to parse arguments for "'.concat(i,'": "').concat(t,'"'));var w=o.slice(1).map(function(t){return R()(t,10)}),g=!0,j=!1,O=void 0;try{for(var x,k=V()(K(h));!(g=(x=k.next()).done);g=!0){var E=x.value;s+=w[E]<<4*(2-E)}}catch(C){j=!0,O=C}finally{try{g||null==k.return||k.return()}finally{if(j)throw O}}m&&(s+=w[w.length-1]);var _=pt(s,4).toUpperCase();return{evaluate:d,args:w,hex:_}},vt=function(t){return t.split("\n").map(dt).filter(function(t){return t})},ht=function(t){function e(){var t;return Object(c["a"])(this,e),t=Object(u["a"])(this,Object(s["a"])(e).apply(this,arguments)),t.input="",t.output="",t.show=!1,t}return Object(l["a"])(e,t),Object(_["a"])(e,[{key:"mounted",value:function(){window.addEventListener("keydown",this.parse);var t=this.$route.query.text;t&&"string"===typeof t&&(this.input=t)}},{key:"destroyed",value:function(){window.removeEventListener("keydown",this.parse)}},{key:"parse",value:function(t){if(83===t.which&&t.ctrlKey){t.preventDefault();try{this.output=vt(this.input).map(function(t){var e=t.hex;return e}).join("\n")}catch(e){this.output=e.message}}}},{key:"copyUrl",value:function(){var t=document.createElement("a"),e=this.input?{text:this.input}:{};t.href=this.$router.resolve({path:this.$route.path,query:e}).href;var n=t.protocol+"//"+t.host+t.pathname+t.search+t.hash,r=document.createElement("textarea");r.value=n,document.body.appendChild(r),r.select(),document.execCommand("copy"),document.body.removeChild(r),this.show=!0}}]),e}(f["c"]);ht=p["a"]([Object(f["a"])({components:{Editor:T}})],ht);var bt=ht,mt=bt,yt=(n("0acc"),n("2db4")),wt=Object(b["a"])(mt,k,E,!1,null,"70ade07b",null),gt=wt.exports;y()(wt,{VSnackbar:yt["a"]});var jt=[{path:"/",component:gt}],Ot=new x["a"]({routes:jt});r["default"].config.productionTip=!1,r["default"].use(x["a"]),new r["default"]({router:Ot,render:function(t){return t(O)}}).$mount("#app")},cf25:function(t,e,n){"use strict";var r=n("bb93"),a=n.n(r);a.a},e461:function(t,e,n){},ec6e:function(t,e,n){"use strict";var r=n("e461"),a=n.n(r);a.a}});
//# sourceMappingURL=app.b2053825.js.map