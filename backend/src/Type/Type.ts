export interface WidgetConfig {
  buttonText: string;
  buttonColor: string;
  position: "bottom-right" | "bottom-left" | "top-right" | "top-left";
  theme: "light" | "dark" | "auto";
}

export interface ISite extends Document {
  name: string;
  siteId: string;
  widgetConfig?: WidgetConfig;
  createdAt: Date;
  updatedAt: Date;
}
export interface Site {
  name: string;
  siteId: string;
  widgetConfig?: WidgetConfig;
}
export interface AdminDocument extends Document {
  _id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  AdminSite: Site[];
  emailVerified: boolean;
  verificationToken: string | null;
  verificationExpiry: Date | null;
  passwordResetToken: string | null;
  passwordResetExpiry: Date | null;
  refreshTokenVersion: number;
  matchPassword: (enteredPassword: string) => Promise<boolean>;
  isModified: (field: string) => boolean;
}
declare global {
  namespace Express {
    export interface Request {
      admin?: AdminDocument | null;
      user?: AdminDocument | null;
    }
  }
}

export interface JwtPayload {
  id: string;
  version?: number;
}

export interface IPageVisit {
  url: string;
  timestamp: Date;
}

interface UserInfo {
  userAgent?: string;
  language?: string;
  platform?: string;
  screenWidth?: number;
  screenHeight?: number;
  timezoneOffset?: number;
}

export interface IVisitor extends Document {
  siteId: string;
  visitorId: string;
  visitTimestamp: Date;
  sessionId?: string;
  sessionStart: Date;
  page: string;
  userInfo?: UserInfo;
  country?: string;
  region?: string;
  city?: string;
  pagesVisited: IPageVisit[];
}

interface IUserInfo {
  browser?: string;
  os?: string;
  ip?: string;
  location?: string;
  email?: string;
}

export interface IFeedback extends Document {
  siteId: string;
  title: string;
  description?: string;
  name?: string;
  userInfo?: IUserInfo;
  category: "bug" | "feature" | "improvement" | "other";
  priority: "critical" | "high" | "medium" | "low";
  createdAt?: Date;
  updatedAt?: Date;
  page?: string;
  visitorId?: object;
}
