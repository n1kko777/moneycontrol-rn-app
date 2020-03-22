import React from "react";
import { Icon } from "@ui-kitten/components";

export const HideIconBalance = style => <Icon {...style} name="eye-outline" />;
export const ShowIconBalance = style => (
  <Icon {...style} name="eye-off-outline" />
);
export const IncreaseIcon = style => (
  <Icon {...style} width={26} height={26} name="arrow-upward-outline" />
);
export const DecreaseIcon = style => (
  <Icon {...style} width={26} height={26} name="arrow-downward-outline" />
);

export const MenuIcon = style => <Icon {...style} name="more-vertical" />;
export const LogoutIcon = style => (
  <Icon {...style} name="logout" pack="assets" />
);
export const LightIcon = style => <Icon {...style} name="sun-outline" />;
export const DarkIcon = style => <Icon {...style} name="moon-outline" />;

export const hideIconPassword = style => <Icon name="eye-outline" {...style} />;
export const showIconPassword = style => (
  <Icon name="eye-off-outline" {...style} />
);

export const BackIcon = style => <Icon {...style} name="arrow-back" />;
