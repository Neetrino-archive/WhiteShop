import { Card } from '@shop/ui';

/**
 * Refund Policy page - outlines return and refund rules
 */
export default function RefundPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Refund Policy</h1>
      <p className="text-gray-600 mb-2">
        Last updated:{' '}
        {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
      </p>

      <div className="space-y-6 mt-8">
        <Card className="p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Overview</h2>
          <p className="text-gray-600">
            We want you to be satisfied with every purchase. This policy explains how returns and refunds
            work, including timelines and eligibility requirements.
          </p>


          <h2 className="text-2xl font-semibold text-gray-900">Eligibility for Refunds</h2>
          <p className="text-gray-600">To qualify for a refund, please ensure that:</p>
          <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
            <li>The item is unused, in original condition, and in original packaging.</li>
            <li>A return request is submitted within 14 days of delivery unless stated otherwise.</li>
            <li>Proof of purchase (order number or receipt) is provided.</li>
            <li>Items marked as final sale or non-returnable are excluded.</li>
          </ul>


          <h2 className="text-2xl font-semibold text-gray-900">How to Initiate a Return</h2>
          <ol className="list-decimal list-inside text-gray-600 space-y-1 ml-4">
            <li>Contact our support team with your order number and reason for return.</li>
            <li>Receive return authorization and instructions.</li>
            <li>Ship the item using a trackable method; include all original accessories and tags.</li>
          </ol>
          <p className="text-gray-600">
            Once we receive and inspect the item, we will confirm approval or rejection of the refund.
          </p>


          <h2 className="text-2xl font-semibold text-gray-900">Refund Method & Timing</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
            <li>Approved refunds are issued to the original payment method.</li>
            <li>Processing time is typically 5–10 business days after approval; bank timings may vary.</li>
            <li>Shipping fees are non-refundable unless the return is due to our error or a defective item.</li>
          </ul>


          <h2 className="text-2xl font-semibold text-gray-900">Non-Refundable Items</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
            <li>Gift cards and digital products once delivered.</li>
            <li>Personalized or custom-made items unless defective.</li>
            <li>Items returned without prior authorization.</li>
            <li>Products not in original condition, damaged, or missing parts for reasons not due to our error.</li>
          </ul>


          <h2 className="text-2xl font-semibold text-gray-900 mb-3">Contact Us</h2>
          <p className="text-gray-600">
            For questions about this Refund Policy or to start a return, email us at{' '}
            <a href="mailto:support@whiteshop.com" className="text-blue-600 hover:underline">
              support@whiteshop.com
            </a>
            .
          </p>
        </Card>
      </div>
    </div>
  );
}


