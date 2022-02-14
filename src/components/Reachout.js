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
    <div className=' p-4 mt-8 flex flex-col gap-8 justify-center items-center'>
      <h1 className='font-extrabold text-3xl sm:text-8xl text-white'>
        Coming Soon
      </h1>
      <form
        name='contact_form'
        className='flex flex-col md:w-1/2 justify-center items-center gap-10 text-xl p-4  rounded-md'
        ref={form}
        onSubmit={sendEmail}
      >

      <label className="flex w-[80%] text-[#ffffff]">
        <input
          type="text"
          name="user_name"
          className="
            w-full
            my-1
            shadow-md
            border-b-2
            bg-transparent
          "
          placeholder="Name"
        />
      </label>

      <label className="flex w-[80%] text-[#ffffff]">
        <input
          name="user_email"
          type="email"
          className="
            w-full
            mt-1
            shadow-md
            border-b-2
            bg-transparent
          "
          placeholder="Email address"
          required
        />
      </label>

      <label className="flex w-[80%] text-[#ffffff]">
        <textarea
          name="message"
          className="
            w-full
            mt-1
            border-b-2
            bg-transparent
          "
          rows="2"
          placeholder="Tell us what you're thinking about..."
        ></textarea>
      </label>

        
        <button
          type='submit'
          className='rounded p-2 shadow-md border-2 shadow-indigo-500/40 mt-2 text-white sm:w-1/5 self-center text-lg font-semibold bg-blue-700'
        >
          Submit
        </button>
      </form>
    </div>

  );
};

export default Reachout;
