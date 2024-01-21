from google.cloud import vision
client = vision.ImageAnnotatorClient()

def detect_faces_path(path) -> str:
    """Given an image path, returns a string of the emotions of the face in the image"""
    if path == "":
        return ""

    """Detects faces in an image."""
    with open(path, "rb") as image_file:
        content = image_file.read()
    return detect_faces(content)


def detect_faces_image(image):
    """Detects faces in an image."""
    # what file type might it capture?

    # detect_faces(content)


def detect_faces(content) -> str:
    image = vision.Image(content=content)
    response = client.face_detection(image=image)
    faces = response.face_annotations

    # Names of likelihood from google.cloud.vision.enums
    likelihood_name = (
        "UNKNOWN",
        "VERY_UNLIKELY",
        "UNLIKELY",
        "POSSIBLE",
        "LIKELY",
        "VERY_LIKELY",
    )
    if len(faces) == 0:
        return ""

    the_face = faces[0]
    area = 0

    for face in faces:
        

        vertices = face.bounding_poly.vertices

        testarea = (vertices[0].x - vertices[2].x) * (vertices[0].y - vertices[2].y)
        if testarea > area:
            area = testarea
            the_face = face

    if response.error.message:
        raise Exception(
            "{}\nFor more info on error messages, check: "
            "https://cloud.google.com/apis/design/errors".format(response.error.message)
        )

    anger = likelihood_name[the_face.anger_likelihood]
    joy = likelihood_name[the_face.joy_likelihood]
    surprise = likelihood_name[the_face.surprise_likelihood]
    sorrow = likelihood_name[the_face.sorrow_likelihood]
    res = "anger: {}, joy: {}, surprise: {}, sorrow: {}".format(anger, joy, surprise, sorrow)
    print(res)
    return res