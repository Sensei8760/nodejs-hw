import express from 'express';
import {
  getAllNotes,
  getNoteById,
  createNote,
  deleteNote,
  updateNote
} from '../controllers/notesController.js';

const router = express.Router();

// описуємо повний шлях /notes у server.js при mounting
router.get('/', getAllNotes);
router.get('/:noteId', getNoteById);
router.post('/', createNote);
router.patch('/:noteId', updateNote);
router.delete('/:noteId', deleteNote);

export default router;
