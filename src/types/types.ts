import { ComponentType } from "react";

export type NavItemType = {
  label: string;
  icon: ComponentType; // or ComponentType<any> if your icon component accepts props
  href: string;
};

export type Feature = {
  icon: React.ComponentType;
  title: string;
  desc: string;
};

export interface Sign {
  word: string;
  imageUrl: string;
}
