import { useRef, useState } from "react"
import { db } from "../../firebaseConfig"
import { push, ref, set } from "firebase/database"
import toast from "react-hot-toast"
import SubmitButton from "../../components/SubmitButton"

const Clients = () => {
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
      name: get("name"),
      since: get("since"),
      domain: get("domain"),
      category: get("category"),
      review: get("review"),
    }

    console.log("FINAL PROPERTY:", propertyData)
    try {
      const newRef = push(ref(db, "clients"))
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
      <h2 className="text-2xl font-bold">Client</h2>
      <input
        name="name"
        placeholder="Company Name"
        className="border border-[#1A1A1A]/50 rounded-lg mr-2 p-2"
      />
      <input
        name="since"
        placeholder="Client Since"
        className="border border-[#1A1A1A]/50 rounded-lg mr-2 p-2"
      />
      <input
        name="domain"
        placeholder="Domain"
        className="border border-[#1A1A1A]/50 rounded-lg mr-2 p-2"
      />
      <input
        name="category"
        placeholder="Category"
        className="border border-[#1A1A1A]/50 rounded-lg mr-2 p-2"
      />
      <textarea
        name="review"
        placeholder="What They Said 🤗"
        className="border border-[#1A1A1A]/50 rounded-lg mr-2 p-2 block"
      />

      <SubmitButton loading={loading} text="Submit Client" />
    </form>
  )
}

export default Clients
