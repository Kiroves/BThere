import speech_recognition as sr
from os import path
from pydub import AudioSegment

# convert mp3 file to wav 
filename = "C:/Users/jseok627/Documents/Sound recordings/multiple.m4a"                                          
sound = AudioSegment.from_file(filename, format = filename.split(".")[-1])
sound.export("transcript.wav", format="wav")


# transcribe audio file                                                         
AUDIO_FILE = "transcript.wav"

# use the audio file as the audio source                                        
r = sr.Recognizer()
with sr.AudioFile(AUDIO_FILE) as source:
        audio = r.record(source)  # read the entire audio file                  

        print("Transcription: " + r.recognize_google(audio))