import Placeholder1 from "@/assets/placeholders/bear-1.png";
import Placeholder2 from "@/assets/placeholders/bear-2.png";
import Placeholder3 from "@/assets/placeholders/bear-3.png";

export const config: Config = {
  // Social media links
  socials: {
    twitter: "https://twitter.com/your_project",
    discord: "https://discord.com/invite/your_project",
    homepage: "https://yourproject.com",
  },

  // Default collection data
  defaultCollection: {
    name: "Genesis Collection",
    description:
      "The Genesis Collection marks the beginning of our journey in the metaverse. Each NFT is a unique creation, symbolizing the foundation of our decentralized future.",
    image: Placeholder1,
  },

  // Our story section configuration
  ourStory: {
    title: "The Story of Our Journey",
    subTitle: "How it all began",
    description:
      "From a small idea to a revolutionary project, we’ve built a vibrant community focused on decentralization and digital ownership. Our goal is to empower creators and collectors alike by providing them with the tools they need to succeed in the Web3 space.",
    discordLink: "https://discord.com/invite/your_project",
    images: [Placeholder1, Placeholder2, Placeholder3],
  },

  // Team section configuration
  ourTeam: {
    title: "Meet the Team",
    members: [
      {
        name: "Alice Smith",
        role: "Founder & CEO",
        img: Placeholder1,
        socials: {
          twitter: "https://twitter.com/alice_smith",
        },
      },
      {
        name: "Bob Johnson",
        role: "Lead Developer",
        img: Placeholder2,
        socials: {
          twitter: "https://twitter.com/bob_johnson",
        },
      },
      {
        name: "Carol White",
        role: "Community Manager",
        img: Placeholder3,
        socials: {
          discord: "https://discord.com/users/carol_white",
        },
      },
    ],
  },

  // FAQ section configuration
  faqs: {
    title: "Frequently Asked Questions",
    questions: [
      {
        title: "What is this project about?",
        description:
          "Our project is focused on bringing decentralized solutions to the NFT space, giving users control over their assets in a transparent and secure manner.",
      },
      {
        title: "How can I join the community?",
        description:
          "You can join our Discord community where you’ll find like-minded individuals, events, and the latest updates. Click on the 'Join Our Discord' button in the story section to get started.",
      },
      {
        title: "Where can I buy the NFTs?",
        description:
          "Our NFTs are available on leading marketplaces. Stay tuned for exclusive drops through our Discord and Twitter channels.",
      },
    ],
  },

  // NFT Banner images
  nftBanner: [Placeholder1, Placeholder2, Placeholder3],
};

// Interface definitions
export interface Config {
  socials?: {
    twitter?: string;
    discord?: string;
    homepage?: string;
  };

  defaultCollection?: {
    name: string;
    description: string;
    image: string;
  };

  ourStory?: {
    title: string;
    subTitle: string;
    description: string;
    discordLink: string;
    images?: Array<string>;
  };

  ourTeam?: {
    title: string;
    members: Array<ConfigTeamMember>;
  };

  faqs?: {
    title: string;
    questions: Array<{
      title: string;
      description: string;
    }>;
  };

  nftBanner?: Array<string>;
}

export interface ConfigTeamMember {
  name: string;
  role: string;
  img: string;
  socials?: {
    twitter?: string;
    discord?: string;
  };
}
