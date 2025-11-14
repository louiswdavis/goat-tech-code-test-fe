import type { SelectHTMLAttributes } from "react"

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string
  options: { value: string; label: string }[]
  error?: string
  required?: boolean
}

const Select = ({ label, options, error, required, ...props }: SelectProps) => (
  <div>
    <label className="block text-gray-300 mb-2 text-left">{label} {required && <span className="text-red-400">*</span>}</label>
    <select
      className="w-full px-3 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      {...props}
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
    {error && <p className="text-red-400 text-sm mt-1 text-left">{error}</p>}
  </div>
)

export default Select