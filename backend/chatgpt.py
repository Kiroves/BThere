import os
from openai import OpenAI
from dotenv import load_dotenv

def suggestions(emotions, convo) -> str:

    load_dotenv()

    MODEL = "gpt-3.5-turbo"

    client = OpenAI(
        # This is the default and can be omitted
        api_key=os.environ.get(os.getenv('OPENAI_API_KEY')),
    )

    stream = client.chat.completions.create(
        model=MODEL,
        messages=[{"role": "user", 
                   "content": """You will first receive the likeliness my friend is feeling the emotions of joy, 
                   sorrow, anger, and surprise, in the format: \"emotion: LIKELINESS\", separated by commas. 
                   Next, you will receive something my friend said to me. I want you to analyze these
                   and figure out if I should do something to help cheer up my friend. If the friend
                   needs my help, please inform me what I should do. Type \"I understand\" to signal
                   you understand."""},
                   {"role": "assistant", "content": "I understand."},
                   {"role": "user", "content": emotions},
                   {"role": "user", "content": convo}],
        stream=True,
    )
    ret = ""
    for chunk in stream:
        para = chunk.choices[0].delta.content
        ret += para if para != None else ""
    return ret