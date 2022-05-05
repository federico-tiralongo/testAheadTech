const mongoose = require("mongoose");

const songModelSchema = mongoose.Schema({
    songName: String,
    band: String,
    year: Number
});
  
const Song = mongoose.model("songModel", songModelSchema);

const create = (song) => {
  const newSong = new Song(song);
  newSong.save(song, function (err, docs) {
    if (err) {
      return console.log(err);
    } else {
      console.log("Created Docs : ", docs);
    }
  });
};

const get = async () => {
  return await Song.find();
};

module.exports = {
  create,
  get
};