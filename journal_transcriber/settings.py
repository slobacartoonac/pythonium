import os
import datetime

# Paths and settings
BASE_DIR = "/home/{user}/Documents/journal_entries"
os.makedirs(BASE_DIR, exist_ok=True)
JOURNAL_FILE = os.path.join(
    BASE_DIR, f"journal_{datetime.datetime.now().strftime('%Y-%m-%d')}.txt"
)

MODEL_PATH = "/home/{user}/{path}/journal_transcriber/vosk-model-en-us-0.22-lgraph"
MIC_DEVICE = "plughw:1,0" # or other device
LOCK_FILE = "/tmp/long_running_program.lock"

# Audio settings
SAMPLERATE = 16000
CHANNELS = 1
BLOCK_DURATION = 0.5
SILENCE_TIMEOUT = 2