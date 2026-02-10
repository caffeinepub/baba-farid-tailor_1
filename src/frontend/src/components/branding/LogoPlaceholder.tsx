import { Scissors } from 'lucide-react';

export default function LogoPlaceholder() {
  return (
    <div className="flex items-center justify-center w-14 h-14 rounded-lg bg-gradient-to-br from-primary to-accent border-2 border-primary/20 shadow-sm">
      <Scissors className="h-7 w-7 text-primary-foreground" />
    </div>
  );
}
