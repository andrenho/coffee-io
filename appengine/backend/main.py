from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/')
def root():
    return jsonify('hello')

if __name__ == '__main__':
    app.run()
