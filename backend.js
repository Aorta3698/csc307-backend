const express = require("express");
const cors = require("cors");
const app = express();
const port = 5000;
const userServices = require("./models/user-services");

// const users = {
//   users_list: [
//     {
//       _id: "xyz789",
//       name: "Charlie",
//       job: "Janitor",
//     },
//     {
//       _id: "abc123",
//       name: "Mac",
//       job: "Bouncer",
//     },
//     {
//       _id: "ppp222",
//       name: "Mac",
//       job: "Professor",
//     },
//     {
//       _id: "yat999",
//       name: "Dee",
//       job: "Aspring actress",
//     },
//     {
//       _id: "zap555",
//       name: "Dennis",
//       job: "Bartender",
//     },
//   ],
// };

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users", async (req, res) => {
  const name = req.query.name;
  const job = req.query.job;
  // if (name != undefined && job != undefined) {
  //   res.send(
  //     users["users_list"].filter(
  //       (user) => user["name"] === name && user["job"] === job
  //     )
  //   );
  // } else if (name != undefined) {
  //   let result = findUserByName(name);
  //   result = { users_list: result };
  //   res.send(result);
  // } else {
  //   res.send(users);
  // }
  try {
    const result = await userServices.getUsers(name, job);
    res.send({ users_list: result });
  } catch (error) {
    console.log(error);
    res.status(500).send("An error ocurred in the server.");
  }
});

app.get("/users/:_id", async (req, res) => {
  const _id = req.params["id"];
  // let result = findUserBy_id(id);
  const result = await userServices.findUserBy_id(id);
  if (result === undefined || result.length == 0) {
    res.status(404).send("Resource not found.");
  } else {
    result = { users_list: result };
    res.send(result);
  }
});

app.post("/users", async (req, res) => {
  // try {
  //   var userToAdd = req.body;
  //   userToAdd._id = genId();
  //   addUser(userToAdd);
  //   res.status(201).send(userToAdd);
  // } catch {
  //   resstatus(400).send("failure to add a user");
  // }
  const user = req.body;
  user._id = genId();
  const savedUser = await userServices.addUser(user);
  if (savedUser) {
    res.status(201).send(savedUser);
  } else {
    res.status(500).end();
  }
});

app.delete("/users/:_id", (req, res) => {
  if (userServices.deleteUser(req.params["_id"])) {
    res.status(204).end();
  } else {
    res.status(404).send("record not found.");
  }
  // const _id = req.params["id"];
  // const index = users["users_list"].findIndex((user) => user._id === id);
  // if (index == -1) {
  //   res.status(404).send("record not found");
  // } else {
  //   users["users_list"].splice(index, 1);
  //   res.status(204).end();
  // }
});

function genId() {
  var all =
    "wlypbzfoucrstgmneiaqjvdkxhWLYPBZFOUCRSTGMNEIAQJVDKXH0123456789-_.~";
  var len = Math.random() * 100;
  var res = "";
  for (var i = 0; i < len; ++i) {
    res += all.charAt(Math.floor(Math.random() * all.length));
  }
  return res;
}

// function addUser(user) {
//   users["users_list"].push(user);
// }
// function findUserBy_id(id) {
//   return users["users_list"].find((user) => user["_id"] === id);
// }
// const findUserByName = (name) => {
//   return users["users_list"].filter((user) => user["name"] === name);
// };

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
