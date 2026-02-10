import { useState, useEffect } from 'react';
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import Section from '../layout/Section';
import SizeGuidePanel from './SizeGuidePanel';
import { useCatalog, useSubmitOrder } from '../../hooks/useQueries';
import { useSelectedStyle } from '../../state/selectedStyle';
import type { Measurement } from '../../backend';

export default function OrderNowSection() {
  const { data: catalog } = useCatalog();
  const { selectedStyle, setSelectedStyle, reconcileWithCatalog } = useSelectedStyle();
  const submitOrder = useSubmitOrder();

  const [formData, setFormData] = useState({
    customerName: '',
    contactInfo: '',
    categoryId: '',
    styleId: '',
  });

  const [measurements, setMeasurements] = useState<Record<string, string>>({
    chest: '',
    waist: '',
    shoulder: '',
    length: '',
    hipCircumference: '',
    inseam: '',
    thighCircumference: '',
    frontRise: '',
    backRise: '',
    cuffCircumference: '',
    sleeveLength: '',
    bicepCircumference: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submittedOrderId, setSubmittedOrderId] = useState<bigint | null>(null);

  // Reconcile selected style with catalog when catalog changes
  useEffect(() => {
    if (catalog?.styles) {
      reconcileWithCatalog(catalog.styles);
      
      // Clear form styleId if it no longer exists in catalog or is "Saree Blouse" or "African Kaftan"
      if (formData.styleId) {
        const selectedStyleInCatalog = catalog.styles.find(
          (style) => style.id.toString() === formData.styleId
        );
        const styleExists = !!selectedStyleInCatalog;
        const isExcludedStyle = selectedStyleInCatalog?.name === 'Saree Blouse' || 
                                selectedStyleInCatalog?.name === 'African Kaftan';
        
        if (!styleExists || isExcludedStyle) {
          setFormData((prev) => ({
            ...prev,
            styleId: '',
          }));
        }
      }
    }
  }, [catalog, reconcileWithCatalog, formData.styleId]);

  useEffect(() => {
    if (selectedStyle) {
      setFormData((prev) => ({
        ...prev,
        categoryId: selectedStyle.categoryId.toString(),
        styleId: selectedStyle.id.toString(),
      }));
    }
  }, [selectedStyle]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.customerName.trim()) {
      newErrors.customerName = 'Name is required';
    }
    if (!formData.contactInfo.trim()) {
      newErrors.contactInfo = 'Contact information is required';
    }
    if (!formData.categoryId) {
      newErrors.categoryId = 'Please select a category';
    }
    if (!formData.styleId) {
      newErrors.styleId = 'Please select a style';
    }

    // Pre-submit validation: ensure selected style exists in reconciled catalog
    if (formData.styleId && catalog?.styles) {
      const styleExists = catalog.styles.some(
        (style) => style.id.toString() === formData.styleId
      );
      if (!styleExists) {
        newErrors.styleId = 'Selected style is no longer available. Please choose another style.';
        // Clear the invalid selection
        setFormData((prev) => ({ ...prev, styleId: '' }));
        setSelectedStyle(null);
      }
    }

    // Validate required measurements
    const requiredMeasurements = ['chest', 'waist', 'shoulder', 'length'];
    requiredMeasurements.forEach((field) => {
      if (!measurements[field] || isNaN(Number(measurements[field]))) {
        newErrors[field] = 'Required (numeric value)';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const measurementData: Measurement = {
      chest: Number(measurements.chest) || 0,
      waist: Number(measurements.waist) || 0,
      shoulder: Number(measurements.shoulder) || 0,
      length: Number(measurements.length) || 0,
      hipCircumference: Number(measurements.hipCircumference) || 0,
      inseam: Number(measurements.inseam) || 0,
      thighCircumference: Number(measurements.thighCircumference) || 0,
      frontRise: Number(measurements.frontRise) || 0,
      backRise: Number(measurements.backRise) || 0,
      cuffCircumference: Number(measurements.cuffCircumference) || 0,
      sleeveLength: Number(measurements.sleeveLength) || 0,
      bicepCircumference: Number(measurements.bicepCircumference) || 0,
    };

    try {
      const result = await submitOrder.mutateAsync({
        customerName: formData.customerName,
        contactInfo: formData.contactInfo,
        categoryId: BigInt(formData.categoryId),
        styleId: BigInt(formData.styleId),
        measurement: measurementData,
      });

      setSubmittedOrderId(result.id);
      
      // Reset form
      setFormData({
        customerName: '',
        contactInfo: '',
        categoryId: '',
        styleId: '',
      });
      setMeasurements({
        chest: '',
        waist: '',
        shoulder: '',
        length: '',
        hipCircumference: '',
        inseam: '',
        thighCircumference: '',
        frontRise: '',
        backRise: '',
        cuffCircumference: '',
        sleeveLength: '',
        bicepCircumference: '',
      });
      setSelectedStyle(null);
      setErrors({});
    } catch (error) {
      console.error('Order submission failed:', error);
    }
  };

  // Only show selected style data if it still exists in catalog and is not "Saree Blouse" or "African Kaftan"
  const selectedStyleData = catalog?.styles.find(
    (s) => s.id.toString() === formData.styleId && 
           s.name !== 'Saree Blouse' && 
           s.name !== 'African Kaftan'
  );

  // Filter out "Saree Blouse" and "African Kaftan" from style dropdown options
  const availableStylesForCategory = catalog?.styles
    .filter((s) => s.categoryId.toString() === formData.categoryId)
    .filter((s) => s.name !== 'Saree Blouse' && s.name !== 'African Kaftan');

  if (submittedOrderId) {
    return (
      <Section id="order" background="muted">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
            <CheckCircle2 className="h-10 w-10 text-primary" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold">Order Confirmed!</h2>
          <p className="text-lg text-muted-foreground">
            Thank you for your order. Your order reference number is:
          </p>
          <div className="inline-block px-6 py-3 bg-card border-2 border-primary rounded-lg">
            <span className="text-2xl font-bold text-primary">
              #{submittedOrderId.toString()}
            </span>
          </div>
          <p className="text-muted-foreground">
            We will contact you shortly to confirm your measurements and discuss 
            the next steps.
          </p>
          <button
            onClick={() => setSubmittedOrderId(null)}
            className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all"
          >
            Place Another Order
          </button>
        </div>
      </Section>
    );
  }

  return (
    <Section id="order" background="muted">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold">Order Now</h2>
          <p className="text-lg text-muted-foreground">
            Fill in your details and measurements to place your custom order
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Customer Information */}
          <div className="bg-card border border-border rounded-xl p-6 space-y-6">
            <h3 className="text-xl font-semibold">Customer Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Full Name <span className="text-destructive">*</span>
                </label>
                <input
                  type="text"
                  value={formData.customerName}
                  onChange={(e) =>
                    setFormData({ ...formData, customerName: e.target.value })
                  }
                  className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="Enter your full name"
                />
                {errors.customerName && (
                  <p className="text-sm text-destructive">{errors.customerName}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Contact (Email or Phone) <span className="text-destructive">*</span>
                </label>
                <input
                  type="text"
                  value={formData.contactInfo}
                  onChange={(e) =>
                    setFormData({ ...formData, contactInfo: e.target.value })
                  }
                  className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="Email or phone number"
                />
                {errors.contactInfo && (
                  <p className="text-sm text-destructive">{errors.contactInfo}</p>
                )}
              </div>
            </div>
          </div>

          {/* Style Selection */}
          <div className="bg-card border border-border rounded-xl p-6 space-y-6">
            <h3 className="text-xl font-semibold">Style Selection</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Category <span className="text-destructive">*</span>
                </label>
                <select
                  value={formData.categoryId}
                  onChange={(e) => {
                    setFormData({ ...formData, categoryId: e.target.value, styleId: '' });
                    setSelectedStyle(null);
                  }}
                  className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="">Select a category</option>
                  {catalog?.categories.map((category) => (
                    <option key={category.id.toString()} value={category.id.toString()}>
                      {category.name}
                    </option>
                  ))}
                </select>
                {errors.categoryId && (
                  <p className="text-sm text-destructive">{errors.categoryId}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Style <span className="text-destructive">*</span>
                </label>
                <select
                  value={formData.styleId}
                  onChange={(e) => {
                    setFormData({ ...formData, styleId: e.target.value });
                    const style = catalog?.styles.find(
                      (s) => s.id.toString() === e.target.value
                    );
                    setSelectedStyle(style || null);
                  }}
                  disabled={!formData.categoryId}
                  className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <option value="">Select a style</option>
                  {availableStylesForCategory?.map((style) => (
                    <option key={style.id.toString()} value={style.id.toString()}>
                      {style.name} - ${style.price.toFixed(2)}
                    </option>
                  ))}
                </select>
                {errors.styleId && (
                  <p className="text-sm text-destructive">{errors.styleId}</p>
                )}
              </div>
            </div>

            {selectedStyleData && (
              <div className="mt-4 p-4 bg-muted rounded-lg">
                <h4 className="font-semibold mb-2">{selectedStyleData.name}</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  {selectedStyleData.description}
                </p>
                <p className="text-lg font-bold text-primary">
                  ${selectedStyleData.price.toFixed(2)}
                </p>
              </div>
            )}
          </div>

          {/* Measurements */}
          <div className="bg-card border border-border rounded-xl p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">Measurements (inches)</h3>
              <SizeGuidePanel />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Required Measurements */}
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Chest <span className="text-destructive">*</span>
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={measurements.chest}
                  onChange={(e) =>
                    setMeasurements({ ...measurements, chest: e.target.value })
                  }
                  className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="0.0"
                />
                {errors.chest && (
                  <p className="text-sm text-destructive">{errors.chest}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Waist <span className="text-destructive">*</span>
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={measurements.waist}
                  onChange={(e) =>
                    setMeasurements({ ...measurements, waist: e.target.value })
                  }
                  className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="0.0"
                />
                {errors.waist && (
                  <p className="text-sm text-destructive">{errors.waist}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Shoulder <span className="text-destructive">*</span>
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={measurements.shoulder}
                  onChange={(e) =>
                    setMeasurements({ ...measurements, shoulder: e.target.value })
                  }
                  className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="0.0"
                />
                {errors.shoulder && (
                  <p className="text-sm text-destructive">{errors.shoulder}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Length <span className="text-destructive">*</span>
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={measurements.length}
                  onChange={(e) =>
                    setMeasurements({ ...measurements, length: e.target.value })
                  }
                  className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="0.0"
                />
                {errors.length && (
                  <p className="text-sm text-destructive">{errors.length}</p>
                )}
              </div>

              {/* Optional Measurements */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Hip Circumference</label>
                <input
                  type="number"
                  step="0.1"
                  value={measurements.hipCircumference}
                  onChange={(e) =>
                    setMeasurements({ ...measurements, hipCircumference: e.target.value })
                  }
                  className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="0.0"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Inseam</label>
                <input
                  type="number"
                  step="0.1"
                  value={measurements.inseam}
                  onChange={(e) =>
                    setMeasurements({ ...measurements, inseam: e.target.value })
                  }
                  className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="0.0"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Thigh Circumference</label>
                <input
                  type="number"
                  step="0.1"
                  value={measurements.thighCircumference}
                  onChange={(e) =>
                    setMeasurements({ ...measurements, thighCircumference: e.target.value })
                  }
                  className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="0.0"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Front Rise</label>
                <input
                  type="number"
                  step="0.1"
                  value={measurements.frontRise}
                  onChange={(e) =>
                    setMeasurements({ ...measurements, frontRise: e.target.value })
                  }
                  className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="0.0"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Back Rise</label>
                <input
                  type="number"
                  step="0.1"
                  value={measurements.backRise}
                  onChange={(e) =>
                    setMeasurements({ ...measurements, backRise: e.target.value })
                  }
                  className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="0.0"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Cuff Circumference</label>
                <input
                  type="number"
                  step="0.1"
                  value={measurements.cuffCircumference}
                  onChange={(e) =>
                    setMeasurements({ ...measurements, cuffCircumference: e.target.value })
                  }
                  className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="0.0"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Sleeve Length</label>
                <input
                  type="number"
                  step="0.1"
                  value={measurements.sleeveLength}
                  onChange={(e) =>
                    setMeasurements({ ...measurements, sleeveLength: e.target.value })
                  }
                  className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="0.0"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Bicep Circumference</label>
                <input
                  type="number"
                  step="0.1"
                  value={measurements.bicepCircumference}
                  onChange={(e) =>
                    setMeasurements({ ...measurements, bicepCircumference: e.target.value })
                  }
                  className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="0.0"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={submitOrder.isPending}
              className="px-12 py-4 bg-primary text-primary-foreground rounded-lg font-semibold text-lg hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3"
            >
              {submitOrder.isPending ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Submitting Order...
                </>
              ) : (
                'Submit Order'
              )}
            </button>
          </div>

          {submitOrder.isError && (
            <div className="flex items-center gap-3 p-4 bg-destructive/10 border border-destructive rounded-lg">
              <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0" />
              <p className="text-sm text-destructive">
                Failed to submit order. Please try again.
              </p>
            </div>
          )}
        </form>
      </div>
    </Section>
  );
}
