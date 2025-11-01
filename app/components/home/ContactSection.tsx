import { getSchoolMetadata } from '../../../lib/fetchers'
import { MapPin, Phone, Mail } from 'lucide-react'
import { useLanguage } from '../../contexts/LanguageContext'

export default async function ContactSection() {
  const metadata = await getSchoolMetadata()

  const contactInfo = {
    address: metadata?.address || 'SK Bebuloh, WP Labuan',
    phone: metadata?.phone || '+60 9-123 4567',
    email: metadata?.email || 'info@skbebuloh.edu.my'
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-heading font-bold text-dark mb-4">
            <ContactTitle />
          </h2>
          <p className="text-gray-600 text-lg">
            Get in touch with us
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div>
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <MapPin className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-dark mb-2">
                    <AddressTitle />
                  </h3>
                  <p className="text-gray-600">{contactInfo.address}</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <Phone className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-dark mb-2">
                    <PhoneTitle />
                  </h3>
                  <p className="text-gray-600">{contactInfo.phone}</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <Mail className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-dark mb-2">
                    <EmailTitle />
                  </h3>
                  <p className="text-gray-600">{contactInfo.email}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="bg-gray-200 rounded-2xl overflow-hidden h-96">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3975.317439083344!2d115.200274!3d5.2831!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNcKwMTYnNTkuMiJOIDExNcKwMTInMDAuOSJF!5e0!3m2!1sen!2smy!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="SK Bebuloh Location"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  )
}

function ContactTitle() {
  const { t } = useLanguage()
  return <>{t('contact.title')}</>
}

function AddressTitle() {
  const { t } = useLanguage()
  return <>{t('contact.address')}</>
}

function PhoneTitle() {
  const { t } = useLanguage()
  return <>{t('contact.phone')}</>
}

function EmailTitle() {
  const { t } = useLanguage()
  return <>{t('contact.email')}</>
}
