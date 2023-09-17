const Vgame = require("../models/vgame");

module.exports = {
  index,
  show,
  new: newVgame,
  create,
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
    const vgame = await Vgame.create({
      title: req.body.title,
      system: req.body.system,
      price: req.body.price,
      releaseYear: req.body.releaseYear,
      esrbRating: req.body.esrbRating,
    });

    res.redirect(`/vgames/${vgame._id}`);
  } catch (err) {
    console.log(err);
    res.render("vgames/new", { errorMsg: err.message });
  }
}
