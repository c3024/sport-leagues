export async function fetchLeagues() {
  const res = await fetch(
    "https://www.thesportsdb.com/api/v1/json/3/all_leagues.php",
  );
  const data = await res.json();
  return data.leagues;
}

const badgeCache = new Map<string, { url: string; timestamp: number }>();
const TTL = 1000 * 60 * 60; // 1 hour

type Season = {
  strBadge: string;
  strSeason: string;
};

export async function fetchBadge(id: string) {
  const now = Date.now();
  if (badgeCache.has(id)) {
    const cached = badgeCache.get(id)!;
    if (now - cached.timestamp < TTL) {
      return cached.url;
    }
  }

  const res = await fetch(
    `https://www.thesportsdb.com/api/v1/json/3/search_all_seasons.php?badge=1&id=${id}`,
  );
  const data = await res.json();

  if (!data || !data.seasons) return null;
  const badgeUrl = data.seasons.find(
    (season: Season) => season.strBadge,
  )?.strBadge;
  if (badgeUrl) {
    badgeCache.set(id, { url: badgeUrl, timestamp: now });
  }
  return badgeUrl;
}
