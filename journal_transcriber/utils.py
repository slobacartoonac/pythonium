import os
import signal

def stop_existing_instance(lock_file):
    if os.path.exists(lock_file):
        with open(lock_file, "r") as f:
            try:
                pid = int(f.read().strip())
                os.kill(pid, signal.SIGINT)
                return True
            except (ValueError, ProcessLookupError):
                os.remove(lock_file)
    return False

def write_lock_file(lock_file):
    with open(lock_file, "w") as f:
        f.write(str(os.getpid()))

def remove_lock_file(lock_file):
    if os.path.exists(lock_file):
        os.remove(lock_file)