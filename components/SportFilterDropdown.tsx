import React from "react";
import { League } from "@/components/LeagueCard";

const getUniqueSports = (leagues: League[]) => [
  ...new Set(leagues.map((l) => l.strSport)),
];

type Props = {
  leagues: League[];
  value: string;
  onChange: (val: string) => void;
};

export default function SportFilterDropdown({
  leagues,
  value,
  onChange,
}: Props) {
  const sports = getUniqueSports(leagues);
  return (
    <select
      className="w-full border p-2 rounded mt-2"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="">All Sports</option>
      {sports.map((sport) => (
        <option key={sport} value={sport}>
          {sport}
        </option>
      ))}
    </select>
  );
}
