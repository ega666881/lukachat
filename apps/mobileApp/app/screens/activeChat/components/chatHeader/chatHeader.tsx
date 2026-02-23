import React from "react";
import { Text, View } from "react-native";
import Avatar from "../../../../sharedComponents/avatar/avatar";

import chatHeaderStyle from "./chatHeader.style";

interface ChatHeaderProps {
  email: string;
  avatarUrl: string | null;
}

export default function ChatHeader({ email, avatarUrl }: ChatHeaderProps) {
  return (
    <View style={chatHeaderStyle.headerContainer}>
      <Avatar imageUrl={avatarUrl} />
      <Text style={chatHeaderStyle.title} numberOfLines={1}>
        {email}
      </Text>
    </View>
  );
}
