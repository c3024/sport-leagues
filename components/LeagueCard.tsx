"use client";
import { useState } from "react";
import { fetchBadge } from "@/lib/api";
import Image from "next/image";

export type League = {
  idLeague: string;
  strLeague: string;
  strSport: string;
  strLeagueAlternate?: string;
};

export default function LeagueCard({ league }: { league: League }) {
  const [badgeUrl, setBadgeUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClick = async () => {
    if (!badgeUrl) {
      setIsLoading(true);
      const badge = await fetchBadge(league.idLeague);
      if (!badge) {
        setBadgeUrl(null);
        setIsLoading(false);
        setError("No badge available");
        return;
      }
      setBadgeUrl(badge);
      setIsLoading(false);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer border p-4 rounded shadow hover:bg-gray-100 dark:hover:bg-gray-700 flex justify-between items-center bg-white dark:bg-gray-800 transition duration-200 ease-in-out"
    >
      <div>
        <div className="font-bold">{league.strLeague}</div>
        <div className="text-sm">Sport: {league.strSport}</div>
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Alt: {league.strLeagueAlternate || "No alternate name"}
        </div>
      </div>
      <div className="h-24">
        {badgeUrl ? (
          <Image
            src={badgeUrl}
            alt="Season Badge"
            width={96}
            height={96}
            className="mt-2 object-contain"
          />
        ) : isLoading ? (
          <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center">
            <span className="text-gray-500 dark:text-gray-400 text-center">
              Loading...
            </span>
          </div>
        ) : error ? (
          <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center">
            <span className="text-gray-500 dark:text-gray-400 text-center">
              {error}
            </span>
          </div>
        ) : null}
      </div>
    </div>
  );
}
