from flask import Flask, render_template, request, jsonify
import google.generativeai as genai
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Fetch the API key from environment variables
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
genai.configure(api_key=GOOGLE_API_KEY)

# Initialize the model
model = genai.GenerativeModel('gemini-1.5-flash')
chat = model.start_chat(history=[])

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/generate_hashtags', methods=['POST'])
def generate_hashtags():
    user_input = request.json.get('topic')
    if not user_input:
        return jsonify({"error": "No topic provided"}), 400
    try:
        prompt = f"Generate trending hashtags for the topic: {user_input}"
        response_raw = chat.send_message(prompt)
        hashtags_raw = response_raw.text
        hashtags = [tag.strip() for tag in hashtags_raw.split() if tag.startswith('#')]
        return jsonify({"hashtags": hashtags})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
