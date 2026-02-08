'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import { useI18n } from '@/lib/i18n';
import {
  fadeInUp,
  fadeInLeft,
  fadeInRight,
  staggerContainer,
  drawLine,
  scaleIn,
} from '@/lib/animations';
import ScrollReveal from '@/components/ui/ScrollReveal';

// ─── Hero Section ────────────────────────────────────────────────
const HeroSection = () => {
  const { t } = useI18n();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const decorY = useTransform(scrollYProgress, [0, 1], [0, -80]);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background decorative elements */}
      <motion.div
        style={{ y: decorY }}
        className="absolute top-20 right-0 w-[600px] h-[600px] opacity-[0.03]"
      >
        <svg viewBox="0 0 600 600" fill="none">
          <circle cx="300" cy="300" r="290" stroke="#DC2626" strokeWidth="1" />
          <circle cx="300" cy="300" r="220" stroke="#DC2626" strokeWidth="0.5" />
          <circle cx="300" cy="300" r="150" stroke="#DC2626" strokeWidth="0.5" />
        </svg>
      </motion.div>

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              'linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />
      </div>

      <motion.div
        style={{ y: heroY, opacity: heroOpacity }}
        className="container-wide mx-auto px-6 md:px-12 lg:px-20 pt-32 pb-20"
      >
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            {/* Tagline */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="flex items-center gap-4 mb-8"
            >
              <div className="w-12 h-[2px] bg-brand-red" />
              <span className="text-sm font-medium tracking-[0.15em] uppercase text-brand-gray-mid">
                {t('hero.tagline')}
              </span>
            </motion.div>

            {/* Main heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
              className="heading-xl mb-8"
            >
              <span className="block">{t('hero.title_line1')}</span>
              <span className="block text-brand-red">{t('hero.title_line2')}</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="body-lg text-brand-gray-mid max-w-xl mb-12"
            >
              {t('hero.subtitle')}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <Link href="/services" className="btn-primary">
                {t('hero.cta_primary')}
                <svg
                  className="w-4 h-4 ml-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
              <Link href="/contact" className="btn-outline">
                {t('hero.cta_secondary')}
              </Link>
            </motion.div>
          </div>

          {/* Right side decoration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 1, ease: [0.25, 0.4, 0.25, 1] }}
            className="lg:col-span-5 hidden lg:block"
          >
            <div className="relative">
              {/* Abstract shapes representing business/tech */}
              <div className="w-full aspect-square relative">
                {/* Large red square */}
                <motion.div
                  animate={{ rotate: [0, 2, 0, -2, 0] }}
                  transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute top-8 right-8 w-64 h-64 bg-brand-red/5 border border-brand-red/10"
                />
                {/* Medium black square */}
                <motion.div
                  animate={{ rotate: [0, -3, 0, 3, 0] }}
                  transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute top-24 right-24 w-48 h-48 bg-brand-black/5 border border-brand-black/10"
                />
                {/* Small accent */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute bottom-16 right-16 w-20 h-20 bg-brand-red"
                />
                {/* Text overlay */}
                <div className="absolute top-1/2 left-0 -translate-y-1/2">
                  <div className="vertical-text text-8xl font-black text-brand-black/[0.03] tracking-widest">
                    未来
                  </div>
                </div>
                {/* Floating numbers */}
                <motion.div
                  animate={{ y: [0, -15, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute top-4 left-12 text-7xl font-black text-brand-red/[0.06]"
                >
                  01
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        >
          <span className="text-xs tracking-[0.15em] uppercase text-brand-gray-mid">
            {t('hero.scroll_hint')}
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-[1px] h-8 bg-brand-red/40"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

// ─── Services Preview Section ────────────────────────────────────
const ServicesPreview = () => {
  const { t } = useI18n();

  const services = [
    {
      num: '01',
      title: t('services.service1.title'),
      subtitle: t('services.service1.subtitle'),
      description: t('services.service1.description'),
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
        </svg>
      ),
    },
    {
      num: '02',
      title: t('services.service2.title'),
      subtitle: t('services.service2.subtitle'),
      description: t('services.service2.description'),
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
        </svg>
      ),
    },
    {
      num: '03',
      title: t('services.service3.title'),
      subtitle: t('services.service3.subtitle'),
      description: t('services.service3.description'),
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
        </svg>
      ),
    },
  ];

  return (
    <section className="section-padding bg-white relative">
      {/* Subtle background accent */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-gray-light/30" />

      <div className="container-wide mx-auto relative">
        {/* Section Header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="mb-20"
        >
          <motion.div variants={fadeInUp} className="flex items-center gap-4 mb-4">
            <motion.div variants={drawLine} className="h-[2px] bg-brand-red" />
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-brand-red">
              {t('services.section_label')}
            </span>
          </motion.div>
          <motion.h2 variants={fadeInUp} className="heading-lg mb-6">
            {t('services.title')}
          </motion.h2>
          <motion.p variants={fadeInUp} className="body-md text-brand-gray-mid max-w-2xl">
            {t('services.subtitle')}
          </motion.p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid md:grid-cols-3 gap-0 border border-gray-100"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="group relative p-10 md:p-12 border-r border-b border-gray-100 last:border-r-0 hover:bg-brand-red/[0.02] transition-all duration-700"
            >
              {/* Number */}
              <span className="text-7xl font-black text-brand-black/[0.04] absolute top-4 right-6 select-none">
                {service.num}
              </span>

              {/* Icon */}
              <div className="text-brand-red mb-6 group-hover:scale-110 transition-transform duration-500">
                {service.icon}
              </div>

              {/* Content */}
              <h3 className="heading-sm mb-2">{service.title}</h3>
              <p className="text-xs font-medium tracking-wider uppercase text-brand-gray-mid mb-4">
                {service.subtitle}
              </p>
              <p className="text-sm text-brand-gray-mid leading-relaxed mb-6">
                {service.description}
              </p>

              {/* Arrow link */}
              <Link
                href="/services"
                className="inline-flex items-center text-sm font-medium text-brand-black group-hover:text-brand-red transition-colors duration-300"
              >
                {t('services.cta')}
                <svg
                  className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>

              {/* Bottom accent line on hover */}
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-red scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// ─── About Preview Section ────────────────────────────────────────
const AboutPreview = () => {
  const { t } = useI18n();

  return (
    <section className="section-padding bg-brand-black text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 opacity-5">
        <svg viewBox="0 0 400 400" fill="none">
          <rect x="50" y="50" width="300" height="300" stroke="#DC2626" strokeWidth="1" />
          <rect x="100" y="100" width="200" height="200" stroke="#DC2626" strokeWidth="0.5" />
        </svg>
      </div>

      <div className="container-wide mx-auto relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            <motion.div variants={fadeInUp} className="flex items-center gap-4 mb-4">
              <div className="w-12 h-[2px] bg-brand-red" />
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-brand-red">
                {t('about.section_label')}
              </span>
            </motion.div>
            <motion.h2 variants={fadeInUp} className="heading-lg mb-8">
              {t('about.title')}
            </motion.h2>
            <motion.p variants={fadeInUp} className="body-md text-white/60 mb-8 leading-relaxed">
              {t('about.message')}
            </motion.p>
            <motion.div variants={fadeInUp}>
              <Link
                href="/about"
                className="inline-flex items-center px-8 py-4 border-2 border-white/20 text-white font-semibold transition-all duration-300 hover:border-brand-red hover:bg-brand-red"
              >
                {t('common.learn_more')}
                <svg
                  className="w-4 h-4 ml-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </motion.div>
          </motion.div>

          {/* Stats / Key Numbers */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-8"
          >
            {[
              { number: '2018', label: 'Since', sublabel: '設立' },
              { number: '50+', label: 'Clients', sublabel: 'クライアント' },
              { number: '3', label: 'Services', sublabel: '事業' },
              { number: '24/7', label: 'Support', sublabel: 'サポート' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="border border-white/10 p-8 hover:border-brand-red/30 transition-colors duration-500"
              >
                <span className="text-4xl md:text-5xl font-bold text-brand-red">
                  {stat.number}
                </span>
                <div className="mt-3">
                  <p className="text-sm font-medium text-white/80">{stat.label}</p>
                  <p className="text-xs text-white/40 mt-0.5">{stat.sublabel}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// ─── CTA Section ────────────────────────────────────────────────
const CTASection = () => {
  const { t } = useI18n();

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-gray-light/50 to-white" />
      <div className="container-wide mx-auto relative">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="heading-lg mb-6">{t('contact.title')}</h2>
            <p className="body-md text-brand-gray-mid mb-10">{t('contact.subtitle')}</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="btn-primary">
                {t('nav.contact')}
                <svg
                  className="w-4 h-4 ml-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

// ─── Home Page ─────────────────────────────────────────────────
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesPreview />
      <AboutPreview />
      <CTASection />
    </>
  );
}
