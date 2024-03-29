import speech_recognition as sr
from os import path
from pydub import AudioSegment
from moviepy.editor import VideoFileClip
import time

# convert audio file to wav 

def transc(filename) -> str:
    """Given a video file, transcribes the audio and returns the transcript"""

    # convert audio                                
    # sound = AudioSegment.from_file(file = filename)
    # sound.export("transcript.wav", format="wav")

    # convert video
    video_clip = VideoFileClip(filename)
    audio_clip = video_clip.audio
    AUDIO_FILE = "transcript" + time.strftime("%Y%m%d-%H%M%S") + ".wav"
    audio_clip.write_audiofile(AUDIO_FILE, codec='pcm_s16le')

    audio_clip.close()
    video_clip.close()
 
    # use the audio file as the audio source                                        
    r = sr.Recognizer()
    with sr.AudioFile(AUDIO_FILE) as source:
        audio = r.record(source)  # read the entire audio file                  
        try:
            return r.recognize_google(audio)
        except Exception as e:
            print("Given video has no voices.")
            return ""