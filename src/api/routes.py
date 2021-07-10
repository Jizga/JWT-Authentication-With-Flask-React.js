"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend"
    }

    return jsonify(response_body), 200

# #Creación de un nuevo usario
@api.route('/sign_up', methods=['POST'])
def sing_up_user():
    
    #body del POST de Postman
    body_request = request.get_json()
    
    print("DATOS DESDE POSTMAN --- ", body_request)
    
    #Unión con la tabla User y con los valores de las columnas que se le dan desde Postman
    # Formato de dentro del "body_request.get" es el de Postman
    name_request = body_request.get("name", None)
    last_name_request = body_request.get("lastName", None)
    email_request = body_request.get("email", None)
    password_request = body_request.get("password", None)
    
    new_user = User(
        name = name_request, 
        last_name = last_name_request, 
        email = email_request, 
        password = password_request
        )
    
    db.session.add(new_user)
    db.session.commit()
    
    return jsonify(body_request, {"msg": "New user created"}), 200



