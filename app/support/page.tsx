"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  Clock,
  Search,
  ChevronDown,
  ChevronUp,
  Download,
  Play,
  FileText,
  Shield,
  Truck,
  CreditCard,
  Settings,
  Headphones,
} from "lucide-react"

const faqData = [
  {
    category: "Orders & Shipping",
    questions: [
      {
        question: "How long does shipping take?",
        answer:
          "Standard shipping takes 2-5 business days within Nairobi and 3-7 business days for other locations in Kenya. Express shipping is available for next-day delivery in Nairobi.",
      },
      {
        question: "Can I track my order?",
        answer:
          "Yes! Once your order ships, you'll receive a tracking number via SMS and email. You can also track your order in your account dashboard.",
      },
      {
        question: "What are the shipping costs?",
        answer:
          "Shipping is free for orders over KSH 50,000. For orders below this amount, shipping costs KSH 500 within Nairobi and KSH 1,000 for other locations.",
      },
    ],
  },
  {
    category: "Payment & Pricing",
    questions: [
      {
        question: "What payment methods do you accept?",
        answer:
          "We accept M-Pesa, Visa/Mastercard, bank transfers, and cash on delivery (for orders within Nairobi). All payments are secure and encrypted.",
      },
      {
        question: "Do you offer installment payments?",
        answer:
          "Yes! We offer flexible payment plans through our partners. You can pay in installments over 3, 6, or 12 months with competitive interest rates.",
      },
      {
        question: "Are your prices negotiable?",
        answer:
          "Our prices are competitive and fixed for online orders. However, we offer bulk discounts for corporate purchases and educational institutions.",
      },
    ],
  },
  {
    category: "Products & Warranty",
    questions: [
      {
        question: "What warranty do you provide?",
        answer:
          "All products come with manufacturer warranty. Laptops and desktops have 1-2 year warranty, phones have 1 year, and accessories have 6 months to 1 year depending on the product.",
      },
      {
        question: "Can I return a product?",
        answer:
          "Yes, you can return products within 14 days of purchase if they're in original condition. Opened software and personalized items cannot be returned.",
      },
      {
        question: "Do you provide technical support?",
        answer:
          "Yes! We offer free technical support for all products purchased from us. Our technicians can help with setup, troubleshooting, and basic repairs.",
      },
    ],
  },
]

const contactChannels = [
  {
    icon: Phone,
    title: "Phone Support",
    description: "Speak directly with our support team",
    contact: "+254 700 123 456",
    hours: "Mon-Fri: 8AM-6PM, Sat: 9AM-4PM",
    color: "bg-blue-500",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp Chat",
    description: "Quick responses via WhatsApp",
    contact: "+254 700 123 456",
    hours: "Available 24/7",
    color: "bg-green-500",
  },
  {
    icon: Mail,
    title: "Email Support",
    description: "Detailed support via email",
    contact: "support@apexelectronics.co.ke",
    hours: "Response within 2 hours",
    color: "bg-purple-500",
  },
]

const resources = [
  {
    icon: FileText,
    title: "User Manuals",
    description: "Download product manuals and guides",
    count: "500+ manuals",
  },
  {
    icon: Play,
    title: "Video Tutorials",
    description: "Step-by-step video guides",
    count: "100+ videos",
  },
  {
    icon: Download,
    title: "Software & Drivers",
    description: "Latest drivers and software updates",
    count: "Latest versions",
  },
]

