import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function FAQsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [openIndex, setOpenIndex] = useState(null);

  const faqData = [
    {
      id: 1,
      category: "About OrderRight",
      question: "What is OrderRight?",
      answer: "OrderRight is a platform where you can shop ready-made T-shirts and customize your own apparel."
    },
    {
      id: 5,
      category: "Apparel & Sizing",
      question: "Can I choose my T-shirt size?",
      answer: "Yes. Available sizes are displayed when selecting or customizing a product."
    },
    {
      id: 8,
      category: "Graduation Sash Studio",
      question: "What is the Graduation Sash Studio?",
      answer: "The Graduation Sash Studio allows you to personalize a graduation sash with details such as your name, academic programme, university logo, Adinkra symbols, quotes, verses, and other supported elements."
    },
    {
      id: 9,
      category: "Graduation Sash Studio",
      question: "Can I upload my own university logo?",
      answer: "Yes. If you cannot find your university in the available list, you can upload your university logo from your device, and provide your university's name in the provided field."
    },
    {
      id: 10,
      category: "Ordering & Preview",
      question: "Can I preview my customized design before ordering?",
      answer: "Yes. You can preview your T-shirt or graduation sash design before adding it to your cart and placing your order."
    },
    {
      id: 11,
      category: "Ordering & Preview",
      question: "Can I save my design and continue later?",
      answer: "Yes, where the feature is available. Logged-in users can save their designs and return to continue editing them later."
    },
    {
      id: 12,
      category: "Shipping & Delivery",
      question: "Do you offer free delivery?",
      answer: "Yes. Delivery is free to supported schools and universities."
    },
    {
      id: 13,
      category: "Shipping & Delivery",
      question: "How are orders delivered outside schools and universities?",
      answer: "For locations outside supported schools and universities, we use Speedaf delivery. You can choose the Speedaf branch closest to you and pay the delivery fee when picking up your order."
    },
    {
      id: 14,
      category: "Shipping & Delivery",
      question: "How long will my order take?",
      answer: "Production and delivery times may vary depending on the type of product, level of customization, quantity ordered, and delivery location. Standard courier delivery takes 2-5 business days across Ghana."
    },
    {
      id: 15,
      category: "Orders & Support",
      question: "Can I cancel or change my order?",
      answer: "You may contact us as soon as possible if you need to cancel or make changes to your order. Changes may not be possible once production has started."
    },
    {
      id: 16,
      category: "Payment Methods",
      question: "What payment methods do you accept?",
      answer: "Available payment methods will be displayed during checkout (including Paystack Mobile Money for MTN, Telecel, AT, and debit/credit cards)."
    },
    {
      id: 18,
      category: "Orders & Support",
      question: "What should I do if I receive the wrong or damaged item?",
      answer: "Please contact the OrderRight team as soon as possible and provide your order details so we can review the issue and assist you."
    },
    {
      id: 19,
      category: "Bulk & Corporate",
      question: "Can businesses and organizations place orders?",
      answer: "Yes. OrderRight supports individual and bulk orders for businesses, schools, churches, events, teams, organizations, and other groups."
    },
    {
      id: 20,
      category: "Orders & Support",
      question: "How can I contact OrderRight?",
      answer: "You can contact us using the details provided on our Contact Us page or via email (orderrightgh@gmail.com) or phone (0507363108) for questions, order support, or other enquiries."
    }
  ];

  const categories = ['All', 'About OrderRight', 'Graduation Sash Studio', 'Shipping & Delivery', 'Ordering & Preview', 'Orders & Support'];

  const filteredFaqs = faqData.filter(faq => {
    const matchesCategory = activeCategory === 'All' || faq.category === activeCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleAccordion = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <main className="min-h-screen pt-28 pb-2xl bg-surface-container-lowest text-primary">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        
        {/* Hero Header */}
        <div className="text-center max-w-3xl mx-auto mb-xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/10 border border-secondary/20 mb-md">
            <span className="material-symbols-outlined text-[18px] text-secondary">help</span>
            <span className="font-label font-bold text-label-md uppercase tracking-wider text-secondary">
              Help Center & Guide
            </span>
          </div>
          <h1 className="font-display font-bold text-display-lg-mobile md:text-display-lg text-primary mb-sm">
            Frequently Asked Questions
          </h1>
          <p className="font-body text-body-lg text-on-surface-variant leading-relaxed">
            Find quick answers to common questions about OrderRight, apparel customization, the Graduation Sash Studio, delivery, and payment options.
          </p>
        </div>

        {/* Live Search Bar */}
        <div className="max-w-2xl mx-auto mb-xl relative">
          <div className="relative flex items-center">
            <span className="material-symbols-outlined absolute left-4 text-on-surface-variant text-[24px]">
              search
            </span>
            <input 
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search questions by topic, delivery, logo upload, sash studio..."
              className="w-full bg-surface-container-low border border-outline-variant rounded-2xl pl-12 pr-4 py-4 text-body-md text-on-surface focus:outline-none focus:border-primary shadow-sm"
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')}
                className="absolute right-4 text-on-surface-variant hover:text-primary p-1"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            )}
          </div>
        </div>

        {/* Category Pill Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-xl">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-label-md font-label uppercase tracking-wider transition-all ${
                activeCategory === cat
                  ? 'bg-primary text-on-primary shadow-md'
                  : 'bg-surface-container-low text-on-surface-variant border border-outline-variant hover:bg-surface-container-high'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FAQ Accordion List */}
        <div className="max-w-3xl mx-auto space-y-md mb-2xl">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-2xl bg-surface-container-low rounded-3xl border border-surface-container-highest p-xl">
              <span className="material-symbols-outlined text-[48px] text-outline-variant mb-md">search_off</span>
              <h3 className="font-headline font-bold text-headline-md text-primary mb-xs">No FAQs Found</h3>
              <p className="font-body text-body-md text-on-surface-variant">
                We couldn't find any questions matching "{searchTerm}". Try clearing your search term.
              </p>
            </div>
          ) : (
            filteredFaqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div 
                  key={faq.id}
                  className="bg-surface-container-lowest border border-surface-container-highest rounded-2xl overflow-hidden shadow-xs transition-all duration-200"
                >
                  <button
                    onClick={() => toggleAccordion(idx)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 hover:bg-surface-container-low/50 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <span className="font-headline font-bold text-headline-sm text-secondary flex-shrink-0">
                        Q{faq.id}.
                      </span>
                      <h3 className="font-headline font-semibold text-headline-sm sm:text-body-lg text-primary">
                        {faq.question}
                      </h3>
                    </div>
                    <span className={`material-symbols-outlined text-[24px] text-on-surface-variant transition-transform duration-300 flex-shrink-0 ${
                      isOpen ? 'rotate-180 text-secondary' : ''
                    }`}>
                      expand_more
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-6 sm:px-6 sm:pb-6 pt-0 border-t border-surface-container-highest/50 animate-fadeIn">
                      <p className="font-body text-body-md text-on-surface-variant leading-relaxed pl-8">
                        {faq.answer}
                      </p>
                      <div className="mt-3 pl-8">
                        <span className="inline-block text-[11px] font-bold uppercase tracking-wider bg-surface-container text-on-surface-variant px-3 py-1 rounded-full">
                          {faq.category}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Quick Contact & Action Support Cards */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-gutter">
          
          <div className="bg-surface-container-low border border-surface-container-highest p-6 sm:p-8 rounded-3xl flex flex-col justify-between space-y-4">
            <div>
              <div className="w-12 h-12 bg-sash-gold-dark/10 text-sash-gold-dark rounded-2xl flex items-center justify-center mb-md border border-sash-gold-dark/20">
                <span className="material-symbols-outlined text-[28px]">school</span>
              </div>
              <h3 className="font-headline font-bold text-headline-md text-primary mb-2">Graduation Sash Studio</h3>
              <p className="font-body text-body-md text-on-surface-variant leading-relaxed">
                Design your custom graduation stole with university emblems, Adinkra symbols, and personalized embroidery.
              </p>
            </div>
            <Link 
              to="/sash-studio/designer"
              className="inline-flex items-center justify-center gap-2 bg-sash-gold-dark hover:bg-sash-gold text-white font-label font-bold text-label-md py-3.5 px-6 rounded-xl uppercase tracking-wider shadow-md transition-all w-full text-center"
            >
              <span>OPEN SASH STUDIO</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </Link>
          </div>

          <div className="bg-surface-container-low border border-surface-container-highest p-6 sm:p-8 rounded-3xl flex flex-col justify-between space-y-4">
            <div>
              <div className="w-12 h-12 bg-secondary/10 text-secondary rounded-2xl flex items-center justify-center mb-md border border-secondary/20">
                <span className="material-symbols-outlined text-[28px]">support_agent</span>
              </div>
              <h3 className="font-headline font-bold text-headline-md text-primary mb-2">Have Extra Questions?</h3>
              <p className="font-body text-body-md text-on-surface-variant leading-relaxed">
                Reach out to our customer support team directly in Dansoman, Accra or call our support lines.
              </p>
            </div>
            <div className="space-y-2">
              <a 
                href="mailto:orderrightgh@gmail.com" 
                className="w-full bg-primary hover:bg-primary/90 text-on-primary font-label font-bold text-label-md py-3.5 px-6 rounded-xl uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-[18px]">mail</span>
                <span>orderrightgh@gmail.com</span>
              </a>
            </div>
          </div>

        </div>

      </div>
    </main>
  );
}
