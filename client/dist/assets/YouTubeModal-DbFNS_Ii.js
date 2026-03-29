import{c as q,r as ye,j as I,X as Me,d as we}from"./index-ChKjPDc1.js";/**
 * @license lucide-react v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ce=q("Check",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]);/**
 * @license lucide-react v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ie=q("Copy",[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]]);var z={};(function F(v,M,S,k){var R=!!(v.Worker&&v.Blob&&v.Promise&&v.OffscreenCanvas&&v.OffscreenCanvasRenderingContext2D&&v.HTMLCanvasElement&&v.HTMLCanvasElement.prototype.transferControlToOffscreen&&v.URL&&v.URL.createObjectURL),w=typeof Path2D=="function"&&typeof DOMMatrix=="function",j=function(){if(!v.OffscreenCanvas)return!1;try{var r=new OffscreenCanvas(1,1),e=r.getContext("2d");e.fillRect(0,0,1,1);var a=r.transferToImageBitmap();e.createPattern(a,"no-repeat")}catch{return!1}return!0}();function P(){}function E(r){var e=M.exports.Promise,a=e!==void 0?e:v.Promise;return typeof a=="function"?new a(r):(r(P,P),null)}var A=function(r,e){return{transform:function(a){if(r)return a;if(e.has(a))return e.get(a);var n=new OffscreenCanvas(a.width,a.height),o=n.getContext("2d");return o.drawImage(a,0,0),e.set(a,n),n},clear:function(){e.clear()}}}(j,new Map),B=function(){var r=Math.floor(16.666666666666668),e,a,n={},o=0;return typeof requestAnimationFrame=="function"&&typeof cancelAnimationFrame=="function"?(e=function(i){var s=Math.random();return n[s]=requestAnimationFrame(function t(l){o===l||o+r-1<l?(o=l,delete n[s],i()):n[s]=requestAnimationFrame(t)}),s},a=function(i){n[i]&&cancelAnimationFrame(n[i])}):(e=function(i){return setTimeout(i,r)},a=function(i){return clearTimeout(i)}),{frame:e,cancel:a}}(),H=function(){var r,e,a={};function n(o){function i(s,t){o.postMessage({options:s||{},callback:t})}o.init=function(t){var l=t.transferControlToOffscreen();o.postMessage({canvas:l},[l])},o.fire=function(t,l,h){if(e)return i(t,null),e;var u=Math.random().toString(36).slice(2);return e=E(function(d){function f(p){p.data.callback===u&&(delete a[u],o.removeEventListener("message",f),e=null,A.clear(),h(),d())}o.addEventListener("message",f),i(t,u),a[u]=f.bind(null,{data:{callback:u}})}),e},o.reset=function(){o.postMessage({reset:!0});for(var t in a)a[t](),delete a[t]}}return function(){if(r)return r;if(!S&&R){var o=["var CONFETTI, SIZE = {}, module = {};","("+F.toString()+")(this, module, true, SIZE);","onmessage = function(msg) {","  if (msg.data.options) {","    CONFETTI(msg.data.options).then(function () {","      if (msg.data.callback) {","        postMessage({ callback: msg.data.callback });","      }","    });","  } else if (msg.data.reset) {","    CONFETTI && CONFETTI.reset();","  } else if (msg.data.resize) {","    SIZE.width = msg.data.resize.width;","    SIZE.height = msg.data.resize.height;","  } else if (msg.data.canvas) {","    SIZE.width = msg.data.canvas.width;","    SIZE.height = msg.data.canvas.height;","    CONFETTI = module.exports.create(msg.data.canvas);","  }","}"].join(`
`);try{r=new Worker(URL.createObjectURL(new Blob([o])))}catch(i){return typeof console<"u"&&typeof console.warn=="function"&&console.warn("🎊 Could not load worker",i),null}n(r)}return r}}(),Y={particleCount:50,angle:90,spread:45,startVelocity:45,decay:.9,gravity:1,drift:0,ticks:200,x:.5,y:.5,shapes:["square","circle"],zIndex:100,colors:["#26ccff","#a25afd","#ff5e7e","#88ff5a","#fcff42","#ffa62d","#ff36ff"],disableForReducedMotion:!1,scalar:1};function $(r,e){return e?e(r):r}function G(r){return r!=null}function m(r,e,a){return $(r&&G(r[e])?r[e]:Y[e],a)}function J(r){return r<0?0:Math.floor(r)}function K(r,e){return Math.floor(Math.random()*(e-r))+r}function O(r){return parseInt(r,16)}function Q(r){return r.map(X)}function X(r){var e=String(r).replace(/[^0-9a-f]/gi,"");return e.length<6&&(e=e[0]+e[0]+e[1]+e[1]+e[2]+e[2]),{r:O(e.substring(0,2)),g:O(e.substring(2,4)),b:O(e.substring(4,6))}}function ee(r){var e=m(r,"origin",Object);return e.x=m(e,"x",Number),e.y=m(e,"y",Number),e}function re(r){r.width=document.documentElement.clientWidth,r.height=document.documentElement.clientHeight}function ae(r){var e=r.getBoundingClientRect();r.width=e.width,r.height=e.height}function te(r){var e=document.createElement("canvas");return e.style.position="fixed",e.style.top="0px",e.style.left="0px",e.style.pointerEvents="none",e.style.zIndex=r,e}function ne(r,e,a,n,o,i,s,t,l){r.save(),r.translate(e,a),r.rotate(i),r.scale(n,o),r.arc(0,0,1,s,t,l),r.restore()}function oe(r){var e=r.angle*(Math.PI/180),a=r.spread*(Math.PI/180);return{x:r.x,y:r.y,wobble:Math.random()*10,wobbleSpeed:Math.min(.11,Math.random()*.1+.05),velocity:r.startVelocity*.5+Math.random()*r.startVelocity,angle2D:-e+(.5*a-Math.random()*a),tiltAngle:(Math.random()*(.75-.25)+.25)*Math.PI,color:r.color,shape:r.shape,tick:0,totalTicks:r.ticks,decay:r.decay,drift:r.drift,random:Math.random()+2,tiltSin:0,tiltCos:0,wobbleX:0,wobbleY:0,gravity:r.gravity*3,ovalScalar:.6,scalar:r.scalar,flat:r.flat}}function ie(r,e){e.x+=Math.cos(e.angle2D)*e.velocity+e.drift,e.y+=Math.sin(e.angle2D)*e.velocity+e.gravity,e.velocity*=e.decay,e.flat?(e.wobble=0,e.wobbleX=e.x+10*e.scalar,e.wobbleY=e.y+10*e.scalar,e.tiltSin=0,e.tiltCos=0,e.random=1):(e.wobble+=e.wobbleSpeed,e.wobbleX=e.x+10*e.scalar*Math.cos(e.wobble),e.wobbleY=e.y+10*e.scalar*Math.sin(e.wobble),e.tiltAngle+=.1,e.tiltSin=Math.sin(e.tiltAngle),e.tiltCos=Math.cos(e.tiltAngle),e.random=Math.random()+2);var a=e.tick++/e.totalTicks,n=e.x+e.random*e.tiltCos,o=e.y+e.random*e.tiltSin,i=e.wobbleX+e.random*e.tiltCos,s=e.wobbleY+e.random*e.tiltSin;if(r.fillStyle="rgba("+e.color.r+", "+e.color.g+", "+e.color.b+", "+(1-a)+")",r.beginPath(),w&&e.shape.type==="path"&&typeof e.shape.path=="string"&&Array.isArray(e.shape.matrix))r.fill(le(e.shape.path,e.shape.matrix,e.x,e.y,Math.abs(i-n)*.1,Math.abs(s-o)*.1,Math.PI/10*e.wobble));else if(e.shape.type==="bitmap"){var t=Math.PI/10*e.wobble,l=Math.abs(i-n)*.1,h=Math.abs(s-o)*.1,u=e.shape.bitmap.width*e.scalar,d=e.shape.bitmap.height*e.scalar,f=new DOMMatrix([Math.cos(t)*l,Math.sin(t)*l,-Math.sin(t)*h,Math.cos(t)*h,e.x,e.y]);f.multiplySelf(new DOMMatrix(e.shape.matrix));var p=r.createPattern(A.transform(e.shape.bitmap),"no-repeat");p.setTransform(f),r.globalAlpha=1-a,r.fillStyle=p,r.fillRect(e.x-u/2,e.y-d/2,u,d),r.globalAlpha=1}else if(e.shape==="circle")r.ellipse?r.ellipse(e.x,e.y,Math.abs(i-n)*e.ovalScalar,Math.abs(s-o)*e.ovalScalar,Math.PI/10*e.wobble,0,2*Math.PI):ne(r,e.x,e.y,Math.abs(i-n)*e.ovalScalar,Math.abs(s-o)*e.ovalScalar,Math.PI/10*e.wobble,0,2*Math.PI);else if(e.shape==="star")for(var c=Math.PI/2*3,g=4*e.scalar,b=8*e.scalar,y=e.x,C=e.y,T=5,x=Math.PI/T;T--;)y=e.x+Math.cos(c)*b,C=e.y+Math.sin(c)*b,r.lineTo(y,C),c+=x,y=e.x+Math.cos(c)*g,C=e.y+Math.sin(c)*g,r.lineTo(y,C),c+=x;else r.moveTo(Math.floor(e.x),Math.floor(e.y)),r.lineTo(Math.floor(e.wobbleX),Math.floor(o)),r.lineTo(Math.floor(i),Math.floor(s)),r.lineTo(Math.floor(n),Math.floor(e.wobbleY));return r.closePath(),r.fill(),e.tick<e.totalTicks}function se(r,e,a,n,o){var i=e.slice(),s=r.getContext("2d"),t,l,h=E(function(u){function d(){t=l=null,s.clearRect(0,0,n.width,n.height),A.clear(),o(),u()}function f(){S&&!(n.width===k.width&&n.height===k.height)&&(n.width=r.width=k.width,n.height=r.height=k.height),!n.width&&!n.height&&(a(r),n.width=r.width,n.height=r.height),s.clearRect(0,0,n.width,n.height),i=i.filter(function(p){return ie(s,p)}),i.length?t=B.frame(f):d()}t=B.frame(f),l=d});return{addFettis:function(u){return i=i.concat(u),h},canvas:r,promise:h,reset:function(){t&&B.cancel(t),l&&l()}}}function U(r,e){var a=!r,n=!!m(e||{},"resize"),o=!1,i=m(e,"disableForReducedMotion",Boolean),s=R&&!!m(e||{},"useWorker"),t=s?H():null,l=a?re:ae,h=r&&t?!!r.__confetti_initialized:!1,u=typeof matchMedia=="function"&&matchMedia("(prefers-reduced-motion)").matches,d;function f(c,g,b){for(var y=m(c,"particleCount",J),C=m(c,"angle",Number),T=m(c,"spread",Number),x=m(c,"startVelocity",Number),de=m(c,"decay",Number),ue=m(c,"gravity",Number),fe=m(c,"drift",Number),W=m(c,"colors",Q),me=m(c,"ticks",Number),Z=m(c,"shapes"),pe=m(c,"scalar"),ve=!!m(c,"flat"),_=ee(c),V=y,N=[],ge=r.width*_.x,be=r.height*_.y;V--;)N.push(oe({x:ge,y:be,angle:C,spread:T,startVelocity:x,color:W[V%W.length],shape:Z[K(0,Z.length)],ticks:me,decay:de,gravity:ue,drift:fe,scalar:pe,flat:ve}));return d?d.addFettis(N):(d=se(r,N,l,g,b),d.promise)}function p(c){var g=i||m(c,"disableForReducedMotion",Boolean),b=m(c,"zIndex",Number);if(g&&u)return E(function(x){x()});a&&d?r=d.canvas:a&&!r&&(r=te(b),document.body.appendChild(r)),n&&!h&&l(r);var y={width:r.width,height:r.height};t&&!h&&t.init(r),h=!0,t&&(r.__confetti_initialized=!0);function C(){if(t){var x={getBoundingClientRect:function(){if(!a)return r.getBoundingClientRect()}};l(x),t.postMessage({resize:{width:x.width,height:x.height}});return}y.width=y.height=null}function T(){d=null,n&&(o=!1,v.removeEventListener("resize",C)),a&&r&&(document.body.contains(r)&&document.body.removeChild(r),r=null,h=!1)}return n&&!o&&(o=!0,v.addEventListener("resize",C,!1)),t?t.fire(c,y,T):f(c,y,T)}return p.reset=function(){t&&t.reset(),d&&d.reset()},p}var L;function D(){return L||(L=U(null,{useWorker:!0,resize:!0})),L}function le(r,e,a,n,o,i,s){var t=new Path2D(r),l=new Path2D;l.addPath(t,new DOMMatrix(e));var h=new Path2D;return h.addPath(l,new DOMMatrix([Math.cos(s)*o,Math.sin(s)*o,-Math.sin(s)*i,Math.cos(s)*i,a,n])),h}function ce(r){if(!w)throw new Error("path confetti are not supported in this browser");var e,a;typeof r=="string"?e=r:(e=r.path,a=r.matrix);var n=new Path2D(e),o=document.createElement("canvas"),i=o.getContext("2d");if(!a){for(var s=1e3,t=s,l=s,h=0,u=0,d,f,p=0;p<s;p+=2)for(var c=0;c<s;c+=2)i.isPointInPath(n,p,c,"nonzero")&&(t=Math.min(t,p),l=Math.min(l,c),h=Math.max(h,p),u=Math.max(u,c));d=h-t,f=u-l;var g=10,b=Math.min(g/d,g/f);a=[b,0,0,b,-Math.round(d/2+t)*b,-Math.round(f/2+l)*b]}return{type:"path",path:e,matrix:a}}function he(r){var e,a=1,n="#000000",o='"Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji", "EmojiOne Color", "Android Emoji", "Twemoji Mozilla", "system emoji", sans-serif';typeof r=="string"?e=r:(e=r.text,a="scalar"in r?r.scalar:a,o="fontFamily"in r?r.fontFamily:o,n="color"in r?r.color:n);var i=10*a,s=""+i+"px "+o,t=new OffscreenCanvas(i,i),l=t.getContext("2d");l.font=s;var h=l.measureText(e),u=Math.ceil(h.actualBoundingBoxRight+h.actualBoundingBoxLeft),d=Math.ceil(h.actualBoundingBoxAscent+h.actualBoundingBoxDescent),f=2,p=h.actualBoundingBoxLeft+f,c=h.actualBoundingBoxAscent+f;u+=f+f,d+=f+f,t=new OffscreenCanvas(u,d),l=t.getContext("2d"),l.font=s,l.fillStyle=n,l.fillText(e,p,c);var g=1/a;return{type:"bitmap",bitmap:t.transferToImageBitmap(),matrix:[g,0,0,g,-u*g/2,-d*g/2]}}M.exports=function(){return D().apply(this,arguments)},M.exports.reset=function(){D().reset()},M.exports.create=U,M.exports.shapeFromPath=ce,M.exports.shapeFromText=he})(function(){return typeof window<"u"?window:typeof self<"u"?self:this||{}}(),z,!1);const ke=z.exports;z.exports.create;const Pe=({isOpen:F,onClose:v,videoUrl:M})=>{if(ye.useEffect(()=>(F?document.body.classList.add("shorts-modal-open"):document.body.classList.remove("shorts-modal-open"),()=>{document.body.classList.remove("shorts-modal-open")}),[F]),!F||!M)return null;const k=(w=>{if(w.includes("instagram.com")){const P=w.match(/(?:reel|reels)\/([A-Za-z0-9_-]+)/);if(P)return{type:"instagram",embedUrl:`https://www.instagram.com/reels/${P[1]}/embed/`}}const j=[/\/shorts\/([A-Za-z0-9_-]+)/,/youtu\.be\/([A-Za-z0-9_-]+)/,/[?&]v=([A-Za-z0-9_-]+)/];for(const P of j){const E=w.match(P);if(E)return{type:"youtube",embedUrl:`https://www.youtube.com/embed/${E[1]}?autoplay=1`}}return null})(M),R=I.jsxs("div",{className:"full-screen-shorts-overlay",onClick:v,children:[I.jsx("button",{className:"shorts-close-btn",onClick:w=>{w.stopPropagation(),v()},children:I.jsx(Me,{size:28})}),I.jsx("div",{className:"shorts-video-container",onClick:w=>w.stopPropagation(),children:k?I.jsx("iframe",{className:"shorts-iframe",src:k.embedUrl,allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",allowFullScreen:!0,title:"Video Content"}):I.jsx("div",{className:"shorts-error",children:I.jsxs("p",{children:["Could not load the video. ",I.jsx("br",{})," URL: ",M]})})}),I.jsx("style",{children:`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }

        .full-screen-shorts-overlay {
          position: fixed;
          inset: 0;
          height: 100dvh;
          width: 100vw;
          z-index: 100000;
          display: grid;
          place-items: center;
          background: rgba(0, 0, 0, 0.95);
          backdrop-filter: blur(25px);
          -webkit-backdrop-filter: blur(25px);
          animation: fadeIn 0.3s ease-out;
          padding: 20px;
        }

        .shorts-close-btn {
          position: absolute;
          top: 30px;
          right: 30px;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          z-index: 100001;
        }
        .shorts-close-btn:hover {
          background: rgba(229, 9, 20, 0.8);
          transform: rotate(90deg);
          border-color: transparent;
        }

        .shorts-video-container {
          position: relative;
          width: 100%;
          height: 100%;
          max-width: 480px; 
          max-height: calc(100vh - 40px);
          aspect-ratio: 9/16;
          background: #000;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 0 100px rgba(0,0,0,0.8);
          animation: slideUp 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .shorts-iframe {
          width: 100%;
          height: 100%;
          border: none;
          display: block;
        }

        .shorts-error {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
          padding: 40px;
          text-align: center;
          color: rgba(255,255,255,0.6);
        }

        @media (max-width: 600px) {
          .shorts-video-container {
            width: calc(100vw - 32px);
            max-width: 420px;
            height: auto;
            aspect-ratio: 9/16;
            max-height: 85vh;
            border-radius: 28px;
            margin: 0;
            box-shadow: 0 30px 60px rgba(0,0,0,0.6);
          }
          .shorts-close-btn {
            top: 20px;
            right: 20px;
            width: 44px;
            height: 44px;
            background: rgba(0, 0, 0, 0.5);
            backdrop-filter: blur(10px);
          }
        }
      `})]});return we.createPortal(R,document.body)};export{Ce as C,Pe as Y,Ie as a,ke as c};
