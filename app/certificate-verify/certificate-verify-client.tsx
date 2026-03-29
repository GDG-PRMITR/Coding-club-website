"use client";

import { FormEvent, useCallback, useEffect, useRef, useState } from "react";

type CertificateRecord = {
  id: number;
  issued_on: string;
  name: string;
  issued_by: string;
  verify_id: string;
  type: string;
  event: string;
  email?: string;
};

type VerifyResponse = {
  certificate?: CertificateRecord;
  error?: string;
};

type CertificateVerifyClientProps = {
  initialVerifyId?: string;
};

export default function CertificateVerifyClient({
  initialVerifyId = "",
}: CertificateVerifyClientProps) {
  const [verifyId, setVerifyId] = useState(initialVerifyId);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [certificate, setCertificate] = useState<CertificateRecord | null>(null);
  const [copied, setCopied] = useState(false);
  const hasAutoVerifiedRef = useRef(false);
  const resultSectionRef = useRef<HTMLElement | null>(null);

  const verifyCertificate = useCallback(async (rawVerifyId: string) => {
    const trimmed = rawVerifyId.trim().toLowerCase();
    if (!trimmed) {
      setError("Please enter a verification ID.");
      setCertificate(null);
      return;
    }

    setVerifyId(trimmed);

    setLoading(true);
    setError(null);
    setCertificate(null);

    try {
      const response = await fetch(`/api/certificate-verify?verifyId=${encodeURIComponent(trimmed)}`, {
        method: "GET",
        cache: "no-store",
      });

      const data = (await response.json()) as VerifyResponse;

      if (!response.ok || !data.certificate) {
        setError(data.error ?? "Certificate not found.");
        return;
      }

      setCertificate(data.certificate);
    } catch {
      setError("Unable to verify certificate right now. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const trimmed = initialVerifyId.trim();
    if (!trimmed || hasAutoVerifiedRef.current) return;

    hasAutoVerifiedRef.current = true;
    void verifyCertificate(trimmed);
  }, [initialVerifyId, verifyCertificate]);

  useEffect(() => {
    if (!certificate) return;
    resultSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [certificate]);

  const onVerify = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await verifyCertificate(verifyId);
  };

  const copyVerificationId = async () => {
    if (!certificate?.verify_id) return;

    try {
      await navigator.clipboard.writeText(certificate.verify_id);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-black/10 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-slate-900 sm:p-6">
        <h1 className="font-display text-3xl font-bold sm:text-4xl">Certificate Verification</h1>
        <p className="mt-3 max-w-2xl text-slate-600 dark:text-slate-300">
          Enter the certificate verification ID to validate authenticity.
        </p>

        <div className="mt-6 rounded-2xl border border-black/10 bg-slate-50/80 p-3 dark:border-white/10 dark:bg-slate-950/60 sm:border-0 sm:bg-transparent sm:p-0">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400 sm:hidden">Verification ID</p>
          <form className="flex flex-col gap-3 sm:flex-row" onSubmit={onVerify}>
            <div className="group flex h-12 flex-1 items-center rounded-2xl border border-slate-300 bg-white px-3 shadow-sm transition focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/15 dark:border-slate-700 dark:bg-slate-950 sm:h-11 sm:rounded-xl sm:px-3 sm:shadow-none">

                          <span className="mr-2 text-base text-slate-400 transition group-focus-within:text-primary">#</span>

              <span className="mx-2 h-5 w-px bg-slate-200 dark:bg-slate-700" aria-hidden="true" />
              <input
                type="text"
                value={verifyId}
                onChange={(event) => setVerifyId(event.target.value.toUpperCase())}
                placeholder="e.g. GDA2600005"
                className="h-full w-full bg-transparent text-[15px] font-medium tracking-wide text-slate-800 outline-none placeholder:font-normal placeholder:tracking-normal placeholder:text-slate-400 dark:text-slate-100 uppercase"
                autoCapitalize="characters"
                autoComplete="off"
                spellCheck={false}
                autoFocus
                inputMode="text"
                aria-label="Verification ID"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="h-12 rounded-2xl bg-primary px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-70 sm:h-11 sm:min-w-44 sm:rounded-xl sm:shadow-none"
            >
              {loading ? "Verifying..." : "Verify Certificate"}
            </button>
          </form>
        </div>

        {loading ? (
          <div
            aria-live="polite"
            className="mt-4 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600 dark:border-slate-700 dark:bg-slate-800/70 dark:text-slate-300"
          >
            Checking certificate details...
          </div>
        ) : null}

        {error ? (
          <p className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
        ) : null}
      </section>

      {certificate ? (
        <section
          ref={resultSectionRef}
          className="rounded-3xl border border-emerald-200 bg-emerald-50/60 p-6 shadow-sm dark:border-emerald-900/50 dark:bg-emerald-950/20"
        >
          <div className="mb-4 inline-flex items-center rounded-full bg-emerald-600 px-3 py-1 text-xs font-semibold text-white">
            Verified
          </div>

          <div className="mb-5 grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-emerald-200 bg-white p-3 dark:border-emerald-800 dark:bg-emerald-950/40">
              <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">Name</p>
              <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-white">{certificate.name}</p>
            </div>
            <div className="rounded-xl border border-emerald-200 bg-white p-3 dark:border-emerald-800 dark:bg-emerald-950/40">
              <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">Type</p>
              <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-white">{certificate.type}</p>
            </div>
            <div className="rounded-xl border border-emerald-200 bg-white p-3 dark:border-emerald-800 dark:bg-emerald-950/40">
              <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">Event</p>
              <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-white">{certificate.event}</p>
            </div>
          </div>

          <div className="grid gap-3 text-sm sm:grid-cols-2">
            <p className="rounded-xl border border-emerald-200 bg-white px-3 py-2 dark:border-emerald-800 dark:bg-emerald-950/40">
              <strong>Verification ID:</strong> {certificate.verify_id}
            </p>
            <p className="rounded-xl border border-emerald-200 bg-white px-3 py-2 dark:border-emerald-800 dark:bg-emerald-950/40">
              <strong>Issued By:</strong> {certificate.issued_by}
            </p>
            <p className="rounded-xl border border-emerald-200 bg-white px-3 py-2 dark:border-emerald-800 dark:bg-emerald-950/40">
              <strong>Issued On:</strong> {new Date(certificate.issued_on).toLocaleDateString("en-IN")}
            </p>
            {certificate.email ? (
              <p className="rounded-xl border border-emerald-200 bg-white px-3 py-2 dark:border-emerald-800 dark:bg-emerald-950/40">
                <strong>Email:</strong> {certificate.email}
              </p>
            ) : null}
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={copyVerificationId}
              className="rounded-lg border border-emerald-300 bg-white px-3 py-1.5 text-xs font-semibold text-emerald-700 transition hover:bg-emerald-50 dark:border-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 dark:hover:bg-emerald-950/60"
            >
              {copied ? "Copied ID" : "Copy Verification ID"}
            </button>
          </div>
        </section>
      ) : null}
    </div>
  );
}
