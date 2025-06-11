import React, { useEffect, useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, ArrowRight, CheckCircle } from 'lucide-react';
import getContact from '../services/contact/getContact.js';
import Loader from '../components/Loader.jsx';
import sendMailService from '../services/mail/sendMailService.js';
import scrollToPageTop from '../utils/scrollToPageTop.js';

const ContactUs = () => {
  const [companyContact, setCompanyContact] = useState([]);
  const [isContactLoading, setIsContactLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: ''
  });

  async function handleSubmit(e) {
    e.preventDefault();
    // Handle form submission here

    // console.log('Form submitted:', formData);
    setIsSending(true)
    const contactFormData = new FormData()
    contactFormData.append("name",formData.name)
    contactFormData.append("email",formData.email)
    contactFormData.append("phone",formData.phone)
    contactFormData.append("subject",formData.subject)
    contactFormData.append("message",formData.message)
    const data = await sendMailService(contactFormData)
    // Simulate successful submission
    // console.log(data.data.status)
    
    setIsSending(false)
    
    setSubmitStatus('success');
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: 'General Inquiry',
        message: ''
      });
      setSubmitStatus(null);
    }, 4000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  async function fetchContact() {
    try {
      const { data } = await getContact();
      // console.log("contact", data);
      setCompanyContact(data);
    } catch (error) {
      console.error("Error fetching contact information:", error);
    } finally {
      setIsContactLoading(false);
    }
  }
  
  useEffect(() => {
    fetchContact();
    scrollToPageTop()
  }, []);

  return (
    <>
    

      {isContactLoading ? (
        <div className='h-screen flex items-center justify-center bg-gray-50'>
          <Loader />
        </div>
      ) : (
        <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-emerald-100">
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-16">
            <div className="text-center mb-16">
              <h1 className="text-xl sm:text-5xl font-bold text-gray-900 mb-4">
                Got a Question?
                 {/* <span className="text-indigo-600">Touch</span> */}
              </h1>
              <p className="sm:text-lg text-gray-600 max-w-2xl mx-auto">
                Whether it’s about your order, our farms, or anything green and fresh — just send us a message and we’ll reach out quickly.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Contact Information */}
              <div className="lg:col-span-1">
  {/* Contact Info Card */}
  <div className="bg-white border-l-4 border-emerald-500 rounded-3xl shadow-md p-8 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
    <h3 className="text-2xl font-bold text-emerald-700 mb-6 flex items-center">
      <MessageSquare className="h-6 w-6 text-emerald-600 mr-2" />
      Get in Touch
    </h3>

    <div className="space-y-6 text-sm">
      <div className="flex items-start group">
        <div className="p-3 hidden sm:block bg-emerald-100 rounded-full group-hover:bg-emerald-200 transition-all duration-300">
          <Mail className="h-5 w-5  text-emerald-700" />
        </div>
        <div className="ml-4">
          <p className="font-semibold text-gray-700">Email</p>
          <a
            href={`mailto:${companyContact[0]?.email}`}
            className="text-emerald-600 hover:underline"
          >
            {companyContact[0]?.email || 'farmershelpinfo1@gmail.com'}
          </a>
        </div>
      </div>

      <div className="flex items-start group">
        <div className="p-3 hidden sm:block bg-emerald-100 rounded-full group-hover:bg-emerald-200 transition-all duration-300">
          <Phone className="h-5 w-5 text-emerald-700" />
        </div>
        <div className="ml-4">
          <p className="font-semibold text-gray-700">Phone</p>
          <a
            href={`tel:+91${companyContact[0]?.contactNo}`}
            className="text-emerald-600 hover:underline"
          >
            +91 {companyContact[0]?.contactNo || '8789919292'}
          </a>
        </div>
      </div>

      <div className="flex items-start group">
        <div className="p-3 hidden sm:block bg-emerald-100 rounded-full group-hover:bg-emerald-200 transition-all duration-300">
          <MapPin className="h-5 w-5 text-emerald-700" />
        </div>
        <div className="ml-4">
          <p className="font-semibold text-gray-700">Address</p>
          <p className="text-gray-600">
            {companyContact[0]?.address.area || 'A5, Kalyani'}<br />
            {companyContact[0]?.address.city || 'West Bengal'},{' '}
            {companyContact[0]?.address.country || 'India'},{' '}
            {companyContact[0]?.address.postalCode || '123456'}
          </p>
        </div>
      </div>
    </div>
  </div>

  {/* FAQ Card */}
  <div className="mt-8 bg-white border-l-4 border-lime-500 rounded-3xl shadow-md p-8 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
    <h3 className="text-xl font-bold text-lime-700 mb-6">Frequently Asked Questions</h3>

    <div className="space-y-4 text-sm">
      <div>
        <h4 className="font-semibold text-lime-600">How soon will I hear back after contacting you?</h4>
        <p className="text-gray-600 mt-1">
          We usually respond within 24 hours on business days. Your queries matter — and we’re always happy to help.
        </p>
      </div>
      <div>
        <h4 className="font-semibold text-lime-600">Are you available on weekends?</h4>
        <p className="text-gray-600 mt-1">
          Yes, we offer limited support on Saturdays. For urgent help, give us a call and we’ll be there for you.
        </p>
      </div>
    </div>
  </div>
</div>


              {/* Contact Form */}
              <div className="lg:col-span-2">
                <div className="bg-emerald-50 rounded-2xl shadow-xl p-8 transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
                  <h3 className="sm:text-2xl font-semibold text-gray-900 mb-8 flex items-center">
                    <Send className="h-6 w-6 text-emerald-600 mr-2" />
                    Send Us a Message
                  </h3>

                  {submitStatus === 'success' ? (
                    <div className="bg-green-50 p-6 rounded-xl flex flex-col items-center text-center">
                      <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
                      <h3 className="text-2xl font-semibold text-green-800 mb-2">Message Sent Successfully!</h3>
                      <p className="text-green-600 mb-4">Thank you for contacting us. We'll get back to you shortly.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="relative">
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                            Full Name
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all duration-200"
                            placeholder="Enter Your Name"
                            required
                          />
                        </div>

                        <div className="relative">
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                            Email Address
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all duration-200"
                            placeholder="Enter Your Email"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="relative">
                          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all duration-200"
                            placeholder="Enter Your Phone No."
                          />
                        </div>

                        <div className="relative">
                          <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                            Subject
                          </label>
                          <select
                            id="subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all duration-200"
                            required
                          >
                            <option value="General Inquiry">General Inquiry</option>
                            <option value="Product Support">Product Support</option>
                            <option value="Billing Question">Billing Question</option>
                            <option value="Partnership">Partnership Opportunity</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                      </div>

                      <div className="relative">
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                          Message
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          rows={6}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all duration-200"
                          placeholder="Tell us more about your inquiry..."
                          required
                        ></textarea>
                      </div>

                      <div className="flex items-center">
                        <input
                          id="privacy-policy"
                          name="privacy-policy"
                          type="checkbox"
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                          required
                        />
                        <label htmlFor="privacy-policy" className="ml-2 block text-sm text-gray-600">
                          I agree to the <a href="#" className="text-emerald-600 hover:text-emerald-800">privacy policy</a> and consent to being contacted.
                        </label>
                      </div>

                      <div>
                        <button
                          type="submit"
                          className="w-full bg-emerald-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 transition-all duration-200 flex items-center justify-center group"
                          disabled={isSending}
                        >
                          {
                            isSending?"Sending...":"Send Message"
                    }                 
                    <ArrowRight className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </form>
                  )}
                </div>

                {/* Map Container */}
                {/* <div className="mt-8 bg-white rounded-2xl shadow-xl p-4 h-64 flex items-center justify-center transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
                  <div className="text-center text-gray-500">
                    <MapPin className="h-12 w-12 mx-auto text-indigo-300 mb-2" />
                    <p>Interactive map would be displayed here</p>
                    <p className="text-sm">Showing our location at {companyContact[0]?.address.area || 'Company Address'}</p>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ContactUs;