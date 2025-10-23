USE sdm_25_2;

INSERT INTO cidades (nome) VALUES ('Porto Alegre');

INSERT INTO cidades (nome) VALUES ('São Paulo');

INSERT INTO cidades (nome) VALUES ('Rio de Janeiro');

INSERT INTO
    clientes (
        nome,
        altura,
        nascimento,
        cidade_id
    )
VALUES (
        'Gusthavo Lourenço Rios Soares',
        1.85,
        '2005-02-28',
        1
    );

INSERT INTO
    clientes (
        nome,
        altura,
        nascimento,
        cidade_id
    )
VALUES (
        'Kauane Costa Madalena',
        1.58,
        '2004-10-06',
        1
    );

INSERT INTO
    pedidos (horario, endereco, cliente_id)
VALUES (
        '2025-02-15 12:30:12',
        'Rua Nunes 339, Medianeira',
        1
    );

INSERT INTO
    pedidos (horario, endereco, cliente_id)
VALUES (
        '2024-02-14 15:30:12',
        'Rua Nunes 339, Medianeira',
        1
    );

INSERT INTO categorias (nome) VALUES ('Eletrônicos');

INSERT INTO categorias (nome) VALUES ('Alimentos');

INSERT INTO
    produtos (
        nome,
        preco,
        quantidade,
        categoria_id
    )
VALUES (
        'Televisão 32 polegadas',
        2000,
        1,
        1
    );

INSERT INTO
    produtos (
        nome,
        preco,
        quantidade,
        categoria_id
    )
VALUES ('Cheetos', 10, 1, 2);

INSERT INTO
    pedidos_produtos (
        pedido_id,
        produto_id,
        preco,
        quantidade
    )
VALUES (1, 1, 2000, 1);

INSERT INTO
    pedidos_produtos (
        pedido_id,
        produto_id,
        preco,
        quantidade
    )
VALUES (2, 2, 10, 1);