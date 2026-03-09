interface IconProps {
  className?: string;
}

export function InstagramIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.2" cy="6.8" r="1.2" fill="currentColor" />
    </svg>
  );
}

export function LinkedInIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="4" stroke="currentColor" strokeWidth="1.8" />
      <path d="M8 10V16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="8" cy="7.5" r="1" fill="currentColor" />
      <path d="M12 16V12.8C12 11.6 13 10.8 14 10.8C15.2 10.8 16 11.6 16 13V16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function GitHubIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M12 3.5C7.3 3.5 3.5 7.4 3.5 12.1C3.5 15.9 6 19.1 9.5 20.2V18.5C7.2 19 6.7 17.4 6.7 17.4C6.3 16.3 5.7 16 5.7 16C4.8 15.4 5.8 15.4 5.8 15.4C6.8 15.4 7.3 16.4 7.3 16.4C8.2 17.9 9.7 17.5 10.2 17.3C10.3 16.6 10.6 16.1 11 15.8C9 15.6 6.9 14.8 6.9 11.1C6.9 10 7.3 9.1 7.9 8.4C7.8 8.1 7.5 7 8 5.6C8 5.6 8.9 5.3 11 6.7C11.8 6.5 12.6 6.4 13.4 6.4C14.2 6.4 15 6.5 15.8 6.7C17.9 5.3 18.8 5.6 18.8 5.6C19.3 7 19 8.1 18.9 8.4C19.5 9.1 19.9 10 19.9 11.1C19.9 14.8 17.8 15.6 15.8 15.8C16.3 16.2 16.6 16.9 16.6 17.9V20.2C20.1 19.1 22.5 15.9 22.5 12.1C22.5 7.4 18.7 3.5 14 3.5H12Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function MailIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M4 7L12 12.5L20 7" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );
}
