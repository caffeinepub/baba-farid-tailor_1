import { Award, Users, Sparkles, Clock } from 'lucide-react';
import Section from '../layout/Section';

const features = [
  {
    icon: Award,
    title: 'Expert Craftsmanship',
    description: 'Decades of experience in bespoke tailoring excellence',
  },
  {
    icon: Users,
    title: 'Personalized Service',
    description: 'Every garment tailored to your unique measurements',
  },
  {
    icon: Sparkles,
    title: 'Premium Materials',
    description: 'Only the finest fabrics and materials for lasting quality',
  },
  {
    icon: Clock,
    title: 'Timely Delivery',
    description: 'Committed to delivering your perfect fit on schedule',
  },
];

export default function AboutSection() {
  return (
    <Section id="about" background="muted">
      <div className="max-w-4xl mx-auto text-center space-y-12">
        <div className="space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold">
            The Art of Bespoke Tailoring
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            At Baba Farid Tailor, we believe that every individual deserves clothing 
            that fits perfectly and reflects their unique style. Our expertise in 
            bespoke tailoring combines traditional craftsmanship with modern precision 
            to create garments that are truly one-of-a-kind.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="flex flex-col items-center text-center p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all hover:shadow-lg"
              >
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            );
          })}
        </div>

        <div className="pt-8 border-t border-border">
          <p className="text-lg text-muted-foreground italic">
            "We don't just make clothes—we craft confidence, one perfect fit at a time."
          </p>
        </div>
      </div>
    </Section>
  );
}
