import { Router } from "express";
const songsRouter = Router();

let songs = [
  { id: 1, title: "Espresso", artist: "Sabrina Carpenter" },
  { id: 2, title: "DtMF", artist: "Bad Bunny" },
  { id: 3, title: "Skyfall", artist: "Adele" },
  { id: 4, title: "No Time To Die", artist: "Bille Eilish" },
  { id: 5, title: "Lush Life", artist: "Zara Larsson" },
];

//B1. Return all songs by GET
songsRouter.get('/', (req, res) => {
  const { q } = req.query;
  if (q) {
    return res.json(songs.filter(song => song.title.includes(q)));
  }
  return res.json(songs);
});

export default songsRouter;
