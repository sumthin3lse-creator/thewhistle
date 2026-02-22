import TawkMessengerReact from '@tawk.to/tawk-messenger-react';
import { useEffect } from 'react';

const TawkChat = () => {
  const propertyId = '69497b4efb47fe197cc9e506';
  const widgetId = 'default';

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      /* Compact desktop icon */
      .tawk-min-container .tawk-button-circle.tawk-button-large {
        width: 36px !important;
        height: 36px !important;
      }
      .tawk-min-container .tawk-button-circle.tawk-button-large svg {
        transform: scale(0.6) !important;
      }
      /* Hide default bubble on mobile/tablet */
      @media (max-width: 1023px) {
        .tawk-min-container,
        #tawk-default-container {
          display: none !important;
        }
      }
    `;
    document.head.appendChild(style);

    // Also hide via API on mobile/tablet
    const hideMobile = () => {
      if (window.innerWidth < 1024 && window.Tawk_API?.hideWidget) {
        window.Tawk_API.hideWidget();
      }
    };
    // Try after a delay to ensure Tawk has loaded
    const timer = setTimeout(hideMobile, 2000);

    return () => {
      document.head.removeChild(style);
      clearTimeout(timer);
    };
  }, []);

  return (
    <TawkMessengerReact
      propertyId={propertyId}
      widgetId={widgetId}
      customStyle={{
        visibility: {
          desktop: { position: 'br', xOffset: 15, yOffset: 15 },
          mobile: { position: 'br', xOffset: 10, yOffset: 10 },
        },
      }}
    />
  );
};

export default TawkChat;
