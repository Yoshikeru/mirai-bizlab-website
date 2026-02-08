'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useI18n } from '@/lib/i18n';
import { fadeInUp, staggerContainer } from '@/lib/animations';

const Footer = () => {
  const { t } = useI18n();

  const navItems = [
    { href: '/', label: t('nav.home') },
    { href: '/services', label: t('nav.services') },
    { href: '/about', label: t('nav.about') },
    { href: '/blog', label: t('nav.blog') },
    { href: '/contact', label: t('nav.contact') },
  ];

  return (
    <footer className="bg-brand-black text-white">
      {/* Main Footer */}
      <div className="container-wide mx-auto px-6 md:px-12 lg:px-20 py-16 md:py-20">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12"
        >
          {/* Brand Column */}
          <motion.div variants={fadeInUp} className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <img
                src="/images/logo.svg"
                alt="MIRAI BizLab"
                className="h-10 w-auto"
              />
              <div className="flex flex-col">
                <span className="text-lg font-bold tracking-tight leading-none">
                  MIRAI BizLab
                </span>
                <span className="text-[10px] tracking-[0.2em] text-white/50 uppercase leading-none mt-0.5">
                  Co., Ltd.
                </span>
              </div>
            </div>
            <p className="text-white/60 leading-relaxed max-w-md text-sm">
              {t('footer.description')}
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={fadeInUp}>
            <h4 className="text-xs font-semibold tracking-[0.2em] uppercase text-white/40 mb-6">
              {t('footer.quick_links')}
            </h4>
            <ul className="space-y-3">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-white/60 hover:text-brand-red transition-colors duration-300 text-sm"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={fadeInUp}>
            <h4 className="text-xs font-semibold tracking-[0.2em] uppercase text-white/40 mb-6">
              {t('footer.contact_info')}
            </h4>
            <div className="space-y-4 text-sm text-white/60">
              <div>
                <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Tel</p>
                <p>02-088-8539</p>
              </div>
              <div>
                <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Email</p>
                <p>info@miraibizlab.co.th</p>
              </div>
              <div>
                <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Address</p>
                <p className="leading-relaxed">
                  The Metropolis Building, 3rd Floor
                  <br />
                  Samutprakarn 10270, Thailand
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container-wide mx-auto px-6 md:px-12 lg:px-20 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40">{t('footer.copyright')}</p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-xs text-white/40 hover:text-brand-red transition-colors duration-300 flex items-center gap-2"
          >
            <span>{t('common.back_to_top')}</span>
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
