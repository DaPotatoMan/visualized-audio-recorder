import{d as b,o as d,c as g,a as u,r as A,m as B,n as h,F as M,b as O,e as C,f as S,l as k,g as P,h as T,i as L,j as W,s as R,u as y,k as v,t as V,w as z,p as q}from"./vendor.d1c8fa85.js";const D=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))o(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&o(c)}).observe(document,{childList:!0,subtree:!0});function n(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerpolicy&&(r.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?r.credentials="include":t.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(t){if(t.ep)return;t.ep=!0;const r=n(t);fetch(t.href,r)}};D();const j="_layout_deqsm_1";var F={layout:j},w=(s,e)=>{const n=s.__vccOpts||s;for(const[o,t]of e)n[o]=t;return n};const U=b({inheritAttrs:!1}),N=O(" Made with \u2764 By "),H=u("a",{href:"https://github.com/DaPotatoMan"},"@DaPotatoMan",-1),I=[N,H];function Z(s,e,n,o,t,r){return d(),g(M,null,[u("main",B({class:s.$style.layout},s.$attrs),[A(s.$slots,"default")],16),u("footer",{class:h(s.$style.footer)},I,2)],64)}const Y={$style:F};var G=w(U,[["render",Z],["__cssModules",Y]]);const K={preserveAspectRatio:"xMidYMid meet",viewBox:"0 0 32 32",width:"1.2em",height:"1.2em"},J=u("path",{fill:"currentColor",d:"M23 14v3a7 7 0 0 1-14 0v-3H7v3a9 9 0 0 0 8 8.94V28h-4v2h10v-2h-4v-2.06A9 9 0 0 0 25 17v-3Z"},null,-1),Q=u("path",{fill:"currentColor",d:"M16 22a5 5 0 0 0 5-5V7a5 5 0 0 0-10 0v10a5 5 0 0 0 5 5ZM13 7a3 3 0 0 1 6 0v10a3 3 0 0 1-6 0Z"},null,-1),X=[J,Q];function x(s,e){return d(),g("svg",K,X)}var ee={name:"carbon-microphone",render:x};const te={preserveAspectRatio:"xMidYMid meet",viewBox:"0 0 32 32",width:"1.2em",height:"1.2em"},oe=u("path",{fill:"currentColor",d:"M24 8v16H8V8h16m0-2H8a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2Z"},null,-1),ne=[oe];function se(s,e){return d(),g("svg",te,ne)}var re={name:"carbon-stop",render:se};async function ae(s,e,n){var l;const o=new AudioContext,t=o.createAnalyser();t.fftSize=512,t.smoothingTimeConstant=.75,await((l=s.setup)==null?void 0:l.call(s,t));const r=e.clone();o.createMediaStreamSource(r).connect(t);const c=new Uint8Array(t.frequencyBinCount);let a=!0;function i(){!a||(requestAnimationFrame(i),t.getByteFrequencyData(c),s.render(c,n))}C(e,()=>S(r),!0),C(e,()=>a=!1),i()}async function ie(s,e){var a;const n=document.createElement("canvas"),o=n.getContext("2d");if(!(n!=null&&n.captureStream))throw new Error("This browser does not support captureStream");const t=16/9,r=e.quality||screen.height;n.width=r*t,n.height=r,await ae(e.effect,s,o);const c=n.captureStream(e.fps||60);return c.getTracks().forEach(i=>i.contentHint="detail"),(a=e.wrapper)==null||a.appendChild(n),c}function E(s){return e=>{const n=Object.assign({},s.params,e);return{setup:s.setup.bind(n),render:s.render.bind(n)}}}var ce=E({params:{lineCap:"round",bgColor:"#09070D",barColor:"#fff"},async setup(s){s.fftSize=512,s.minDecibels=-90,s.maxDecibels=20,s.smoothingTimeConstant=.85},render(s,e){const n=k(s,5),{width:o,height:t}=e.canvas,{lineCap:r,bgColor:c,barColor:a}=this,i=Math.round(o/130),l=Math.round(o/(i*2));Object.assign(e,{lineWidth:i,lineCap:r}),e.strokeStyle=a,e.fillStyle=c,e.clearRect(0,0,o,t),e.fillRect(0,0,o,t),n.forEach((p,f)=>{const m=Math.min(Math.max(p,0),t/3),_=l*(f+1);_>o-l||(e.beginPath(),e.moveTo(_,t/2+m),e.lineTo(_,t/2-m),e.stroke())})}});const le="captureStream"in document.createElement("canvas"),ue={effect:ce(),streamConstraints:!0};function de(s){let e,n;function o(){try{n=[],e&&(e.stop(),S(e.stream))}catch{}}async function t(a){o();const i=Object.assign({},ue,s),l=a||await P({audio:i.streamConstraints||!0}),p=await ie(l,i),f=T(p,l);e=new MediaRecorder(f,i.recorderOptions),e.addEventListener("stop",()=>L([f,l,p],!0)),e.addEventListener("dataavailable",m=>m.data.size>0&&n.push(m.data))}async function r(){(!e||!(e!=null&&e.stream))&&await t(),e.start()}function c(){if(!e||(e==null?void 0:e.state)==="inactive")throw new Error("Recorder is not active.");return new Promise(a=>{e.addEventListener("stop",()=>{const i=new Blob(n,{type:e.mimeType});o(),a(i)}),e.stop()})}return{init:t,start:r,stop:c,destroy:o,isSupported:le}}let $;var pe=E({params:{image:"",imageBorderColor:"rgb(0 0 0 / 8%)",imageBorderSize:10,bgColor:"#fff",barColor:"rgb(0 0 0 / 40%)",barCap:"round",barWidth:2},async setup(s){s.smoothingTimeConstant=.8,typeof this.image=="string"&&($=await new Promise((e,n)=>{const o=new Image;o.src=String(this.image),o.crossOrigin="anonymous",o.onload=()=>e(o),o.onerror=n}))},render(s,e){if(!$)return;const{width:n,height:o}=e.canvas;e.fillStyle=this.bgColor,e.strokeStyle=this.barColor,e.lineWidth=this.barWidth,e.lineCap=this.barCap,e.clearRect(0,0,n,o),e.fillRect(0,0,n,o);const t=Math.round(n/130),r=Math.round(n/(t*2));k(s,5).forEach((p,f)=>{const m=Math.min(Math.max(p,0),o/3),_=r*(f+1);_>n-r||(e.beginPath(),e.moveTo(_,o/2+m),e.lineTo(_,o/2-m),e.stroke())});const a=270,i=n/2,l=o/2;e.save(),e.beginPath(),e.arc(i,l,a/2,0,Math.PI*2,!1),e.lineWidth=this.imageBorderSize,e.strokeStyle=this.imageBorderColor,e.stroke(),e.clip(),e.drawImage($,i-a/2,l-a/2,a,a),e.restore()}});const me="_canvasWrapper_1mkv8_1",fe="_button_1mkv8_19";var _e={canvasWrapper:me,button:fe};const he=u("br",null,null,-1),ye=b({emits:["finish"],setup(s,{emit:e}){const n=W(),o=R(!1),t=de({fps:60,quality:720,get wrapper(){return n.value},effect:pe({image:"/profile.jpg",barWidth:3,barColor:"rgb(0 0 0 / 40%)"}),streamConstraints:{autoGainControl:!0,echoCancellation:!0,noiseSuppression:!0,suppressLocalAudioPlayback:!0},recorderOptions:{mimeType:"video/webm;codecs=vp9,opus"}});async function r(){await t.init(),t.start(),o.value=!0}async function c(){const a=await t.stop(),i=URL.createObjectURL(a);o.value=!1,e("finish",i)}return(a,i)=>{const l=re,p=ee;return d(),g(M,null,[u("div",{ref_key:"canvasRef",ref:n,class:h(a.$style.canvasWrapper)},null,2),u("button",{class:h(a.$style.button),onClick:i[0]||(i[0]=f=>y(o)?c():r())},[y(o)?(d(),v(l,{key:0})):(d(),v(p,{key:1}))],2),he,u("span",null,"Click button to "+V(y(o)?"stop":"start")+" recording",1)],64)}}}),ve={$style:_e};var ge=w(ye,[["__cssModules",ve]]);const be="_wrapper_69i0l_1",we="_video_69i0l_8";var $e={wrapper:be,"bg-dot-move":"_bg-dot-move_69i0l_1",video:we};const Ce=["src"],Me=b({props:{blobUrl:null},setup(s){return(e,n)=>(d(),g("div",{class:h(e.$style.wrapper)},[u("video",{class:h(e.$style.video),src:s.blobUrl,controls:"",autoplay:""},null,10,Ce)],2))}}),Se={$style:$e};var ke=w(Me,[["__cssModules",Se]]);const Re="_layout_1ycu3_1";var Ee={layout:Re};const Ae=b({setup(s){const e=R("");return(n,o)=>{const t=ke,r=ge,c=G;return d(),v(c,{class:h(n.$style.layout)},{default:z(()=>[y(e)?(d(),v(t,{key:0,"blob-url":y(e)},null,8,["blob-url"])):(d(),v(r,{key:1,onFinish:o[0]||(o[0]=a=>e.value=a)}))]),_:1},8,["class"])}}}),Be={$style:Ee};var Oe=w(Ae,[["__cssModules",Be]]);q(Oe).mount("#app");
