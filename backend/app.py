from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:RodrigoMYSQL123@127.0.0.1/Cadastro'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)


class Usuario(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), nullable=False)
    cpf_cnpj = db.Column(db.String(20), nullable=False)
    senha = db.Column(db.String(100), nullable=False)


@app.before_first_request
def create_tables():
    db.create_all()


@app.route('/cadastrar', methods=['POST'])
def cadastrar_usuario():
    print("Requisição recebida!")  
    data = request.json
    nome = data['nome']
    email = data['email']
    cpf_cnpj = data['cpf_cnpj']
    senha = data['senha']

    novo_usuario = Usuario(nome=nome, email=email, cpf_cnpj=cpf_cnpj, senha=senha)
    db.session.add(novo_usuario)
    db.session.commit()

    return jsonify({'message': 'Cadastro realizado com sucesso!'}), 200



@app.route('/usuarios', methods=['GET'])
def listar_usuarios():
    usuarios = Usuario.query.all()
    lista_usuarios = []
    for usuario in usuarios:
        lista_usuarios.append({
            'id': usuario.id,
            'nome': usuario.nome,
            'email': usuario.email,
            'cpf_cnpj': usuario.cpf_cnpj
        })
    return jsonify(lista_usuarios), 200

if __name__ == '__main__':
    app.run(debug=True)
