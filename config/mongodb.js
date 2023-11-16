const mongoose = require("mongoose");

mongoose.connect(`mongodb://127.0.0.1:27017/nodeUtn`)
.then(() => {console.log("conectado");})
.catch((error) => console.log(error));

module.exports = mongoose;