(()=>{"use strict";function t(t,e){return Math.sqrt((t.x-e.x)*(t.x-e.x)+(t.y-e.y)*(t.y-e.y))}function e(t){return Math.sqrt(t.x*t.x+t.y*t.y)}function i(t,e,i,n){return n?{x:(e.x-t.x+(n.x-i.x))/2,y:(e.y-t.y+(n.y-i.y))/2}:{x:e.x-t.x,y:e.y-t.y}}function n(e,i,n,s){if(!s)return 1;if(!n)return 1;let o=t(e,n),r=t(i,s);return o<.01?1:r/o}function s(t,e,i,n){if(!n)return 0;let s=o(t,i);return o(e,n)-s}function o(t,e){let n=i(t,e);return Math.atan2(n.y,n.x)}function r(o,r){this.deadzone=r,this.clear();let a=null,h=null,c=null,l=null,u=null,p=0,d=!0,g=!1,f=!1;this.centerPosition={x:0,y:0},this.debug=!1,this.console_error=!1,this.throw_error=!1,this.last_error="";const y=t=>{t.preventDefault();const{top:e,left:i}=t.target.getBoundingClientRect();if(t.touches[1]&&t.touches[0]){let n={x:t.touches[0].clientX-i,y:t.touches[0].clientY-e},s={x:t.touches[1].clientX-i,y:t.touches[1].clientY-e};return this.centerPosition={x:(n.x+s.x)/2,y:(n.y+s.y)/2},x(n,s)}if(t.touches[0]){let n={x:t.touches[0].clientX-i,y:t.touches[0].clientY-e};return this.centerPosition={x:n.x,y:n.y},x(n)}},m=t=>{t.preventDefault();const{top:e,left:i}=t.target.getBoundingClientRect();this.centerPosition={x:t.clientX-i,y:t.clientY-e},p&&x({x:t.clientX-i,y:t.clientY-e})},x=(o,r)=>{if(g=!0,null==a)return a={x:o.x,y:o.y},h=+new Date,l={x:o.x,y:o.y},this.triger("start",l),void(d=!0);if(r&&null==c)return f=!0,t(a,r)<t(a,o)&&(a={x:o.x,y:o.y},h=+new Date,l={x:o.x,y:o.y}),c={x:r.x,y:r.y},void(u={x:r.x,y:r.y});if(!r&&c)return f=!1,c=null,void(u=null);let y=i(l,o,u,r),m=n(l,o,u,r),x=s(l,o,u,r);l={x:o.x,y:o.y},u=r?{x:r.x,y:r.y}:null;let v=i(a,l,c,u),w=n(a,l,c,u),b=e(v),S=s(a,l,c,u),T=+new Date-h,_=this.debug&&`${a&&"Start: "+JSON.stringify(a)},\n\t\t${l&&"This: "+JSON.stringify(l)}, \n\t\t${c&&"Start secound: "+JSON.stringify(c)}, \n\t\t${u&&"Start this: "+JSON.stringify(u)},\n\t\t${y&&"Delta: "+JSON.stringify(y)},\n\t\t${"Zoom: "+w},\n\t\t${"DZoom: "+m}\n\t\t${"Angle: "+S}\n\t\t${"DAngle: "+x}\n\t\t${"isPrimary: "+(!f&&0==p||1==p)}\n\t\t${this.last_error}`,P={delta:y,direction:v,startPosition:a,position:l,distance:b,click:d,isClick:d,mouseDown:p,zoom:w,deltaZoom:m,touchSecound:f,angle:S,deltaAngle:x,startTime:h,deltaTime:T,isPrimary:!f&&0==p||1==p,debug:_,centerPosition:this.centerPosition};this.triger("force",P),b>this.deadzone&&(d=!1,Math.abs(v.x)>Math.abs(v.y)?v.x>0?this.triger("right",P):this.triger("left",P):v.y>0?this.triger("down",P):this.triger("up",P))},v=t=>{if(t.preventDefault(),0==g)return;let o={x:0,y:0},r=i(a,l,c,u),y=n(a,l,c,u),m=s(a,l,c,u),x=e(r),v=+new Date-h,w=this.debug&&`${a&&"Start: "+JSON.stringify(a)},\n\t\t${l&&"This: "+JSON.stringify(l)}, \n\t\t${c&&"Start secound: "+JSON.stringify(c)}, \n\t\t${u&&"Start this: "+JSON.stringify(u)},\n\t\t${o&&"Delta: "+JSON.stringify(o)},\n\t\t${"Zoom: "+y},\n\t\tDZoom: 0\n\t\t${"Angle: "+m}\n\t\tDAngle: 0\n\t\t${"isPrimary: "+(!f&&0==p||1==p)}\n\t\t${this.last_error}`;const b={x:a.x,y:a.y,delta:o,direction:r,startPosition:a,position:l,distance:x,click:d,isClick:d,mouseDown:p,zoom:y,deltaZoom:0,touchSecound:f,angle:m,deltaAngle:0,startTime:h,deltaTime:v,isPrimary:!f&&0==p||1==p,debug:w,centerPosition:this.centerPosition};g=!1,f=!1;let S=a;d&&(t.button&&(1===t.button&&this.triger("bmiddle",b),2===t.button&&this.triger("bright",b)),S&&this.triger("click",b)),this.triger("stop",b),a=null,h=null,l=null,c=null,u=null,p=0};o.addEventListener("touchstart",(t=>{t.preventDefault()}),!1),o.addEventListener("touchmove",y,!1),o.addEventListener("touchend",v,!1),o.addEventListener("touchstart",y,!1),o.addEventListener("mouseleave",v,!1),o.addEventListener("mousemove",m),o.addEventListener("mouseup",v),o.addEventListener("mousedown",(t=>{p=1+t.button,m(t)}))}r.prototype.sub=function(t,e){this.events[t]&&this.events[t].push(e)},r.prototype.onClick=function(t){this.events.click.push(t)},r.prototype.onForce=function(t){this.events.force.push(t)},r.prototype.onStart=function(t){this.events.start.push(t)},r.prototype.onStop=function(t){this.events.stop.push(t)},r.prototype.onUp=function(t){this.events.up.push(t)},r.prototype.onDown=function(t){this.events.down.push(t)},r.prototype.onLeft=function(t){this.events.left.push(t)},r.prototype.onRight=function(t){this.events.right.push(t)},r.prototype.unsub=function(t,e){this.events[t]&&(this.events[t]=this.events[t].filter((t=>t!==e)))},r.prototype.clearEvlent=function(t){this.events[t]&&(this.events[t]=[])},r.prototype.clear=function(){this.events={up:[],down:[],left:[],right:[],stop:[],start:[],click:[],force:[],bmiddle:[],bright:[]}},r.prototype.triger=function(t,e){this.events[t]&&this.events[t].forEach((t=>{try{t(e)}catch(t){if(this.console_error&&console.log(t),this.last_error="Error: "+t.name+" "+t.foo+" "+t.message+" "+t.stack,this.throw_error)throw t}}))};const a=r;function h(t,e,i,n,s,o,r){return[(o-t)*i+n/2,(r-e)*i+s/2]}function c(t,e,i,n,s,o,r){return[(o-n/2)/i+t,(r-s/2)/i+e]}function l(t){this.canvas=t,this.context=this.canvas.getContext("2d",{willReadFrequently:!0}),this.img=this.context.createImageData(this.canvas.width,this.canvas.height)}l.prototype.clear=function(){this.context.clearRect(0,0,this.canvas.width,this.canvas.height)},l.prototype.getCanvas=function(){return this.canvas},l.prototype.worldToScreen=function(t,e){const{width:i,height:n}=this.canvas,{x:s,y:o,scale:r}=t;return h(s,o,r,i,n,e[0],e[1])},l.prototype.screenToWorld=function(t,e){const{width:i,height:n}=this.canvas,{x:s,y:o,scale:r}=t;return c(s,o,r,i,n,e[0],e[1])};const u=l;function p(t,e){this.context=t,this.showCords=e?.showCords,this.showAxis=e?.showAxis,this.axisCords=e?.axisCords,this.axisScale=e?.axisScale||100,this.devide=e?.devide||2}p.prototype.draw=function(t,e,i){const{context:n}=this;var s=n.canvas.clientWidth,o=n.canvas.clientHeight;const{x:r,y:a,scale:l}=i,u=s/2,p=o/2;for(var d=l||1;d>2;)d/=2;for(;d<1;)d*=2;const g=t*d,f=e*d;var y;if((w=(u-r*l)%g)<0&&(w+=g),(b=(p-a*l)%f)<0&&(b+=f),this.showAxis){n.beginPath();let[t,e]=h(r,a,l,s,o,0,0);n.lineWidth=2,n.moveTo(t,0),n.lineTo(t,o),n.moveTo(0,e),n.lineTo(s,e),n.strokeStyle="rgba(0, 0, 0, 1.0)",n.stroke()}n.beginPath();for(var m=w;m<=s;m+=g){if(n.moveTo(m,0),n.lineTo(m,o),!this.axisCords)continue;let t=c(r,a,l,s,o,m,0)[0];this.drawCod(t,0,i,n)}for(var x=b;x<=o;x+=f){if(n.moveTo(0,x),n.lineTo(s,x),!this.axisCords)continue;let t=c(r,a,l,s,o,0,x)[1];this.drawCod(0,t,i,n)}n.lineWidth=2,n.strokeStyle="rgba(128, 128, 128, 0.5)",n.stroke();for(var v=0;v<this.devide-1;v++){var w=(w+g/this.devide)%g,b=(b+f/this.devide)%f;for(n.beginPath(),m=w;m<=s;m+=g)n.moveTo(m,0),n.lineTo(m,o);for(x=b;x<=o;x+=f)n.moveTo(0,x),n.lineTo(s,x);n.lineWidth=1,n.strokeStyle="rgba(128, 128, 128, "+(.25*(1-(y=d-1))+.5*y)+")",n.stroke()}this.showCords&&(n.font="10px Arial",n.fillText(Math.round(i.x*this.axisScale)/this.axisScale+Number.EPSILON+","+Math.round(i.y*this.axisScale+Number.EPSILON)/this.axisScale+","+Math.round(i.scale*this.axisScale+Number.EPSILON)/this.axisScale,10,50))},p.prototype.drawCod=function(t,e,i,n){const{x:s,y:o,scale:r}=i;var a=n.canvas.clientWidth,h=n.canvas.clientHeight,c=(t-s)*r+a/2,l=(e-o)*r+h/2;let u=!1;function p(t){return+parseFloat(t).toFixed(2)}(c<5||c>a-19||l>h-28||l<14)&&(u=!0),c<5&&(c=5),l<14&&(l=14),c>a-19&&(c=a-19),l>h-28&&(l=h-28),n.font="14px Verdana",n.fillStyle="rgb(0, 0, 0, 1.0)";let d="",g=p(t/this.axisScale),f=p(-e/this.axisScale);g&&(d+=g),f&&(d+=f),f||g||u||(d+="0"),n.fillText(d,c+5,l+14)},p.prototype.line=function(t,e,i,n,s){this.context.lineWidth=1,this.context.moveTo(t,e),this.context.lineTo(t+i,e+n),this.context.strokeStyle=s,this.context.stroke()};const d=p;function g(t){this.id=t}function f(){this._generation=new Map,this._free_indices=[],this._entities=new Map,this._components=new Map,this.__entities_with_type=new Map}function y(...t){if(Array.call(this),1==t.length){var e=t[0],i=Object.values(e);Object.hasOwnProperty.call(e,"length")&&e.length!==i.length&&i.pop(),this.push(...i)}else this.push(...Object.values(t));Object.defineProperty(this,"x",{get(){return this[0]},set(t){this[0]=t}}),Object.defineProperty(this,"y",{get(){return this[1]},set(t){this[1]=t}}),Object.defineProperty(this,"z",{get(){return this[2]},set(t){this[2]=t}})}function m(t){this.positions=new y(t)}function x(t,e){this.x=t,this.y=e}function v(t){this.radius=t}function w(t,e){this.font=t,this.text=e}function b(t){this.image=t}function S(t){this.radius=t}function T(t){this.rotate=t}function _(){this.noscale=!0}function P(t){this.scale=t}function k(t,e,i){this.color=t,this.stroke=e,this.layer=i||0}function O(t,e){this.context=t,this.manager=e,this.maxSize=100}function E(t,e){e.color&&(t.fillStyle=e.color,t.fill()),e.stroke&&(t.strokeStyle=e.stroke.color,t.lineWidth=e.stroke.width,t.stroke())}function N(t,e,i,n,s,o){t.moveTo(e,i+o),t.lineTo(e,i+s-o),t.arcTo(e,i+s,e+o,i+s,o),t.lineTo(e+n-o,i+s),t.arcTo(e+n,i+s,e+n,i+s-o,o),t.lineTo(e+n,i+o),t.arcTo(e+n,i,e+n-o,i,o),t.lineTo(e+o,i),t.arcTo(e,i,e,i+o,o)}g.prototype.index=function(){return 4194303&this.id},g.prototype.generation=function(){return this.id>>22&255},f.prototype.create=function(){var t=0;this._free_indices.length>0?t=this._free_indices.shift():(t=this._generation.size,this._generation.set(t,0));var e=this.make_entity(t,this._generation.get(t));return this._entities.set(t,e),e},f.prototype.make_entity=function(t,e){return new g(t+(e<<22))},f.prototype.alive=function(t){return this._generation.get(t.index())==t.generation()},f.prototype.destroy=function(t){this._components.delete(t.id),this._entities.delete(t.id);let e=t.index(),i=this._generation.get(e)+1;this._generation.set(e,i),this._free_indices.push(e)},f.prototype.asign=function(t,e){var i=this._components.get(e.id);if(i){var n=i.get(t.constructor.name);if(n){if(n&&i.get(t.constructor.name).find((e=>t===e)))throw Error("Component is allready asiged");i.get(t.constructor.name).push(t)}else this._components.get(e.id).set(t.constructor.name,[t])}else this._components.set(e.id,new Map([[t.constructor.name,[t]]]))},f.prototype.get=function(t,e){var i=this._components.get(e.id);return i&&i.get(t.name)||[]},f.prototype.remove=function(t,e){var i=this._components.get(e.id);i&&i.get(t.constructor.name)&&i.set(t.constructor.name,i.get(t.constructor.name).filter((function(e){return e!==t})))},f.prototype.getEnities=function(t){return[...this._entities.values()].filter((e=>e&&this.get(t,e).length))},y.prototype.x=0,y.prototype.y=0,y.prototype.z=0,y.prototype=Object.create(Array.prototype,{constructor:{value:y,enumerable:!1,writable:!0,configurable:!0}}),y.prototype.add=function(t){let e=this.copy();for(var i=0;i<e.length;i++)Object.hasOwnProperty.call(e,i)&&Object.hasOwnProperty.call(t,i)&&(e[i]+=t[i]);return e},y.prototype.update=function(t){let e=Object.entries(t);for(var i=0;i<e.length;i++){let t=e[i];Object.hasOwnProperty.call(this,t[0])&&(this[i]=t[1])}},y.prototype.negate=function(){let t=this.copy();for(var e=0;e<t.length;e++)Object.hasOwnProperty.call(t,e)&&(t[e]=-t[e]);return t},y.prototype.substract=function(t){return this.add(t.negate())},y.prototype.magnitude=function(){let t=0;for(var e=0;e<this.length;e++)Object.hasOwnProperty.call(this,e)&&(t+=this[e]*this[e]);return Math.sqrt(t)},y.prototype.normalise=function(t){let e=this.magnitude();return this.scale(1/e)},y.prototype.scale=function(t){let e=this.copy();for(var i=0;i<e.length;i++)Object.hasOwnProperty.call(e,i)&&(e[i]*=t);return e},y.prototype.copy=function(){return new this.constructor(this)},O.prototype.draw=function(t){const{context:e}=this;var i=e.canvas.clientWidth,n=e.canvas.clientHeight;const{x:s,y:o,scale:r,angle:a}=t,h=i/2,c=n/2,l=this.maxSize*r;a&&(e.save(),e.translate(h,c),e.rotate(a),e.translate(-h,-c)),this.manager.getEnities(k).map((t=>[t,this.manager.get(k,t)[0]])).sort((([,t],[,e])=>t.layer<e.layer?-1:t.layer>e.layer?1:0)).map((([t,a])=>{var u=this.manager.get(m,t)[0],p=(u.positions[0]-s)*r+h,d=(u.positions[1]-o)*r+c;if(p<-l||d<-l||p>i||d>n)return;let g=this.manager.get(_,t)[0],f=this.manager.get(P,t)[0],y=g?1:r*(f?.scale||1),k=this.manager.get(v,t);for(let t in k){let i=k[t];const n=i.radius*y>1?i.radius*y:1;e.beginPath(),e.arc(p,d,n,0,2*Math.PI,!1),E(e,a)}let O=this.manager.get(x,t),C=this.manager.get(S,t),D=this.manager.get(T,t)[0];for(let t in O){let i=O[t];const n=i.x*y>1?i.x*y:1,s=i.y*y>1?i.y*y:1;e.save(),D&&(e.translate(p+n/2,d+s/2),e.rotate(D.rotate),e.translate(-p-n/2,-d-s/2)),e.beginPath(),C[0]?N(e,p,d,n,s,C[0].radius):e.rect(p,d,n,s),E(e,a),e.restore()}let W=this.manager.get(b,t);for(let t in W){let i=W[t],n=O[0],s=n?.x||i.image.width,o=n?.x||i.image.height;const r=s*y>1?s*y+.5:1,a=o*y>1?o*y+.5:1;e.save(),D&&(e.translate(p+r/2,d+a/2),e.rotate(D.rotate),e.translate(-p-r/2,-d-a/2)),e.drawImage(i.image,p,d,r,a),e.restore()}let j=this.manager.get(w,t);for(let t in j){let i=j[t];const n=i.font*y>1?i.font*y:1;e.fillStyle=a.color,e.font=parseInt(n)+"px serif",e.save(),D&&(e.translate(p,d),e.rotate(D.rotate),e.translate(-p,-d)),e.fillText(i.text,p,d+parseInt(n)),e.restore()}})),a&&e.restore()},O.prototype.mesure=function(t){const{context:e}=this;return e.font=parseInt(t.font)+"px serif",e.measureText(t.text)};const C={".-":"A","-...":"B","-.-.":"C","-..":"D",".":"E","..-.":"F","--.":"G","....":"H","..":"I",".---":"J","-.-":"K",".-..":"L","--":"M","-.":"N","---":"O",".--.":"P","--.-":"Q",".-.":"R","...":"S","-":"T","..-":"U","...-":"V",".--":"W","-..-":"X","-.--":"Y","--..":"Z","-----":"0",".----":"1","..---":"2","...--":"3","....-":"4",".....":"5","-....":"6","--...":"7","---..":"8","----.":"9"};function D(t){return t.trim().split("   ").map((t=>t.split(" ").map((t=>C[t])).join(""))).join(" ")}function W(){this.isSelected=!1,this.index=0}const j=(t,e,i,n,s,o,r)=>{let a=t.create();return t.asign(new m([e,i]),a),t.asign(new x(n,s),a),t.asign(new k(o,r),a),t.asign(new S(5),a),a};class M{constructor(t){this.manager=t,this.cords={},this.cursor=j(this.manager,0,0,20,25,"#ffffff","#000000"),this.drawTree([".","-"],0,0)}drawTree(t,e,i){let n=25*Math.pow(2,5-e);for(let s=0;s<t.length;s++){let o=n*(s-.5)+i,r=t[s];this.createNode(50+o,50*e,t[s])&&this.drawTree([r+".",r+"-"],e+1,o)}}createNode(t,e,i){let n=D(i);return n&&(((t,e,i,n,s,o,r)=>{let a=t.create(),h=new w(20,n);t.asign(new m([e,i]),a),t.asign(h,a),t.asign(new k(void 0,null,void 0),a)})(this.manager,t,e," "+n+" "+i),this.cords[i]={x:t,y:e}),n}update(t){if(this.lastPosition==t)return;let e=this.cords[t];if(e)return this.manager.get(m,this.cursor)[0].positions.update(e),e;e={x:0,y:0}}}class ${constructor(t,e,i){this.input=e,this.lastEvent=0,this.position="",this.string="",this.pressed=!1,this.unit=i,this.manager=new f,this.render=new O(t.context,this.manager),this.tree=new M(this.manager)}calcPosition(t){if(this.pressed)t<this.unit?this.position=".":this.position="-";else{let e=this.string.length,i=e?this.string[e-1]:"",n=" "==i||""==i;t>3*this.unit&&!n&&(this.string+=" ");let s=e>1?this.string[e-2]:"";t>7*this.unit&&" "==i&&" "!==s&&(this.string+="  ")}let e=this.position?"|"+this.position:"",i="";i=!e&&t%this.unit*3<this.unit?"|":" ";let n=this.string+e;this.input.setBaloonText(n+i+"\n"+D(n))}onStart(){console.log("start"),this.pressed=!0,this.lastEvent=+new Date}cancel(){this.pressed=!1,this.position="",this.lastEvent=+new Date}onStop(){console.log("stop");let t=+new Date;this.lastEvent=t,this.pressed=!1,this.position&&(this.string+=this.position,this.position="")}work(t){this.calcPosition(+new Date-this.lastEvent),this.render.draw(t);let e=this.tree.update(this.position?this.string.split(" ").pop():"");e&&t.update(e)}}function z(t,e){y.call(this),this.push(0,0,1,0),this.screen=t,Object.assign(this,e||{}),Object.defineProperty(this,"scale",{get(){return this[2]},set(t){this[2]=t}}),Object.defineProperty(this,"angle",{get(){return this[3]},set(t){this[3]=t}})}function L(t,e){let i=t.split(/\r?\n/),n=[];for(let t of i){if(t.length<e){n.push(t);continue}let i=t.split(" "),s="";for(let t of i)t.length>e&&(t=t.slice(0,e-4),t+="..."),s.length+t.length>e&&(n.push(s.slice(1)),s=""),s+=" "+t;s.length&&n.push(s.slice(1))}return n}function X(){}function Y(t,...e){e.forEach((e=>t.asign(new X,e)))}function A(t){this.checked=t}z.prototype=Object.create(y.prototype),z.prototype.zoom=function(t,e,i){if(this.scale*=t,!isNaN(this.minScale)&&this.scale<this.minScale)this.scale=this.minScale;else if(!isNaN(this.maxScale)&&this.scale>this.maxScale)this.scale=this.maxScale;else if(void 0!==e&&void 0!==i){let n=t-1,s=(this.screen.width/2-e)*n,o=(this.screen.height/2-i)*n;this.move(s,o)}},z.prototype.rotate=function(t){this.angle+=t},z.prototype.move=function(t,e){let i=t/this.scale,n=e/this.scale;this.x-=i,this.y-=n,!isNaN(this.minX)&&this.x<this.minX&&(this.x=this.minX),!isNaN(this.maxX)&&this.x>this.maxX&&(this.x=this.maxX),!isNaN(this.minY)&&this.y<this.minY&&(this.y=this.minY),!isNaN(this.maxY)&&this.y>this.maxY&&(this.y=this.maxY)};class I{}class J{constructor(t){this.ploter=t,this.manager=new f,this.render=new O(this.ploter.context,this.manager),this.input_position=new z(t.canvas),this.stabilex=30,this.stabiley=30,this.inputs={},this.baloonText=""}getWith(){return this.ploter.canvas.width}getHeight(){return this.ploter.canvas.height}setResolution(){this.input_position.x=this.getWith()/2,this.input_position.y=this.getHeight()/2}touchClick({x:t,y:e}){var i=this.ploter.screenToWorld(this.input_position,[t,e]);const n=this.manager.getEnities(W).map((t=>{var e=this.manager.get(m,t)[0],i=this.manager.get(x,t)[0],n=this.manager.get(W,t)[0];return n.index=0,{transform:e,box:i,selectable:n,id:t}})).filter((({transform:t,box:e})=>function(t,e,i){return!(t[0]>i[0]||t[1]>i[1]||t[0]+e[0]<i[0]||t[1]+e[1]<i[1])}(t.positions,[e.x,e.y],i)))[0];if(n){let t=this.manager.get(A,n.id)[0];t&&this.setState(n.id,!t.checked)}return n}setState(t,e){let i=this.manager.get(k,t)[0];i&&(i.color=e?"#888888":"#555555");let n=this.manager.get(A,t)[0];n&&(n.checked=e)}setBaloonText(t){if(this.baloonText==t)return;if(this.baloonText=t,this.manager.getEnities(I).forEach((t=>{this.manager.destroy(t)})),!this.baloonText)return;let e=function(t,e,i,n,s){let o=[],r=s?.textSize||20,a=s?.lineHeight||r+10,h=s?.background||"#ffffffaa",c=s?.borderColor||"#ffffff",l=s?.borderWidth||1,u=s?.anchor||[0,0],p=s?.paddingX||s?.padding||10,d=s?.paddingY||s?.padding||10,g=s?.minWidth||0,f=s?.minHeight||0,y=s?.maxWidth||0,x=0,v=n.split(/\r?\n/).map((t=>{let i=new w(r,t),n=e.mesure(i).width,s=n+2*p;if(!y||s<y)return x=Math.max(n,x),[i];for(let i=t.length-1;0<i;i--){let n=L(t,i).map((t=>new w(r,t))),o=n.map((t=>e.mesure(t).width));if(s=Math.max(...o.map((t=>t+2*p))),s<y)return x=Math.max(x,...o),n}return[i]}));v=v.flat();let b=x+2*p;b=Math.max(g,b);let S=v.length*a+2*d;S=Math.max(f,S);let T=i[0]-b*u[0],_=i[1]-S*u[1],P=((t,e,i,n,s,o,r)=>{let a=r.width-1,h=j(t,e-a,i-a,n+2*a,s+2*a,null,{...r,width:a+2});return[j(t,e,i,n,s,o),h]})(t,T,_,b,S,h,{color:c,width:l});return o.push(...P),Y(t,...P),v.map(((e,i)=>{let n=t.create();t.asign(new m([T+p,_+d+i*a]),n),t.asign(e,n),t.asign(new k("#000000",null,2),n),o.push(n),Y(t,n)})),o}(this.manager,this.render,[this.getWith()/2,30],this.baloonText,{textSize:20,maxWidth:this.getWith()-50,minWidth:this.getWith()-50,anchor:[.5,0],borderColor:"#aaaaaa",background:"#aaaaaaaa"});e.map((t=>this.manager.asign(new I,t)))}work(){this.render.draw(this.input_position)}}const H=document.getElementById("phy_canvas");let{work:R,adjustWindowSize:Z}=function(t,e){var i=new u(t),n=new J(i),s=new z(t,{minX:-2e3,minY:-2e3,maxX:2e3,maxY:2e3,minScale:.15,maxScale:3}),o=new $(i,n,500),r=new a(t,20);return r.throw_error=!0,window.addEventListener("mousewheel",(function(t){s.zoom(t.wheelDelta>0?1.1:.88,r.centerPosition.x,r.centerPosition.y)})),document.addEventListener("contextmenu",(function(t){t.preventDefault()})),new d(i.context,{}),r.onForce((t=>{var{delta:e,deltaZoom:i,isPrimary:n,centerPosition:r,position:a,deltaTime:h,isClick:c}=t;1!=i&&s.zoom(i,r.x,r.y),s.move(e.x,e.y),c||o.cancel()})),r.onStart((()=>{o.onStart()})),r.onStop((()=>{o.onStop()})),r.onClick((t=>{n.touchClick(t)})),{work:function(){i.clear(),o.work(s),n.work()},adjustWindowSize:function(){n.setResolution()}}}(H);window.addEventListener("resize",(()=>{H.width=window.innerWidth-10,H.height=window.innerHeight-10,Z()})),H.width=window.innerWidth-10,H.height=window.innerHeight-10,Z();let B=()=>{R(),setTimeout(B,0)};B()})();