import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';

const Reachout = () => {
  const form = useRef();
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_ln12o8c', 'template_4ww2lyd', form.current, 'user_s8S11Xot4QC6gtjGdhLSH')
    .then(
      (result) => {
        console.log(result.text);
        form.current.reset();
      },
      (error) => {
        console.log(error.text);
      }
    );
  };
  return (
    <div
      id='contact'
      className=' p-4 mt-8 flex flex-col gap-8 justify-center items-center'
    >
      <h1 className='font-extrabold text-3xl sm:text-8xl text-white'>
        Comming Soon
      </h1>

      <form
        name='contact_form'
        className='flex flex-col w-64 items-cemter gap-2.5'
        ref={form}
        onSubmit={sendEmail}
      >

      <label className="block border-b-2 mb-5 text-[#ffffff]">
        <input
          type="text"
          name="user_name"
          className="
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

      <label className="block border-b-2 mb-5 text-[#ffffff]">
        <input
          name="user_email"
          type="email"
          className="
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

      <label className="block mb-10 text-[#ffffff]">
        <textarea
          name="message"
          className="
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

        
        <button
          type='submit'
          className='rounded p-2 shadow-md shadow-indigo-500/40 mt-2 text-white w-1/2 self-center text-lg font-semibold bg-gradient-to-r from-bluecolor via-purple-500 to-pinktext'
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Reachout;
