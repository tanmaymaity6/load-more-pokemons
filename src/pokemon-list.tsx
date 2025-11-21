import { useEffect, useState } from "react";

interface PokemonListItem {
  name: string;
  url: string;
}

interface PokemonDetail {
  id: number;
  name: string;
  sprites: {
    other: {
      ["official-artwork"]: {
        front_default: string;
      };
    };
  };
  types: { type: { name: string } }[];
}

const PAGE_SIZE = 5;

// REMOVE DUPLICATES (StrictMode fix)
function uniquePokemons(list: PokemonDetail[]) {
  const seen = new Set<number>();
  return list.filter((p) => {
    if (seen.has(p.id)) return false;
    seen.add(p.id);
    return true;
  });
}

export default function PokemonList() {
  const [pokemonList, setPokemonList] = useState<PokemonDetail[]>([]);
  const [nextUrl, setNextUrl] = useState(
    `https://pokeapi.co/api/v2/pokemon?limit=${PAGE_SIZE}`
  );
  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);

  async function fetchPokemonDetail(url: string): Promise<PokemonDetail> {
    const res = await fetch(url);
    return await res.json();
  }

  async function loadPokemons() {
    if (!nextUrl || loading) return;

    setLoading(true);

    const res = await fetch(nextUrl);
    const data = await res.json();

    setTotalCount(data.count);
    setNextUrl(data.next);

    const detailed = await Promise.all(
      data.results.map((p: PokemonListItem) => fetchPokemonDetail(p.url))
    );

    setPokemonList((prev) => uniquePokemons([...prev, ...detailed]));
    setLoading(false);
  }

  useEffect(() => {
    loadPokemons();
  }, []);

  // Type color mapping
  const typeColors: Record<string, string> = {
    grass: "bg-green-500",
    fire: "bg-orange-500",
    water: "bg-blue-500",
    bug: "bg-lime-600",
    flying: "bg-indigo-400",
    poison: "bg-purple-500",
    normal: "bg-gray-400",
    electric: "bg-yellow-400",
    ground: "bg-yellow-700",
    fairy: "bg-pink-400",
    fighting: "bg-red-700",
    psychic: "bg-pink-500",
    rock: "bg-yellow-800",
    ice: "bg-cyan-400",
    dragon: "bg-indigo-700",
    dark: "bg-gray-700",
    steel: "bg-gray-500",
    ghost: "bg-purple-700",
  };

  return (
    <div className="py-10 px-4 w-full overflow-hidden bg-gray-100">
      <h1 className="text-4xl font-extrabold text-red-600 mb-10 text-center">
        Pokédex
      </h1>

      {/* GRID — EXACTLY 5 CARDS PER ROW */}
      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-5
          gap-6
          w-full
        "
      >
        {pokemonList.map((poke) => (
          <div
            key={poke.id}
            className="
              rounded-xl
              bg-white
              shadow-lg
              hover:scale-[1.03]
              transition
              p-5
              border
              border-red-300
            "
          >
            <img
              src={
                poke.sprites.other["official-artwork"].front_default ||
                'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png'
              }
              alt={poke.name}
              className="w-full h-40 max-w-full max-h-full object-contain mb-4"
            />

            <p className="text-gray-500 text-sm font-mono">
              #{String(poke.id).padStart(4, "0")}
            </p>

            <h2 className="text-xl font-bold capitalize mb-3">
              {poke.name}
            </h2>

            <div className="flex flex-wrap gap-2">
              {poke.types.map((t) => (
                <span
                  key={t.type.name}
                  className={`${typeColors[t.type.name] || "bg-gray-500"}
                    text-white text-xs py-1 px-3 rounded-full`}
                >
                  {t.type.name}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Count */}
      <p className="text-center text-gray-600 mt-6">
        Showing <strong>{pokemonList.length}</strong> of{" "}
        <strong>{totalCount}</strong> Pokémon
      </p>

      {/* Load More */}
      {nextUrl && (
        <div className="text-center mt-8">
          <button
            onClick={loadPokemons}
            disabled={loading}
            className="
              bg-blue-600
              hover:bg-blue-700
              text-white
              px-8 py-3
              rounded-lg
              font-bold
              shadow-md
              transition
              disabled:opacity-50
            "
          >
            {loading ? "Loading..." : "Load more Pokémon"}
          </button>
        </div>
      )}
    </div>
  );
}
