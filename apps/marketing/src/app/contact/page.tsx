import { ContactHero } from '@/components/contact/ContactHero';
import { ContactForm } from '@/components/contact/ContactForm';
import { OfficeLocations } from '@/components/contact/OfficeLocations';

export default function ContactPage() {
  return (
    <main>
      <ContactHero />
      <ContactForm />
      <OfficeLocations />
    </main>
  );
}
