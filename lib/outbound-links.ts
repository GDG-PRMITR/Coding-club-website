export const outboundLinks = {
  'gdg-community': {
    url: 'https://gdg.community.dev/gdg-on-campus-prof-ram-meghe-institute-of-technology-and-research-amravati-india/',
    label: 'GDG On Campus PRMIT&R',
  },
  'hack2skill-login': {
    url: 'https://hack2skill.com/login',
    label: 'Hack2Skill Login',
  },
  'gdp-program': {
    url: 'https://developers.google.com/program',
    label: 'Google Developer Program',
  },
  'gdp-profile': {
    url: 'https://developers.google.com/profile/u/',
    label: 'Google Developer Profile',
  },
  'solution-challenge': {
    url: 'https://promptwars.in/solutionchallenge2026.html',
    label: 'Solution Challenge 2026',
  },
  'gdp-profile-me': {
    url: 'https://developers.google.com/profile/u/me',
    label: 'My Google Developer Profile',
  },
  'h2s-dashboard': {
    url: 'https://vision.hack2skill.com/event/solution-challenge-2026/dashboard/team-management?utm_source=hack2skill&utm_medium=homepage',
    label: 'Hack2Skill Team Dashboard',
  },
  'kartik-gmail': {
    url: 'https://mail.google.com/mail/?view=cm&fs=1&to=kartikakhade12@gmail.com&su=Help%20needed%20for%20Solution%20Challenge%202026',
    label: 'Email Kartik',
  },
  'kartik-whatsapp': {
    url: 'https://wa.me/919284173690?text=Hello%20Kartik%21%20I%20am%20using%20your%20Onboarding%20Guide%20and%20need%20some%20help%20with%20Solution%20Challenge%202026.',
    label: 'Chat with Kartik on WhatsApp',
  },
  'sampada-gmail': {
    url: 'https://mail.google.com/mail/?view=cm&fs=1&to=sdeshmukh0903@gmail.com&su=Help%20needed%20for%20Solution%20Challenge%202026',
    label: 'Email Sampada',
  },
  'sampada-whatsapp': {
    url: 'https://wa.me/918668773592?text=Hello%20Sampada%21%20I%20am%20using%20your%20Onboarding%20Guide%20and%20need%20some%20help%20with%20Solution%20Challenge%202026.',
    label: 'Chat with Sampada on WhatsApp',
  },
} as const

export type OutboundLinkKey = keyof typeof outboundLinks

export function getOutboundLink(key: string) {
  return outboundLinks[key as OutboundLinkKey]
}

export function getOutboundPath(key: OutboundLinkKey) {
  return `/out/${key}`
}