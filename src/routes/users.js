const express = require('express');
const router = new express.Router();

const authHeaderValidation = require('../middlewares/authHeaderValidation');
const upload = require('../middlewares/notices/upload');
const userBodyValidation = require('../middlewares/userBodyValidation/validation');
const ownBodyValidation = require('../middlewares/ownBodyValidation/validation');

const {
  registerController,
  loginController,
  refreshController,
  logoutController,
  updateFavoriteController,
  getFavoriteController,
  deleteFavoriteController,
  getCurrentUserInfoController,
  updateCurrentUserInfoController,
  updateAvatarController,
  deleteAvatarController,
} = require('../controllers/users');

const {
  getOwnController,
  addOwnController,
  deleteOwnByIdController,
} = require('../controllers/own');

router.get('/refresh', authHeaderValidation, refreshController);
router.post('/login', userBodyValidation, loginController);
router.post('/register', userBodyValidation, registerController);
router.post('/logout', authHeaderValidation, logoutController);

router.get('/current', authHeaderValidation, getCurrentUserInfoController);
router.patch(
  '/current',
  authHeaderValidation,
  userBodyValidation,
  updateCurrentUserInfoController
);

router.get('/own', authHeaderValidation, getOwnController);
router.post(
  '/own',
  authHeaderValidation,
  upload.single('pet_avatar'),
  ownBodyValidation,
  addOwnController
);
router.delete('/own/:ownId', authHeaderValidation, deleteOwnByIdController);

router.get('/favorite', authHeaderValidation, getFavoriteController);
router.patch(
  '/favorite/:noticeId',
  authHeaderValidation,
  updateFavoriteController
);
router.delete(
  '/favorite/:noticeId',
  authHeaderValidation,
  deleteFavoriteController
);

router.post(
  '/avatars',
  authHeaderValidation,
  upload.single('avatar'),
  updateAvatarController
);
router.delete('/avatars', authHeaderValidation, deleteAvatarController);

module.exports = router;
