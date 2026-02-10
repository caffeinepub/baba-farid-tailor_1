import { useState } from 'react';
import LogoPlaceholder from './LogoPlaceholder';

export default function BrandLogo() {
  const [imageError, setImageError] = useState(false);

  if (imageError) {
    return <LogoPlaceholder />;
  }

  return (
    <img
      src="/assets/1770202565370.png"
      alt="Baba Farid Tailor logo"
      className="w-14 h-14 object-contain"
      onError={() => setImageError(true)}
    />
  );
}
