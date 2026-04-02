import Image from "next/image";

interface TeamCardProps {
  name: string;
  role?: string;
  photo?: string;
}

export default function TeamCard({ name, role, photo }: TeamCardProps) {
  return (
    <article className="rounded-2xl border border-black/10 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-slate-900">
      <div className="relative mb-3 h-40 w-full overflow-hidden rounded-xl bg-slate-100">
        {photo ? (
          <Image src={photo} alt={name} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw" className="object-cover" />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-slate-500">Photo</div>
        )}
      </div>
      <h3 className="font-semibold">{name}</h3>
      {role ? <p className="text-sm text-slate-600 dark:text-slate-300">{role}</p> : null}
    </article>
  );
}
