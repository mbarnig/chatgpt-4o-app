# chatgpt-4o-app

❗ Problème actuel : CORS en local
Lorsque tu ouvres index.html directement depuis ton disque (via file:///...), les appels à fetch() comme :

fetch('data/quiz-list.json')
peuvent échouer à cause de la politique de sécurité CORS, car les navigateurs modernes bloquent les requêtes locales pour éviter des failles potentielles.

✅ Solutions possibles
🟢 Option 1 (Recommandée) : Utiliser un petit serveur local

Avantage : aucun changement dans le code, tout fonctionne parfaitement.

Exemple avec Python :

Dans le dossier contenant ton index.html :

# Si tu as Python 3 :
python -m http.server 8000
Puis ouvre http://localhost:8000 dans ton navigateur.

Autres alternatives :

npx serve (Node.js)
Live Server (extension VSCode)
XAMPP / MAMP
🟡 Option 2 : Charger les fichiers data/*.json en inline dans index.html

Moins flexible à long terme, mais possible.

🔴 Option 3 : Désactiver la sécurité du navigateur (⚠️ non recommandé)

Ex. lancer Chrome avec --disable-web-security : dangereux et inutile pour ce cas.

💡 Mon conseil
➡️ Utilise simplement :

python -m http.server
Et ton app multi-quiz fonctionnera parfaitement sans aucun changement de code.
