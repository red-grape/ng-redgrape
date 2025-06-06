export interface MenuItem {
  text: string;
  icon?: string;
  link?: string;
  children?: MenuItem[];
  expanded?: boolean;
  tag?: any;
}
