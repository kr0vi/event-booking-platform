import Avatar from "boring-avatars";

interface UserAvatarProps {
  userId: string | number | null | undefined;
  name?: string | null;
  size?: number;
  className?: string;
}


export function UserAvatar({
  userId,
  name,
  size = 40,
  className,
}: UserAvatarProps) {
  const seed = String(userId ?? name ?? "guest").slice(0, 5) || "guest";

  return (
    <div
      className={className}
      aria-label={name ? `${name} avatar` : "User avatar"}
    >
      <Avatar size={size} name={seed} variant="marble" square={false} />
    </div>
  );
}
