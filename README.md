Pokédex – Load More Pokémon (React + Vite)

A mini Pokédex application built using React, Vite, and custom Tailwind-like utility CSS (no Tailwind/PostCSS required to run inside WebContainer/StackBlitz).
Displays Pokémon in rows of 5 cards per row, and clicking Load More loads 5 more Pokémon, creating additional rows.

This project is intentionally simple and optimized for environments where Tailwind cannot run (StackBlitz WebContainer).

🚀 Features
✔ 5 Pokémon per row

Cards are displayed in a clean grid layout:

Row 1 → 5 cards  
Row 2 → 5 cards  
Row 3 → 5 cards  
...

✔ Load More button

Each click fetches 5 more Pokémon from the PokéAPI and appends them to the bottom.

✔ Custom utility CSS (Tailwind-like)

Because Tailwind/PostCSS cannot run in StackBlitz WebContainer, this project implements a lightweight utility CSS framework manually (e.g., bg-blue-600, text-xl, border, grid-cols-5, gap-6, etc.).

✔ Prevents duplicate Pokémon

React Strict Mode re-renders effects twice — this project includes logic to ensure Pokémon are never duplicated.

✔ PokéAPI integration

Uses the official public PokéAPI (https://pokeapi.co/
) to fetch Pokémon and their details.

🧱 Tech Stack

React 18

Vite

Custom Tailwind-like CSS utilities (no Tailwind dependency)

TypeScript

PokéAPI

📁 Project Structure
src/
 ├── App.tsx                # Root component
 ├── pokemon-list.tsx       # Main Pokédex grid + API logic
 ├── utilities.css          # Tailwind-inspired utility classes
 ├── index.css              # Base styles (light/dark background)
 └── main.tsx               # App entrypoint

▶️ How It Works
1. Initial load

The app fetches:

https://pokeapi.co/api/v2/pokemon?limit=5


and displays 5 Pokémon.

2. Load More

When the button is pressed:

https://pokeapi.co/api/v2/pokemon?offset=5&limit=5
https://pokeapi.co/api/v2/pokemon?offset=10&limit=5
...


Each batch of 5 adds a new row.

3. Pokémon details

For each entry, the app fetches the detail endpoint:

https://pokeapi.co/api/v2/pokemon/{id}


to get:

Official artwork image

Pokémon types

Name

ID

🖼 UI Overview

Each card includes:

Pokémon official artwork

Pokémon ID (#0001 style)

Name

Type badges (e.g., Grass, Water, Fire)

Example:

+--------------------------------+
|   (pokemon image)              |
|   #0001                        |
|   Bulbasaur                    |
|   Grass  Poison                |
+--------------------------------+

🏗 How to Run Locally
Install dependencies:
npm install

Start the dev server:
npm run dev


App runs at:

http://localhost:5173/
