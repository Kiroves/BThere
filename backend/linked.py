import faces, transcribe, chatgpt

def change_path_separator(file_path):
    # Replace backslashes with forward slashes
    updated_path = file_path.replace('\\', '/')
    return updated_path

# assume images and audio files exist
imagepath = r"C:\Users\jseok627\Pictures\Camera Roll\WIN_20240120_21_03_43_Pro.jpg"
audiopath = r"C:\Users\jseok627\Documents\Sound recordings\names.m4a"

imagepath = change_path_separator(imagepath)
audiopath = change_path_separator(audiopath)

emotions = faces.detect_faces_path(imagepath)
convo = transcribe.transc(audiopath)

print(emotions)
print(convo)

res = chatgpt.suggestions(emotions, convo)



print(res)