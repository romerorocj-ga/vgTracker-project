const Vgame = require("../models/vgame");

module.exports = {
  create,
  delete: deleteReview,
};

async function create(req, res, next) {
  const vgame = await Vgame.findById(req.params.id);
  req.body.user = req.user._id;
  req.body.userName = req.user.name;
  req.body.userAvatar = req.user.avatar;
  vgame.reviews.push(req.body);
  try {
    await vgame.save();
  } catch (err) {
    console.log(err);
  }
  res.redirect(`/vgames/${vgame._id}`);
}

async function deleteReview(req, res, next) {
  const vgame = await Vgame.findOne({
    "reviews._id": req.params.id,
    "reviews.user": req.user._id,
  });
  if (!vgame) return res.redirect("/vgames");
  vgame.reviews.remove(req.params.id);
  await vgame.save();
  res.redirect(`/vgames/${vgame._id}`);
}
