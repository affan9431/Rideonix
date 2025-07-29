import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";

export default function AvatarPage({ image, onClick }) {
  return (
    <Stack direction="row" spacing={2}>
      <Avatar
        alt="User"
        src={image ? image : "/images/default-user.png"}
        sx={{ cursor: "pointer", width: 32, height: 32 }}
        onClick={onClick && onClick}
      />
    </Stack>
  );
}
