import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

export default function makeNotification(typeOfNotification, title, message) {

  const notice = typeOfNotification({
    title: `${title}`,
    text: `${message}`,
    delay: 5000,
    closer: false,
    sticker: false,
    maxTextHeight: null,
  });

  notice.on('click', () => {
    notice.close();
  });
}
