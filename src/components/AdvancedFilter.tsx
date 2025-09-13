import { useState } from "react";

export default function AdvancedFilter({ onApply }: { onApply: (filters: any) => void }) {
  const [search, setSearch] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [bhk, setBhk] = useState("");
  const [purpose, setPurpose] = useState("");
  const [timeline, setTimeline] = useState("");
  const [source, setSource] = useState("");
  const [status, setStatus] = useState("");
  const [minBudget, setMinBudget] = useState<number>();
  const [maxBudget, setMaxBudget] = useState<number>();
  const [city, setCity] = useState("");
  const [tags, setTags] = useState("");

  const handleApply = () => {
    onApply({
      search,
      propertyType,
      bhk,
      purpose,
      timeline,
      source,
      status,
      minBudget,
      maxBudget,
      city,
      tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
    });
  };

  return (
    <div className="p-4 bg-white rounded-xl shadow mb-6 space-y-3">
      <input
        type="text"
        placeholder="Search by name, email, phone, city..."
        className="input input-bordered w-full"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <input type="text" placeholder="Property Type" value={propertyType} onChange={(e) => setPropertyType(e.target.value)} className="input input-bordered w-full" />
        <input type="text" placeholder="BHK" value={bhk} onChange={(e) => setBhk(e.target.value)} className="input input-bordered w-full" />
        <input type="text" placeholder="Purpose" value={purpose} onChange={(e) => setPurpose(e.target.value)} className="input input-bordered w-full" />
        <input type="text" placeholder="Timeline" value={timeline} onChange={(e) => setTimeline(e.target.value)} className="input input-bordered w-full" />
        <input type="text" placeholder="Source" value={source} onChange={(e) => setSource(e.target.value)} className="input input-bordered w-full" />
        <input type="text" placeholder="Status" value={status} onChange={(e) => setStatus(e.target.value)} className="input input-bordered w-full" />
        <input type="number" placeholder="Min Budget" value={minBudget} onChange={(e) => setMinBudget(Number(e.target.value))} className="input input-bordered w-full" />
        <input type="number" placeholder="Max Budget" value={maxBudget} onChange={(e) => setMaxBudget(Number(e.target.value))} className="input input-bordered w-full" />
        <input type="text" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} className="input input-bordered w-full" />
        <input type="text" placeholder="Tags (comma separated)" value={tags} onChange={(e) => setTags(e.target.value)} className="input input-bordered w-full" />
      </div>
      <Button onClick={handleApply} className="mt-2 w-full">Apply Filters</Button>
    </div>
  );
}
