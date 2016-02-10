import os
from threading import Thread
import Queue
import time
import numpy as np
import sys
import grabscreean
import recorder_sound
from moviepy.editor import *
import zlib
import struct
tmp_max=1024*1024*500;
#most of this code is writen by slobacartoonac@hotmail.com
#sizes=[];

def info(title):
    print title
    print 'module name:', __name__
    if hasattr(os, 'getppid'):  
        print 'parent process:', os.getppid()
    print 'process id:', os.getpid()

def producer(mQue,fps,screen,sound):
    
    total_bytes=0;
    frame_bytes=screen[0]*screen[1]*4
    tmp_current=0;
    tmp_num=0
    que=Queue.Queue()
    w= open("tmp%i.bin" %tmp_num,"wb")
        
    global original,sizes
    sizes=[]
    original=(screen[0],screen[1])
    image_data = grabscreean.run("",(screen[2],screen[3]),original)
    wo=open("tmpOn.bin","wb")
    wo.write(image_data);
    wo.close();
    if sound:
        t1 = Thread(target=recorder_sound.record, args=(que,))
        t1.start();
        que.get();
        time.sleep(1);
    print "start gather"
    last=time.time();
    frames=0
    cdata=""
    while 1:
        difference=(time.time()-last)
        while difference<frames/fps:
            difference =(time.time()-last)
            time.sleep(0.005)
        #print difference
        if difference<(frames+5)/fps:
            image_data = grabscreean.run(image_data,(screen[2],screen[3]),original)
            cdata=zlib.compress(image_data,1)
        w.write(struct.pack(b"=I",len(cdata)));
        w.write(cdata);
        tmp_current+=frame_bytes
        if tmp_current>tmp_max:
            w.close();
            tmp_num=tmp_num+1
            w=open("tmp%i.bin" %tmp_num,"wb")
            tmp_current=0;
        try:
            getcom=mQue.get_nowait()
            if(getcom==-1):
                break;
        except:
            frames=frames+1
            
        
        #print shots
    
    print "done gather ",frames/fps," ",difference," "
    que.put(-1);
    if sound:
        t1.join()
        print "joind"
    return frames
    
def consumer(frames,fps1,screen,sound,fast=False):

    original=(screen[0],screen[1])
    if(fast):
        fps1=24
    filename="output\\output"
    number=0
    fpath=filename+str(number)+".mp4"
    while os.path.isfile(fpath):
        number+=1
        fpath=filename+str(number)+".mp4"
    print fpath
    out = [];
    clip=[];
    done=0;
    imagesize=original[0]*original[1]*4
    tmp_num=0
    tmp_currnet=0
    print imagesize
    for_delete=[];
    tmp_fname="tmp%i.bin" %tmp_num
    for_delete.append(tmp_fname)
    r= open(tmp_fname,"rb")
    for i in xrange(frames):
        printscreen_pil = zlib.decompress(r.read(struct.unpack(b"=I", r.read(4))[0]));
        if not printscreen_pil:
            print frames,"<-tolko"
            print "kraj obrade"
            break
        printscreen_numpy =   np.fromstring(printscreen_pil,dtype='uint8')\
        .reshape((original[1],original[0],4))
        out.append((printscreen_numpy[::-1,:,:-1])[:,:,::-1]);
        tmp_currnet+=imagesize
        if tmp_currnet>tmp_max:
            tm_clip="tmpv%i.mp4" %tmp_num
            print tm_clip;
            tmp_num=tmp_num+1
            r.close()
            clip.append(tm_clip);
            ImageSequenceClip(out,fps=fps1).write_videofile(tm_clip)
            out[:]=[]
            tmp_fname="tmp%i.bin" %tmp_num
            for_delete.append(tmp_fname)
            r= open(tmp_fname,"rb")
            tmp_currnet=0
    r.close()
    tmp_fname="tmp%i.bin" %tmp_num
    for_delete.append(tmp_fname)
    print "output added ",len(out);
    total_clip=ImageSequenceClip(out,fps=fps1)
    while len(clip) > 0 :
        adding=clip.pop();
        for_delete.append(adding);
        total_clip=concatenate([VideoFileClip(adding),total_clip]);
    clip[:]=[]
    audio_clip=None
    if sound:
        audio_clip = AudioFileClip("atmp.wav")
        total_clip=total_clip.set_audio(audio_clip)
    total_clip.write_videofile(fpath)
    if sound: os.remove("atmp.wav")
    print "done "+fpath
    print "removeing temps"
    #while len(for_delete) > 0 : os.remove(for_delete.pop())
if __name__ == '__main__':
    print "startujem proces"

    producer(24*10,24,(200,200,0,0),True)
    consumer(24,(200,200,0,0),True)

def record(duration,fps,screen,sound):
    frames=int(duration*fps)
    producer(frames,fps,screen,sound)
    consumer(frames,fps,screen,sound)
    
def start(mQue,fps,screen,sound,fast=False):
    t2 = Thread(target=threadStart, args=(mQue,fps,screen,sound,fast,))
    t2.start();
def threadStart(mQue,fps,screen,sound,fast):
    frames=producer(mQue,fps,screen,sound)
    consumer(frames,fps,screen,sound,fast)
    
    
