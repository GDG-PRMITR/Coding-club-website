"use client";

import { useState } from "react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!email.includes("@")) {
      setMessage("Please enter a valid email address.");
      return;
    }
    setMessage("Thanks for subscribing! We will keep you posted.");
    setEmail("");
  };

  return (
    <form onSubmit={onSubmit} className="flex w-full max-w-md flex-col gap-3" aria-label="Newsletter signup">
      <label htmlFor="newsletter-email" className="text-sm font-medium">
        Newsletter signup
      </label>
      <div className="flex gap-2">
        <input
          id="newsletter-email"
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="w-full rounded-md border border-white/30 bg-white/10 px-3 py-2 text-white placeholder:text-white/80"
          placeholder="you@example.com"
        />
        <button type="submit" className="rounded-md bg-white px-4 py-2 font-semibold text-primary">
          Subscribe
        </button>
      </div>
      {message ? <p className="text-sm text-white/90">{message}</p> : null}
    </form>
  );
}
