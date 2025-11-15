import type { TextareaHTMLAttributes } from "react"

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  error?: string
  required?: boolean
}

const TextArea = ({ label, error, required, ...props }: TextAreaProps) => (
  <div>
    <label className="block text-gray-300 mb-2 text-left">{label} {required && <span className="text-red-400">*</span>}</label>
    <textarea
      className="w-full px-3 py-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      {...props}
    />
    {error && <p className="text-red-400 text-sm mt-1 text-left">{error}</p>}
  </div>
)

export default TextArea