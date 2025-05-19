import { formatMonth } from "../../utils/resetExpenses";
import { useExpenseStore } from "../../store/expensesStore";
import { ALL_MONTHS } from "../../constant/constant";


export function MonthMenu() {
  
  const selectedMonth = useExpenseStore((state) => state.monthSelected)
  const setSelectedMonth = useExpenseStore((state) => state.setMonthSelected)
  const months = useExpenseStore((state) => state.availableMonths)

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMonth(e.target.value)
       
  }

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
  )
}