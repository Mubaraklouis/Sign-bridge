import { NavItemType } from "@/types/types";
import {
  MessageCircle,
  Mic,
  Settings,
  User,
  Video,
  WifiOff,
} from "lucide-react";

export const navData: NavItemType[] = [
  {
    label: "Chat",
    icon: MessageCircle,
    href: "/translator",
  },
  {
    label: "Speech",
    icon: Mic,
    href: "/text-to-speech",
  },
  {
    label: "Avatar",
    icon: User,
    href: "/avatar",
  },
  {
    label: "Video",
    icon: Video,
    href: "/video",
  },

  {
    label: "Settings",
    icon: Settings,
    href: "/settings",
  },
  {
    label: "Offline",
    icon: WifiOff,
    href: "/offline",
  },
];
