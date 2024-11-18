import os
def notify(message):
    os.system(f'notify-send "Journal Transcriber" "{message}"')
