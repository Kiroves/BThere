import speech_recognition as sr
from os import path
from pydub import AudioSegment
from moviepy.editor import VideoFileClip

# convert audio file to wav 

def transc(filename) -> str:
    
    # convert audio                                
    # sound = AudioSegment.from_file(file = filename)
    # sound.export("transcript.wav", format="wav")

    # convert video
    video_clip = VideoFileClip(filename)
    audio_clip = video_clip.audio
    audio_clip.write_audiofile("transcript.wav", codec='pcm_s16le')

    audio_clip.close()
    video_clip.close()

    # transcribe audio file                                                         
    AUDIO_FILE = "transcript.wav"
 
    # use the audio file as the audio source                                        
    r = sr.Recognizer()
    with sr.AudioFile(AUDIO_FILE) as source:
        audio = r.record(source)  # read the entire audio file                  

        # print("Transcription: " + r.recognize_google(audio))

        try:
            return r.recognize_google(audio)
        except Exception as e:
            print("Given video has no voices.")
            return ""