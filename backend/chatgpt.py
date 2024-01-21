import os
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

MODEL = "gpt-3.5-turbo"

client = OpenAI(
    # This is the default and can be omitted
    api_key=os.environ.get(os.getenv('OPENAI_API_KEY')),
)

stream = client.chat.completions.create(
    model=MODEL,
    messages=[{"role": "user", "content": "What's 9 + 10?"}],
    stream=True,
)
for chunk in stream:
    print(chunk.choices[0].delta.content or "", end="")