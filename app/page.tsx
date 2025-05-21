"use client";

import { useEffect, useState } from "react";
import { fetchLeagues } from "@/lib/api";
import LeagueCard from "@/components/LeagueCard";
import SearchBar from "@/components/SearchBar";
import SportFilterDropdown from "@/components/SportFilterDropdown";
import { League } from "@/components/LeagueCard";

export default function HomePage() {
  const [leagues, setLeagues] = useState<League[]>([]);
  const [filteredLeagues, setFilteredLeagues] = useState<League[]>([]);
  const [search, setSearch] = useState("");
  const [sportFilter, setSportFilter] = useState("");

  useEffect(() => {
    fetchLeagues().then(setLeagues);
  }, []);

  useEffect(() => {
    setFilteredLeagues(
      leagues.filter((l) => {
        return (
          l.strLeague.toLowerCase().includes(search.toLowerCase()) &&
          (!sportFilter || l.strSport === sportFilter)
        );
      }),
    );
  }, [search, sportFilter, leagues]);

  return (
    <main className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Sports Leagues</h1>
      <SearchBar value={search} onChange={setSearch} />
      <SportFilterDropdown
        leagues={leagues}
        value={sportFilter}
        onChange={setSportFilter}
      />
      <div className="grid gap-4 mt-6">
        {filteredLeagues.map((league) => (
          <LeagueCard key={league.idLeague} league={league} />
        ))}
      </div>
    </main>
  );
}
