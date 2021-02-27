const createChatHeadingString = (chat, userId) => {
  const { members, chatName } = chat;
  if (chatName) return chatName;
  if (members.length === 1) return "You";
  if (!chat.chatName) {
    return members
      .filter((member) => member._id !== userId)
      .map((member) => member.username)
      .join(", ");
  }
  return "User";
};

export default createChatHeadingString;
