'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useI18n } from '@/lib/i18n';
import { fadeInUp, fadeInLeft, fadeInRight, staggerContainer, drawLine } from '@/lib/animations';

const ServiceDetail = ({
  num,
  titleKey,
  subtitleKey,
  descriptionKey,
  featuresKey,
  icon,
  reverse = false,
}: {
  num: string;
  titleKey: string;
  subtitleKey: string;
  descriptionKey: string;
  featuresKey: string;
  icon: React.ReactNode;
  reverse?: boolean;
}) => {
  const { t } = useI18n();
  const features = t(featuresKey) as string[];

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      className={`grid lg:grid-cols-2 gap-16 items-center py-20 md:py-28 border-b border-gray-100 last:border-b-0`}
    >
      {/* Content */}
      <motion.div
        variants={reverse ? fadeInRight : fadeInLeft}
        className={reverse ? 'lg:order-2' : ''}
      >
        <div className="flex items-center gap-4 mb-6">
          <span className="text-6xl font-black text-brand-red/10">{num}</span>
        </div>
        <h3 className="heading-md mb-2">{t(titleKey)}</h3>
        <p className="text-sm font-medium tracking-wider uppercase text-brand-gray-mid mb-6">
          {t(subtitleKey)}
        </p>
        <p className="body-md text-brand-gray-mid leading-relaxed mb-8">
          {t(descriptionKey)}
        </p>

        {/* Features list */}
        <div className="grid grid-cols-2 gap-3">
          {Array.isArray(features) &&
            features.map((feature: string, i: number) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 bg-brand-red flex-shrink-0" />
                <span className="text-sm text-brand-gray-dark">{feature}</span>
              </div>
            ))}
        </div>
      </motion.div>

      {/* Visual */}
      <motion.div
        variants={reverse ? fadeInLeft : fadeInRight}
        className={`relative ${reverse ? 'lg:order-1' : ''}`}
      >
        <div className="relative aspect-[4/3] bg-brand-gray-light/50 overflow-hidden">
          {/* Abstract representation */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-brand-red/10 transform scale-[3]">{icon}</div>
          </div>
          {/* Geometric accent */}
          <div className="absolute bottom-0 right-0 w-24 h-24 bg-brand-red" />
          <div className="absolute top-0 left-0 w-16 h-16 border-2 border-brand-black/10" />
          {/* Number overlay */}
          <span className="absolute top-6 right-8 text-[120px] font-black text-brand-black/[0.03] leading-none">
            {num}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function ServicesPage() {
  const { t } = useI18n();

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
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={fadeInUp} className="flex items-center gap-4 mb-6">
              <motion.div variants={drawLine} className="h-[2px] bg-brand-red" />
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-brand-red">
                {t('services.section_label')}
              </span>
            </motion.div>
            <motion.h1 variants={fadeInUp} className="heading-xl mb-6">
              {t('services.title')}
            </motion.h1>
            <motion.p variants={fadeInUp} className="body-lg text-white/60 max-w-2xl">
              {t('services.subtitle')}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Services Detail */}
      <section className="px-6 md:px-12 lg:px-20">
        <div className="container-wide mx-auto">
          <ServiceDetail
            num="01"
            titleKey="services.service1.title"
            subtitleKey="services.service1.subtitle"
            descriptionKey="services.service1.description"
            featuresKey="services.service1.features"
            icon={
              <svg className="w-24 h-24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={0.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
              </svg>
            }
          />

          <ServiceDetail
            num="02"
            titleKey="services.service2.title"
            subtitleKey="services.service2.subtitle"
            descriptionKey="services.service2.description"
            featuresKey="services.service2.features"
            reverse
            icon={
              <svg className="w-24 h-24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={0.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
              </svg>
            }
          />

          <ServiceDetail
            num="03"
            titleKey="services.service3.title"
            subtitleKey="services.service3.subtitle"
            descriptionKey="services.service3.description"
            featuresKey="services.service3.features"
            icon={
              <svg className="w-24 h-24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={0.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
              </svg>
            }
          />
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-brand-gray-light/30">
        <div className="container-wide mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="heading-md mb-6">{t('contact.title')}</h2>
            <p className="body-md text-brand-gray-mid mb-8 max-w-xl mx-auto">
              {t('contact.subtitle')}
            </p>
            <Link href="/contact" className="btn-primary">
              {t('nav.contact')}
              <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
