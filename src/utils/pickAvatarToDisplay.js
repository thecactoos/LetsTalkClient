const pickAvatarToDisplay = (chat, userId) => {
  const { isGroup, members, avatar50x50 } = chat;
  if (isGroup) {
    return avatar50x50;
  }
  if (members.length === 1 && !isGroup) {
    return members[0].avatar50x50;
  }
  if (members.length > 1 && !isGroup) {
    return chat.members.filter((member) => member._id !== userId)[0]
      .avatar50x50;
  }
  return null;
};

export default pickAvatarToDisplay;
