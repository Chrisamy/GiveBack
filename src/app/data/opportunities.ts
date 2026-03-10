export interface Opportunity {
  id: string;
  title: string;
  organization: string;
  location: string;
  type: "remote" | "onsite" | "hybrid";
  category: string;
  description: string;
  requirements: string[];
  duration: string;
  hoursPerWeek: string;
  image: string;
  postedDate: string;
  tags: string[];
}

export const mockOpportunities: Opportunity[] = [
  {
    id: "1",
    title: "Community Outreach Coordinator",
    organization: "Hope for All Foundation",
    location: "San Francisco, CA",
    type: "hybrid",
    category: "Community Service",
    description: "Join our team to help coordinate community events and outreach programs. You'll work directly with community members to identify needs and develop programs that make a real difference.",
    requirements: [
      "Strong communication skills",
      "Passion for community service",
      "Ability to work flexible hours",
      "Experience with event planning is a plus"
    ],
    duration: "3-6 months",
    hoursPerWeek: "10-15 hours",
    image: "https://images.unsplash.com/photo-1560220604-1985ebfe28b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwdm9sdW50ZWVycyUyMGNvbW11bml0eSUyMGhlbHBpbmd8ZW58MXx8fHwxNzcyNjYxMzQwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    postedDate: "2026-03-01",
    tags: ["Community", "Events", "Outreach"]
  },
  {
    id: "2",
    title: "Environmental Conservation Intern",
    organization: "Green Earth Initiative",
    location: "Remote",
    type: "remote",
    category: "Environment",
    description: "Help us develop and implement environmental conservation strategies. You'll research sustainable practices, create educational content, and engage with our online community.",
    requirements: [
      "Interest in environmental issues",
      "Research and writing skills",
      "Social media savvy",
      "Self-motivated and organized"
    ],
    duration: "6 months",
    hoursPerWeek: "8-12 hours",
    image: "https://images.unsplash.com/photo-1764173039235-fd1b8e9ad67f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbnZpcm9ubWVudGFsJTIwY29uc2VydmF0aW9uJTIwdm9sdW50ZWVyfGVufDF8fHx8MTc3MjY2MTM0MXww&ixlib=rb-4.1.0&q=80&w=1080",
    postedDate: "2026-02-28",
    tags: ["Environment", "Research", "Remote"]
  },
  {
    id: "3",
    title: "Youth Education Mentor",
    organization: "Bright Futures Academy",
    location: "Boston, MA",
    type: "onsite",
    category: "Education",
    description: "Mentor and tutor students from underserved communities. Help them with homework, develop study skills, and provide guidance for their educational journey.",
    requirements: [
      "Patient and encouraging personality",
      "Strong academic background",
      "Experience working with youth",
      "Commitment to educational equity"
    ],
    duration: "1 year",
    hoursPerWeek: "5-10 hours",
    image: "https://images.unsplash.com/photo-1623287073837-5b07d79739a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlZHVjYXRpb24lMjB0dXRvcmluZyUyMHZvbHVudGVlcnxlbnwxfHx8fDE3NzI2NjEzNDJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    postedDate: "2026-02-26",
    tags: ["Education", "Mentoring", "Youth"]
  },
  {
    id: "4",
    title: "Social Media Content Creator",
    organization: "Aid Without Borders",
    location: "Remote",
    type: "remote",
    category: "Marketing",
    description: "Create engaging content for our social media channels to raise awareness about global humanitarian issues. Design graphics, write compelling captions, and help grow our online community.",
    requirements: [
      "Design skills (Canva, Photoshop, etc.)",
      "Understanding of social media platforms",
      "Creative storytelling ability",
      "Passion for humanitarian work"
    ],
    duration: "3 months minimum",
    hoursPerWeek: "6-10 hours",
    image: "https://images.unsplash.com/photo-1762330463346-5c71fbfee5d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxub25wcm9maXQlMjBvcmdhbml6YXRpb24lMjB0ZWFtd29ya3xlbnwxfHx8fDE3NzI2NjEzNDF8MA&ixlib=rb-4.1.0&q=80&w=1080",
    postedDate: "2026-03-02",
    tags: ["Marketing", "Design", "Remote"]
  },
  {
    id: "5",
    title: "Healthcare Administration Assistant",
    organization: "Community Health Partners",
    location: "Chicago, IL",
    type: "onsite",
    category: "Healthcare",
    description: "Support our healthcare clinic with administrative tasks. Help with patient scheduling, data entry, and maintaining health records while learning about nonprofit healthcare operations.",
    requirements: [
      "Detail-oriented and organized",
      "Comfortable with computer systems",
      "Professional communication",
      "Interest in healthcare"
    ],
    duration: "4-6 months",
    hoursPerWeek: "12-16 hours",
    image: "https://images.unsplash.com/photo-1638452033979-14fba9e17fbb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHByb2Zlc3Npb25hbCUyMGludGVybnNoaXAlMjBvZmZpY2V8ZW58MXx8fHwxNzcyNjYxMzQxfDA&ixlib=rb-4.1.0&q=80&w=1080",
    postedDate: "2026-02-25",
    tags: ["Healthcare", "Administration", "Onsite"]
  },
  {
    id: "6",
    title: "Food Distribution Volunteer",
    organization: "Nourish Network",
    location: "Seattle, WA",
    type: "onsite",
    category: "Community Service",
    description: "Help distribute food to families in need. Assist with sorting donations, packing food boxes, and coordinating with distribution partners.",
    requirements: [
      "Ability to lift 25+ lbs",
      "Team player attitude",
      "Reliable and punctual",
      "Weekend availability preferred"
    ],
    duration: "Flexible",
    hoursPerWeek: "4-8 hours",
    image: "https://images.unsplash.com/photo-1765018028697-2baae4577cdd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjBzZXJ2aWNlJTIwbm9ucHJvZml0fGVufDF8fHx8MTc3MjY2MTM0Mnww&ixlib=rb-4.1.0&q=80&w=1080",
    postedDate: "2026-03-03",
    tags: ["Community", "Food", "Hands-on"]
  }
];
