'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useI18n } from '@/lib/i18n';
import { fadeInUp, fadeInLeft, fadeInRight, staggerContainer, drawLine } from '@/lib/animations';

export default function ContactPage() {
  const { t } = useI18n();
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    company: '',
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('sending');

    // Simulate form submission (replace with actual API call)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setFormStatus('success');
      setFormData({ company: '', name: '', email: '', phone: '', subject: '', message: '' });
    } catch {
      setFormStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const inputClasses =
    'w-full px-0 py-4 bg-transparent border-b-2 border-gray-200 text-brand-black placeholder:text-brand-gray-mid/50 focus:border-brand-red focus:outline-none transition-colors duration-300 text-sm';

  return (
    <div className="pt-20">
      {/* Page Header */}
      <section className="section-padding bg-brand-black text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div
            className="w-full h-full"
            style={{
              backgroundImage:
                'linear-gradient(rgba(220,38,38,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(220,38,38,0.3) 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }}
          />
        </div>
        <div className="container-wide mx-auto relative">
          <motion.div variants={staggerContainer} initial="hidden" animate="visible">
            <motion.div variants={fadeInUp} className="flex items-center gap-4 mb-6">
              <motion.div variants={drawLine} className="h-[2px] bg-brand-red" />
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-brand-red">
                {t('contact.section_label')}
              </span>
            </motion.div>
            <motion.h1 variants={fadeInUp} className="heading-xl mb-6">
              {t('contact.title')}
            </motion.h1>
            <motion.p variants={fadeInUp} className="body-lg text-white/60 max-w-2xl">
              {t('contact.subtitle')}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="section-padding">
        <div className="container-wide mx-auto">
          <div className="grid lg:grid-cols-[1fr_380px] gap-20">
            {/* Form */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
            >
              {formStatus === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-20 text-center"
                >
                  <div className="w-20 h-20 bg-brand-red/10 flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-brand-red" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </div>
                  <p className="body-lg text-brand-gray-dark">{t('contact.form.success')}</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="grid md:grid-cols-2 gap-x-8 gap-y-2">
                    <motion.div variants={fadeInUp}>
                      <label className="block text-xs font-semibold tracking-wider uppercase text-brand-gray-mid mb-1 mt-4">
                        {t('contact.form.company')}
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className={inputClasses}
                      />
                    </motion.div>

                    <motion.div variants={fadeInUp}>
                      <label className="block text-xs font-semibold tracking-wider uppercase text-brand-gray-mid mb-1 mt-4">
                        {t('contact.form.name')} *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className={inputClasses}
                      />
                    </motion.div>

                    <motion.div variants={fadeInUp}>
                      <label className="block text-xs font-semibold tracking-wider uppercase text-brand-gray-mid mb-1 mt-4">
                        {t('contact.form.email')} *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className={inputClasses}
                      />
                    </motion.div>

                    <motion.div variants={fadeInUp}>
                      <label className="block text-xs font-semibold tracking-wider uppercase text-brand-gray-mid mb-1 mt-4">
                        {t('contact.form.phone')}
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={inputClasses}
                      />
                    </motion.div>
                  </div>

                  <motion.div variants={fadeInUp}>
                    <label className="block text-xs font-semibold tracking-wider uppercase text-brand-gray-mid mb-1 mt-4">
                      {t('contact.form.subject')} *
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className={inputClasses}
                    />
                  </motion.div>

                  <motion.div variants={fadeInUp}>
                    <label className="block text-xs font-semibold tracking-wider uppercase text-brand-gray-mid mb-1 mt-4">
                      {t('contact.form.message')} *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className={`${inputClasses} resize-none`}
                    />
                  </motion.div>

                  <motion.div variants={fadeInUp} className="mt-10">
                    <button
                      type="submit"
                      disabled={formStatus === 'sending'}
                      className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {formStatus === 'sending'
                        ? t('contact.form.sending')
                        : t('contact.form.submit')}
                      {formStatus !== 'sending' && (
                        <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                        </svg>
                      )}
                    </button>
                  </motion.div>

                  {formStatus === 'error' && (
                    <p className="mt-4 text-sm text-brand-red">{t('contact.form.error')}</p>
                  )}
                </form>
              )}
            </motion.div>

            {/* Contact Info Sidebar */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              className="space-y-10"
            >
              <motion.div variants={fadeInUp}>
                <h3 className="text-xs font-semibold tracking-[0.2em] uppercase text-brand-gray-mid mb-6">
                  {t('contact.info.title')}
                </h3>
              </motion.div>

              <motion.div variants={fadeInUp} className="space-y-8">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-brand-red/10 flex items-center justify-center">
                      <svg className="w-4 h-4 text-brand-red" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                      </svg>
                    </div>
                    <span className="text-xs font-semibold tracking-wider uppercase text-brand-gray-mid">
                      {t('contact.info.address_title')}
                    </span>
                  </div>
                  <p className="text-sm text-brand-gray-dark leading-relaxed pl-11">
                    954/1724 The Metropolis Building,<br />
                    3rd Floor, Room No. M3, Moo. 9,<br />
                    Thepharak, Muang Samutprakarn,<br />
                    Samutprakarn 10270
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-brand-red/10 flex items-center justify-center">
                      <svg className="w-4 h-4 text-brand-red" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                      </svg>
                    </div>
                    <span className="text-xs font-semibold tracking-wider uppercase text-brand-gray-mid">
                      {t('contact.info.tel_title')}
                    </span>
                  </div>
                  <p className="text-sm text-brand-gray-dark pl-11">02-088-8539</p>
                </div>

                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-brand-red/10 flex items-center justify-center">
                      <svg className="w-4 h-4 text-brand-red" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                      </svg>
                    </div>
                    <span className="text-xs font-semibold tracking-wider uppercase text-brand-gray-mid">
                      {t('contact.info.email_title')}
                    </span>
                  </div>
                  <p className="text-sm text-brand-gray-dark pl-11">info@miraibizlab.co.th</p>
                </div>
              </motion.div>

              {/* Business Hours */}
              <motion.div variants={fadeInUp} className="bg-brand-gray-light/50 p-8">
                <h4 className="text-xs font-semibold tracking-wider uppercase text-brand-gray-mid mb-4">
                  BUSINESS HOURS
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-brand-gray-mid">Mon - Fri</span>
                    <span className="text-brand-gray-dark font-medium">9:00 - 18:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-brand-gray-mid">Sat - Sun</span>
                    <span className="text-brand-gray-dark font-medium">Closed</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
