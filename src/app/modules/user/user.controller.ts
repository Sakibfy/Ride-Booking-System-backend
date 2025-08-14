import { NextFunction, Request, Response } from 'express';
import { UserService } from './user.service';
import { User } from './user.model';
import bcrypt from 'bcryptjs';
import httpStatus from 'http-status-codes';
import { envVars } from '../../config/env';


// 🚀 Register user (rider or driver)
const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body;

    // console.log(password);

    // ✅ Basic validation
    if (!name || !email || !password || !role) {
      return res.status(httpStatus.BAD_REQUEST).json({
        success: false,
        message: `${name}, ${email}, ${password}, and ${role} are required.`,
      });
    }

    // ✅ Email uniqueness check
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(httpStatus.CONFLICT).json({
        success: false,
        message: 'User already exists.',
      });
    }

  
    const hashedPassword = await bcrypt.hash(password as string, Number(envVars.BCRYPT_SALT_ROUND))
    
const newUser = await User.create({
  name,
  email,
  password: hashedPassword,
  role,
});

    // ✅ Exclude password from response
    const { password: _, ...userWithoutPassword } = newUser.toObject();

    res.status(httpStatus.CREATED).json({
      success: true,
      message: 'User created successfully',
      data: userWithoutPassword,
    });
  } catch (err: any) {
    console.error('User creation error:', err);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: `Something went wrong: ${err.message}`,
    });
  }
};



// ✅ Get all users (admin only)
const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await UserService.getAllUsers();
    res.status(httpStatus.OK).json({ success: true, data: users });
  } catch (err: any) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Failed to fetch users',
    });
  }
};

// ✅ Get user by ID (admin only)
const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await UserService.getUserById(req.params.id);
    if (!user) {
      return res.status(httpStatus.NOT_FOUND).json({
        success: false,
        message: 'User not found',
      });
    }
    res.status(httpStatus.OK).json({ success: true, data: user });
  } catch (err: any) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Failed to retrieve user',
    });
  }
};

// ✅ Block user (admin)
const blockUser = async (req: Request, res: Response) => {
  try {
    const user = await UserService.blockUser(req.params.id);
    if (!user) {
      return res.status(httpStatus.NOT_FOUND).json({
        success: false,
        message: 'User not found',
      });
    }
    res.status(httpStatus.OK).json({
      success: true,
      message: 'User blocked successfully',
      data: user,
    });
  } catch (err: any) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Failed to block user',
    });
  }
};

// ✅ Unblock user (admin)
const unblockUser = async (req: Request, res: Response) => {
  try {
    const user = await UserService.unblockUser(req.params.id);
    if (!user) {
      return res.status(httpStatus.NOT_FOUND).json({
        success: false,
        message: 'User not found',
      });
    }
    res.status(httpStatus.OK).json({
      success: true,
      message: 'User unblocked successfully',
      data: user,
    });
  } catch (err: any) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Failed to unblock user',
    });
  }
};

// ✅ Approve driver (admin)
const approveDriver = async (req: Request, res: Response) => {
  try {
    const driver = await UserService.approveDriver(req.params.id);
    if (!driver) {
      return res.status(httpStatus.NOT_FOUND).json({
        success: false,
        message: 'Driver not found or not a driver',
      });
    }
    res.status(httpStatus.OK).json({
      success: true,
      message: 'Driver approved successfully',
      data: driver,
    });
  } catch (err: any) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Failed to approve driver',
    });
  }
};

// ✅ Suspend driver (admin)
const suspendDriver = async (req: Request, res: Response) => {
  try {
    const driver = await UserService.suspendDriver(req.params.id);
    if (!driver) {
      return res.status(httpStatus.NOT_FOUND).json({
        success: false,
        message: 'Driver not found or not a driver',
      });
    }
    res.status(httpStatus.OK).json({
      success: true,
      message: 'Driver suspended successfully',
      data: driver,
    });
  } catch (err: any) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Failed to suspend driver',
    });
  }
};

const updateDriverAvailability = async (req: Request, res: Response) => {
  try {
    const userId = req.user?._id;

    if (!userId) {
      return res.status(httpStatus.UNAUTHORIZED).json({
        success: false,
        message: 'Unauthorized. User ID missing.',
      });
    }

    const { isOnline } = req.body;

    const updated = await UserService.updateDriverAvailability(userId, isOnline);
    if (!updated) {
      return res.status(httpStatus.BAD_REQUEST).json({
        success: false,
        message: 'Driver not found or not approved',
      });
    }

    res.status(httpStatus.OK).json({
      success: true,
      message: `Driver is now ${isOnline ? 'Online' : 'Offline'}`,
      data: updated,
    });
  } catch (err: any) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Failed to update driver availability',
    });
  }
};


export const UserControllers = {
  createUser,
  getAllUsers,
  getUserById,
  blockUser,
  unblockUser,
  approveDriver,
  suspendDriver,
  updateDriverAvailability,
 
};
