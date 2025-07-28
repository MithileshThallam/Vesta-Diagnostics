import multer from 'multer';

const storage = multer.memoryStorage(); // Keep image in memory buffer
export const upload = multer({ storage });
