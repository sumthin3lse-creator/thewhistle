import TawkMessengerReact from '@tawk.to/tawk-messenger-react';
import { useEffect } from 'react';

const TawkChat = () => {
  const propertyId = '69497b4efb47fe197cc9e506';
  const widgetId = 'default';

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .tawk-min-container .tawk-button-circle.tawk-button-large {
        width: 45px !important;
        height: 45px !important;
      }
      .tawk-min-container .tawk-button-circle.tawk-button-large svg {
        transform: scale(0.75) !important;
      }
    `;
    document.head.appendChild(style);
    return () => { document.head.removeChild(style); };
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
