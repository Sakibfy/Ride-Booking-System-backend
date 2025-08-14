import { IUser } from "../../app/modules/user/user.interface";


declare global {
  namespace Express {
    interface Request {
      user?: Partial<IUser>; 
    }
  }
}


// global.d.ts or a types.d.ts file

declare global {
  namespace Express {
    interface Request {
      user?: {
        _id: string;
        role: string;
      };
    }
  }
}
