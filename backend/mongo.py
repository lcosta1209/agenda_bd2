from pymongo import MongoClient
from config import MONGO_URI, DB_NAME

client = MongoClient(MONGO_URI, serverSelectionTimeoutMS=5000)
db = client[DB_NAME]

def test_connection():
    try:
        client.server_info()
        return True, None
    except Exception as e:
        return False, str(e)
