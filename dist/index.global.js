(()=>{var E=Object.create;var h=Object.defineProperty;var A=Object.getOwnPropertyDescriptor;var R=Object.getOwnPropertyNames;var z=Object.getPrototypeOf,L=Object.prototype.hasOwnProperty;var D=t=>h(t,"__esModule",{value:!0});var O=(t,e)=>()=>(e||t((e={exports:{}}).exports,e),e.exports);var F=(t,e,o,n)=>{if(e&&typeof e=="object"||typeof e=="function")for(let r of R(e))!L.call(t,r)&&(o||r!=="default")&&h(t,r,{get:()=>e[r],enumerable:!(n=A(e,r))||n.enumerable});return t},q=(t,e)=>F(D(h(t!=null?E(z(t)):{},"default",!e&&t&&t.__esModule?{get:()=>t.default,enumerable:!0}:{value:t,enumerable:!0})),t);var C=O((j,w)=>{function H(t,e,o=r=>r,n){let r=o,a=[];for(let i=0;i<t.length;i+=1){let s=i-e,c=s>=0?s:0,m=i+e+1,l=0,p=0;for(let u=c;u<m&&u<t.length;u+=1)p+=r(t[u]),l+=1;a[i]=n?n(t[i],p/l):p/l}return a}w.exports=H});function f(...t){if(!(t==null?void 0:t.length))throw new Error("No stream was passed");t.forEach(e=>e.getTracks().forEach(o=>{o.stop(),o.dispatchEvent(new Event("ended")),e.removeTrack(o),e.dispatchEvent(new Event("removetrack"))}))}function S(t){return navigator.mediaDevices.getUserMedia(t)}function v(t,e){let[o]=t.getAudioTracks(),n=new MediaStream([o]),r=new AudioContext,a=r.createMediaStreamSource(n),i=r.createMediaStreamDestination(),s=r.createGain();s.gain.value=e,[a,s,i].reduce((m,l)=>m&&m.connect(l));let[c]=i.stream.getAudioTracks();return t.removeTrack(o),t.addTrack(c),()=>{f(t),f(n),f(i.stream),i.disconnect(),a.disconnect(),r.state!=="closed"&&r.close()}}function y(t,e){return t.getAudioTracks().forEach(o=>e.addTrack(o)),e}function M(t,e){t.getTracks().forEach(o=>o.contentHint=e)}var T=q(C()),d={lineCap:"round",gap:5,lineWidth:10,maxLines:40,bufferSize:512};function P(t,e,o){let n=(0,T.default)(o,4),{gap:r,lineCap:a,lineWidth:i}=d,{width:s,height:c}=t;Object.assign(e,{lineWidth:i,lineCap:a}),e.clearRect(0,0,s,c),e.fillStyle="#09070D",e.fillRect(0,0,s,c),e.strokeStyle="#fff",n.forEach((m,l)=>{let p=Math.min(Math.max(m,0),c/3),u=r*(l+1);u>s-r||(e.beginPath(),e.moveTo(u,c/2+p),e.lineTo(u,c/2-p),e.stroke())})}async function x(t,e,o){try{let c=function(){!s||(requestAnimationFrame(c),r.getByteFrequencyData(i),P(t,e,i))};d.lineWidth=Math.round(t.width/130),d.gap=Math.round(t.width/(d.lineWidth*2)),d.maxLines=Math.round(t.width/(d.gap-d.lineWidth)),console.log(d);let n=new AudioContext,r=n.createAnalyser();r.fftSize=d.bufferSize,r.minDecibels=-90,r.maxDecibels=20,r.smoothingTimeConstant=.85,n.createMediaStreamSource(o).connect(r);let i=new Uint8Array(r.frequencyBinCount).slice(0,d.maxLines),s=!0;o.addEventListener("removetrack",()=>{console.info("Stopping canvas drawing"),e.clearRect(0,0,t.width,t.height),s=!1}),requestAnimationFrame(c)}catch(n){console.error(n)}}function k(t,e){let o=document.createElement("canvas"),n=16/9,r=720;o.width=r*n,o.height=r;let a=o.getContext("2d");x(o,a,t);let i=o.captureStream(e);return M(i,"detail"),i}var b={constraints:{audio:{autoGainControl:!0,noiseSuppression:!0,echoCancellation:!0,suppressLocalAudioPlayback:!0}},recorder:{mimeType:"video/webm;codecs=vp9,opus"},visualizerFps:60},g=class{options=b;recorder;constructor(e){this.options=Object.assign(b,e)}async init(){var a;this.destroy();let e=await S((a=this.options)==null?void 0:a.constraints),o=k(e,this.options.visualizerFps),n=y(e,o),r=v(n,7);this.recorder=new MediaRecorder(n,this.options.recorder),this.recorder.addEventListener("stop",()=>{r(),f(n,e,o)})}start(){var e;(e=this.recorder)==null||e.start()}stop(){var e;if(((e=this.recorder)==null?void 0:e.state)!=="inactive")return new Promise(o=>{var n,r;(n=this.recorder)==null||n.addEventListener("dataavailable",a=>o(a.data)),(r=this.recorder)==null||r.stop()})}destroy(){this.recorder&&(this.recorder.stop(),this.recorder=void 0)}};})();
