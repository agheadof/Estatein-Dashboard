import { useRef, useState } from "react"
import { db } from "../../firebaseConfig"
import { push, ref, set } from "firebase/database"
import toast from "react-hot-toast"
import SubmitButton from "../../components/SubmitButton"

const Testimonials = () => {
  const formRef = useRef<HTMLFormElement>(null)
  const [loading, setLoading] = useState(false)
  const [clientImageUrl, setClientImageUrl] = useState<string>("")
  const [uploadingMain, setUploadingMain] = useState(false)

  const handleImageUpload = async (
    file: File,
    cb: (url: string) => void,
    setLoading: (v: boolean) => void
  ) => {
    setLoading(true)
    const formData = new FormData()
    formData.append("image", file)

    const res = await fetch(
      `https://api.imgbb.com/1/upload?key=edeee7c6c2851a590946b20e9ce00b5d`,
      {
        method: "POST",
        body: formData,
      }
    )

    const data = await res.json()
    if (data?.success) {
      cb(data.data.url)
    }
    setLoading(false)
  }

  const handleMainImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleImageUpload(file, (url) => setClientImageUrl(url), setUploadingMain)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const form = formRef.current
    if (!form) return

    setLoading(true)

    const get = (name: string) =>
      (form.elements.namedItem(name) as HTMLInputElement)?.value || ""

    const data = {
      name: get("name"),
      location: get("location"),
      subject: get("subject"),
      review: get("review"),
      clientImage: clientImageUrl,
    }

    console.log("FINAL DATA:", data)

    try {
      const newRef = push(ref(db, "testimonials"))
      await set(newRef, data)
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
      <h2 className="text-2xl font-bold">Basic Info</h2>

      <input
        name="name"
        placeholder="Client Name"
        className="border border-[#1A1A1A]/50 rounded-lg p-2 w-full"
      />
      <input
        name="location"
        placeholder="Client Location"
        className="border border-[#1A1A1A]/50 rounded-lg p-2 w-full"
      />
      <input
        name="subject"
        placeholder="Subject"
        className="border border-[#1A1A1A]/50 rounded-lg p-2 w-full"
      />

      <textarea
        name="review"
        placeholder="Client Review"
        className="border border-[#1A1A1A]/50 rounded-lg p-2 w-full"
      />

      <h2 className="text-xl font-bold mt-6">Client Image</h2>
      <input
        type="file"
        accept=".png, .jpg, .jpeg, .webp"
        onChange={handleMainImage}
        className="border border-[#1A1A1A]/50 rounded-lg mr-2 p-2"
      />
      {uploadingMain && <p>Uploading main image...</p>}
      {clientImageUrl && (
        <img
          src={clientImageUrl}
          className="w-24 h-24 object-cover rounded mt-2"
        />
      )}

      <SubmitButton loading={loading} text="Submit Review" />
    </form>
  )
}

export default Testimonials
