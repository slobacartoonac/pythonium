import os
from threading import Thread
import time
import numpy as np
#import cv2
import sys
import grabscreean
import recorder_sound
from moviepy.editor import *

#most of this code is writen by slobacartoonac@hotmail.com

def info(title):
    print title
    print 'module name:', __name__
    if hasattr(os, 'getppid'):  # only available on Unix
        print 'parent process:', os.getppid()
    print 'process id:', os.getpid()

def producer(frames,fps,screen,sound):
    shots=200
    time.sleep(3)
    
    #info('producer line')
    with open("tmp.bin","wb") as w:
        print "start gather"
        global original
        original=(screen[0],screen[1])
        image_data = grabscreean.run("",(screen[2],screen[3]),original)
        if sound:
            t1 = Thread(target=recorder_sound.record, args=(frames/fps,))
            t1.start();
        last=time.time();
        for i in xrange(frames):
            difference=(time.time()-last)
            while difference<i/fps:
                difference =(time.time()-last)
                time.sleep(0.005)
            #print difference
            if difference<(i+5)/fps:
                image_data = grabscreean.run(image_data,(screen[2],screen[3]),original)
            w.write(image_data)
            shots-=1
            #print shots
        print "done gather ",frames/fps," ",difference," "
        if sound: t1.join()
    
def consumer(frames,fps1,screen,sound):
    #info('consumer line')
    original=(screen[0],screen[1])
    #fourcc = cv2.VideoWriter_fourcc(*'DIVX')
    filename="output"
    number=0
    fpath=filename+str(number)+".mp4"
    while os.path.isfile(fpath):
        number+=1
        fpath=filename+str(number)+".mp4"
    print fpath
    out = [];#cv2.VideoWriter("mtmp.avi",fourcc, fps, original)
    done=0;
    imagesize=original[0]*original[1]*4
    print imagesize
    with open("tmp.bin","rb") as r:
        for i in xrange(frames):
            printscreen_pil = r.read(imagesize)
            if not printscreen_pil:
                print i,"<-tolko"
                print "kraj obrade"
                break
            printscreen_numpy =   np.fromstring(printscreen_pil,dtype='uint8')\
            .reshape((original[1],original[0],4))
            out.append((printscreen_numpy[::-1,:,:-1])[:,:,::-1]);
    if(len(out)<2):
        print "nema slika"
        return
    print "output added ",len(out);
    clip = ImageSequenceClip(out,fps=fps1)
    audio_clip=None
    if sound:
        audio_clip = AudioFileClip("atmp.wav")
        clip=clip.set_audio(audio_clip)
    clip.write_videofile(fpath)
    #os.remove("mtmp.avi")
    if sound: os.remove("atmp.wav")
    print "done "+fpath
if __name__ == '__main__':
    #info('main line')
    #q = Queue()
    #print "pravim proces"
    
    #t2 = Process(target=consumer, args=(q,))
    print "startujem proces"
    #t1.start()
    #print "cekam rezultat"
    #t2.start()
    producer(24*120,24,(200,200,0,0),False)
    consumer(24*120,24,(200,200,0,0),False)
    #print "cekam da zavrsi"
    
    
    
    #print "zavrsio"
    #t2.join()
def record(duration,fps,screen,sound):
    frames=int(duration*fps)
    producer(frames,fps,screen,sound)
    consumer(frames,fps,screen,sound)
    
