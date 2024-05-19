import express from 'express';
import dbStatus from '../index';

const statusRoute = express.Router();

// anyone can access these routes
statusRoute.get('/status', (req, res) => {
  if (dbStatus) res.status(200).json({ message: 'Connected with Server' });
  else res.status(500).json({ message: 'Database is not connected' });
});

export default statusRoute;
