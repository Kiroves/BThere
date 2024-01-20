from google.cloud import vision
client = vision.ImageAnnotatorClient()

def detect_faces_path(path):
    """Detects faces in an image."""
    with open(path, "rb") as image_file:
        content = image_file.read()
    detect_faces(content)


def detect_faces_image(image):
    """Detects faces in an image."""
    # what file type might it capture?

    # detect_faces(content)


def detect_faces(content):
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
    print("Faces:")

    for face in faces:
        print(f"anger: {likelihood_name[face.anger_likelihood]}")
        print(f"joy: {likelihood_name[face.joy_likelihood]}")
        print(f"surprise: {likelihood_name[face.surprise_likelihood]}")
        print(f"sorrow: {likelihood_name[face.sorrow_likelihood]}")

        vertices = [
            f"({vertex.x},{vertex.y})" for vertex in face.bounding_poly.vertices
        ]

        print("face bounds: {}\n".format(",".join(vertices)))

    if response.error.message:
        raise Exception(
            "{}\nFor more info on error messages, check: "
            "https://cloud.google.com/apis/design/errors".format(response.error.message)
        )