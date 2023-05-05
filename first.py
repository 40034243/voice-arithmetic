import speech_recognition as sr
import pyttsx3
import random

# Initialize the text-to-speech engine
engine = pyttsx3.init()

# Function to generate arithmetic questions
def generate_question():
    # Randomly generate two numbers between 1 and 10
    num1 = random.randint(1, 10)
    num2 = random.randint(1, 10)
    
    # Randomly choose an arithmetic operator (+, -, *, /)
    operator = random.choice(['+', '-', '*', '/'])
    
    # Generate the question and answer
    question = f"What is {num1} {operator} {num2}?"
    answer = eval(f"{num1}{operator}{num2}")
    
    return question, answer

# Function to recognize voice commands and respond with feedback
def recognize_speech():
    # Initialize the speech recognition engine
    r = sr.Recognizer()
    
    # Use the default microphone as the audio source
    with sr.Microphone() as source:
        # Prompt the user to speak
        print("Say something!")
        engine.say("Say something!")
        engine.runAndWait()
        
        # Listen for speech input
        audio = r.listen(source)
        
    # Use Google's speech recognition service to convert speech to text
    try:
        # Recognize the speech input
        text = r.recognize_google(audio)
        
        # Check if the recognized text matches the correct answer
        question, answer = generate_question()
        if str(answer) == text:
            feedback = "Correct!"
        else:
            feedback = f"Sorry, the correct answer is {answer}."
        
    except sr.UnknownValueError:
        # Handle unrecognized speech input
        feedback = "Sorry, I didn't understand that."
        
    except sr.RequestError as e:
        # Handle speech recognition service errors
        feedback = f"Could not request results from Google Speech Recognition service; {e}"
    
    # Speak the feedback to the user
    print(feedback)
    engine.say(feedback)
    engine.runAndWait()

# Call the recognize_speech function to start the app
generate_question()
while True:
    recognize_speech()
