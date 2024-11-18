
# Journal Transcriber
=======================

## Overview
------------

Journal Transcriber is a Python application that transcribes audio recordings into text using the Vosk speech recognition library. It provides a simple and efficient way to transcribe journal entries.

## Requirements
---------------

* Python 3.6+
* Vosk speech recognition library
* PyAudio library
* PortAudio library (for audio recording)
* Notify Send command

## Installation
---------------

### Step 1: Clone the repository

### Step 2: Install the required libraries

```bash
pip install vosk pyaudio portaudio
```

```bash
sudo apt-get --install install libnotify-bin notify-osd
```

### Step 3: Create a Vosk model directory and download the Vosk model file

Create a directory for the Vosk model and download the Vosk model file (e.g., `vosk-model-en-us-0.22-lgraph`) into it.

### Step 4: Update the MODEL_PATH variable in settings.py

Update the `MODEL_PATH` variable in `settings.py` to point to the Vosk model file.

## Running the Application
---------------------------

### Step 1: Run the application

```bash
python -m main
```

#### Make it searchable

Copy the `journal_transcriber.desktop` file to `/usr/share/applications/`


### Step 2: Start recording audio and transcribing it into text

The application will start recording audio and transcribing it into text.

### Step 3: Stop the transcription

Press `Ctrl+C` to stop the transcription.

## Configuration
---------------

The application uses the following configuration files:

* `settings.py`: contains settings for the application, such as the Vosk model path, audio device, and journal file path.

## Troubleshooting
------------------

* If you encounter issues with audio recording, ensure that the audio device is properly configured and that the PortAudio library is installed.
* If you encounter issues with transcription, ensure that the Vosk model is properly installed and configured.

## License
-------

This application is licensed under the ISC license.

## Contributing
--------------

Contributions are welcome! If you'd like to contribute to this project, please fork the repository and submit a pull request.

Note: This is just a sample README file, and you should update it to reflect the specific requirements and details of your project.