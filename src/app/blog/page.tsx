'use client';

import { motion } from 'framer-motion';
import { useI18n } from '@/lib/i18n';
import { fadeInUp, staggerContainer, drawLine } from '@/lib/animations';

export default function BlogPage() {
  const { t } = useI18n();
  const posts = t('blog.sample_posts') as Array<{
    title: string;
    date: string;
    excerpt: string;
    category: string;
  }>;

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
                {t('blog.section_label')}
              </span>
            </motion.div>
            <motion.h1 variants={fadeInUp} className="heading-xl mb-6">
              {t('blog.title')}
            </motion.h1>
            <motion.p variants={fadeInUp} className="body-lg text-white/60 max-w-2xl">
              {t('blog.subtitle')}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="section-padding">
        <div className="container-wide mx-auto">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="space-y-0"
          >
            {Array.isArray(posts) &&
              posts.map((post, index) => (
                <motion.article
                  key={index}
                  variants={fadeInUp}
                  className="group grid md:grid-cols-[120px_1fr] gap-8 py-12 border-b border-gray-100 cursor-pointer hover:bg-brand-red/[0.01] transition-colors duration-500 px-4 -mx-4"
                >
                  {/* Date column */}
                  <div className="flex flex-col items-start">
                    <span className="text-sm text-brand-gray-mid font-medium">
                      {post.date}
                    </span>
                    <span className="mt-2 inline-flex items-center px-3 py-1 text-xs font-medium bg-brand-red/5 text-brand-red">
                      {post.category}
                    </span>
                  </div>

                  {/* Content column */}
                  <div>
                    <h2 className="heading-sm mb-4 group-hover:text-brand-red transition-colors duration-300">
                      {post.title}
                    </h2>
                    <p className="text-brand-gray-mid leading-relaxed mb-6">
                      {post.excerpt}
                    </p>
                    <span className="inline-flex items-center text-sm font-medium text-brand-black group-hover:text-brand-red transition-colors duration-300">
                      {t('blog.read_more')}
                      <svg
                        className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform duration-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </div>
                </motion.article>
              ))}
          </motion.div>

          {/* Coming Soon Notice */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-16 text-center py-16 border-2 border-dashed border-gray-200"
          >
            <svg
              className="w-12 h-12 text-brand-gray-mid/30 mx-auto mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
              />
            </svg>
            <p className="text-brand-gray-mid">{t('blog.coming_soon')}</p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
