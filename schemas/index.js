const mongoose = require("mongoose");

const connect = () => {
    mongoose.connect('mongodb://127.0.0.1/admin', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: true,
      useCreateIndex: true,
      ignoreUndefined: true,
      user: "test",
      pass: "test"
    })
    .catch(err => console.log(err));
};

mongoose.connection.on("error", err => {
  console.error("몽고디비 연결 에러", err);
});

module.exports = connect;