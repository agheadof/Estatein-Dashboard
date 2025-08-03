import { useRef, useState } from "react"
import { db } from "../../firebaseConfig"
import { push, ref, set } from "firebase/database"
import toast from "react-hot-toast"
import SubmitButton from "../../components/SubmitButton"

const Faqs = () => {
  const formRef = useRef<HTMLFormElement>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const form = formRef.current
    if (!form) return

    setLoading(true)

    const get = (name: string) =>
      (form.elements.namedItem(name) as HTMLInputElement)?.value || ""

    const propertyData = {
      question: get("question"),
      description: get("description"),
    }

    console.log("FINAL PROPERTY:", propertyData)
    try {
      const newRef = push(ref(db, "faqs"))
      await set(newRef, propertyData)
      toast.success("✅ Data added successfully!")
      formRef.current?.reset()
    } catch (error) {
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="space-y-4 p-6 max-w-3xl my-10 mx-auto bg-[#703BF7]/10 rounded-2xl"
    >
      <h2 className="text-2xl font-bold">Question</h2>
      <input
        name="question"
        placeholder="Question"
        className="border border-[#1A1A1A]/50 rounded-lg mr-2 p-2"
      />
      <textarea
        name="description"
        placeholder="description"
        className="border border-[#1A1A1A]/50 rounded-lg mr-2 p-2 block"
      />
      <SubmitButton loading={loading} text="Submit FAQ" />
    </form>
  )
}

export default Faqs
