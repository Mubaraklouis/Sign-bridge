import { NavItemType } from "@/types/types";
import {
  LibraryBig,
  MessageCircle,
  Mic,
  Settings,
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
    label: "Learn",
    icon: LibraryBig,
    href: "/learn",
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
