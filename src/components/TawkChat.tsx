import TawkMessengerReact from '@tawk.to/tawk-messenger-react';
import { useEffect } from 'react';

const TawkChat = () => {
  const propertyId = '69497b4efb47fe197cc9e506';
  const widgetId = 'default';

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .tawk-min-container .tawk-button-circle.tawk-button-large {
        width: 28px !important;
        height: 28px !important;
      }
      .tawk-min-container .tawk-button-circle.tawk-button-large svg {
        transform: scale(0.45) !important;
      }
      /* Center the widget horizontally */
      iframe[title="chat widget"][style],
      .tawk-min-container {
        left: 50% !important;
        right: auto !important;
        transform: translateX(-50%) !important;
      }
      @media (max-width: 1023px) {
        iframe[title="chat widget"],
        .tawk-min-container,
        #tawk-bubble-container {
          display: none !important;
          visibility: hidden !important;
        }
      }
    `;
    document.head.appendChild(style);
    return () => { document.head.removeChild(style); };
  }, []);

  // Hide widget on mobile/tablet via API
  useEffect(() => {
    const checkAndHide = () => {
      if (window.innerWidth < 1024 && window.Tawk_API?.hideWidget) {
        window.Tawk_API.hideWidget();
      }
    };

    // Tawk loads async, retry a few times
    const attempts = [500, 1500, 3000];
    const timers = attempts.map((ms) => setTimeout(checkAndHide, ms));

    window.addEventListener('resize', checkAndHide);
    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener('resize', checkAndHide);
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
