import { BoxIcon } from "lucide-react";
interface FeatureCardProps {
  icon: typeof BoxIcon;
  title: string;
  description: string;
}
export const FeatureCard = ({
  icon: Icon,
  title,
  description,
}: FeatureCardProps) => {
  return (
    <div className="flex gap-4 items-start">
      <div className="p-3 bg-gray-800 rounded-lg">
        <Icon size={24} className="text-white" />
      </div>
      <div>
        <h3 className="text-white font-semibold mb-1">{title}</h3>
        <p className="text-gray-400 text-sm">{description}</p>
      </div>
    </div>
  );
};
