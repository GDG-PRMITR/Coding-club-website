import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/data/config";
import { GitHubIcon, LinkedInIcon, MailIcon } from "@/components/SocialIcons";

const spotlightMembers = [
  {
    name: "Sneha Giri",
    role: "Coding Club Lead",
    photo: "/images/Sneha_Giri_Coding_Club.jpg",
    quote:
      "Dedicated to fostering a collaborative learning environment and organizing impactful coding events.",
    withLinks: true,
  },
  {
    name: "Lavannya Deshpande",
    role: "Coding Club Co-Lead",
    photo: "/images/Lavannya_Deshpande_Coding_Club.png",
    quote:
      "Dedicated to fostering a collaborative learning environment and organizing impactful coding events.",
    withLinks: false,
  },
  {
    name: "Vedant Mali",
    role: "GDGoC Organizer",
    photo: "/images/Vedant_Mali_Organiser.png",
    quote:
      "Passionate about Google technologies and community building. Leading innovative workshops and tech talks.",
    withLinks: false,
  },
  {
    name: "Adnan Ahmad",
    role: "GSA Lead",
    photo: "/images/ADNAN_AHMAD_IOT.jpg",
    quote:
      "Curious about Generative AI technologies, building a like-minded community through practical learning.",
    withLinks: true,
  },
];

function LinkChips() {
  return (
    <div className="mt-4 flex items-center gap-3">
      <Link
        href="mailto:codingclub@prmitr.in"
        className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-white text-slate-700 shadow-sm ring-1 ring-black/10 transition hover:text-primary"
        aria-label="Mail"
      >
        <MailIcon className="h-4 w-4" />
      </Link>
      <Link
        href={siteConfig.social.github}
        target="_blank"
        rel="noreferrer"
        className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-white text-slate-700 shadow-sm ring-1 ring-black/10 transition hover:text-primary"
        aria-label="GitHub"
      >
        <GitHubIcon className="h-4 w-4" />
      </Link>
      <Link
        href={siteConfig.social.linkedin}
        target="_blank"
        rel="noreferrer"
        className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-white text-slate-700 shadow-sm ring-1 ring-black/10 transition hover:text-primary"
        aria-label="LinkedIn"
      >
        <LinkedInIcon className="h-4 w-4" />
      </Link>
    </div>
  );
}

function SpotlightCard({
  member,
  isWide = false,
}: {
  member: (typeof spotlightMembers)[number];
  isWide?: boolean;
}) {
  return (
    <article
      className={`rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm ${isWide ? "md:flex md:items-center md:gap-6" : ""}`}
    >
      <div className={`relative overflow-hidden rounded-2xl bg-slate-200 ${isWide ? "h-24 w-24" : "mx-auto h-24 w-24"}`}>
        <Image src={member.photo} alt={member.name} fill className="object-cover" />
      </div>
      <div className={isWide ? "mt-0" : "mt-4 text-center"}>
        <h3 className="font-display text-3xl font-bold text-slate-900 md:text-2xl">{member.name}</h3>
        <p className="text-sm font-bold uppercase tracking-wide text-primary">{member.role}</p>
        <p className="mt-3 max-w-2xl text-base italic text-slate-600">&ldquo;{member.quote}&rdquo;</p>
        {member.withLinks ? <div className={isWide ? "" : "flex justify-center"}><LinkChips /></div> : null}
      </div>
    </article>
  );
}

export default function SpotlightSection() {
  return (
    <section className="space-y-6 rounded-3xl border border-black/10 bg-white p-6 dark:border-white/10 dark:bg-slate-900">
      <h2 className="font-display text-3xl font-bold">Leadership Spotlight</h2>
      <div className="grid gap-6 md:grid-cols-2">
        <SpotlightCard member={spotlightMembers[0]} />
        <SpotlightCard member={spotlightMembers[1]} />
      </div>
      <SpotlightCard member={spotlightMembers[2]} isWide />
      <SpotlightCard member={spotlightMembers[3]} isWide />
    </section>
  );
}
