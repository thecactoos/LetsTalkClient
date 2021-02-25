const createChatHeadingString = (chat, userId) => {
  const { members, chatName } = chat;
  if (members.length === 1) return "You";
  if (chatName) return chatName;
  if (!chat.chatName) {
    return members
      .filter((member) => member._id !== userId)
      .map((member) => member.username)
      .join(", ");
  }
};

export default createChatHeadingString;
