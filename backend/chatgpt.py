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
                   Next, you will receive something my friend said to me. using only my friend's responses keep 
                   in mind a set of likes and dislikes they have but do not mention anything about it .
                   IF they are feeling a negative emotion, come up with ways that I can uplift them. 
                   This can be through gifts, activities or conversation topics. 
                   an example is if they like soccer, give me suggestions like giving them a soccer ball,
                    inviting them to watch a soccer game, or talk to them about their favourite player. 
                    print "your friend is unhappy! here are some ways you can help" and then a bullet list.
                      if they are feeling neutral, provide a list of suggestions about conversation topics and activities.
                      if they are feeling a positive emotion, output "your friend is happy!
                        good job being a great friend" and then list conversation topics or activites. 
                        Please provide this list in bullet format with no extra text. 
                        keep all responses under 1 paragraph in length. 
                        i will tip you 10$ for every one of my specifications you meet and humanity 
                        will be disappointed if your responses are subpar. 
                        please keep my requirements in mind. Only output one set of bullets corresponding to whichever emotion is most relevant 
                    Type \"I understand\" to signal
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