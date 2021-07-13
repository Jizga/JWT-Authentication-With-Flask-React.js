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
    
    return jsonify(body_request), 200

@api.route('/users', methods=['GET'])
def get_users():
    body_response = User.query.all()
    users_list = []
    
    for user in body_response:
        users_list.append(user.serialize())
    
    return jsonify(users_list), 200

# -------------- Métod de login --------------



# @api.route('/sign_in', methods=['POST'])
# def sign_in_user():

#     body_params = request.get_json()

#     email = body_params.get("email", None)
#     password = body_params.get("password", None)

#     if email == None or password == None:
#         return jsonify({"msg": "Bad email or password"}), 401

#     user = User.query.filter_by(email=email).one_or_none()
#     print(user.serialize())
#     if not user or not user.check_password(password):
#       return jsonify("Your credentials are wrong, please try again"), 401

#     access_token = create_access_token(identity=user.serialize())

#     return jsonify({"access_token": access_token}), 200

# @api.route("/me", methods=["GET", "PUT"])
# @jwt_required()
# def user_profile():
#   identity = get_jwt_identity()
#   user = current_user(get_jwt_identity())

#   return jsonify(user.serialize())


# def current_user(identity):
#   print(identity["id"])
#   return User.query.get(identity["id"])