import { Card } from '@shop/ui';

/**
 * Delivery Terms page - describes shipping and delivery conditions
 */
export default function DeliveryTermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Delivery Terms</h1>
      <p className="text-gray-600 mb-2">
        Last updated:{' '}
        {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
      </p>

      <div className="space-y-6 mt-8">
        <Card className="p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Overview</h2>
          <p className="text-gray-600">
            These Delivery Terms explain how we process, ship, and deliver your orders, including expected
            timelines, fees, and responsibilities.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900">Shipping Options</h2>
          <p className="text-gray-600">Available options are shown at checkout and may include:</p>
          <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
            <li>Standard delivery with estimated timeframes per region.</li>
            <li>Express delivery where supported.</li>
            <li>In-store pickup or local courier (if available in your area).</li>
          </ul>
  
          <h2 className="text-2xl font-semibold text-gray-900">Processing Times</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
            <li>Orders are typically processed within 1–2 business days after payment confirmation.</li>
            <li>Orders placed on weekends or holidays process on the next business day.</li>
            <li>Pre-order items ship based on the estimated availability shown at purchase.</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-900">Delivery Timeframes</h2>
          <p className="text-gray-600">
            Delivery estimates vary by destination and selected method. Tracking details are provided when
            the order is shipped. Actual delivery times may differ due to carrier capacity or local customs.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900">Shipping Fees & Duties</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
            <li>Shipping costs are calculated at checkout based on destination and service level.</li>
            <li>Import duties, taxes, or brokerage fees may apply for international shipments and are the recipient&apos;s responsibility.</li>
            <li>Promotional free-shipping offers apply only as stated in the promotion.</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-900">Delays, Damage, or Loss</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
            <li>We are not liable for delays caused by carriers, weather, or customs inspections.</li>
            <li>Please inspect packages on delivery and report visible damage to the carrier and our support team within 48 hours.</li>
            <li>If a shipment is lost, contact us with your order number; we will coordinate with the carrier to resolve the issue.</li>
          </ul>
                
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">Contact Us</h2>
          <p className="text-gray-600">
            For delivery questions or special handling requests, reach us at{' '}
            <a href="mailto:shipping@whiteshop.com" className="text-blue-600 hover:underline">
              shipping@whiteshop.com
            </a>
            .
          </p>
        </Card>
      </div>
    </div>
  );
}


