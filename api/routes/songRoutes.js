import express from "express"

import {
    addSongController,
    getSongController,
    updateSongController,
    deleteSongController,

} from "../controllers/songController.js"

const router = express.Router();

router.get("/:songId",getSongController);
router.post("/",addSongController);
router.put("/",updateSongController);
router.delete("/:songId",deleteSongController);

export default router;