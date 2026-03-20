// Individual message bubble component
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

  return (
    <div className={`bubble ${isOwn ? "bubble--own" : "bubble--other"}`}>
      {!isOwn && (
        <span className="bubble__username">{message.username}</span>
      )}
      <div className="bubble__content">
        <p className="bubble__text">{message.message}</p>
        <span className="bubble__time">
          {new Date(message.timestamp).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>
    </div>
  );
};

export default MessageBubble;