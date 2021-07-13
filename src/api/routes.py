"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
# Para crear el token
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

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
    
    return jsonify(body_request), 200

@api.route('/users', methods=['GET'])
def get_users():
    body_response = User.query.all()
    users_list = []
    
    for user in body_response:
        users_list.append(user.serialize())
    
    return jsonify(users_list), 200

# -------------- Métod de login --------------
# Se usa POST porque vamos a crear un token y porque se va a coger email y contraseña, 
# datos que no deben de ser visibles en la url por seguridad
@api.route('/sign_in', methods=['POST'])
def sing_in_user():
    body_request = request.get_json()
    
    email_request = body_request.get("email", None)
    password_request = body_request.get("password", None)
    
    # Comprobación de que el usuario existe:
    if email_request == None or password_request == None:
        return jsonify({"msg": "Bad email or password"}), 401
    
    user_checked = User.query.filter_by(email = email_request).one_or_none()
    
    # Comprobación email y contraseña
    if not user_checked or not user_checked.check_password(password_request):
        return jsonify("Your credentials are wrong, please try again"), 401
    
    # NUEVO TOKEN!!
    access_token = create_access_token(identity = user_checked.serialize())
    
    return jsonify({"access_token": access_token}), 200

# ----------- Comprobación de la identidad del usario ----------
# En esta ruta hay que pasar el token creado antes, dentro de Postman, en "Authorization" o en el "Header"
@api.route("/profile", methods=["GET", "PUT"])
@jwt_required()
def user_profile():
  identity = get_jwt_identity()
  user = current_user(get_jwt_identity())

  return jsonify(user.serialize())

# ----------- Comprobación de la identidad del usario ----------
def current_user(identity):
  print(identity["id"])
  return User.query.get(identity["id"])