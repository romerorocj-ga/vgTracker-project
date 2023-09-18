const Vgame = require("../models/vgame");

module.exports = {
  index,
  show,
  new: newVgame,
  create,
  edit,
  update,
};

async function index(req, res, next) {
  const vgames = await Vgame.find({});
  res.render("vgames/index", { title: "Video Games", vgames });
}

async function show(req, res, next) {
  const vgame = await Vgame.findById(req.params.id);
  res.render("vgames/show", { title: "Video Game", vgame });
}

async function newVgame(req, res) {
  res.render("vgames/new", { title: "Add Video Game", errorMsg: "" });
}

async function create(req, res, next) {
  for (let key in req.body) {
    if (req.body[key] === "") delete req.body[key];
  }

  try {
    const price = parseFloat(req.body.price);
    const vgame = await Vgame.create({
      title: req.body.title,
      system: req.body.system,
      price: price,
      releaseYear: req.body.releaseYear,
      esrbRating: req.body.esrbRating,
    });

    res.redirect(`/vgames/${vgame._id}`);
  } catch (err) {
    console.log(err);
    res.render("vgames/new", { errorMsg: err.message });
  }
}

async function edit(req, res) {
  try {
    const vgame = await Vgame.findById(req.params.id);
    if (!vgame) {
      res.redirect("/vgames");
    } else {
      res.render("vgames/edit", { title: "Edit Video Game", vgame });
    }
  } catch (err) {
    console.log(err);
    res.redirect("/vgames");
  }
}

async function update(req, res) {
  try {
    const { title, releaseYear, esrbRating, system, price } = req.body;
    const vgame = await Vgame.findById(req.params.id);

    if (!vgame) {
      return res.redirect("/vgames");
    }

    vgame.title = title;
    vgame.releaseYear = releaseYear;
    vgame.esrbRating = esrbRating;
    vgame.system = system;
    vgame.price = price;

    await vgame.save();

    res.redirect(`/vgames/${vgame._id}`);
  } catch (err) {
    console.log(err);
    res.redirect("/vgames");
  }
}
