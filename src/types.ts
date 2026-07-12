export interface Mod {
  id: string;
  name: string;
  description: string;
  fileUrl: string;
  screenshotUrl: string;
  category: "texture" | "script" | "world" | "mobs" | "tools" | "weather";
  author: string;
  rating: number;
  downloads: number;
  fileSize: string;
  version: string;
  isFeatured: boolean;
  createdAt: string; // ISO string
}

export type ViewType = "home" | "mods" | "mod-detail" | "tools" | "credits" | "admin";

export interface NavigationState {
  view: ViewType;
  selectedModId?: string;
}

export interface TeamMember {
  name: string;
  role: string;
  description: string;
  avatar: string;
  tags: string[];
}

export interface ToolItem {
  id: string;
  name: string;
  description: string;
  category: "Texture" | "Data & Logic" | "Sound" | "Optimization";
  iconName: string;
  launchText: string;
  version?: string;
}
