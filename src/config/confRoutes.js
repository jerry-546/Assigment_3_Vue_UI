const port = "8080";
const base_url = "http://localhost:5555";
const email = "send"
const CRUD = "/crud"
const count = "/customerCount"
const customers = "/all_customers/<int:perPage>/<int:pageNum>/<string:sortBy>/<string:ascOrDesc>/<string:search>"


module.exports = { base_url, port, email, CRUD, count, customers }