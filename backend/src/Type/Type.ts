export interface ISite {
  siteId: string;
  name?: string;
  createdAt?: Date;
}
export interface IAdmin extends Document {
  _id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  AdminSite: ISite[];
  matchPassword: (enteredPassword: string) => Promise<boolean>;
}
export interface AdminDocument extends IAdmin, Document {
  isModified(field: string): boolean;
}

export interface JwtPayload {
  id: string;
}

export interface IPageVisit {
  url: string;
  timestamp?: Date;
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
  visitorId?: object;
}

export interface VisitorData {
  siteId: string;
  visitorId: string;
  visitTimestamp: Date;
  sessionStart: Date;
  page: string;
  userInfo: {
    userAgent?: string;
    language?: string;
    platform?: string;
    screenWidth?: number;
    screenHeight?: number;
    timezoneOffset?: number;
  };
  country?: string;
  region?: string;
  city?: string;
}
