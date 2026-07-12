import { Mod, TeamMember, ToolItem } from "./types";

export const DEFAULT_MODS: Mod[] = [
  {
    id: "lush-biomes-overhaul",
    name: "Lush Biomes Overhaul",
    description: `Experience the world like never before with the Lush Biomes Overhaul. This comprehensive modification breathes new life into the procedural generation system, introducing 15+ completely unique sub-biomes characterized by vibrant flora and dynamic lighting systems.

Our team has meticulously crafted every texture to fit a "Soft-Modern" aesthetic, moving away from harsh edges towards a more welcoming, bubble-like geometry that feels both premium and playful. From the glowing Emerald Glades to the serene Pastel Plains, every step in your new world will feel like a creative discovery.

Key Features:
- Procedural 3D Flora generation
- Custom Shader-ready texture maps
- Enhanced dynamic lighting for twilight hours
- Fully compatible with MultiCraft Core`,
    fileUrl: "https://gen-lang-client-0350658195.firebasestorage.app/mods/lush-biomes-overhaul.zip", // simulated path or real Storage URL
    screenshotUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuB-jbpAUzyhmTeyywBaEEQq6m_qna9FMJZ9ZQ0BKGpkyp9fqissVoJ0cWDhX1R6N4gAQCVs-9RZT9-U7S-k2Z4ClhE3O792OmMkEjm2oDcLepZTr3DRPdAPIJHjewlVma3BY3CMmpVUkxC3BrPT7GI8epYEizjoFfpepWOTUdwTt3XfTuCbxrcwKG5RGS76tgKLRAZb4m2EK3_NVljq4o5xkjcO-hI4ApCzK8Gk3mk-LE-hDRKgnvmqMQ",
    category: "world",
    author: "LushDesign_Studios",
    rating: 4.9,
    downloads: 128402,
    fileSize: "14.2 MB",
    version: "v1.2.4",
    isFeatured: true,
    createdAt: "2023-10-24T12:00:00Z"
  },
  {
    id: "ether-realms-hd",
    name: "Ether Realms HD",
    description: "Discover a completely overhauled high-definition texture set designed to make the sky and ether blocks look unbelievably crisp. Features hand-painted stars and responsive lunar illumination overlays.",
    fileUrl: "https://gen-lang-client-0350658195.firebasestorage.app/mods/ether-realms-hd.zip",
    screenshotUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBTL8HhfJx5qKfGoQ7qY7mZQsndGoyglaWnagwp3KBW5Yg3ZRJt9pZBgtr9Xt9WLjwJDAzpu7xlBg-OZM801Jb3QKLYEXEf4S5GDEwbSUKzf7Tbl5HngwDyVu32tY_7suvf233KmqzAojcpx-4o1NaqfwEYjmlvq_z6GKUheg7iO5XbAVzP185_43IUZVcDOsLvJyZGHssZ_ukCEAF7QWtmLHBwdIE5auh8iXqLKLwJCTY506X5CU7JuQ",
    category: "texture",
    author: "VoxelMaster99",
    rating: 4.9,
    downloads: 12400,
    fileSize: "32.5 MB",
    version: "v4.9.0",
    isFeatured: true,
    createdAt: "2024-01-15T15:30:00Z"
  },
  {
    id: "logic-pipes-pro",
    name: "Logic Pipes Pro",
    description: "Take automation to the absolute limits. Inject modular piping networks, sorting hubs, and programmable logic units that seamlessly route items and energy safely through your complex layouts.",
    fileUrl: "https://gen-lang-client-0350658195.firebasestorage.app/mods/logic-pipes-pro.zip",
    screenshotUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBYrMMR9lzuzmk6FK5iIOX0ULl8AXnRPrtvo8i5YW1sBDvz-7SSqVsPr2JTVg7r0_RtDPC5VQiU-QZ0N7C4w9VeiXzTYbYHSY4mvDz9v2d6hsQ6bUchG-oCPUVUxpyYD5vpfYMqyCuiXxORlCgf0Jeoxuq9wuXsZR1V-4eAak7DMLT4rcCdxxSzungxgxSKctqOYN3yOHj9044rkH84PLlK5xs--YYAwFTEMQyv36GBzNxttTjwuP_l6w",
    category: "script",
    author: "RedstoneEngine",
    rating: 4.7,
    downloads: 8100,
    fileSize: "4.8 MB",
    version: "v2.1.0",
    isFeatured: true,
    createdAt: "2024-02-01T09:12:00Z"
  },
  {
    id: "floating-isles-x",
    name: "Floating Isles X",
    description: "Generate breathtaking procedural skies populated by magical floating landmasses, custom water structures, and unique vertical gameplay mechanics. Perfect for sandbox architects.",
    fileUrl: "https://gen-lang-client-0350658195.firebasestorage.app/mods/floating-isles-x.zip",
    screenshotUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBYfpybN-9nNn1YeJkqmCT7sfn4I4pO7xlCuGGlBv6YrD1QdQN4cbNUGvjxVUqK2nI4E0SSIqUUSFp-2yal4xDIiaH3suA30PkZ_PoFKIztmb_MBf7XGkvGLZVeLhC-iRNax6-CEBSBwFtsmEK_EW759S7IpB_c3CqrAB7IcohAn7ohUwEDYMs5Vae4UzuZuSnrYY_fd5VEU8PWeGiknMoA1bQeRsl6HxWDSd28p1vXrb6UlVtVecbEaA",
    category: "world",
    author: "CloudArchitect",
    rating: 5.0,
    downloads: 25000,
    fileSize: "18.6 MB",
    version: "v3.0.1",
    isFeatured: true,
    createdAt: "2023-12-10T18:45:00Z"
  },
  {
    id: "kawaii-fauna",
    name: "Kawaii Fauna",
    description: "Fill your MultiCraft landscape with ultra-adorable custom animals, cubic creatures, and custom behavioral scripts that react dynamically to food items and weather environments.",
    fileUrl: "https://gen-lang-client-0350658195.firebasestorage.app/mods/kawaii-fauna.zip",
    screenshotUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAtJkTINYOa40rUDLBbh-nzEtgzCK58BoDbaSS_5b7y8yanV0lVu4uOf0HEYS5of-npjcHU7yFtuzpm8mHWUfiZAKE2nTQUtxrb6MxjjO6mRdFA6C6tzVxotrMe2byRAYNHbeiErs9pgWmlp2pWMXZ6U1Sl-yJihKHNN2R9wPgJR86ddEYP3pIeDy6_jkPQlMfUnq_9LE1nW8AUXdHx9N8ImAgN6oW_qrbe8xgA-VtBXhyYzzSyrQAd_w",
    category: "mobs",
    author: "NekoModder",
    rating: 4.8,
    downloads: 18200,
    fileSize: "2.1 MB",
    version: "v1.4.0",
    isFeatured: false,
    createdAt: "2023-11-30T10:00:00Z"
  },
  {
    id: "midnight-core",
    name: "Midnight Core",
    description: "Sleek and highly optimized dark mode GUI textures paired with glowing neon outlines for obsidian, redstone, and specialized machinery structures. Absolute visual eye-candy.",
    fileUrl: "https://gen-lang-client-0350658195.firebasestorage.app/mods/midnight-core.zip",
    screenshotUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDsWns_8N5jpJvBC6gWzhk-xMZY5gXBEgeW0cz5r_qWAgH4QxadghRxVSnGIo9gToCYnNlPXZqgCVUU6CLQyfxQ6XEOnSJGbLDne2RLHOfWtuFbNc54Z3Sy1fHTIy3f5STi4mC7Cf81jRPgfLANkDX0-ZYprQvy7o5ozxeWC_5hZppv8_0CmkLne9vdKfQSPA8em_SwWzY4aB5Or72XWZhFENMozElwELmYYtfcFMQA_KsPhZ-4_LjbaA",
    category: "texture",
    author: "NeonGhost",
    rating: 4.6,
    downloads: 5500,
    fileSize: "8.4 MB",
    version: "v1.1.2",
    isFeatured: false,
    createdAt: "2024-03-01T22:15:00Z"
  },
  {
    id: "builders-wand-v2",
    name: "Builder's Wand v2",
    description: "The ultimate tooling assistant. Extends block-placing capabilities, enables procedural structure cloning, and provides comprehensive building assists directly in your hotbar.",
    fileUrl: "https://gen-lang-client-0350658195.firebasestorage.app/mods/builders-wand-v2.zip",
    screenshotUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBzAOZnVGbZruUTU51JThDy9-fEoZs_9b1GWDb9lakgtbatz2lctzz6hiQ2bMlIgF2VP9POLJbFW-2L8n0Q6XHc2ZNeXmyxkKrs74slLQ8h3kjOyRKox16ZtsPw5I-AekLzixmfreWxukSfwME4OW85TOqQtn6jycz6Waj1xwsYp-0-PjQPrFP-UUjGdSZ2ByRtCiprk6nadAv2Y-066ScrO43AeHAsZGrmd3VR1kOzw_Fhx3Cld3yh5Q",
    category: "tools",
    author: "TechWizard",
    rating: 4.9,
    downloads: 42100,
    fileSize: "1.2 MB",
    version: "v2.0.4",
    isFeatured: false,
    createdAt: "2024-02-18T14:30:00Z"
  },
  {
    id: "volumetric-storms",
    name: "Volumetric Storms",
    description: "Adds breathtaking real-time physical storms, localized rain densities, fully custom particle wind fields, and responsive lightning lighting animations.",
    fileUrl: "https://gen-lang-client-0350658195.firebasestorage.app/mods/volumetric-storms.zip",
    screenshotUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAEhUz-1P-a0udWBCB-h7ULAfPpPCrdTORzmoFR6kN0sbtC91v6DoMSWdZL6lJq8OWG6DIJvSWvkr9F-LEG4VbzVXjQ7oiEr6b__VEx2swRCHBngq2En3OrKviZEPDyx0IA6kVL_C0P3xv0jeAERPLK3ZDHEYo1kWo_W2UTar8dw4EmwRsfdNSZkuh_azs7UROTbT9hWfFsPJGlKkRGDQsWaa6g5XD-9eINFNETJSSzp-kSBFuADKfx5Q",
    category: "weather",
    author: "AeroForge",
    rating: 4.5,
    downloads: 3200,
    fileSize: "11.6 MB",
    version: "v1.0.0",
    isFeatured: false,
    createdAt: "2024-03-10T11:00:00Z"
  },
  {
    id: "dimension-hopper",
    name: "Dimension Hopper",
    description: "Unchain the dimensional gates! Introduces beautiful, animated multi-colored rift portals, procedurally-generated pocket dimensions, and unique custom gravity zones.",
    fileUrl: "https://gen-lang-client-0350658195.firebasestorage.app/mods/dimension-hopper.zip",
    screenshotUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCOkE4hP70wvYpfOTG9JLOjbGCV-rRrfp7HUAgI-vnbIALZxhXTWG9Jb70xYnGHZuDAdPyApP2xamgn2fSOszTBaaReUTmpT4lYWgHZHCNNQ_6yDfyJkLp_XlOcyBASbpvtgYjhFztdX7kyQ3N7xZTcy_juZcEVpTwYkg3cyXMqp2bTG2Vp1M7M3jHmBjwJ-T5Xm3FD9_GuslJK2E79nbmW3piZ1aHKfkpNUp4J8OPdt0iZuYi82DVc_w",
    category: "script",
    author: "RealityBender",
    rating: 4.9,
    downloads: 15700,
    fileSize: "6.3 MB",
    version: "v3.1.2",
    isFeatured: false,
    createdAt: "2024-01-20T17:22:00Z"
  }
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: "Alex \"Void\" Chen",
    role: "Lead Architect & Co-Owner",
    description: "Oversees core engine development and platform scaling. 10+ years of voxel-based game modding experience.",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuB-HbTR0Iq2y9lHIQXnAEXNXBxM5x_wleFNxfdDoP9LzqTgrNXTZ_DpyUTpqjNWnFQ6U11ifQGYHN1l9yO0slrMU-5SVuxGkJBL9Imt6ZX__3W_9Hd50IZw4_XesqHipCm2r2iyxdrSq2hcXSMznFAKRbApAdJoR-RSiOpOqCLolyzVcympwayYY8qUaLv1sR4ijAIzXXJp8Ddwyt-Bbxnbdb1XU0mtZrswxp7FLkW-zI55WEbFrRIRfg",
    tags: ["Engine", "Cloud"]
  },
  {
    name: "Sarah \"Luna\" J.",
    role: "Head of Design & Co-Owner",
    description: "The vision behind our Soft-Modern aesthetic. Ensuring every pixel feels approachable, responsive, and playful.",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAvKMZ1jDQVK5L2zGugjZV6--e4F8OB--cIW-M5LnnJqf8ZRFDwWnXapQiSCj8TB6L2E44Rigm-wHdY4Y5gY3B_wtuNFw2P5P2J-ABoumdGQNuDrcjhTQyXxljsAwnhED2-z5hWeemh2eCgjj-IfxOhBfhIqatT6DwQwa-vuVn-RFaN9oZoY-OfLSojLjS6mgFaomWfKaT1tSq7bssxIzU7eJX_8YxrO9gVCA74YsOUzZCb7SyQ7ab9KA",
    tags: ["UI/UX", "Branding"]
  },
  {
    name: "Marcus Thorne",
    role: "Community Operations",
    description: "Nurturing the 2-million-strong modder ecosystem, coordinating global mod jams, and supporting creator growth.",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCC_-iSJBf406A9Ko_8IAibIXpH0Ij1d-Hk1fgnW1KGLKTiGppgezvf-KEYArtl8xA5t30meYdIyeYwORrJfUoqzF8MLjpTO1qrPdXqCzF0e_3wDh_q7EXQCE7oCABFvI73aVficwBtXl7ZaJzby9ghGtT2pdjkh58TR5Usznlq2aEqhbYeDOkg8XbIAr7vnQzNld0gjI9-97c_V7l3n1spqxGoWQb7aiaTqbM3JdUl2dn5SVoYanbHxw",
    tags: ["Social", "Events"]
  }
];

