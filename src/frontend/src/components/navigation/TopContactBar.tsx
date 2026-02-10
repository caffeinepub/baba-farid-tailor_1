import { Phone, Mail } from 'lucide-react';
import { CONTACT_INFO } from '../../config/contact';

export default function TopContactBar() {
  return (
    <div className="bg-secondary text-secondary-foreground py-2 px-4 text-sm">
      <div className="container mx-auto flex flex-wrap items-center justify-center md:justify-end gap-4 md:gap-6">
        <a
          href={`tel:${CONTACT_INFO.phoneHref}`}
          className="flex items-center gap-2 hover:text-primary transition-colors"
        >
          <Phone className="h-3.5 w-3.5" />
          <span>{CONTACT_INFO.phone}</span>
        </a>
        <a
          href={`mailto:${CONTACT_INFO.email}`}
          className="flex items-center gap-2 hover:text-primary transition-colors"
        >
          <Mail className="h-3.5 w-3.5" />
          <span>{CONTACT_INFO.email}</span>
        </a>
      </div>
    </div>
  );
}
