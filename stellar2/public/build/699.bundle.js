"use strict";(self.webpackChunkstellar2=self.webpackChunkstellar2||[]).push([[699],{699:(t,e,r)=>{r.a(t,(async(t,_)=>{try{r.r(e),r.d(e,{Gravity:()=>a.XN,View:()=>a.G7,__wbindgen_throw:()=>a.Or});var a=r(900),n=t([a]);a=(n.then?(await n)():n)[0],_()}catch(t){_(t)}}))},900:(t,e,r)=>{r.a(t,(async(_,a)=>{try{r.d(e,{G7:()=>u,Or:()=>d,XN:()=>l});var n=r(957);t=r.hmd(t);var i=_([n]);n=(i.then?(await i)():i)[0];let s,w=new("undefined"==typeof TextDecoder?(0,t.require)("util").TextDecoder:TextDecoder)("utf-8",{ignoreBOM:!0,fatal:!0});function c(){return 0===s.byteLength&&(s=new Uint8Array(n.memory.buffer)),s}w.decode();let o,h=0;function y(t,e){const r=e(1*t.length);return c().set(t,r/1),h=t.length,r}function g(t,e){const r=e(4*t.length);return(0===o.byteLength&&(o=new Float32Array(n.memory.buffer)),o).set(t,r/4),h=t.length,r}class l{static __wrap(t){const e=Object.create(l.prototype);return e.ptr=t,e}__destroy_into_raw(){const t=this.ptr;return this.ptr=0,t}free(){const t=this.__destroy_into_raw();n.__wbg_gravity_free(t)}static new(t,e){const r=n.gravity_new(t,e);return l.__wrap(r)}width(){return n.gravity_width(this.ptr)>>>0}height(){return n.gravity_height(this.ptr)>>>0}set_view(t,e,r){n.gravity_set_view(this.ptr,t,e,r)}draw_planets(t,e,r,_){try{var a=y(t,n.__wbindgen_malloc),i=h;const s=g(e,n.__wbindgen_malloc),w=h,o=g(_,n.__wbindgen_malloc),l=h;n.gravity_draw_planets(this.ptr,a,i,s,w,r,o,l)}finally{t.set(c().subarray(a/1,a/1+i)),n.__wbindgen_free(a,1*i)}}mutate_data(t,e){try{var r=y(t,n.__wbindgen_malloc),_=h;n.gravity_mutate_data(this.ptr,r,_,e)}finally{t.set(c().subarray(r/1,r/1+_)),n.__wbindgen_free(r,1*_)}}}class u{__destroy_into_raw(){const t=this.ptr;return this.ptr=0,t}free(){const t=this.__destroy_into_raw();n.__wbg_view_free(t)}get x(){return n.__wbg_get_view_x(this.ptr)>>>0}set x(t){n.__wbg_set_view_x(this.ptr,t)}get y(){return n.__wbg_get_view_y(this.ptr)>>>0}set y(t){n.__wbg_set_view_y(this.ptr,t)}get scale(){return n.__wbg_get_view_scale(this.ptr)}set scale(t){n.__wbg_set_view_scale(this.ptr,t)}}function d(t,e){throw new Error((r=t,_=e,w.decode(c().subarray(r,r+_))));var r,_}o=new Float32Array(n.memory.buffer),s=new Uint8Array(n.memory.buffer),a()}catch(b){a(b)}}))},957:(t,e,r)=>{r.a(t,(async(_,a)=>{try{var n,i=_([n=r(900)]),[n]=i.then?(await i)():i;await r.v(e,t.id,"e647548f3f96531f2ce7",{"./index_bg.js":{__wbindgen_throw:n.Or}}),a()}catch(t){a(t)}}),1)}}]);
//# sourceMappingURL=699.bundle.js.map