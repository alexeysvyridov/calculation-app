import { NextFunction, Request, Response } from "express"
import { Permissions } from "../models/permissions.js";

const checkPermission = (permission: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { authenticationToken } = req as any;

    const userRole = authenticationToken ? authenticationToken?.role : "anonymous";

    const userPermissions = new Permissions().getPermissionsByRoleName(userRole);
    if (userPermissions?.includes(permission)) {
      return next();
    }
    return res.status(403).json({message: "Access denied"})
  }
}

export { checkPermission }