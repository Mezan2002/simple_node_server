const express = require("express");
const app = express();
const { MongoClient, ServerApiVersion } = require("mongodb");
const port = process.env.PORT || 5000;
const cors = require("cors");

const users = [
  { id: 1, name: "mezan", email: "mezan@gmail.com" },
  { id: 2, name: "rahman", email: "rahman@gmail.com" },
  { id: 3, name: "munna", email: "munna@gmail.com" },
];
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Simple Node Server is Running");
});

// MONGO DB EMPLEMENT
// username: dbUserMezan1
// password: VstGDKTWbWu4fuld
const uri =
  "mongodb+srv://dbUserMezan1:VstGDKTWbWu4fuld@cluster0.2ahck7i.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
async function run() {
  try {
    const usersCollection = client.db("simpleNode").collection("users");
    const user = { name: "mezanur rahman", email: "mezanur@gmail.com" };

    app.get("/users", async (req, res) => {
      const cursor = usersCollection.find({});
      const users = await cursor.toArray();
      res.send(users);
    });

    app.post("/users", async (req, res) => {
      const user = req.body;
      const result = await usersCollection.insertOne(user);
      user.id = result.insertedId;
      res.send(user);
      console.log(user);
    });
  } finally {
    // await client.close();
  }
}
run().catch((err) => console.error(err));

/* app.get("/users", (req, res) => {
  if (req.query.name) {
    const search = req.query.name;
    const filtered = users.filter((usr) => usr.name.indexOf(search) >= 0);
    res.send(filtered);
  } else {
    res.send(users);
  }
}); */

/* app.post("/users", (req, res) => {
  console.log("Post API Called");
  const user = req.body;
  user.id = users.length + 1;
  users.push(user);
  res.send(user);
}); */

app.listen(port, () => {
  console.log(`Simple Node Server is Running on Port ${port}`);
});
