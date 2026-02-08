'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useI18n } from '@/lib/i18n';
import { fadeInUp, fadeInLeft, fadeInRight, staggerContainer, drawLine } from '@/lib/animations';

export default function AboutPage() {
  const { t } = useI18n();

  const companyInfo = [
    { key: 'company_name', value: t('about.company_name') },
    { key: 'established', value: t('about.established') },
    { key: 'representative', value: t('about.representative') },
    { key: 'capital', value: t('about.capital') },
    { key: 'address', value: t('about.address_en') },
    { key: 'tel', value: t('about.tel') },
    { key: 'tax_id', value: t('about.tax_id') },
  ];

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
                {t('about.section_label')}
              </span>
            </motion.div>
            <motion.h1 variants={fadeInUp} className="heading-xl mb-6">
              {t('about.title')}
            </motion.h1>
            <motion.p variants={fadeInUp} className="body-lg text-white/60 max-w-2xl">
              {t('about.subtitle')}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* CEO Message */}
      <section className="section-padding">
        <div className="container-wide mx-auto">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="grid lg:grid-cols-2 gap-16 items-center"
          >
            <motion.div variants={fadeInLeft}>
              <div className="relative">
                <div className="aspect-[3/4] bg-brand-gray-light relative overflow-hidden">
                  {/* Placeholder for CEO photo */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-32 h-32 bg-brand-red/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-16 h-16 text-brand-red/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                        </svg>
                      </div>
                      <p className="text-sm text-brand-gray-mid">CEO Photo</p>
                    </div>
                  </div>
                  {/* Accent corner */}
                  <div className="absolute bottom-0 right-0 w-24 h-24 bg-brand-red" />
                </div>
                {/* Frame decoration */}
                <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-brand-red/20 -z-10" />
              </div>
            </motion.div>

            <motion.div variants={fadeInRight}>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-[2px] bg-brand-red" />
                <span className="text-xs font-semibold tracking-[0.2em] uppercase text-brand-gray-mid">
                  MESSAGE
                </span>
              </div>
              <h2 className="heading-md mb-8">{t('about.message_title')}</h2>
              <p className="body-md text-brand-gray-mid leading-relaxed mb-8">
                {t('about.message')}
              </p>
              <div className="border-l-2 border-brand-red pl-6">
                <p className="font-semibold text-lg">{t('about.representative')}</p>
                <p className="text-sm text-brand-gray-mid mt-1">
                  CEO, MIRAI BizLab Co., Ltd.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Company Info Table */}
      <section className="section-padding bg-brand-gray-light/30">
        <div className="container-wide mx-auto">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            <motion.div variants={fadeInUp} className="flex items-center gap-4 mb-12">
              <motion.div variants={drawLine} className="h-[2px] bg-brand-red" />
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-brand-red">
                COMPANY INFO
              </span>
            </motion.div>

            <motion.div variants={fadeInUp} className="bg-white">
              {companyInfo.map((info, index) => (
                <div
                  key={info.key}
                  className={`grid md:grid-cols-[200px_1fr] border-b border-gray-100 last:border-b-0 ${
                    index % 2 === 0 ? '' : 'bg-gray-50/50'
                  }`}
                >
                  <div className="px-8 py-5 font-medium text-sm text-brand-gray-mid border-r border-gray-100">
                    {t(`about.table.${info.key}`)}
                  </div>
                  <div className="px-8 py-5 text-sm text-brand-gray-dark">
                    {info.value}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Map / Location Section */}
      <section className="section-padding">
        <div className="container-wide mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-4 mb-12">
              <div className="w-12 h-[2px] bg-brand-red" />
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-brand-red">
                LOCATION
              </span>
            </div>
            <div className="aspect-[21/9] bg-brand-gray-light relative overflow-hidden">
              {/* Placeholder for Google Maps embed */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <svg className="w-12 h-12 text-brand-gray-mid/30 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                  <p className="text-sm text-brand-gray-mid">
                    Google Maps will be embedded here
                  </p>
                  <p className="text-xs text-brand-gray-mid/60 mt-1">
                    The Metropolis Building, Samutprakarn
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
