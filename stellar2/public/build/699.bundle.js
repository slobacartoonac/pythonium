"use strict";(self.webpackChunkstellar2=self.webpackChunkstellar2||[]).push([[699],{699:(t,e,r)=>{r.a(t,(async(t,_)=>{try{r.r(e),r.d(e,{Gravity:()=>n.XN,View:()=>n.G7,__wbindgen_throw:()=>n.Or});var n=r(900),a=t([n]);n=(a.then?(await a)():a)[0],_()}catch(t){_(t)}}))},900:(t,e,r)=>{r.a(t,(async(_,n)=>{try{r.d(e,{G7:()=>d,Or:()=>u,XN:()=>l});var a=r(957);t=r.hmd(t);var i=_([a]);a=(i.then?(await i)():i)[0];let s,w=new("undefined"==typeof TextDecoder?(0,t.require)("util").TextDecoder:TextDecoder)("utf-8",{ignoreBOM:!0,fatal:!0});function c(){return 0===s.byteLength&&(s=new Uint8Array(a.memory.buffer)),s}w.decode();let o,h=0;function y(t,e){const r=e(1*t.length);return c().set(t,r/1),h=t.length,r}function g(t,e){const r=e(4*t.length);return(0===o.byteLength&&(o=new Float32Array(a.memory.buffer)),o).set(t,r/4),h=t.length,r}class l{static __wrap(t){const e=Object.create(l.prototype);return e.ptr=t,e}__destroy_into_raw(){const t=this.ptr;return this.ptr=0,t}free(){const t=this.__destroy_into_raw();a.__wbg_gravity_free(t)}static new(t,e){const r=a.gravity_new(t,e);return l.__wrap(r)}width(){return a.gravity_width(this.ptr)>>>0}height(){return a.gravity_height(this.ptr)>>>0}set_view(t,e,r){a.gravity_set_view(this.ptr,t,e,r)}draw_planets(t,e,r,_){try{var n=y(t,a.__wbindgen_malloc),i=h;const s=g(e,a.__wbindgen_malloc),w=h,o=g(_,a.__wbindgen_malloc),l=h;a.gravity_draw_planets(this.ptr,n,i,s,w,r,o,l)}finally{t.set(c().subarray(n/1,n/1+i)),a.__wbindgen_free(n,1*i)}}}class d{__destroy_into_raw(){const t=this.ptr;return this.ptr=0,t}free(){const t=this.__destroy_into_raw();a.__wbg_view_free(t)}get x(){return a.__wbg_get_view_x(this.ptr)>>>0}set x(t){a.__wbg_set_view_x(this.ptr,t)}get y(){return a.__wbg_get_view_y(this.ptr)>>>0}set y(t){a.__wbg_set_view_y(this.ptr,t)}get scale(){return a.__wbg_get_view_scale(this.ptr)}set scale(t){a.__wbg_set_view_scale(this.ptr,t)}}function u(t,e){throw new Error((r=t,_=e,w.decode(c().subarray(r,r+_))));var r,_}o=new Float32Array(a.memory.buffer),s=new Uint8Array(a.memory.buffer),n()}catch(b){n(b)}}))},957:(t,e,r)=>{r.a(t,(async(_,n)=>{try{var a,i=_([a=r(900)]),[a]=i.then?(await i)():i;await r.v(e,t.id,"f94bd58cd8cc22cee10b",{"./index_bg.js":{__wbindgen_throw:a.Or}}),n()}catch(t){n(t)}}),1)}}]);