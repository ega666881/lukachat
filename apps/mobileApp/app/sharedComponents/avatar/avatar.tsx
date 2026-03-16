import { Image } from "react-native";
import avatarStyle from "./avatar.style";

interface AvatarProps {
  imageUrl?: string | null;
}

function Avatar({ imageUrl }: AvatarProps) {
  return (
    <Image
      source={{
        uri: imageUrl ?? "",
      }}
      style={avatarStyle.image}
    />
  );
}

export default Avatar;
