import os
import subprocess
import threading
import time
import datetime
from vosk import Model, KaldiRecognizer

def transcribe_audio(device, journal_file, model_path, journal_lock):
    if not os.path.exists(model_path):
        raise FileNotFoundError(f"Vosk model not found at {model_path}")
    
    model = Model(model_path)
    rec = KaldiRecognizer(model, 16000)  # SAMPLERATE is hardcoded for simplicity

    with subprocess.Popen(
        ["arecord", "-D", device, "-q", "-f", "S16_LE", "-r", "16000", "-c", "1", "-t", "raw"],
        stdout=subprocess.PIPE,
        stderr=subprocess.DEVNULL,
    ) as process, open(journal_file, "a") as journal:
        while True:
            try:
                audio_data = process.stdout.read(int(16000 * 0.5 * 2))
                if not audio_data:
                    break
                if rec.AcceptWaveform(audio_data):
                    result = rec.Result()
                    text = eval(result).get("text", "").strip()
                    if text:
                        with journal_lock:
                            journal.write(f"[{datetime.datetime.now().strftime('%H:%M:%S')}] {text}\n")
                            journal.flush()
            except KeyboardInterrupt:
                process.terminate()
                break