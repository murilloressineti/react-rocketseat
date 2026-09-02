import { Link } from "react-router";

import { formatCurrency } from "../../../utils/formatCurrency";

import { Icon, Text } from "../../../components/ui";

interface RefundItemProps {
  id: string;
  title: string;
  category: string;
  categoryIcon: React.ElementType;
  value: number;
}

export default function RefundItem({
  id,
  title,
  category,
  categoryIcon,
  value,
}: RefundItemProps) {
  return (
    <Link to={`/${id}`} className="flex items-center justify-between hover:bg-bg-default transition-colors duration-300 p-2 rounded-lg">
      {/* Info */}
      <div className="flex flex-row gap-3">
        <div className="flex items-center justify-between bg-bg-default rounded-full p-3">
          <Icon svg={categoryIcon} />
        </div>

        <div className="flex flex-col">
          <Text weight="bold" className="leading-relaxed">
            {title}
          </Text>
          <Text size="xs" textColor="secondary">
            {category}
          </Text>
        </div>
      </div>

      {/* Value */}
      <div className="flex items-center gap-1">
        <Text size="xs" textColor="secondary">
          R$
        </Text>

        <Text weight="semiBold" className="leading-relaxed">
          {formatCurrency(value)}
        </Text>
      </div>
    </Link>
  );
}
