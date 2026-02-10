import { useState } from 'react';
import { ChevronDown, ChevronUp, Ruler } from 'lucide-react';

export default function SizeGuidePanel() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 bg-muted/50 flex items-center justify-between hover:bg-muted transition-colors"
      >
        <div className="flex items-center gap-2">
          <Ruler className="h-4 w-4 text-primary" />
          <span className="font-medium">Size Guide & Measurement Tips</span>
        </div>
        {isOpen ? (
          <ChevronUp className="h-5 w-5" />
        ) : (
          <ChevronDown className="h-5 w-5" />
        )}
      </button>

      {isOpen && (
        <div className="p-4 space-y-4 bg-card">
          <div className="space-y-2">
            <h4 className="font-semibold text-sm">How to Measure:</h4>
            <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
              <li><strong>Chest:</strong> Measure around the fullest part of your chest</li>
              <li><strong>Waist:</strong> Measure around your natural waistline</li>
              <li><strong>Shoulder:</strong> Measure from shoulder point to shoulder point across the back</li>
              <li><strong>Length:</strong> Measure from the base of your neck to desired garment length</li>
              <li><strong>Sleeve:</strong> Measure from shoulder to wrist with arm slightly bent</li>
              <li><strong>Inseam:</strong> Measure from crotch to ankle along the inside of your leg</li>
            </ul>
          </div>

          <div className="pt-4 border-t border-border">
            <h4 className="font-semibold text-sm mb-2">Standard Size Reference:</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 px-2">Size</th>
                    <th className="text-left py-2 px-2">Chest</th>
                    <th className="text-left py-2 px-2">Waist</th>
                    <th className="text-left py-2 px-2">Shoulder</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border/50">
                    <td className="py-2 px-2">S</td>
                    <td className="py-2 px-2">36-38"</td>
                    <td className="py-2 px-2">30-32"</td>
                    <td className="py-2 px-2">16-17"</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-2 px-2">M</td>
                    <td className="py-2 px-2">38-40"</td>
                    <td className="py-2 px-2">32-34"</td>
                    <td className="py-2 px-2">17-18"</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-2 px-2">L</td>
                    <td className="py-2 px-2">40-42"</td>
                    <td className="py-2 px-2">34-36"</td>
                    <td className="py-2 px-2">18-19"</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-2">XL</td>
                    <td className="py-2 px-2">42-44"</td>
                    <td className="py-2 px-2">36-38"</td>
                    <td className="py-2 px-2">19-20"</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <p className="text-xs text-muted-foreground italic">
            Note: These are approximate measurements. For the best fit, we recommend 
            having someone help you measure or visiting our shop for professional measurement.
          </p>
        </div>
      )}
    </div>
  );
}
