const router = require("express").Router();
const bcrypt = require("bcryptjs");
const Jokes = require("../jokes/jokes-model");
const jwt = require("jsonwebtoken");
const restrict = require("./authenticate-middleware");

router.post("/register", async (req, res, next) => {
  try {
    const { username } = req.body;
    const newUser = await Jokes.findBy({ username }).first();
    if (newUser) {
      return res.status(409).json({
        message: "Username already in use",
      });
    }
    res.status(201).json(await Jokes.add(req.body));
  } catch (err) {
    next(err);
  }
});

router.post("/login", async (req, res, next) => {
  const authError = {
    message: "Invalid credentials",
  };
  try {
    const user = await Jokes.findBy({ username: req.body.username }).first();
    if (!user) {
      return res.status(401).json(authError);
    }
    const isValid = await bcrypt.compareSync(req.body.password, user.password);
    if (!isValid) {
      return res.status(401).json(authError);
    }
    const tokenPayload = {
      userId: user.id,
    };
    const token = jwt.sign(tokenPayload, process.env.SECRET, {
      expiresIn: "120m",
    });
    res.cookie("token", token);
    res.status(200).json({
      message: `Welcome ${user.username}!!!`,
    });
  } catch (err) {
    next(err);
  }
});

router.delete("/logout", restrict(), async (req, res, next) => {
  try {
    res.cookie("token", "", { maxAge: 0 });
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

module.exports = router;
