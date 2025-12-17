import { useEffect } from 'react';

declare global {
  interface Window {
    fbAsyncInit: () => void;
    FB: any;
  }
}

const FacebookMessenger = () => {
  const pageId = '503899209482782';

  useEffect(() => {
    // Initialize Facebook SDK
    window.fbAsyncInit = function () {
      window.FB.init({
        xfbml: true,
        version: 'v18.0',
      });
    };

    // Load Facebook SDK
    (function (d, s, id) {
      const fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      const js = d.createElement(s) as HTMLScriptElement;
      js.id = id;
      js.src = 'https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js';
      fjs.parentNode?.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk');

    return () => {
      // Cleanup SDK on unmount
      const fbRoot = document.getElementById('fb-root');
      const fbScript = document.getElementById('facebook-jssdk');
      if (fbRoot) fbRoot.remove();
      if (fbScript) fbScript.remove();
    };
  }, []);

  return (
    <>
      <div id="fb-root"></div>
      <div
        className="fb-customerchat"
        // @ts-ignore - Facebook SDK attributes
        attribution="setup_tool"
        page_id={pageId}
        theme_color="#dc2626"
        logged_in_greeting="Hi! How can we help you today?"
        logged_out_greeting="Hi! How can we help you today?"
      ></div>
    </>
  );
};

export default FacebookMessenger;
