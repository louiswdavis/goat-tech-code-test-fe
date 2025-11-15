import type { InputHTMLAttributes } from "react"

interface DateInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
  required?: boolean
}

const DateInput = ({ label, error, required, value, ...props }: DateInputProps) => {
  const formatDateForInput = (date: string | number | readonly string[] | undefined) => {
    if (!date) return ''
    const d = new Date(date as string)
    return d.toISOString().split('T')[0]
  }

  return (
    <div>
      <label className="block text-gray-300 mb-2 text-left">{label} {required && <span className="text-red-400">*</span>}</label>
      <input
        type="date"
        value={formatDateForInput(value)}
        className="w-full px-3 py-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        {...props}
      />
      {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
    </div>
  )
}

export default DateInput