import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

interface ContactProps {
  setActiveSection: (section: string) => void;
}

const schema = yup.object().shape({
  name: yup.string().required('Name is required').min(2, 'Name must be at least 2 characters'),
  email: yup.string().email('Invalid email').required('Email is required'),
  message: yup.string().required('Message is required').min(10, 'Message must be at least 10 characters'),
});

type FormData = yup.InferType<typeof schema>;

export default function Contact({ setActiveSection }: ContactProps) {
  const { ref, inView } = useInView({
    threshold: 0.3,
    onChange: (inView) => {
      if (inView) setActiveSection('contact');
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });
const onSubmit = async (data: FormData) => {
  try {
    const response = await fetch('https://backend-portfolio-jcqb.onrender.com/api/sendMessage', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to send message');
    }

    alert('✅ Message sent successfully!');
    reset();
  } catch (error) {
    alert('❌ Failed to send message, please try again later.');
    console.error(error);
  }
};

  // const onSubmit = (data: FormData) => {
  //   console.log('Form submitted:', data);
  //  
  //   alert('Thank you for your message! I\'ll get back to you soon.');
  //   reset();
  // };

  const contactInfo = [
    {
      icon: <Mail size={24} />,
      title: 'Email',
      value: 'abdigashahun0@gmail.com',
      link: 'mailto:abdigashahun0@gmail.com'
    },
    {
      icon: <Phone size={24} />,
      title: 'Phone',
      value: '09 48503006',
      link: '0948503006'
    },
    {
      icon: <MapPin size={24} />,
      title: 'Location',
      value: 'Addis Ababa, Ethiopia',
      link: 'https://www.google.com/maps/place/addis+ababa+location/data=!4m2!3m1!1s0x164b85cef5ab402d:0x8467b6b037a24d49?sa=X&ved=1t:155783&ictx=111'
    }
  ];

  return (
    <section id="contact" ref={ref} className="min-h-screen flex items-center justify-center py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Get In <span className="bg-gradient-to-r from-gray-300 to-gray-200 bg-clip-text text-transparent">Touch</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-gray-300 to-gray-500 mx-auto"></div>
          <p className="text-gray-300 mt-6 text-lg">
            Ready to start your next project? Let's work together to create something amazing.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Let's Connect</h3>
              <p className="text-gray-300 mb-8">
                I'm always open to discussing new opportunities, creative ideas, or potential collaborations. 
                Whether you have a project in mind or just want to chat about technology, I'd love to hear from you.
              </p>
            </div>

            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={info.title}
                  href={info.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.4 + index * 0.1 }}
                  className="flex items-center gap-4 p-4 bg-gray-800/50 rounded-lg backdrop-blur-sm hover:bg-gray-800/70 transition-all duration-300 group"
                >
                  <div className="p-3 bg-gradient-to-r from-black to-gray-500 rounded-full text-white group-hover:scale-110 transition-transform duration-300">
                    {info.icon}
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">{info.title}</h4>
                    <p className="text-gray-300">{info.value}</p>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  {...register('name')}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm"
                  placeholder="Enter your name"
                />
                {errors.name && (
                  <p className="mt-1 text-red-400 text-sm">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  {...register('email')}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm"
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <p className="mt-1 text-red-400 text-sm">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Your Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  {...register('message')}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm resize-none"
                  placeholder="Enter your message"
                />
                {errors.message && (
                  <p className="mt-1 text-red-400 text-sm">{errors.message.message}</p>
                )}
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full px-8 py-4 bg-gradient-to-r from-black to-gray-500 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Send size={20} />
                Send Message
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}