from flask import Flask, render_template, Response
from pngm import *
import grabscreean
from win32api import GetSystemMetrics
scsize=(GetSystemMetrics(0),GetSystemMetrics(1));

image_data = grabscreean.run("",(0,0),scsize)
app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

def gen():
    while True:
        frame = write_png(grabscreean.run(image_data,(0,0),scsize),scsize[0],scsize[1]);
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n\r\n')

@app.route('/video_feed')
def video_feed():
    return Response(gen(),
                    mimetype='multipart/x-mixed-replace; boundary=frame')

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
