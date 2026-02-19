import { useRef } from "react"
import toast from "react-hot-toast";

function Contact() {
  const username = useRef();
  const email = useRef();
  const message = useRef();


  function handleSendMessage() {
    if (username.current.value === "" || email.current.value === "" || message.current.value === "") {
      toast.error("Please Fill Your Fields")
      return null
    }else {
      username.current.value = ""
      email.current.value = ""
      message.current.value = ""
      toast.success("Message Send Successfully")
    }
  }

  return (
    <div className="py-12 px-[3vw] xl:px-[7vw]">
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold mb-10">Contact Us</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* Get In Touch */}
          <div>
            <p className="mb-2 text-xl font-bold">Get in Touch</p>
            <p className="text-sm text-gray-600 font-semibold mb-3">We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
            <div className="flex flex-col gap-3">
              <div >
                <p className="font-semibold">Email</p>
                <p className="text-gray-600 font-semibold">support@shopmart.com</p>
              </div>
              <div>
                <p className="font-semibold">Phone</p>
                <p className="text-gray-600 font-semibold">(+20) 01093333333</p>
              </div>
              <div>
                <p className="font-semibold">Address</p>
                <p className="text-gray-600 font-semibold">123 Shop Street, Octoper City, DC 12345</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div>
            <p className="mb-2 text-xl font-bold">Send us a Message</p>
            <div className="flex flex-col gap-3">
              <div>
                <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-1">Name</label>
                <input ref={username} type="text" id="name" className="block w-full py-2 px-3 rounded-md border border-gray-400 outline-[#0075ff]" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-1">Email</label>
                <input ref={email} type="email" id="email" className="block w-full py-2 px-3 rounded-md border border-gray-400 outline-[#0075ff]" />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-bold text-gray-700 mb-1">Message</label>
                <textarea ref={message} type="text" className="block w-full py-2 px-3 rounded-md border border-gray-400 outline-[#0075ff]" />
              </div>
              <button onClick={() => { handleSendMessage() }} className="block w-full bg-[#0075ff] text-white py-2 px-3 rounded-md cursor-pointer">Send Message</button>
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}

export default Contact