import { formatMonth } from "../../utils/parseExpenses";
import { useExpenseStore } from "../../store/expensesStore";
import { ALL_MONTHS } from "../../constant/constant";

interface MonthMenuProps {
  selectedMonth: string;
  onChange: (month: string) => void;
}

export function MonthMenu({ selectedMonth, onChange }: MonthMenuProps) {
  const months = useExpenseStore((state) => state.availableMonths);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="select">
      <select value={selectedMonth} onChange={handleChange}>
        <option value={ALL_MONTHS}>Toutes les dépenses</option>
        {months.map((month) => (
          <option key={month} value={month}>
            {formatMonth(month)}
          </option>
        ))}
      </select>
    </div>
  );
}