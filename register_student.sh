#!/bin/bash

URL="http://localhost:3000/student-portal/register"
HEADER="Content-Type: application/json"

declare -a payloads=(
'{
  "email": "alice@example.com",
  "password": "securePass1",
  "first_name": "Alice",
  "last_name": "Martin",
  "university": "Harvard",
  "linkedin_url": "https://linkedin.com/in/alicemartin",
  "starting_date": "2022-09-01",
  "ending_date": "2026-06-30",
  "profil_picture": "alice.jpg",
  "birth_date": "2001-05-21",
  "languages": ["English", "German"],
  "sector_preferences": ["Consulting", "Finance"]
}'
'{
  "email": "bob@example.com",
  "password": "securePass2",
  "first_name": "Bob",
  "last_name": "Dupont",
  "university": "Stanford",
  "linkedin_url": "https://linkedin.com/in/bobdupont",
  "starting_date": "2023-09-01",
  "ending_date": "2027-06-30",
  "profil_picture": "bob.jpg",
  "birth_date": "2002-03-12",
  "languages": ["English", "Spanish"],
  "sector_preferences": ["Technology", "Education"]
}'
'{
  "email": "charlotte@example.com",
  "password": "securePass3",
  "first_name": "Charlotte",
  "last_name": "Lemoine",
  "university": "Oxford",
  "linkedin_url": "https://linkedin.com/in/charlottelemoine",
  "starting_date": "2021-10-01",
  "ending_date": "2025-07-15",
  "profil_picture": "charlotte.jpg",
  "birth_date": "1999-08-17",
  "languages": ["French", "English"],
  "sector_preferences": ["Law", "Public Sector"]
}'
'{
  "email": "david@example.com",
  "password": "securePass4",
  "first_name": "David",
  "last_name": "Nguyen",
  "university": "Cambridge",
  "linkedin_url": "https://linkedin.com/in/davidnguyen",
  "starting_date": "2024-01-15",
  "ending_date": "2028-12-20",
  "profil_picture": "david.jpg",
  "birth_date": "2003-11-03",
  "languages": ["English", "Vietnamese"],
  "sector_preferences": ["Engineering", "Environment"]
}'
'{
  "email": "emilie@example.com",
  "password": "securePass5",
  "first_name": "Emilie",
  "last_name": "Moreau",
  "university": "Sorbonne",
  "linkedin_url": "https://linkedin.com/in/emiliemoreau",
  "starting_date": "2023-04-01",
  "ending_date": "2026-11-30",
  "profil_picture": "emilie.jpg",
  "birth_date": "2000-12-25",
  "languages": ["French", "Italian"],
  "sector_preferences": ["Art", "Culture", "Media"]
}'
'{
  "email": "frank@example.com",
  "password": "securePass6",
  "first_name": "Frank",
  "last_name": "Lopez",
  "university": "UCLA",
  "linkedin_url": "https://linkedin.com/in/franklopez",
  "starting_date": "2022-01-10",
  "ending_date": "2025-12-15",
  "profil_picture": "frank.jpg",
  "birth_date": "2001-04-05",
  "languages": ["Spanish", "English"],
  "sector_preferences": ["Healthcare", "Pharmaceuticals"]
}'
'{
  "email": "georgia@example.com",
  "password": "securePass7",
  "first_name": "Georgia",
  "last_name": "Brown",
  "university": "McGill",
  "linkedin_url": "https://linkedin.com/in/georgiabrown",
  "starting_date": "2023-02-01",
  "ending_date": "2026-10-30",
  "profil_picture": "georgia.jpg",
  "birth_date": "2002-07-19",
  "languages": ["English", "French"],
  "sector_preferences": ["Marketing", "Retail"]
}'
'{
  "email": "hugo@example.com",
  "password": "securePass8",
  "first_name": "Hugo",
  "last_name": "Fernandez",
  "university": "EPFL",
  "linkedin_url": "https://linkedin.com/in/hugofernandez",
  "starting_date": "2021-09-01",
  "ending_date": "2025-06-30",
  "profil_picture": "hugo.jpg",
  "birth_date": "2000-09-11",
  "languages": ["French", "Spanish", "English"],
  "sector_preferences": ["Technology", "AI"]
}'
'{
  "email": "ines@example.com",
  "password": "securePass9",
  "first_name": "Inès",
  "last_name": "Durand",
  "university": "Sciences Po",
  "linkedin_url": "https://linkedin.com/in/inesdurand",
  "starting_date": "2022-09-15",
  "ending_date": "2026-07-01",
  "profil_picture": "ines.jpg",
  "birth_date": "2001-02-28",
  "languages": ["French", "Arabic"],
  "sector_preferences": ["Politics", "NGOs"]
}'
'{
  "email": "julien@example.com",
  "password": "securePass10",
  "first_name": "Julien",
  "last_name": "Roux",
  "university": "Polytechnique",
  "linkedin_url": "https://linkedin.com/in/julienroux",
  "starting_date": "2024-09-01",
  "ending_date": "2028-06-30",
  "profil_picture": "julien.jpg",
  "birth_date": "2003-06-10",
  "languages": ["French", "English", "German"],
  "sector_preferences": ["Aerospace", "Defense"]
}'
)

echo "Sending registration requests..."
for payload in "${payloads[@]}"; do
  echo "Sending request for: $(echo "$payload" | grep email)"
  curl -s -X POST "$URL" -H "$HEADER" -d "$payload"
  echo -e "\n---"
done
