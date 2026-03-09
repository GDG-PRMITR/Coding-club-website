import Image from "next/image";
import { faculty } from "@/data/faculty";

export default function FacultySection() {
  const slidingFaculty = [...faculty, ...faculty];

  return (
    <section>
      <h2 className="font-display text-3xl font-bold">Faculty Advisory</h2>
      <div className="mt-6 overflow-hidden">
        <div className="faculty-track flex w-max gap-4 pr-4">
          {slidingFaculty.map((member, index) => (
          <article
            key={`${member.name}-${index}`}
            className="w-72 shrink-0 rounded-2xl border border-black/10 bg-white p-4 text-center dark:border-white/10 dark:bg-slate-900"
          >
            <div className="relative mx-auto mb-3 aspect-square w-20 overflow-hidden rounded-full bg-slate-100">
              <Image src={member.photo} alt={member.name} fill className="object-cover object-top" unoptimized />
            </div>
            <h3 className="font-semibold text-slate-900 dark:text-slate-100">{member.name}</h3>
            <p className="mt-1 line-clamp-2 text-sm text-slate-600 dark:text-slate-300">{member.role}</p>
          </article>
          ))}
        </div>
      </div>
    </section>
  );
}
