from flask import Blueprint, request, jsonify
from bson.objectid import ObjectId
from mongo import db

bp = Blueprint('compromissos', __name__, url_prefix='/compromissos')

@bp.route('', methods=['GET'])
def listar_compromissos_sem_barra():
    return listar_compromissos()

@bp.route('', methods=['POST'])
def criar_compromisso_sem_barra():
    return criar_compromisso()

def objid(id_str):
    try:
        return ObjectId(id_str)
    except:
        return None

@bp.route('/', methods=['GET'])
def listar_compromissos():
    items = list(db.compromissos.find())
    for it in items:
        it['_id'] = str(it['_id'])
    return jsonify(items), 200

@bp.route('/', methods=['POST'])
def criar_compromisso():
    data = request.get_json()
    required = ['data', 'horario', 'titulo']
    for r in required:
        if r not in data:
            return jsonify({"error": f"campo '{r}' obrigatório"}), 400
    doc = {
        "data": data.get("data"),
        "horario": data.get("horario"),
        "titulo": data.get("titulo"),
        "descricao": data.get("descricao", ""),
        "pessoas": data.get("pessoas", [])
    }
    res = db.compromissos.insert_one(doc)
    doc['_id'] = str(res.inserted_id)
    return jsonify(doc), 201

@bp.route('/<id>', methods=['PUT'])
def atualizar_compromisso(id):
    _id = objid(id)
    if not _id:
        return jsonify({"error": "id inválido"}), 400
    data = request.get_json()
    update = {}
    for field in ['titulo', 'descricao', 'data', 'horario']:
        if field in data:
            update[field] = data[field]
    if not update:
        return jsonify({"error": "nenhum campo para atualizar"}), 400
    res = db.compromissos.update_one({'_id': _id}, {'$set': update})
    if res.matched_count == 0:
        return jsonify({"error": "compromisso não encontrado"}), 404
    doc = db.compromissos.find_one({'_id': _id})
    doc['_id'] = str(doc['_id'])
    return jsonify(doc), 200

@bp.route('/<id>/pessoas', methods=['PATCH'])
def alterar_pessoas(id):
    _id = objid(id)
    if not _id:
        return jsonify({"error": "id inválido"}), 400
    data = request.get_json()
    pessoas = data.get('pessoas')
    if not isinstance(pessoas, list):
        return jsonify({"error": "pessoas deve ser lista"}), 400
    db.compromissos.update_one({'_id': _id}, {'$set': {'pessoas': pessoas}})
    doc = db.compromissos.find_one({'_id': _id})
    doc['_id'] = str(doc['_id'])
    return jsonify(doc), 200

@bp.route('/<id>/pessoas/<email>', methods=['DELETE'])
def remover_pessoa(id, email):
    _id = objid(id)
    if not _id:
        return jsonify({"error": "id inválido"}), 400
    db.compromissos.update_one({'_id': _id}, {'$pull': {'pessoas': {'email': email}}})
    doc = db.compromissos.find_one({'_id': _id})
    doc['_id'] = str(doc['_id'])
    return jsonify(doc), 200

@bp.route('/<id>', methods=['DELETE'])
def excluir_compromisso(id):
    _id = objid(id)
    if not _id:
        return jsonify({"error": "id inválido"}), 400
    res = db.compromissos.delete_one({'_id': _id})
    if res.deleted_count == 0:
        return jsonify({"error": "compromisso não encontrado"}), 404
    return jsonify({"status": "removido"}), 200
