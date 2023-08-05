// sqlite-db.js

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./reputation.sqlite');

// Créer la table reputations
db.run(`
  CREATE TABLE IF NOT EXISTS reputations (
    guildID TEXT,
    userID TEXT PRIMARY KEY,
    reputation INTEGER DEFAULT 0
  )
`);

// Récupérer la réputation d'un utilisateur
const getReputation = (guildID, userID) => {
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM reputations WHERE userID = ? AND guildID = ?', [userID, guildID], (err, row) => {
      if (err) {
        reject(err);
        return;
      }
      
      if (row) {
        resolve(row.reputation);  
      } else {
        resolve(0);
      }
    });
  });
}

// Définir la réputation
const setReputation = (guildID, userID, reputation) => {
  return new Promise((resolve, reject) => {
    db.run('INSERT OR REPLACE INTO reputations (guildID, userID, reputation) VALUES (?, ?, ?)', 
    [guildID, userID, reputation], 
    function(err) {
      if (err) {
        reject(err);
        return;
      }
      
      resolve();
    });
  });
}

// Fermer proprement la connexion
process.on('SIGINT', () => {
  db.close();
  process.exit();
});

module.exports = {
  getReputation,
  setReputation
}