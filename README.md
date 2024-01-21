# BThere - Be there for your friends!

## Inspiration

BThere was born out of the desire to strengthen and deepen friendships by addressing the challenges many face in understanding their friends on a deeper level. The team recognized the subtle nuances in conversations that often go unnoticed, hindering the ability to provide meaningful support or engage in truly fulfilling interactions. This project seeks to utilize advanced technologies to enhance our understanding of our friends' emotions, preferences, and interests, ultimately fostering stronger and more genuine connections.

## What it does

BThere is a friend-assisting application that utilizes cutting-edge technologies to analyze conversations and provide insightful suggestions for users to connect with their friends on a deeper level. By recording conversations through video, the application employs Google Cloud's facial recognition and speech-to-text APIs to understand the friend's mood, likes, and dislikes. The OpenAI API generates personalized suggestions based on this analysis, offering recommendations to uplift a friend in moments of sadness or providing conversation topics and activities for neutral or happy states. The backend, powered by Python Flask, handles data storage using Firebase for authentication and data persistence. The frontend is developed using React, JavaScript, Next.js, HTML, and CSS, creating a user-friendly interface for seamless interaction.

## How we built it

BThere involves a multi-faceted approach, incorporating various technologies and platforms to achieve its goals. The recording feature utilizes WebRTC for live video streaming to the backend through sockets, but also allows users to upload videos for analysis. Google Cloud's facial recognition API identifies facial expressions, while the speech-to-text API extracts spoken content. The combination of these outputs serves as input for the OpenAI API, generating personalized suggestions. The backend, implemented in Python Flask, manages data storage in Firebase, ensuring secure authentication and persistent data access. The frontend, developed using React, JavaScript, Next.js, HTML, and CSS, delivers an intuitive user interface.

## Accomplishments that we're proud of

- Successfully integrating multiple technologies into a cohesive and functional application
- Developing a user-friendly frontend for a seamless experience
- Implementing real-time video streaming using WebRTC and sockets
- Leveraging Google Cloud and OpenAI APIs for advanced facial recognition, speech-to-text, and suggestion generation

## What's next for BThere

- Continuously optimizing the speech to text and emotion analysis model for improved accuracy with different accents, speech mannerisms, and languages
- Exploring advanced natural language processing (NLP) techniques to enhance conversational analysis
- Enhancing user experience through further personalization and more privacy features
- Conducting user feedback sessions to refine and expand the application's capabilities

## Built With

- CSS
- HTML5
- JavaScript
- React
- Next.js
- Firebase
- OpenAI API
- Google Cloud API
- Python
- Flask
- WebRTC

## Try it out

To experience the power of BThere, cd into backend and run ```python ./endpoints.py```. Then cd into frontend and install dependencies using ```npm i```. Then use ```npm run dev``` to run the frontend on localhost:3000/. Start building stronger connections with your friends today!
