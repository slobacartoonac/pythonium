import threading
import sys
from notifications import notify
from transcription import transcribe_audio
from utils import stop_existing_instance, write_lock_file, remove_lock_file
from settings import MIC_DEVICE, JOURNAL_FILE, MODEL_PATH, LOCK_FILE

def main():
    journal_lock = threading.Lock()

    if stop_existing_instance(LOCK_FILE):
        sys.exit(0)
    write_lock_file(LOCK_FILE)

    try:
        mic_thread = threading.Thread(target=transcribe_audio, args=(MIC_DEVICE, JOURNAL_FILE, MODEL_PATH, journal_lock))
        mic_thread.start()
        mic_thread.join()
    except KeyboardInterrupt:
        notify("Stopping transcription...")
    finally:
        remove_lock_file(LOCK_FILE)

if __name__ == "__main__":
    main()