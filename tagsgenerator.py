from flask import Flask, render_template, request, jsonify
import google.generativeai as genai

# Hardcode the API key directly (for testing purposes)
GOOGLE_API_KEY = "AIzaSyB0c1w6N9WtQ-ctUMdoojAlGr1vLAVTFcQ"

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
        # Send a message to the model to generate hashtags based on user input
        prompt = f"Generate trending hashtags for the topic: {user_input}"
        response_raw = chat.send_message(prompt)
        
        # Extract hashtags from the response
        hashtags_raw = response_raw.text
        hashtags = [tag.strip() for tag in hashtags_raw.split() if tag.startswith('#')]
        
        # Return the structured response with hashtags
        return jsonify({"hashtags": hashtags})
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)