export const TECHNICAL_CONTRIBUTORS = [
  {
    name: "Elena Rodriguez",
    role: "Shader Optimization",
    description: "Reduced memory footprint by 40% across all voxel textures, enabling ultra-fast render loops.",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBKTOxW_rIs6iWBDkyRgJtq3vpO7k9_UczWSMdP-4RS-xQQjMHIXJ7rHyny8-FD2qFmZ7MWN1gk3yRmKyOI5UsPPo2Wtgkv-lxxMmVTIDRgQb60Dii3cvWQkBsuCQmtc20-KsCU4cA6VYQe79HsaINKSLIKin8CBU41bjXyfuAgK79E3uMTp2_gglmrEp5ROr5kyY1RJaw_j0RFoJ9j22xg-1PIgkEzQi-nbEWvSKrzTrkVg7xmJIP9PA"
  },
  {
    name: "Toby \"Koda\" Smith",
    role: "Tooling Lead",
    description: "Architect of the 'CraftSDK' used by 15,000+ modders daily to bundle and export high-performance logic.",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCgxSafX6yVv3m1Adn1FHeW1rrKLqOxhRCivwurgvMF4kr80l_JRL6XPQ9sxQFJsIodbsYqbZua7PpjLHqBD6TkzpYakubbseLkaeyLY7k5KrbPtyTvVJEGd_w1Zs2mDQSUOYLMaYc1oOmi9dCf7OolD0p6WhJtGPUG3msQjbG3Wv9Zw-fj8mEHWE8KggWqzAKI1Elf-JoBRSrINaA5SOE3MVRHDhYnIjoMHJTaDqV0qnaea7FvuyF7iQ"
  },
  {
    name: "James Wu",
    role: "Database Specialist",
    description: "Maintains rapid mod-delivery systems and custom CDN cache routing for extremely fast downloads.",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBckhxp6Jqe_0JUMLY554ES4c_rswKtgLhCgqXItq5lc2quxMLNsK9mQ2d_TVBpe4LBGAR9GEdD-V2u_v9pCEYXORukiXimIwJT7a45V9Sy5bbgSaVYmTRPkj5nsXBoqiVmHP0lugdam9eJf2Vwggg-91kdyO6lLJzSTH4x8MqVpEdhve-ePPWbVDACfkd1tT-BNp90Mk0BDesxtAy-MZuK42kwyWGqhEnLmb4wGXBkSkIfuFzYOOLEtQ"
  },
  {
    name: "Priya Kapur",
    role: "Security Auditor",
    description: "Ensures every mod download is safe, verified, and free of scripts that impact client systems.",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCKXcEoocTUTr0YVOnB7OzTJsujMCMZl8Fp8aaqCXIIS08_tSMphWXfBjAOiiRZG4EqAEhj371w_UnCGliZ-vPPOPFwvg7NX2ZsxQmlbRlhGRQO57x7ywBNrNujyDOdOuHJLJo1NvMFNt2kN9Z7c_WC4tAg4KVCH3Idhfhgtfj52KFizWUBc5X8cdGTKBKWOp0KXqBeXCKAuel4FrdYYNnCwG4WRJdrSgQlqLUvWfYNByc6kpKWcv_IKQ"
  }
];

