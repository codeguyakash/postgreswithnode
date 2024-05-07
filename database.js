const fs = require("fs");
const pg = require("pg");
const path = require("path");

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
  ssl: {
    rejectUnauthorized: true,
    ca: fs.readFileSync(path.join(__dirname, "ca.pem"), "utf8"),
  },
};

const client = new pg.Client(config);

client.connect(function (err) {
  if (err) throw err;

  client.query(
    "SELECT schema_name FROM information_schema.schemata;",
    [],
    function (err, result) {
      if (err) throw err;

      console.log("Schemas:");
      result.rows.forEach((row) => {
        console.log(row.schema_name);
      });

      client.end(function (err) {
        if (err) throw err;
      });
    }
  );
});
