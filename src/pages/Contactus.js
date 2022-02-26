import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';

export default function ContactUs() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    
    emailjs.sendForm('service_ln12o8c', 'template_4ww2lyd', form.current, 'user_s8S11Xot4QC6gtjGdhLSH')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
    form.current.reset();
    alert("Thanks for contacting us!!")
  };

  return (
    <div class="flex flex-col items-center justify-center min-w-full h-screen md:max-w-full ">
      <div class="text-[#ffffff] text-5xl font-bold mb-5">
        Contact Us
      </div>
  <div class="p-6 w-96 sm:rounded-md">
    <form ref={form} onSubmit={sendEmail}>
      <label class="block border-b-2 mb-20 text-[#ffffff]">
        <input
          type="text"
          name="name"
          class="
            block
            bg-[#0a111a]
            w-full
            mt-1
            shadow-sm
            focus:ring
            focus:ring-opacity-50
          "
          placeholder="Name"
        />
      </label>
      <label class="block border-b-2 mb-20 text-[#ffffff]">
        <input
          name="email"
          type="email"
          class="
            block
            w-full
            mt-1
            bg-[#0a111a]
            border-gray-300
            rounded-md
            shadow-sm
            focus:border-indigo-300
            focus:ring
            focus:ring-indigo-200
            focus:ring-opacity-50
          "
          placeholder="Email address"
          required
        />
      </label>
      <label class="block mb-10 text-[#ffffff]">
        <textarea
          name="message"
          class="
          block
          w-full
          mt-1
          text-[#ffffff]
          bg-[#0a111a]
          border-gray-300
          border-b-2
          rounded-md
          shadow-sm
          focus:border-indigo-300
          focus:ring
          focus:ring-indigo-200
          focus:ring-opacity-50
          "
          rows="3"
          placeholder="Tell us what you're thinking about..."
        ></textarea>
      </label>
      <div class="mb-6">
        <button
          type="submit"
          class="
            h-10
            px-5
            text-indigo-100
            bg-indigo-700
            rounded-lg
            transition-colors
            duration-150
            focus:shadow-outline
            hover:bg-indigo-800
          "
        >
          Send
        </button>
      </div>
    </form>
  </div>
</div>

  );
}