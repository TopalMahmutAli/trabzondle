<template>
  <div class="mode-classique">
    <h2>Mode Classique - Devine le joueur de Trabzonspor !</h2>

   <div class="barre-saisie">
  <input
    list="joueurs-list"
    v-model="recherche"
    @keyup.enter="testerJoueur"
    placeholder="Devine un joueur !"
  />
  <datalist id="joueurs-list">
    <option v-for="joueur in joueurs" :value="joueur.nom" />
  </datalist>
  <button @click="testerJoueur">🔎</button>
</div>


    <div class="table-essais">
  <table v-if="essais.length">
    <thead>
      <tr>
        <th>Champion</th>
        <th>Poste</th>
        <th>Nationalité</th>
        <th>Pied</th>
        <th>Année Naissance</th>
        <th>Années au Club</th>
        <th>Club actuel</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="essai in essais" :key="essai.id">
        <td>
          <img :src="essai.photo" width="40" />
          {{ essai.nom }}
        </td>
        <td :class="couleur(essai.poste, joueurMystere.poste)">{{ essai.poste }}</td>
        <td :class="couleur(essai.nationalite, joueurMystere.nationalite)">{{ essai.nationalite }}</td>
        <td :class="couleur(essai.pied, joueurMystere.pied)">{{ essai.pied }}</td>
        <td :class="couleurNombre(essai.annee_naissance, joueurMystere.annee_naissance)">
          {{ essai.annee_naissance }}
          <span v-if="essai.annee_naissance !== joueurMystere.annee_naissance">
            {{ fleche(essai.annee_naissance, joueurMystere.annee_naissance) }}
          </span>
        </td>
        <td :class="couleurNombre(essai.annees_club, joueurMystere.annees_club)">
          {{ essai.annees_club }}
          <span v-if="essai.annees_club !== joueurMystere.annees_club">
            {{ fleche(essai.annees_club, joueurMystere.annees_club) }}
          </span>
        </td>
        <td :class="couleur(essai.toujours_au_club, joueurMystere.toujours_au_club)">
          {{ essai.toujours_au_club ? 'Oui' : 'Non' }}
        </td>
      </tr>
    </tbody>
  </table>
</div>



    <p v-if="gagne">🎉 Bravo ! C'était {{ joueurMystere.nom }}</p>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'ModeClassique',
  data() {
    return {
      joueurs: [],
      joueurMystere: null,
      recherche: '',
      essais: [],
      gagne: false,
    }
  },
  async created() {
    const res = await axios.get('http://localhost:3000/joueurs')
    this.joueurs = res.data
    this.joueurMystere = this.joueurs[Math.floor(Math.random() * this.joueurs.length)]
  },
  methods: {
    testerJoueur() {
      const proposition = this.joueurs.find(j => j.nom.toLowerCase() === this.recherche.toLowerCase())
      if (proposition) {
        this.essais.push(proposition)
        if (proposition.id === this.joueurMystere.id) {
          this.gagne = true
        }
      }
      this.recherche = ''
    },
    afficherIndice(joueur) {
      const indicateurs = []
      indicateurs.push(`Poste: ${joueur.poste === this.joueurMystere.poste ? '✅' : '❌'}`)
      indicateurs.push(`Nationalité: ${joueur.nationalite === this.joueurMystere.nationalite ? '✅' : '❌'}`)
      // Ajoute d'autres comparaisons comme annee_naissance, pied, etc.
      return indicateurs.join(', ')
    },
    couleur(valeur, valeurCorrecte) {
    if (valeur === valeurCorrecte) return 'correct';
    if (typeof valeur === 'string' && valeurCorrecte.includes(valeur)) return 'partiel';
    return 'incorrect';
  },
  couleurNombre(val, correct) {
    if (val === correct) return 'correct';
    return 'incorrect';
  },
  fleche(val, correct) {
    return val < correct ? '⬆️' : '⬇️';
  },
  testerJoueur() {
    const joueur = this.joueurs.find(j => j.nom.toLowerCase() === this.recherche.toLowerCase());
    if (joueur && !this.essais.includes(joueur)) {
      this.essais.push(joueur);
      if (joueur.id === this.joueurMystere.id) this.gagne = true;
    }
    this.recherche = '';
  },
  }
}
</script>

<style scoped>
.mode-classique {
  max-width: 600px;
  margin: auto;
  padding: 2rem;
  text-align: center;
}
input {
  padding: 0.5rem;
  width: 80%;
  margin-bottom: 1rem;
}
.correct {
  background-color: #4caf50;
  color: white;
}
.partiel {
  background-color: #ff9800;
  color: white;
}
.incorrect {
  background-color: #f44336;
  color: white;
}
.table-essais table {
  width: 100%;
  border-collapse: collapse;
}
.table-essais th, .table-essais td {
  border: 1px solid #ccc;
  padding: 8px;
  text-align: center;
}


</style>
