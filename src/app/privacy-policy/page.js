"use client";

const PrivacyPolicy = () => {
  return (
    <>
      <div className="p-2 md:mx-8">
        <h2 className="text-2xl text-customBlue font-semibold mb-4">
          Privacy Policy
        </h2>

        <p className="text-sm text-customDarkGray mb-4">
          Effective Date: April 2, 2024
        </p>

        <p className="text-customColorNav mb-6">
          At <span className="font-semibold">Trade To Trade Group</span>{" "}
          (&ldquo;Trade To Trade,&rdquo; &ldquo;we,&rdquo; &ldquo;our,&rdquo; or
          &ldquo;us&rdquo;), we are dedicated to safeguarding your privacy and
          ensuring the security of your personal information. This Privacy
          Policy explains how we collect, use, disclose, and protect your data
          when you use our services through our mobile application
          (&ldquo;App&rdquo;) as a software-as-a-service (SaaS) platform. By
          using our App, you consent to the practices described in this Privacy
          Policy.
        </p>

        <h2 className="text-2xl font-semibold text-customText mb-4">
          1. Information We Collect
        </h2>

        <h3 className="text-lg font-medium text-customText mb-2">
          1.1 User Information
        </h3>
        <ul className="list-disc list-inside text-customColorNav mb-4">
          <li>
            When you register for our App, we may collect personal details such
            as your name, email address, phone number, and postal address.
          </li>
          <li>
            To validate your membership in the Motor Trade, we may request
            additional documentation such as insurance details and
            identification.
          </li>
        </ul>

        <h3 className="text-lg font-medium text-customText mb-2">
          1.2 App Usage Information
        </h3>
        <p className="text-customColorNav mb-6">
          We automatically gather certain information about your App usage,
          including your IP address, device type, operating system, and browsing
          behavior.
        </p>

        <h2 className="text-2xl font-semibold text-customText mb-4">
          2. How We Use Your Information
        </h2>
        <p className="text-customColorNav mb-6">
          We utilize the information we collect for the following purposes:
        </p>
        <ul className="list-disc list-inside text-customColorNav mb-6">
          <li>
            <strong>Verification and Authentication:</strong> To verify your
            status as a motor trader using the insurance and ID information
            provided.
          </li>
          <li>
            <strong>App Functionality:</strong> To grant you access to our App
            and its features and to facilitate transactions and communication
            between car traders.
          </li>
          <li>
            <strong>Customer Support:</strong> To address your inquiries and
            provide assistance.
          </li>
          <li>
            <strong>Marketing:</strong> To send you updates, promotions, and
            other marketing communications, provided you have opted in to
            receive them.
          </li>
          <li>
            <strong>Legal Compliance:</strong> To fulfill legal obligations,
            including tax and regulatory requirements.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold text-customText mb-4">
          3. Disclosure of Your Information
        </h2>
        <p className="text-customColorNav mb-6">
          We may disclose your personal information to:
        </p>
        <ul className="list-disc list-inside text-customColorNav mb-6">
          <li>
            <strong>Other Users:</strong> Your information may be shared with
            other App users to facilitate transactions and communication.
          </li>
          <li>
            <strong>Service Providers:</strong> We may engage third-party
            service providers to assist with hosting, analytics, and customer
            support.
          </li>
          <li>
            <strong>Legal Requirements:</strong> To comply with legal
            obligations or respond to lawful requests from government
            authorities.
          </li>
          <li>
            <strong>Business Transfers:</strong> In the event of a merger,
            acquisition, or sale, your information may be transferred as part of
            the transaction.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold text-customText mb-4">
          7. Contact Us
        </h2>
        <p className="text-customColorNav">
          If you have any questions or concerns about this Privacy Policy or our
          data practices, please contact us at{" "}
          <span className="text-customBlue">Support@trade2trade.co.uk</span>.
        </p>
      </div>
    </>
  );
};

export default PrivacyPolicy;
