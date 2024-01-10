export const PAGE_SIZE = 15;

export const FIXED_POST_MSG_HEIGHT = 157.5;

export const NUM_PAGES_TO_LOAD = 3;

export type PagedData = {
  [x: number]: Array<PostData>;
  topVirtualPadding: number;
  bottomVirtualPadding: number;
};

export enum Organization {
  XR = "Extinction Rebellion",
  SM = "Sunrise Movement",
  APTP = "Anti Police-Terror Project",
  JVP = "Jewish Voice for Peace",
  IDNM = "Idle No More",
  ALL = "All Posts",
}

export type PostData = {
  profileId: number;
  userId: number;
  organization: Organization;
  post: string;
  postImage: string;
  userName: string;
  description: string;
  profilePic: string;
};
