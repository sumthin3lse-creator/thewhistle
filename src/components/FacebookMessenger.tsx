import { MessageCircle } from 'lucide-react';

const FacebookMessenger = () => {
  const pageId = '503899209482782';
  const messengerUrl = `https://m.me/${pageId}`;

  return (
    <a
      href={messengerUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-110 hover:shadow-xl"
      aria-label="Chat with us on Facebook Messenger"
    >
      <MessageCircle className="h-7 w-7" />
    </a>
  );
};

export default FacebookMessenger;