export default function SupportPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null)
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    priority: "medium",
    message: "",
  })

  const filteredFaq = faqData
    .map((category) => ({
      ...category,
      questions: category.questions.filter(
        (q) =>
          q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          q.answer.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    }))
    .filter((category) => category.questions.length > 0)

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Contact form submitted:", contactForm)
    alert("Thank you for contacting us! We'll get back to you within 2 hours.")
    setContactForm({ name: "", email: "", subject: "", priority: "medium", message: "" })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">How Can We Help You?</h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-8">
              Get support, find answers, and connect with our expert team
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search for help articles, FAQs, or products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-3 text-lg bg-white text-gray-900 border-0 rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Contact Channels */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Get In Touch</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {contactChannels.map((channel, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div
                    className={`w-16 h-16 ${channel.color} rounded-full flex items-center justify-center mx-auto mb-4`}
                  >
                    <channel.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{channel.title}</h3>
                  <p className="text-gray-600 mb-3">{channel.description}</p>
                  <p className="font-medium text-lg mb-2">{channel.contact}</p>
                  <p className="text-sm text-gray-500">{channel.hours}</p>
                  <Button className="mt-4 w-full">Contact Now</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Store Information */}
        <section className="mb-16">
          <Card>
            <CardContent className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold mb-4 flex items-center">
                    <MapPin className="h-6 w-6 mr-2 text-blue-600" />
                    Visit Our Store
                  </h3>
                  <div className="space-y-3">
                    <p className="text-gray-700">
                      <strong>Apex Electronics</strong>
                      <br />
                      Kimathi Street, Nairobi CBD
                      <br />
                      Opposite Hilton Hotel
                      <br />
                      Nairobi, Kenya
                    </p>
                    <div className="flex items-center text-gray-600">
                      <Clock className="h-5 w-5 mr-2" />
                      <div>
                        <p>Monday - Friday: 8:00 AM - 6:00 PM</p>
                        <p>Saturday: 9:00 AM - 4:00 PM</p>
                        <p>Sunday: Closed</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-4">Quick Services</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <Truck className="h-5 w-5 text-green-600" />
                      <span className="text-sm">Free Delivery</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Shield className="h-5 w-5 text-blue-600" />
                      <span className="text-sm">Extended Warranty</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Settings className="h-5 w-5 text-purple-600" />
                      <span className="text-sm">Tech Support</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CreditCard className="h-5 w-5 text-orange-600" />
                      <span className="text-sm">Flexible Payment</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* FAQ Section */}
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h2>

            {filteredFaq.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <p className="text-gray-500">No FAQs found matching your search.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                {filteredFaq.map((category, categoryIndex) => (
                  <div key={categoryIndex}>
                    <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                      {category.category === "Orders & Shipping" && <Truck className="h-5 w-5 mr-2" />}
                      {category.category === "Payment & Pricing" && <CreditCard className="h-5 w-5 mr-2" />}
                      {category.category === "Products & Warranty" && <Shield className="h-5 w-5 mr-2" />}
                      {category.category}
                    </h3>
                    <div className="space-y-3">
                      {category.questions.map((faq, faqIndex) => {
                        const faqId = `${categoryIndex}-${faqIndex}`
                        return (
                          <Card key={faqIndex} className="border border-gray-200">
                            <CardContent className="p-0">
                              <button
                                className="w-full text-left p-4 hover:bg-gray-50 transition-colors flex items-center justify-between"
                                onClick={() => setExpandedFaq(expandedFaq === faqId ? null : faqId)}
                              >
                                <span className="font-medium">{faq.question}</span>
                                {expandedFaq === faqId ? (
                                  <ChevronUp className="h-5 w-5 text-gray-500" />
                                ) : (
                                  <ChevronDown className="h-5 w-5 text-gray-500" />
                                )}
                              </button>
                              {expandedFaq === faqId && (
                                <div className="px-4 pb-4 text-gray-600 border-t border-gray-100">
                                  <p className="pt-3">{faq.answer}</p>
                                </div>
                              )}
                            </CardContent>
                          </Card>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Contact Form & Resources */}
          <div className="space-y-8">
            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Headphones className="h-5 w-5 mr-2" />
                  Contact Support
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <Input
                    placeholder="Your Name"
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    required
                  />
                  <Input
                    type="email"
                    placeholder="Your Email"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    required
                  />
                  <Input
                    placeholder="Subject"
                    value={contactForm.subject}
                    onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                    required
                  />
                  <select
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={contactForm.priority}
                    onChange={(e) => setContactForm({ ...contactForm, priority: e.target.value })}
                  >
                    <option value="low">Low Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="high">High Priority</option>
                    <option value="urgent">Urgent</option>
                  </select>
                  <Textarea
                    placeholder="Describe your issue or question..."
                    rows={4}
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    required
                  />
                  <Button type="submit" className="w-full">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Resources */}
            <Card>
              <CardHeader>
                <CardTitle>Help Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {resources.map((resource, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
                    >
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <resource.icon className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{resource.title}</h4>
                        <p className="text-sm text-gray-600">{resource.description}</p>
                        <Badge variant="secondary" className="text-xs mt-1">
                          {resource.count}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Warranty Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="h-5 w-5 mr-2" />
                  Warranty & Returns
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span>Laptops & Desktops:</span>
                    <span className="font-medium">1-2 Years</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Smartphones:</span>
                    <span className="font-medium">1 Year</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Accessories:</span>
                    <span className="font-medium">6-12 Months</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Return Period:</span>
                    <span className="font-medium">14 Days</span>
                  </div>
                  <Button variant="outline" size="sm" className="w-full mt-4 bg-transparent">
                    Claim Warranty
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
