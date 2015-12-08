from Queue import Queue
import os
from threading import Thread
import subprocess
import time
import numpy as np
import ImageGrab
import Image
import cv2
import sys
import struct
import array
def info(title):
    print title
    print 'module name:', __name__
    if hasattr(os, 'getppid'):  # only available on Unix
        print 'parent process:', os.getppid()
    print 'process id:', os.getpid()

original =(0,0)
frames=400;
def producer(out_q):
    shots=200
    time.sleep(3)
    #info('producer line')
    with open("tmp.bin","wb") as w:
        print "start gather"
        global original
        original=(640,359)
        printscreen_pil=ImageGrab.grab().thumbnail(original, Image.ANTIALIAS)
        
        last=time.time();
        for i in xrange(frames):
            difference=(time.time()-last)
            while difference<0.08:
                difference =(time.time()-last)
                time.sleep(0.01)
            last=time.time()
            print difference
            printscreen_pil=ImageGrab.grab()
            printscreen_pil.thumbnail(original, Image.LINEAR)
            image_data = bytearray([z for l in printscreen_pil.getdata() for z in l ])
            w.write(image_data)
            shots-=1
            #print shots
        print "done gather"
    
def consumer(in_q):
    #info('consumer line')
    fourcc = cv2.cv.CV_FOURCC(*'DIVX')
    filename="output"
    number=0
    fpath=filename+str(number)+".avi"
    while os.path.isfile(fpath):
        number+=1
        fpath=filename+str(number)+".avi"
    print fpath
    out = cv2.VideoWriter(fpath,fourcc, 12, original)
    done=0;
    imagesize=original[0]*original[1]*3
    with open("tmp.bin","rb") as r:
        for i in xrange(frames):
            
            printscreen_pil = r.read(imagesize)
            if not printscreen_pil:
                print "kraj obrade"
                break
            printscreen_numpy =   np.fromstring(printscreen_pil,dtype='uint8')\
            .reshape((original[1],original[0],3))
            print printscreen_numpy.shape
            printscreen_numpy = cv2.cvtColor(printscreen_numpy,cv2.COLOR_BGR2RGB)
            #print printscreen_numpy.shape
            out.write(printscreen_numpy)
            print "O\t"+str(done)+"\n"
            done+=1
    out.release()
    print "done "+fpath
if __name__ == '__main__':
    #info('main line')
    q = Queue()
    #print "pravim proces"
    #t1 = Process(target=consumer, args=(q,))
    #t2 = Process(target=consumer, args=(q,))
    print "startujem proces"
    #t1.start()
    #print "cekam rezultat"
    #t2.start()
    producer(q)
    consumer(q)
    #print "cekam da zavrsi"
    #t1.join()
    
    
    #print "zavrsio"
    #t2.join()

