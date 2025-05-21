import React from "react";

type Props = {
  value: string;
  onChange: (val: string) => void;
};

export default function SearchBar({ value, onChange }: Props) {
  return (
    <input
      type="text"
      placeholder="Search leagues..."
      className="w-full border p-2 rounded"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
