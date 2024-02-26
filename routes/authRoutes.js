const express = require('express');
const passport = require('passport');

const router = express.Router();

router.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }));

router.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/', successRedirect: 'http://localhost:3000/'}),
  (req, res) => {
    console.log(res);
    res.redirect('/');
  }
);

// router.get(
//   "/auth/google/callback",
//   passport.authenticate("google", {
//     successRedirect: 'http://localhost:3000/',
//     failureRedirect: "/login/failed",
//   })
// );

router.get('/auth/github', passport.authenticate('github', { scope: ['user:email'] }));

router.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/');
  }
);

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;