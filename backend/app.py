from flask import Flask, jsonify
from flask_cors import CORS
from routes.compromissos import bp as compromissos_bp
from mongo import test_connection

def create_app():
    app = Flask(__name__)
    CORS(app, origins=["http://localhost:5173"], supports_credentials=True, allow_headers=["Content-Type", "Authorization"], methods=["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"])

    app.register_blueprint(compromissos_bp)

    @app.route('/ping')
    def ping():
        ok, err = test_connection()
        if ok:
            return jsonify({"ping": "pong", "db": "ok"}), 200
        else:
            return jsonify({"ping": "pong", "db_error": err}), 500

    return app

if __name__ == "__main__":
    app = create_app()
    app.run(debug=True, port=5000)
