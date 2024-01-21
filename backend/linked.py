import faces, transcribe, chatgpt

def change_path_separator(file_path):
    # Replace backslashes with forward slashes
    updated_path = file_path.replace('\\', '/')
    return updated_path

# assume images and audio files exist
imagepath = ""
audiopath = ""

imagepath = change_path_separator(imagepath)
audiopath = change_path_separator(audiopath)

emotions = faces.detect_faces_path(imagepath)
convo = transcribe.transc(audiopath)

res = chatgpt.suggestions(emotions, convo)

print(res)