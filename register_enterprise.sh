#!/bin/bash

URL="http://localhost:3000/enterprise-portal/register"
HEADER="Content-Type: application/json"

declare -a payloads=(
'{
  "email": "startup1@example.com",
  "password": "securePass1",
  "company_name": "TechNova",
  "siret": "10000000000001",
  "description": "TechNova développe des IA pour la logistique intelligente.",
  "secteur": "Technologies",
  "is_validated": false
}'
'{
  "email": "startup2@example.com",
  "password": "securePass2",
  "company_name": "GreenFuture",
  "siret": "10000000000002",
  "description": "GreenFuture conçoit des produits écologiques pour un avenir durable.",
  "secteur": "Environnement",
  "is_validated": false
}'
'{
  "email": "startup3@example.com",
  "password": "securePass3",
  "company_name": "MedAI",
  "siret": "10000000000003",
  "description": "MedAI utilise l IA pour améliorer le diagnostic médical.",
  "secteur": "Santé",
  "is_validated": false
}'
'{
  "email": "startup4@example.com",
  "password": "securePass4",
  "company_name": "FinStart",
  "siret": "10000000000004",
  "description": "FinStart réinvente les services financiers pour les jeunes adultes.",
  "secteur": "Finance",
  "is_validated": false
}'
'{
  "email": "startup5@example.com",
  "password": "securePass5",
  "company_name": "AgroNext",
  "siret": "10000000000005",
  "description": "AgroNext développe des capteurs intelligents pour l'agriculture.",
  "secteur": "Agroalimentaire",
  "is_validated": false
}'
'{
  "email": "startup6@example.com",
  "password": "securePass6",
  "company_name": "MobilityNow",
  "siret": "10000000000006",
  "description": "Solutions de mobilité partagée pour les villes intelligentes.",
  "secteur": "Transport",
  "is_validated": false
}'
'{
  "email": "startup7@example.com",
  "password": "securePass7",
  "company_name": "EduSpark",
  "siret": "10000000000007",
  "description": "EduSpark révolutionne l'apprentissage avec des plateformes immersives.",
  "secteur": "Éducation",
  "is_validated": false
}'
'{
  "email": "startup8@example.com",
  "password": "securePass8",
  "company_name": "BuildSmart",
  "siret": "10000000000008",
  "description": "BuildSmart conçoit des bâtiments autonomes en énergie.",
  "secteur": "Construction",
  "is_validated": false
}'
'{
  "email": "startup9@example.com",
  "password": "securePass9",
  "company_name": "FoodChain",
  "siret": "10000000000009",
  "description": "Traçabilité et transparence dans la chaîne alimentaire via blockchain.",
  "secteur": "Agroalimentaire",
  "is_validated": false
}'
'{
  "email": "startup10@example.com",
  "password": "securePass10",
  "company_name": "CyberSentinel",
  "siret": "10000000000010",
  "description": "Protection des données sensibles grâce à des solutions de cybersécurité avancées.",
  "secteur": "Cybersécurité",
  "is_validated": false
}'
)

echo "Envoi des requêtes d'enregistrement d'entreprises..."
for payload in "${payloads[@]}"; do
  echo "Envoi pour : $(echo "$payload" | grep company_name)"
  curl -s -X POST "$URL" -H "$HEADER" -d "$payload"
  echo -e "\n---"
done

