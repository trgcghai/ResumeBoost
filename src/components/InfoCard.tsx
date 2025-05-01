import { Users, FileText } from "lucide-react";

const icons = {
  users: Users,
  file: FileText,
};

type IconType = keyof typeof icons;

const InfoCard = ({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon: IconType;
}) => {
  const Icon = icons[icon];

  return (
    <div className="bg-white p-4 rounded-lg border flex items-start justify-between">
      <div>
        <h4 className="text-sm text-gray-500">{title}</h4>
        <p className="text-xl font-bold">{value}</p>
      </div>
      <div className="p-2 bg-gray-100 rounded-md">
        <Icon size={20} className="text-gray-400" />
      </div>
    </div>
  );
};

export default InfoCard;
