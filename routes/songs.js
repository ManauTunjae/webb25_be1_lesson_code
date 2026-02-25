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

//B2. Return a song which matching id
songsRouter.get('/:id', (req, res) => {
  const id = Number(req.params.id)
  if (isNaN(id)) {
    return res.status(400).json({
      message: 'Id has to be a valid number'
    })
  }

  const songList = songs.find(s => s.id === id)
  if (!songList) {
    return res.status(404).json({
      message: 'Song does not exist!'
    })
  }
  return res.json(songList);
})

//B3. CREATE song by.post
songsRouter.post('/', (req, res) => {
  const { title, artist } = req.body
  if (!title || typeof title !== "string" || !artist || typeof artist !== "string") {
    return res.status(400).json({
      message: "Songs or artist have to be a valid string!"
    })
  }

  const lastId = Math.max(...songs.map(s => s.id))
  const newSong = {
    id: lastId + 1,
    title,
    artist
  }
  songs.push(newSong)
  return res.status(201).json(newSong)
})

//B4. UPDATE songs by .put /:id
songsRouter.put('/:id', (req, res) => {
  const id = Number(req.params.id)
  const song = songs.find(s => s.id === id)
  if (!song) {
    return res.status(404).json({
      message: 'Song does not exist!'
    })
  }

  const { title, artist } = req.body
  if (!title || typeof title !== "string" || !artist || typeof artist !== "string") {
    return res.status(400).json({
      message: "Songs or artist have to be a valid string!"
    })
  }
  song.title = title;
  song.artist = artist;
  return res.status(200).json(song) 
})

export default songsRouter;
