from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3001"}}, supports_credentials=True)


app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:RodrigoMYSQL123@127.0.0.1/Cadastro'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)


class Usuario(db.Model):
    __tablename__ = 'usuario'  
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), nullable=False)
    cpf_cnpj = db.Column(db.String(20), nullable=False)
    senha = db.Column(db.String(100), nullable=False)
    produtos = db.relationship('Produto', backref='usuario', lazy=True)

class Produto(db.Model):
    __tablename__ = 'Produto'  
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(100), nullable=False)
    preco = db.Column(db.Float, nullable=False)
    quantidade = db.Column(db.Integer, nullable=False)
    usuario_id = db.Column(db.Integer, db.ForeignKey('usuario.id'), nullable=False)

class Venda(db.Model):
    __tablename__ = 'Venda'  
    id = db.Column(db.Integer, primary_key=True)
    produto_id = db.Column(db.Integer, db.ForeignKey('Produto.id'), nullable=False)
    vendedor_id = db.Column(db.Integer, db.ForeignKey('usuario.id'), nullable=False)
    comprador_id = db.Column(db.Integer, db.ForeignKey('usuario.id'), nullable=False)
    quantidade = db.Column(db.Integer, nullable=False)
    total = db.Column(db.Float, nullable=False)

    produto = db.relationship('Produto', backref='vendas', lazy=True)
    vendedor = db.relationship('Usuario', foreign_keys=[vendedor_id], backref='vendas_feitas', lazy=True)
    comprador = db.relationship('Usuario', foreign_keys=[comprador_id], backref='vendas_recebidas', lazy=True)


@app.before_first_request
def create_tables():
    try:
        db.create_all()  
        print("Tabelas criadas com sucesso!")
    except Exception as e:
        print(f"Erro ao criar tabelas: {e}")


@app.route('/cadastrar', methods=['POST'])
def cadastrar_usuario():
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
    lista_usuarios = [{'id': u.id, 'nome': u.nome, 'email': u.email, 'cpf_cnpj': u.cpf_cnpj} for u in usuarios]
    return jsonify(lista_usuarios), 200

@app.route('/usuarios/<int:id>', methods=['PUT'])
def update_usuario(id):
    usuario = Usuario.query.get(id)
    if usuario:
       
        usuario.nome = request.json.get('nome', usuario.nome)
        usuario.email = request.json.get('email', usuario.email)
        usuario.cpf_cnpj = request.json.get('cpf_cnpj', usuario.cpf_cnpj)
        usuario.senha = request.json.get('senha', usuario.senha)

        db.session.commit()  
        return jsonify({'message': 'Usuário atualizado com sucesso'}), 200
    else:
        return jsonify({'message': 'Usuário não encontrado'}), 404


@app.route('/usuarios/<int:id>', methods=['GET'])
def get_usuario(id):
    usuario = Usuario.query.get(id)
    if usuario:
        return jsonify({
            'nome': usuario.nome,
            'email': usuario.email,
            'cpf_cnpj': usuario.cpf_cnpj,
            'senha': usuario.senha
        })
    else:
        return jsonify({'message': 'Usuário não encontrado'}), 404


@app.route('/produto', methods=['POST'])
def adicionar_produto():
    data = request.json
    usuario_id = data.get('usuario_id')

    if not usuario_id:
        return jsonify({'message': 'ID do usuário é necessário'}), 400

    novo_produto = Produto(
        nome=data['nome'],
        preco=data['preco'],
        quantidade=data['quantidade'],
        usuario_id=usuario_id
    )
    db.session.add(novo_produto)
    db.session.commit()
    return jsonify({'message': 'Produto adicionado com sucesso!'}), 201


@app.route('/produtos', methods=['GET'])
def listar_produtos():
    produtos = Produto.query.all()
    produtos_list = [
        {
            'id': p.id,
            'nome': p.nome,
            'preco': p.preco,
            'quantidade': p.quantidade,
            'usuario': p.usuario.nome if p.usuario else 'Desconhecido'
        }
        for p in produtos
    ]
    return jsonify(produtos_list), 200


@app.route('/produto/<int:id>', methods=['PUT'])
def editar_produto(id):
    data = request.json
    produto = Produto.query.get(id)
    if produto:
        produto.nome = data['nome']
        produto.preco = data['preco']
        produto.quantidade = data['quantidade']
        
        usuario_id = data.get('usuario_id')
        if usuario_id:
            produto.usuario_id = usuario_id

        db.session.commit()
        return jsonify({'message': 'Produto atualizado com sucesso!'}), 200
    return jsonify({'message': 'Produto não encontrado'}), 404


@app.route('/produto/<int:id>', methods=['GET'])
def get_produto(id):
    produto = Produto.query.get(id)
    if produto:
        return jsonify({
            'id': produto.id,
            'nome': produto.nome,
            'preco': produto.preco,
            'quantidade': produto.quantidade,
            'usuario': produto.usuario.nome if produto.usuario else 'Desconhecido'
        })
    else:
        return jsonify({'message': 'Produto não encontrado'}), 404


@app.route('/vendas', methods=['GET'])
def listar_vendas():
    vendas = Venda.query.all()
    vendas_list = [
        {
            'id': venda.id,
            'produto': venda.produto.nome,
            'vendedor': venda.vendedor.nome,
            'comprador': venda.comprador.nome,
            'quantidade': venda.quantidade,
            'total': venda.total
        }
        for venda in vendas
    ]
    return jsonify(vendas_list), 200


@app.route('/venda', methods=['POST'])
def add_venda():
    try:
        data = request.json
        produto_id = data['produto_id']
        quantidade = data['quantidade']

        
        if not isinstance(quantidade, int):
            return jsonify({'message': 'Quantidade deve ser um número inteiro'}), 400

        
        produto = Produto.query.get(produto_id)
        if not produto:
            return jsonify({'message': 'Produto não encontrado'}), 404

       
        if not isinstance(produto.quantidade, int):
            return jsonify({'message': 'Erro no estoque do produto. Valor incorreto.'}), 500

        if produto.quantidade < quantidade:
            return jsonify({'message': 'Estoque insuficiente'}), 400

        
        preco = float(produto.preco) 
        total = preco * quantidade

       
        venda = Venda(
            produto_id=produto_id,
            vendedor_id=data['vendedor_id'],
            comprador_id=data['comprador_id'],
            quantidade=quantidade,
            total=total
        )

        
        produto.quantidade -= quantidade

        db.session.add(venda)
        db.session.commit()
        return jsonify({'message': 'Venda cadastrada com sucesso!'}), 200
    except Exception as e:
        print(f"Erro ao processar a venda: {str(e)}")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
