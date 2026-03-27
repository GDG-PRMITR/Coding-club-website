export interface GalleryImage {
  id: string;
  src: string;
  title: string;
  category: "events" | "team" | "achievements";
  domain: string;
}

export const galleryImages: GalleryImage[] = [
  {
    id: "gal-1",
    src: "/gallery/web-dev-team.jpeg",
    title: "Core Team",
    category: "events",
    domain: "Core",
  },
  {
    id: "gal-2",
    src: "/gallery/all-gdg-members.jpeg",
    title: "All GDG Members",
    category: "team",
    domain: "coding-club",
  },
  {
    id: "gal-3",
    src: "/gallery/installation-ceremony-main.jpeg",
    title: "Installation Ceremony",
    category: "achievements",
    domain: "ai-ml",
  },
  {
    id: "gal-4",
    src: "/gallery/guests-on-stage.jpeg",
    title: "Guests on Stage",
    category: "events",
    domain: "ai-ml",
  },
  {
    id: "gal-5",
    src: "/gallery/students-attended.jpeg",
    title: "Students Attendance",
    category: "team",
    domain: "web-dev",
  },
  {
    id: "gal-6",
    src: "/gallery/principal-sir-on-stage.jpeg",
    title: "Principal on Stage",
    category: "achievements",
    domain: "cloud",
  },
];

export const galleryCategories = ["all", "events", "team", "achievements"] as const;
