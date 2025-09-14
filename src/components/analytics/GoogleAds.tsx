import Script from 'next/script';

interface GoogleAdsProps {
  conversionId: string;
}

export default function GoogleAds({ conversionId }: GoogleAdsProps) {
  return (
    <>
      {/* Google Ads (gtag.js) */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${conversionId}`}
        strategy="afterInteractive"
      />
      <Script id="google-ads" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${conversionId}');
        `}
      </Script>
    </>
  );
}