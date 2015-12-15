import os
from threading import Thread
import time
import numpy as np
import sys
import grabscreean
import recorder_sound
from moviepy.editor import *

#most of this code is writen by slobacartoonac@hotmail.com

def info(title):
    print title
    print 'module name:', __name__
    if hasattr(os, 'getppid'):  
        print 'parent process:', os.getppid()
    print 'process id:', os.getpid()

def producer(frames,fps,screen,sound):
    shots=200
    time.sleep(3)
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

    original=(screen[0],screen[1])

    filename="output"
    number=0
    fpath=filename+str(number)+".mp4"
    while os.path.isfile(fpath):
        number+=1
        fpath=filename+str(number)+".mp4"
    print fpath
    out = [];
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
    if sound: os.remove("atmp.wav")
    print "done "+fpath
if __name__ == '__main__':
    print "startujem proces"

    producer(24*120,24,(200,200,0,0),False)
    consumer(24*120,24,(200,200,0,0),False)

def record(duration,fps,screen,sound):
    frames=int(duration*fps)
    producer(frames,fps,screen,sound)
    consumer(frames,fps,screen,sound)
    
