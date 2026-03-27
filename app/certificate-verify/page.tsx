import { redirect } from "next/navigation";

type CertificateVerifyPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function CertificateVerifyPage({ searchParams }: CertificateVerifyPageProps) {
  const params = await searchParams;
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (typeof value === "string") {
      query.set(key, value);
      return;
    }

    if (Array.isArray(value)) {
      value.forEach((item) => query.append(key, item));
    }
  });

  const search = query.toString();
  redirect(search ? `/verify?${search}` : "/verify");
}
