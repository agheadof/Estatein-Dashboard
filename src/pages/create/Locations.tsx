import { useRef, useState } from "react"
import { db } from "../../firebaseConfig"
import { push, ref, set } from "firebase/database"
import toast from "react-hot-toast"
import SubmitButton from "../../components/SubmitButton"

const Locations = () => {
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
      branch: get("branch"),
      address: get("address"),
      details: get("details"),
      email: get("email"),
      phone: get("phone"),
      city: get("city"),
      category: get("category"),
    }

    console.log("FINAL PROPERTY:", propertyData)
    try {
      const newRef = push(ref(db, "locations"))
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
      <h2 className="text-2xl font-bold">Location</h2>
      <input
        name="branch"
        placeholder="Branch Name"
        className="border border-[#1A1A1A]/50 rounded-lg mr-2 p-2"
      />
      <input
        name="address"
        placeholder="Address"
        className="border border-[#1A1A1A]/50 rounded-lg mr-2 p-2"
      />
      <select
        name="category"
        className="border border-[#1A1A1A]/50 rounded-lg mr-2 p-2"
        defaultValue=""
      >
        <option value="" disabled>
          Select Category
        </option>
        <option value="regional">Regional</option>
        <option value="international">International</option>
      </select>
      <textarea
        name="details"
        placeholder="Location Details"
        className="border border-[#1A1A1A]/50 rounded-lg mr-2 p-2 block"
      />

      <h2 className="text-2xl font-bold">Contact</h2>
      <input
        type="email"
        name="email"
        placeholder="Email"
        className="border border-[#1A1A1A]/50 rounded-lg mr-2 p-2"
      />
      <input
        name="phone"
        placeholder="Phone Number"
        className="border border-[#1A1A1A]/50 rounded-lg mr-2 p-2"
      />
      <input
        name="city"
        placeholder="City"
        className="border border-[#1A1A1A]/50 rounded-lg mr-2 p-2"
      />

      <SubmitButton loading={loading} text="Submit Location" />
    </form>
  )
}

export default Locations
