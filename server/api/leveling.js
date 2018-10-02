const mongoose = require("mongoose");
const Level = mongoose.model("levels");

module.exports = app => {
  // Seed levels
  app.post("/level", async (req, res) => {
    let exp = req.body.experience;
    let newLevel;
    Level.collection.drop();
    newLevel = await new Level({
      level: 1,
      experience: exp
    }).save();
    for (let i = 1; i < 100; i++) {
      const expLevel = await Level.find({ level: i });
      console.log(expLevel[0].experience);
      let y = expLevel[0].experience * 1.2;
      newLevel = await new Level({
        level: i + 1,
        experience: Math.trunc(y)
      }).save();
    }
    res.json(newLevel);
  });
  app.get("/api/levels", async (req, res) => {
    const levels = await Level.find({});

    res.json(levels);
  });

  app.get("/api/me", async (req, res) => {
    // console.log(req.session.passport);
    // if (await req.session.passport) {
    //   return res.send(await req.session.passport);
    // }
    // res.status(404).json({ error: "Error" });
    await console.log("Auth", req.isAuthenticated());
    await console.log("API", req.user);
    res.json(req.user);
  });
};
