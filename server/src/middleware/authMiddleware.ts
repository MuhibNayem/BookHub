import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import UserModel from '../models/User';
import PermissionModel from '../models/Permission';
import { User } from '../types/user';
import { Params } from '../types/request';

const JWT_SECRET =
  process.env.JWT_SECRET || 'b3e63aeb-d1aa-414d-9f9f-3f811f89d623';

export const authenticateJWT = async (
  req: Request<Params>,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    req.params.user = await UserModel.findByUsername(
      decoded.username as string,
    );
    next();
  } catch (error) {
    console.error('JWT Verification Error:', error);
    return res.status(403).json({ message: 'Forbidden' });
  }
};

export const authorizeRole = (
  resourceType: string,
  action: 'read' | 'write',
) => {
  return async (req: Request<Params>, res: Response, next: NextFunction) => {
    const role = req.params?.user?.role;
    const userId = req.params?.user?.id;

    try {
      const permissions = await PermissionModel.findByRoleAndResourceType(
        role ?? '',
        resourceType,
      );

      const permission = permissions.find(
        (p) => p.resourceType === resourceType,
      );

      if (
        !permission ||
        (action === 'read' && !permission.canRead) ||
        (action === 'write' && !permission.canWrite)
      ) {
        return res.status(403).json({ message: 'Forbidden' });
      }

      if (role === 'author' && action === 'write') {
        const resourceId = req.params.resourceId;
        if (
          ['author', 'book'].includes(resourceType) &&
          resourceId !== userId
        ) {
          return res.status(403).json({ message: 'Forbidden' });
        }
      }

      next();
    } catch (error) {
      console.error('Authorization Error:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };
};
