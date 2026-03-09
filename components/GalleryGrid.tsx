"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { galleryCategories, galleryImages } from "@/data/gallery";

export default function GalleryGrid() {
  const [category, setCategory] = useState<(typeof galleryCategories)[number]>("all");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<number | null>(null);

  const filtered = useMemo(() => {
    return galleryImages.filter((item) => {
      const categoryMatch = category === "all" || item.category === category;
      const searchMatch = item.title.toLowerCase().includes(search.toLowerCase());
      return categoryMatch && searchMatch;
    });
  }, [category, search]);

  const selectedItem = selected !== null ? filtered[selected] : null;

  return (
    <section>
      <div className="mb-6 flex flex-wrap gap-3">
        {galleryCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setCategory(cat);
              setSelected(null);
            }}
            className={`rounded-full px-4 py-2 text-sm font-medium capitalize ${
              category === cat
                ? "bg-primary text-white"
                : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200"
            }`}
          >
            {cat}
          </button>
        ))}
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search gallery..."
          className="min-w-52 rounded-full border border-black/10 px-4 py-2 text-sm dark:border-white/10 dark:bg-slate-900"
          aria-label="Search gallery"
        />
      </div>

      <div className="columns-1 gap-4 space-y-4 sm:columns-2 lg:columns-3">
        {filtered.map((item, index) => (
          <button key={item.id} className="relative block w-full overflow-hidden rounded-xl" onClick={() => setSelected(index)}>
            <Image src={item.src} alt={item.title} width={800} height={900} className="h-auto w-full object-cover" />
          </button>
        ))}
      </div>

      {selectedItem ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
          <button className="absolute right-4 top-4 text-white" onClick={() => setSelected(null)} aria-label="Close image">
            ✕
          </button>
          <button
            className="absolute left-3 rounded-full bg-white/20 px-3 py-2 text-white"
            onClick={() => setSelected((prev) => (prev !== null && prev > 0 ? prev - 1 : prev))}
            aria-label="Previous"
          >
            ←
          </button>
          <div className="max-w-4xl overflow-hidden rounded-2xl bg-white p-2">
            <Image src={selectedItem.src} alt={selectedItem.title} width={1200} height={800} className="h-auto w-full rounded-xl" />
            <p className="p-2 text-sm">{selectedItem.title}</p>
          </div>
          <button
            className="absolute right-3 rounded-full bg-white/20 px-3 py-2 text-white"
            onClick={() =>
              setSelected((prev) =>
                prev !== null && prev < filtered.length - 1 ? prev + 1 : prev,
              )
            }
            aria-label="Next"
          >
            →
          </button>
        </div>
      ) : null}
    </section>
  );
}
