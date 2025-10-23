USE sdm_25_2;

CREATE TABLE cidades (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(50)
);

CREATE TABLE clientes (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100),
    altura DOUBLE,
    nascimento DATE,
    cidade_id INT
);

CREATE TABLE pedidos (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    horario DATETIME,
    endereco VARCHAR(200),
    cliente_id INT
);

CREATE TABLE categorias (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100)
);

CREATE TABLE produtos (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100),
    preco DOUBLE,
    quantidade DOUBLE,
    categoria_id INT
);

CREATE TABLE pedidos_produtos (
    pedido_id INT,
    produto_id INT,
    preco DOUBLE,
    quantidade DOUBLE
);

ALTER TABLE clientes
ADD CONSTRAINT cidade_id FOREIGN KEY (cidade_id) REFERENCES cidades (id);

ALTER TABLE pedidos
ADD CONSTRAINT cliente_id FOREIGN KEY (cliente_id) REFERENCES clientes (id);

ALTER TABLE produtos
ADD CONSTRAINT categoria_id FOREIGN KEY (categoria_id) REFERENCES categorias (id);

ALTER TABLE pedidos_produtos
ADD CONSTRAINT pedido_id FOREIGN KEY (pedido_id) REFERENCES pedidos (id);

ALTER TABLE pedidos_produtos
ADD CONSTRAINT produto_id FOREIGN KEY (produto_id) REFERENCES produtos (id);