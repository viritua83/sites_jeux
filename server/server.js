const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const app = express();

// Middleware pour l'analyse du corps de la requête
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware pour la gestion des sessions
app.use(require('express-session')({ secret: 'your-secret-key', resave: true, saveUninitialized: true }));

// Initialiser Passport
app.use(passport.initialize());
app.use(passport.session());

// Exemple de base de données d'utilisateurs (à remplacer par une base de données réelle)
const users = [
  { id: 1, username: 'john', password: 'password123' },
  { id: 2, username: 'jane', password: 'password456' }
];

// Configuration de la stratégie locale de Passport
passport.use(new LocalStrategy((username, password, done) => {
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    return done(null, user);
  }
  return done(null, false, { message: 'Nom d\'utilisateur ou mot de passe incorrect.' });
}));

// Sérialisation de l'utilisateur
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Désérialisation de l'utilisateur
passport.deserializeUser((id, done) => {
  const user = users.find(u => u.id === id);
  done(null, user);
});

// Itinéraire de connexion
app.post('/login', passport.authenticate('local', { failureRedirect: '/login-fail' }), (req, res) => {
  res.redirect('/dashboard'); // Redirigez ici après une connexion réussie
});

// Itinéraire protégé (exemple)
app.get('/dashboard', (req, res) => {
  if (req.isAuthenticated()) {
    res.send('Bienvenue sur le tableau de bord, ' + req.user.username + '!');
  } else {
    res.redirect('/login');
  }
});

// Itinéraire de déconnexion
app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

// Lancer le serveur
const port = 3000;
app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur http://localhost:${port}`);
});
