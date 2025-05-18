import { useState } from "react"
import ArrowDropDownIcon from'@mui/icons-material/ArrowDropDown'
import { formatMonth } from "../../utils/resetExpenses";
import { useExpenseStore } from "../../store/expensesStore";
import { ALL_MONTHS } from "../../constant/constant";


export function MonthMenu() {
  const [ isActive, setIsActive ] = useState(false)
  const selectedMonth = useExpenseStore((state) => state.monthSelected)
  const setSelectedMonth = useExpenseStore((state) => state.setMonthSelected)
  const months = useExpenseStore((state) => state.availableMonths)

  const handleSelect = (month: string) => {
    setSelectedMonth(month)
    setIsActive(false)    
  }

  return (
    <div className={`dropdown ${isActive ? "is-active" : ""}`}>
      <div className="dropdown-trigger">
        <button className="button" aria-haspopup="true" aria-controls="drop-down-menu" onClick={() => setIsActive(!isActive)}>
          <span>
          {selectedMonth && selectedMonth !== ALL_MONTHS
            ? formatMonth(selectedMonth)
            : selectedMonth === ALL_MONTHS
              ? "Toutes les dépenses"
              : "Sélectionner une période"}
          </span>
          <span className="icon is-small">
            <ArrowDropDownIcon />
          </span>
        </button>
      </div>
      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          <a href="#" className="dropdown-item" onClick={() => handleSelect(ALL_MONTHS)}>Toutes les dépenses</a>
          {months.map((month) => (
            <a
              href="#"
              className="dropdown-item"
              key={month}
              onClick={() => handleSelect(month)}
            >
              {formatMonth(month)}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}