import type { Member } from "./gdg";

export interface GsaTeam {
  name: string;
  members: Member[];
}

export const gsaLead: Member = {
  name: "Adnan Ahmad",
  role: "GSA Head",
};

export const gsaTeams: GsaTeam[] = [
  {
    name: "Team GenAI",
    members: [
      { name: "Yash Dhoble", role: "Team GenAI" },
      { name: "Anurag Deshmukh", role: "Team GenAI" },
      { name: "Radha Waghmare", role: "Team GenAI" },
    ],
  },
  {
    name: "Team WebTech",
    members: [
      { name: "Ninad Vaidya", role: "Team WebTech" },
      { name: "Kaushal Patel", role: "Team WebTech" },
    ],
  },
  {
    name: "Team Public Relations",
    members: [
      { name: "Khushboo Mishra", role: "Team Public Relations" },
      { name: "Shrutika Tayade", role: "Team Public Relations" },
    ],
  },
  {
    name: "Team Social Media",
    members: [
      { name: "Shivapriya Thakare", role: "Team Social Media" },
      { name: "Prachi Sable", role: "Team Social Media" },
    ],
  },
  {
    name: "Team Graphics and Editing",
    members: [
      { name: "Aditya Rathod", role: "Team Graphics and Editing" },
      { name: "Arjun Solanke", role: "Team Graphics and Editing" },
      { name: "Rahul Kharap", role: "Team Graphics and Editing" },
    ],
  },
];
