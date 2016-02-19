import os
from threading import Thread
from subprocess import Popen, PIPE,STDOUT
import Queue
import time
import numpy as np
import sys
import grabscreean
import recorder_sound
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

def producer(mQue,comun,fps,screen,sound):
    
    que=Queue.Queue()
        
    global original,sizes
    sizes=[]
    original=(screen[0],screen[1])

    print "start gather"
    image_data = grabscreean.run("",(screen[2],screen[3]),original)
    putting=zlib.compress(image_data,1)
    last=time.time();
    frames=0
    if sound:
        t1 = Thread(target=recorder_sound.record, args=(que,))
        t1.start();
        que.get();
        time.sleep(0.3);
    
    while 1:
        difference=(time.time()-last)
        while difference<frames/fps:
            difference =(time.time()-last)
            time.sleep(0.005)
        #print difference
        if difference<(frames+5)/fps:
            image_data = grabscreean.run(image_data,(screen[2],screen[3]),original)
            putting=zlib.compress(image_data,1)
        comun.put(putting);
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
    return frames
    
def consumer(comun,fps1,screen,sound,fast=False):

    original=(screen[0],screen[1])
    if(fast):
        fps1=24
    filename="output\\output"
    number=0
    image_data=b'';
    fpath=filename+str(number)+".mp4"
    while os.path.isfile(fpath):
        number+=1
        fpath=filename+str(number)+".mp4"
    errors=0;
    print fpath
   
    p=Popen(['ffmpeg','-y','-f', 'rawvideo', '-pix_fmt', 'rgb32', '-s' ,str(original[0])+'x'+str(original[1]),
             '-r', str(fps1) ,'-i', '-' ,'-an', '-vf' ,"vflip" ,'-f',  'h264', '-r', str(fps1), 'vtmp.mp4'],shell=True, bufsize=99999999, stdin=PIPE )
    
    while 1:
        try:
            image=comun.get(True,1);
            image_data=zlib.decompress(image);
            errors=0
        except:
            errors+=1
            print 'errot'
            if(errors>5):
                print 'end consume'
                break
            #break;
        try:
            #print 'consume: '+ str(len(image_data))
            p.stdin.write(image_data)
        except: fps1=fps1
    p.terminate();
    merg=Popen(['ffmpeg' ,'-i', 'vtmp.mp4' ,'-i', 'atmp.wav', 
        '-c:v' ,'copy' ,'-c:a','aac' ,'-strict' ,'experimental', fpath
             ],shell=True, bufsize=99999999, stdin=PIPE )
    
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
    comun=Queue.Queue();
    prod = Thread(target=consumer, args=(comun,fps,screen,sound,fast))
    prod.start()
    frames=producer(mQue,comun,fps,screen,sound)
    
    
    
