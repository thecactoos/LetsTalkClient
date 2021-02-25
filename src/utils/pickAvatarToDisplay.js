const pickAvatarToDisplay = (chat, userId) => {
  const { isGroup, members, avatar50x50 } = chat;
  if (isGroup) {
    return avatar50x50;
  } else if (members.length === 1) {
    return members[0].avatar50x50;
  } else if (members.length > 1) {
    return chat.members.filter((member) => member._id !== userId)[0]
      .avatar50x50;
  }
};

export default pickAvatarToDisplay;
