from flask_sqlalchemy import SQLAlchemy
# Para comprueba la contraseña
from werkzeug.security import safe_str_cmp

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    name = db.Column(db.String(120), nullable=False)
    last_name = db.Column(db.String(120), nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=True)

    def __repr__(self):
        return '<User %r>' % self.username

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
        }
        
        
#  NOTE: In a real application make sure to properly hash and salt passwords
#     # Sources : https://www.programcreek.com/python/example/92986/werkzeug.security.safe_str_cmp
#     # https://stackoverflow.com/questions/59131067/what-is-the-purpose-of-safe-string-cmp


    # Método que comprueba que la contraseña existe y que es la del usuario
    def check_password(self, password_param):
       return safe_str_cmp(self.password.encode('utf-8'), password_param.encode('utf-8'))