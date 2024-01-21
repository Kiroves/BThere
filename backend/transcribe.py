import speech_recognition as sr
from os import path
from pydub import AudioSegment

# convert audio file to wav 

def transc(filename) -> str:                                 
    sound = AudioSegment.from_file(file = filename)
    sound.export("transcript.wav", format="wav")

    # transcribe audio file                                                         
    AUDIO_FILE = "transcript.wav"
 
    # use the audio file as the audio source                                        
    r = sr.Recognizer()
    with sr.AudioFile(AUDIO_FILE) as source:
        audio = r.record(source)  # read the entire audio file                  

        # print("Transcription: " + r.recognize_google(audio))
        return r.recognize_google(audio)