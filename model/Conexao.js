import knex from 'knex';

const configuracao = {
    client: 'mysql',
    connection: {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'sdm_25_2'
    }
};

const conexao = knex(configuracao);
export default conexao;