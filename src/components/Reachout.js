import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';

const Reachout = () => {
  const form = useRef();
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        'service_pjc9fob',
        'contact_form',
        form.current,
        'user_1ZgKmsnKSmgFtOD9CyAmj'
      )
      .then(
        (result) => {
          console.log(result.text);
          form.current.reset()
        },
        (error) => {
          console.log(error.text);
        }
      );
  };
  return (
    <div
      id='contact'
      className=' h-96 p-4 mt-8 flex flex-col gap-8 justify-center items-center'
    >
      <h1 className='font-extrabold text-4xl text-white'>
        Reach out to us if you are an{' '}
        <span className='text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600'>
          Artist
        </span>
      </h1>

      <form
        name='contact_form'
        className='flex flex-col w-64 items-cemter gap-2.5'
        ref={form}
        onSubmit={sendEmail}
      >
        <input
          className='rounded-sm'
          type='text'
          placeholder='Name'
          name='user_name'
        />

        <input
          className='rounded-sm'
          type='email'
          placeholder='Email'
          name='user_email'
        />

        <textarea
          className='rounded-sm'
          placeholder='Enter your message'
          name='message'
        />
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
