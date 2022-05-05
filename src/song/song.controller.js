const songModel = require("./song.model");
const csv = require('csv-parser');
const fs = require('fs');
const e = require("cors");

const get = async (req, res) => {
  try {
    const song = await songModel.get();
    return res.status(200).json(song);
  } catch (e) {
    console.log("error getting table, " + e);
  }
};
const create = (req, res) => {
  try {
    fs.createReadStream('./songlist.csv')
      .pipe(csv())
      .on('data', (row) => {
          row.toLowerCase();
          const newSong = row;
          const songCreated = songModel.create(newSong);
      })
      .on('end', () => {
          console.log('CSV file successfully processed');
      });
    } catch (e) {
      console.log("failed to read csv, " + e);
    }
  
  return res.status(201).json(songCreated);
};

module.exports = {
  create,
  get
};