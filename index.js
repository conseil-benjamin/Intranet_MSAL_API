const express = require('express');
const cors = require("cors");
const dotenv = require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/v1/users", require("./routes/users.routes"));
app.use("/api/v1/auth", require("./routes/auth.routes"));
app.use("/api/v1/admin", require("./routes/admin.routes"));
app.use("/api/v1/shortcuts", require("./routes/shortcuts.routes"));
app.use("/api/v1/applications", require("./routes/applications.routes"));
app.use("/api/v1/passwords", require("./routes/passwords.routes"));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});