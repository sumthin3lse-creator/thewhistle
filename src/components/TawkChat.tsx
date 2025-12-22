import TawkMessengerReact from '@tawk.to/tawk-messenger-react';

const TawkChat = () => {
  // Replace these with your Tawk.to property ID and widget ID
  // Get them from: https://dashboard.tawk.to/ -> Administration -> Channels -> Chat Widget
  const propertyId = 'YOUR_PROPERTY_ID';
  const widgetId = 'YOUR_WIDGET_ID';

  return (
    <TawkMessengerReact
      propertyId={propertyId}
      widgetId={widgetId}
    />
  );
};

export default TawkChat;
