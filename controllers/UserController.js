const sequelizeDb = require("../src/config/dbConfig");
const md5 = require("md5");
const { json } = require("body-parser");
const responseModel = {
  success: false,
  data: [],
  error: [],
};
module.exports = {
  async migrar(req, res) {
    const response = { ...responseModel };
    const appId = 5045;
    const planoPadrao = 49;
    response.error = [];
    let jsonFile = require("../src/json/clientes.json");
    let queries = [];

    try {
      jsonFile = JSON.stringify(jsonFile);
      jsonFile = JSON.parse(jsonFile);
      jsonFile.forEach((element) => {
        let cpf = element.cpf;
        cpf = cpf.replace(".", "");
        cpf = cpf.replace(".", "");
        cpf = cpf.replace("-", "");
        cpf = cpf.replace("/", "");
        // let senha = cpf.slice(0, 5);
        let senha = cpf;
        const senhaEncriptada = md5(senha);
        if (element.email !== undefined) {
          queries.push(`
                INSERT INTO tbAssinantes (nome, documentacao_cpf, email, password, status, settings_conteudos, app, can_delete) 
                VALUES ('${element.nome}','${cpf}','${element.email}','${senhaEncriptada}','1','{"planos": ["${planoPadrao}"], "password_parental": null, "livemode_copa_nordeste": false, "livemode_copa_nordeste_exportar": false, "livemode_copa_nordeste_exportacao": null}', '${appId}', '1')`);
        } else {
          queries.push(`
                INSERT INTO tbAssinantes (nome, documentacao_cpf, password, status, settings_conteudos, app, can_delete) 
                VALUES ('${element.nome}','${cpf}','${senhaEncriptada}','1','{"planos": ["${planoPadrao}"], "password_parental": null, "livemode_copa_nordeste": false, "livemode_copa_nordeste_exportar": false, "livemode_copa_nordeste_exportacao": null}', '${appId}', '1')`);
        }
        response.success = queries.length > 0;
        if (response.success) {
          response.data = queries.length;
          response.success = true;
        }
        // return res.json(response);
      });
    } catch (error) {
      console.log("ERRO", error);
    }

    async function inserir(query) {
      try {
        const [, data] = await sequelizeDb.query(query);
      } catch (err) {
        console.log(err);
      }
    }

    queries.forEach((query) => {
      inserir(query);
    });
  },
};
