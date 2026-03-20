// Individual message bubble with avatar
const MessageBubble = ({ message, currentUser }) => {
  const isOwn = message.username === currentUser;
  const isNotification = message.type === "notification";

  if (isNotification) {
    return (
      <div className="notification">
        <span>{message.message}</span>
      </div>
    );
  }

  const initials = message.username?.charAt(0).toUpperCase();

  const formattedTime = new Date(message.timestamp).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className={`bubble ${isOwn ? "bubble--own" : "bubble--other"}`}>
      {!isOwn && (
        <div className="bubble__avatar">{initials}</div>
      )}
      <div className="bubble__body">
        {!isOwn && (
          <span className="bubble__username">{message.username}</span>
        )}
        <div className="bubble__content">
          <p className="bubble__text">{message.message}</p>
          <span className="bubble__time">{formattedTime}</span>
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;