import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const ContactUs = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [successMessage, setSuccessMessage] = useState('');

    const onSubmit = () => {
        setSuccessMessage('Thank you for reaching out to us. We will get back to you shortly.');
    };

    return (
        <div className='p-8 bg-gray-100'>
            <h3 className='text-4xl text-center mb-8 font-bold text-gray-800'>Get in Touch</h3>
            <div className="lg:flex lg:px-16 justify-center">
                <div className="container">
                    <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto bg-white p-8 shadow-lg rounded-lg">
                        <div className="mb-6">
                            <label htmlFor="name" className="block text-gray-800 font-semibold mb-2">Full Name</label>
                            <input {...register('name', { required: 'Please enter your full name' })} type="text" id="name" className="input w-full border border-gray-300 p-2 rounded" />
                            {errors.name && <p className="text-red-600 mt-1">{errors.name.message}</p>}
                        </div>
                        <div className="mb-6">
                            <label htmlFor="email" className="block text-gray-800 font-semibold mb-2">Email Address</label>
                            <input {...register('email', { required: 'Please enter a valid email address', pattern: { value: /\S+@\S+\.\S+/, message: 'Invalid email format' } })} type="email" id="email" className="input w-full border border-gray-300 p-2 rounded" />
                            {errors.email && <p className="text-red-600 mt-1">{errors.email.message}</p>}
                        </div>
                        <div className="mb-6">
                            <label htmlFor="subject" className="block text-gray-800 font-semibold mb-2">Subject</label>
                            <input {...register('subject', { required: 'Please provide a subject' })} type="text" id="subject" className="input w-full border border-gray-300 p-2 rounded" />
                            {errors.subject && <p className="text-red-600 mt-1">{errors.subject.message}</p>}
                        </div>
                        <div className="mb-6">
                            <label htmlFor="message" className="block text-gray-800 font-semibold mb-2">Message</label>
                            <textarea {...register('message', { required: 'Your message cannot be empty' })} id="message" className="input w-full border border-gray-300 p-2 rounded h-32 resize-none" />
                            {errors.message && <p className="text-red-600 mt-1">{errors.message.message}</p>}
                        </div>
                        <button type="submit" className="btn btn-primary w-full py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition duration-300">Send Message</button>
                        {successMessage && <p className="text-green-600 mt-4 text-center">{successMessage}</p>}
                    </form>
                </div>
                <div className="container text-center mt-10 lg:mt-0 lg:ml-16">
                    <h4 className='text-2xl font-semibold text-gray-800 mb-6'>Contact Information</h4>
                    <p className='mb-4'><span className='font-medium'>Email:</span> <a href="mailto:contact@example.com" className='text-blue-600'>contact@example.com</a></p>
                    <p className='mb-4'><span className='font-medium'>Phone:</span> <a href="tel:123-456-7890" className='text-blue-600'>123-456-7890</a></p>
                    <p className='mb-4'><span className='font-medium'>Address:</span> 123 Fake Street, Fictionville, FS 12345</p>
                    <h5 className='text-xl font-semibold text-gray-800 mt-8'>Connect With Us</h5>
                    <p className='mt-4'>
                        <a href="https://www.facebook.com/examplerealestate" className='text-blue-600'>Facebook</a> | 
                        <a href="https://twitter.com/examplerealestate" className='text-blue-600 ml-2'>Twitter</a> | 
                        <a href="https://www.instagram.com/examplerealestate" className='text-blue-600 ml-2'>Instagram</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
