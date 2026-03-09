import Image from "next/image";
import { faculty } from "@/data/faculty";

export default function FacultySection() {
  return (
    <section>
      <h2 className="font-display text-3xl font-bold">Faculty Advisory</h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {faculty.map((member) => (
          <article
            key={member.name}
            className="rounded-2xl border border-black/10 bg-white p-4 text-center shadow-sm dark:border-white/10 dark:bg-slate-900"
          >
            <div className="relative mx-auto mb-3 aspect-[4/5] w-full max-w-[180px] overflow-hidden rounded-xl bg-slate-100">
              <Image src={member.photo} alt={member.name} fill className="object-cover object-top" unoptimized />
            </div>
            <h3 className="font-semibold text-slate-900 dark:text-slate-100">{member.name}</h3>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{member.role}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
