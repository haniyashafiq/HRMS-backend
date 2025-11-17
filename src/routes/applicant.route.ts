import { Router } from 'express';
import {
  createApplicant,
  getApplicantById,
  setPassword,
  updateApplicant,
} from '../controllers/applicant.controller.js';
import { getMyProfile } from '../controllers/applicant.profile.controller.js';
import { authenticateApplicant } from '../middlewares/auth.middleware.js';
import { upload } from '../middlewares/upload.middleware.js';
import { updateMyProfile } from '../controllers/applicant.profile.controller.js';

const router = Router();

router.post(
  '/signup',
  upload.fields([
    { name: 'profilePhoto', maxCount: 1 },
    { name: 'resume', maxCount: 1 },
    { name: 'certificates', maxCount: 10 },
  ]),
  createApplicant
);

// Authenticated routes (must be before /:id to avoid shadowing)
router.get('/me', authenticateApplicant, getMyProfile);

router.put(
  '/me',
  authenticateApplicant,
  upload.fields([
    { name: 'profilePhoto', maxCount: 1 },
    { name: 'resume', maxCount: 1 },
    { name: 'certificates', maxCount: 10 },
  ]),
  updateMyProfile
);

router.get('/:id', getApplicantById);
router.put('/:id', updateApplicant);

// Set password
router.post('/:id/set-password', setPassword);

export default router;
