export type SidebarProps = {
  isCollapsed: boolean;
  handleMouseEnter: () => void;
  handleMouseLeave: () => void;
  Expand: boolean;
};

export type NavbarProps = {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
  Expand?: boolean;
  className: string;
  NavWidth?: string;
};
