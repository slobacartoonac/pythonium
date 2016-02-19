import pyaudio
import wave
#from multiprocessing import Process, Queue
import time
from threading import Thread
import Queue
CHUNK = 1024
FORMAT = pyaudio.paInt16
CHANNELS = 2
RATE = 44100
#this line was edited by slobacartoonac@hotmail.com
WAVE_OUTPUT_FILENAME = "atmp.wav"
#

#his line too
def record(q):
    p = pyaudio.PyAudio()
    q.put(1)
    time.sleep(0.3);
    stream = p.open(format=FORMAT,
                    channels=CHANNELS,
                    rate=RATE,
                    input=True,
                    frames_per_buffer=CHUNK)

    print("* recording")

    frames = []
    pi=1
    
    while 1:
        data = stream.read(CHUNK)
        frames.append(data)
        try:
            pi=q.get_nowait()
            if(pi==-1):
                break;
        except:
            pi=pi
            

    print("* done recording")

    stream.stop_stream()
    stream.close()
    p.terminate()
    
    wf = wave.open(WAVE_OUTPUT_FILENAME, 'wb')
    wf.setnchannels(CHANNELS)
    wf.setsampwidth(p.get_sample_size(FORMAT))
    wf.setframerate(RATE)
    wf.writeframes(b''.join(frames))
    wf.close()
    return WAVE_OUTPUT_FILENAME
