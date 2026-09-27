#!/usr/bin/env python3
"""
Questio — enregistre les questions avec une voix du Mac.

Chaque indice, et la phrase qui donne la réponse, devient un petit fichier
audio dans audio/. Le jeu les fait écouter à la place de la voix du
téléphone : la même belle voix partout, même hors ligne.

    python3 outils/enregistrer.py                 # Audrey (Premium)
    python3 outils/enregistrer.py --voix "Thomas"

Seules les phrases nouvelles ou modifiées sont enregistrées : relancer le
script après avoir ajouté ou corrigé des questions. audio/index.json garde
la trace de ce qui a été enregistré.

Nécessite macOS (commandes say, afconvert, osascript) et la voix installée :
Réglages Système → Accessibilité → Contenu énoncé → Voix du système →
Gérer les voix… → Français.
"""
import argparse
import concurrent.futures
import hashlib
import json
import os
import subprocess
import sys
import tempfile

RACINE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DOSSIER = os.path.join(RACINE, 'audio')
INDEX = os.path.join(DOSSIER, 'index.json')

# Phrases communes, hors questionnaire.
COMMUNES = {
    'essai': 'Bienvenue dans Questio ! Je suis né à Tarse. Qui suis-je ?',
    'fin': 'Bravo ! Voici le classement.',
    'fin-personne': 'Partie terminée ! La prochaine sera la bonne.',
    'volume': 'Voici le volume de Questio.',
}


def lire_questions():
    """Évalue js/questions.js avec le moteur JavaScript de macOS."""
    script = f"""
ObjC.import('Foundation');
const src = $.NSString.stringWithContentsOfFileEncodingError(
  {json.dumps(os.path.join(RACINE, 'js', 'questions.js'))}, $.NSUTF8StringEncoding, null).js;
const [a, e, f] = eval(src + '; [QUESTIONS, QUESTIONS_ENFANTS, FELICITATIONS]');
JSON.stringify({{
  questions: a.concat(e).map(q => ({{ id: q.id, reponse: q.reponse, indices: q.indices }})),
  felicitations: f
}});
"""
    sortie = subprocess.run(['osascript', '-l', 'JavaScript', '-e', script],
                            capture_output=True, text=True, check=True).stdout
    return json.loads(sortie)


def dans_la_phrase(reponse):
    """« La mer Rouge » → « la mer Rouge », pour la placer au milieu d'une phrase."""
    for article in ('Le ', 'La ', 'Les ', 'L’', "L'"):
        if reponse.startswith(article):
            return reponse[0].lower() + reponse[1:]
    return reponse


def phrases(contenu):
    """Tous les enregistrements voulus : nom de fichier → texte."""
    voulu = dict(COMMUNES)
    for rang, message in enumerate(contenu['felicitations'], 1):
        voulu[f'felicitations-{rang}'] = message
    for q in contenu['questions']:
        for rang, indice in enumerate(q['indices'], 1):
            voulu[f"{q['id']}-{rang}"] = indice
        reponse = dans_la_phrase(q['reponse'])
        voulu[f"{q['id']}-bravo"] = f'C’était {reponse}.'
        voulu[f"{q['id']}-reponse"] = f'La réponse était : {reponse}.'
    return voulu


# Silence en tête de chaque enregistrement : l'iPhone monte le son en fondu au
# début d'une lecture, et ce fondu mangeait les premières syllabes.
SILENCE_INITIAL = '[[slnc 300]] '
FORMAT = 'v2-silence-300'  # changer cette valeur fait tout réenregistrer


def empreinte(texte, voix):
    return hashlib.sha1(f'{FORMAT}\n{voix}\n{texte}'.encode('utf-8')).hexdigest()[:16]


def enregistrer(nom, texte, voix):
    cible = os.path.join(DOSSIER, nom + '.m4a')
    with tempfile.TemporaryDirectory() as tmp:
        brut = os.path.join(tmp, 'brut.aiff')
        subprocess.run(['say', '-v', voix, '-o', brut, SILENCE_INITIAL + texte], check=True)
        # AAC 16 kHz, 24 kbit/s : une voix nette, environ 4 Ko par seconde.
        subprocess.run(['afconvert', '-f', 'm4af', '-d', 'aac@16000', '-b', '24000',
                        brut, cible], check=True)
    return nom


def main():
    parametres = argparse.ArgumentParser(description=__doc__.split('\n\n')[0])
    parametres.add_argument('--voix', default='Audrey (Premium)')
    parametres.add_argument('--tout', action='store_true', help='tout réenregistrer')
    options = parametres.parse_args()

    voix_installees = subprocess.run(['say', '-v', '?'], capture_output=True, text=True).stdout
    if not any(ligne.startswith(options.voix) for ligne in voix_installees.splitlines()):
        sys.exit(f'Voix « {options.voix} » introuvable sur ce Mac. Installez-la dans les réglages.')

    os.makedirs(DOSSIER, exist_ok=True)
    index = {}
    if os.path.exists(INDEX) and not options.tout:
        with open(INDEX, encoding='utf-8') as f:
            index = json.load(f)

    voulu = phrases(lire_questions())
    a_faire = [nom for nom, texte in voulu.items()
               if index.get(nom) != empreinte(texte, options.voix)
               or not os.path.exists(os.path.join(DOSSIER, nom + '.m4a'))]

    # Les enregistrements devenus inutiles (question supprimée) sont retirés.
    for fichier in os.listdir(DOSSIER):
        nom, extension = os.path.splitext(fichier)
        if extension == '.m4a' and nom not in voulu:
            os.remove(os.path.join(DOSSIER, fichier))
            index.pop(nom, None)

    print(f'{len(voulu)} phrases, {len(a_faire)} à enregistrer avec « {options.voix} »…')
    with concurrent.futures.ThreadPoolExecutor(max_workers=6) as equipe:
        taches = [equipe.submit(enregistrer, nom, voulu[nom], options.voix) for nom in a_faire]
        for rang, tache in enumerate(concurrent.futures.as_completed(taches), 1):
            nom = tache.result()
            index[nom] = empreinte(voulu[nom], options.voix)
            if rang % 50 == 0 or rang == len(taches):
                print(f'  {rang}/{len(taches)}')

    index = {nom: index[nom] for nom in sorted(index) if nom in voulu}
    with open(INDEX, 'w', encoding='utf-8') as f:
        json.dump(index, f, ensure_ascii=False, indent=0)
        f.write('\n')

    taille = sum(os.path.getsize(os.path.join(DOSSIER, n + '.m4a')) for n in voulu)
    print(f'Terminé : {len(voulu)} enregistrements, {taille / 1e6:.1f} Mo.')


if __name__ == '__main__':
    main()