export const TOOLS: ToolItem[] = [
  {
    id: "procedural-texture-builder",
    name: "Procedural Texture Builder",
    description: "Create high-resolution, game-ready textures using our intuitive node-based editor. Export directly to .PNG or .TGA formats with customized lighting layers.",
    category: "Texture",
    iconName: "palette",
    launchText: "Launch Tool",
    version: "v4.2.1"
  },
  {
    id: "json-schema-validator",
    name: "JSON Schema Validator",
    description: "Validate your mod manifests, localization files, and recipe definitions against official MultiCraft schemas to prevent runtime game crashes.",
    category: "Data & Logic",
    iconName: "data_object",
    launchText: "Open Validator",
    version: "v2.4.0"
  },
  {
    id: "color-palette-extractor",
    name: "Color Palette Extractor",
    description: "Extract consistent, high-key and soft-modern color themes from any reference image or drawing to maintain uniform interface design.",
    category: "Texture",
    iconName: "colorize",
    launchText: "Use Online",
    version: "v1.1.0"
  },
  {
    id: "ai-asset-optimizer",
    name: "AI Asset Optimizer",
    description: "Apply lossless compression and smart AI resolution upscaling for voxel blocks, terrain maps, and custom inventory item sprites.",
    category: "Optimization",
    iconName: "auto_awesome",
    launchText: "Download Beta",
    version: "v1.0.4-beta"
  },
  {
    id: "performance-profiler",
    name: "Performance Profiler",
    description: "Analyze the runtime impact of complex script injections, custom behavioral entities, and geometry rendering on frame rates.",
    category: "Optimization",
    iconName: "analytics",
    launchText: "External Link",
    version: "v3.2.0"
  }
];
