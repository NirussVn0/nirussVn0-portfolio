'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimationController } from '@/lib/animations';
import { Icon } from '@/components/icons';

export class ContactSection {
  private animationController: AnimationController;

  constructor() {
    this.animationController = new AnimationController();
  }

  initializeAnimations(container: HTMLElement) {
    this.animationController.fadeIn('.contact-title', 0, 1000);
    this.animationController.slideIn('.contact-form', 'left', 300);
    this.animationController.slideIn('.contact-info', 'right', 600);
    this.animationController.staggeredReveal('.contact-item', 900);
  }

  setupFormAnimations() {
    const formInputs = document.querySelectorAll('.form-input');
    formInputs.forEach((input) => {
      input.addEventListener('focus', () => {
        this.animationController.hoverEffect(input).enter();
      });
      input.addEventListener('blur', () => {
        this.animationController.hoverEffect(input).leave();
      });
    });
  }

  cleanup() {
    this.animationController.cleanup();
  }
}

export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);
  const contactSectionRef = useRef<ContactSection | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  useEffect(() => {
    if (!containerRef.current) return;

    contactSectionRef.current = new ContactSection();
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && contactSectionRef.current) {
            contactSectionRef.current.initializeAnimations(entry.target as HTMLElement);
            setTimeout(() => {
              if (contactSectionRef.current) {
                contactSectionRef.current.setupFormAnimations();
              }
            }, 1000);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(containerRef.current);

    return () => {
      if (contactSectionRef.current) {
        contactSectionRef.current.cleanup();
      }
      observer.disconnect();
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Here you would typically send the data to your backend
    alert('Thank you for your message! I\'ll get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const contactInfo = [
    {
      icon: 'email',
      title: 'Email',
      value: 'hello@niruss.dev',
      link: 'mailto:hello@niruss.dev',
    },
    {
      icon: 'phone',
      title: 'Phone',
      value: '+1 (555) 123-4567',
      link: 'tel:+15551234567',
    },
    {
      icon: 'location',
      title: 'Location',
      value: 'San Francisco, CA',
      link: '#',
    },
    {
      icon: 'linkedin',
      title: 'LinkedIn',
      value: '/in/niruss-dev',
      link: 'https://linkedin.com/in/niruss-dev',
    },
  ];

  const socialLinks = [
    { name: 'GitHub', icon: 'github', url: 'https://github.com/NirussVn0' },
    { name: 'LinkedIn', icon: 'linkedin', url: 'https://linkedin.com/in/niruss-dev' },
    { name: 'Twitter', icon: 'twitter', url: 'https://twitter.com/niruss_dev' },
    { name: 'Discord', icon: 'discord', url: 'https://discord.gg/niruss' },
  ];

  return (
    <section
      ref={containerRef}
      className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900 py-20 px-6"
    >
      <div className="max-w-7xl mx-auto">
        <div className="contact-title opacity-0">
          <h2 className="text-4xl md:text-6xl font-bold text-center mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Let's Work Together
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 text-center mb-16 max-w-3xl mx-auto">
            Have a project in mind or want to discuss opportunities? I'd love to hear from you. 
            Let's create something amazing together.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div className="contact-form opacity-0 transform translate-x-[-100px]">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                Send me a message
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="form-input w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-300"
                      placeholder="John Doe"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="form-input w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-300"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="form-input w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-300"
                    placeholder="Project Discussion"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="form-input w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-300 resize-none"
                    placeholder="Tell me about your project or how I can help you..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 hover:scale-105"
                >
                  <span className="relative z-10">Send Message</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-700 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </form>
            </div>
          </div>

          <div className="contact-info opacity-0 transform translate-x-[100px]">
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                  Get in touch
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
                  I'm always open to discussing new opportunities, interesting projects, 
                  or just having a chat about technology and development. Feel free to reach out!
                </p>
              </div>

              <div className="grid gap-4">
                {contactInfo.map((info, index) => (
                  <a
                    key={info.title}
                    href={info.link}
                    className="contact-item opacity-0 flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:scale-105 transition-all duration-300 group"
                  >
                    <div>
                      <Icon
                        name={info.icon}
                        size={24}
                        className="text-primary-500"
                        hover={true}
                        hoverScale={1.15}
                        hoverRotate={5}
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 dark:text-white">{info.title}</h4>
                      <p className="text-gray-600 dark:text-gray-300">{info.value}</p>
                    </div>
                  </a>
                ))}
              </div>

              <div className="pt-8">
                <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                  Follow me on social media
                </h4>
                <div className="flex gap-4">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="contact-item opacity-0 w-12 h-12 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full flex items-center justify-center hover:shadow-lg hover:scale-110 hover:rotate-12 transition-all duration-300 hover:border-primary-500"
                      aria-label={social.name}
                    >
                      <Icon
                        name={social.icon}
                        size={20}
                        className="text-primary-500 hover:text-primary-600"
                        hover={true}
                        hoverScale={1.2}
                        hoverRotate={12}
                      />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <div className="contact-title opacity-0">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                Ready to start your project?
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Let's discuss your ideas and turn them into reality. I'm here to help you 
                build something extraordinary.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300">
                  Schedule a Call
                </button>
                <button className="px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-lg hover:border-blue-500 hover:text-blue-500 transition-all duration-300">
                  View Portfolio
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
