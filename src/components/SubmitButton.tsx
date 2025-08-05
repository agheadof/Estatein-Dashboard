type SubmitButtonProps = {
  loading: boolean
  text?: string
  className?: string
}

const SubmitButton = ({
  loading,
  text = "Submit",
  className = "",
}: SubmitButtonProps) => {
  return (
    <button
      type="submit"
      disabled={loading}
      className={`w-full mt-6 px-4 py-3 rounded-lg text-white transition cursor-pointer ${
        loading
          ? "bg-gray-500 cursor-not-allowed"
          : "bg-[#1A1A1A] hover:bg-[#703BF7]"
      } ${className}`}
    >
      {loading ? (
        <span className="flex items-center justify-center gap-2">
          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          {text}
        </span>
      ) : (
        text
      )}
    </button>
  )
}

export default SubmitButton
