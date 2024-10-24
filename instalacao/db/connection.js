import { Sequelize } from "sequelize";

const sequelize = new Sequelize('sequelize', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

try {
    await sequelize.authenticate();
    console.log('Conexão com o Banco de Dados Ok!');
} catch (error) {
    console.log('Erro ao se conectar com o Banco de Dados: ' + error);
}

export { sequelize };