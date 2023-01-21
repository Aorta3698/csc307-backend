const express = require("express");
const cors = require("cors");
const app = express();
const port = 5000;

const users = {
  users_list: [
    {
      id: "xyz789",
      name: "Charlie",
      job: "Janitor",
    },
    {
      id: "abc123",
      name: "Mac",
      job: "Bouncer",
    },
    {
      id: "ppp222",
      name: "Mac",
      job: "Professor",
    },
    {
      id: "yat999",
      name: "Dee",
      job: "Aspring actress",
    },
    {
      id: "zap555",
      name: "Dennis",
      job: "Bartender",
    },
  ],
};

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;
  if (name != undefined && job != undefined) {
    res.send(
      users["users_list"].filter(
        (user) => user["name"] === name && user["job"] === job
      )
    );
  } else if (name != undefined) {
    let result = findUserByName(name);
    result = { users_list: result };
    res.send(result);
  } else {
    res.send(users);
  }
});

app.get("/users/:id", (req, res) => {
  const id = req.params["id"];
  let result = findUserById(id);
  if (result === undefined || result.length == 0) {
    res.status(404).send("Resource not found.");
  } else {
    result = { users_list: result };
    res.send(result);
  }
});

app.post("/users", (req, res) => {
  try {
    var userToAdd = req.body;
    userToAdd.id = genId();
    addUser(userToAdd);
    // var res = { users_list: userToAdd };
    res.status(201).send(userToAdd);
  } catch {
    resstatus(400).send("failure to add a user");
  }
});

app.delete("/users/:id", (req, res) => {
  console.log("what");
  const id = req.params["id"];
  const index = users["users_list"].findIndex((user) => user.id == id);
  if (index == -1) {
    res.status(400).send("record not found");
  } else {
    users["users_list"].splice(index, 1);
    res.status(200).end();
  }
  // users = users["users_list"].filter((user) => user["id"] !== id);
});
function genId() {
  var all =
    "wlypbzfoucrstgmneiaqjvdkxh/,.WLYPBZFOUCRSTGMNEIAQJVDKXH0123456789`$|&@=_+-%#*!^:([{~}]) ";
  var len = Math.random() * 100;
  var res = "";
  for (var i = 0; i < len; ++i) {
    res += all.charAt(Math.floor(Math.random() * all.length));
  }
  return res;
}
function addUser(user) {
  users["users_list"].push(user);
}
function findUserById(id) {
  return users["users_list"].find((user) => user["id"] === id);
}
const findUserByName = (name) => {
  return users["users_list"].filter((user) => user["name"] === name);
};
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
