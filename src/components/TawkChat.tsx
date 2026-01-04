import TawkMessengerReact from '@tawk.to/tawk-messenger-react';

const TawkChat = () => {
  const propertyId = '69497b4efb47fe197cc9e506';
  const widgetId = 'default';

  return (
    <TawkMessengerReact
      propertyId={propertyId}
      widgetId={widgetId}
    />
  );
};

export default TawkChat;
