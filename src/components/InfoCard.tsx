import { Users, FileText, CreditCard, Activity } from "lucide-react";

const icons = {
  users: Users,
  file: FileText,
  "credit-card": CreditCard,
  activity: Activity,
};

type IconType = keyof typeof icons;

const InfoCard = ({
  title,
  value,
  change,
  isNegative = false,
  icon,
}: {
  title: string;
  value: string;
  change: string;
  isNegative?: boolean;
  icon: IconType;
}) => {
  const Icon = icons[icon];

  return (
    <div className="bg-white p-4 rounded-lg border flex items-start justify-between">
      <div>
        <h4 className="text-sm text-gray-500">{title}</h4>
        <p className="text-xl font-bold">{value}</p>
        <p
          className="text-sm"
          style={{
            color: isNegative
              ? "var(--color-redText)"
              : "var(--color-greenText)",
          }}
        >
          {change} so với tháng trước
        </p>
      </div>
      <div className="p-2 bg-gray-100 rounded-md">
        <Icon size={20} className="text-gray-400" />
      </div>
    </div>
  );
};

export default InfoCard;
