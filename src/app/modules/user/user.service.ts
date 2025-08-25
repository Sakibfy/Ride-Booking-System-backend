import { User } from './user.model';


export const UserService = {
  // 🔹 Get all users
  async getAllUsers() {
    return await User.find().select('-password'); // exclude password
  },

  // 🔹 Get a user by ID
  async getUserById(id: string) {
    return await User.findById(id).select('-password');
  },

  // 🔹 Block a user (admin)
  async blockUser(id: string) {
    return await User.findByIdAndUpdate(
      id,
      { isBlocked: true },
      { new: true }
    ).select('-password');
  },

  // 🔹 Unblock a user (admin)
  async unblockUser(id: string) {
    return await User.findByIdAndUpdate(
      id,
      { isBlocked: false },
      { new: true }
    ).select('-password');
  },

  // 🔹 Approve a driver (admin)
  async approveDriver(id: string) {
    const user = await User.findById(id);

    if (!user || user.role !== 'driver') return null;

    user.isApproved = true;
    user.isBlocked = false;
    return await user.save();
  },

  // 🔹 Suspend a driver (admin)
  async suspendDriver(id: string) {
    const user = await User.findById(id);

    if (!user || user.role !== 'driver') return null;

    user.isApproved = false;
    user.isOnline = false;
    return await user.save();
  },

  // 🔹 Update driver's availability (driver only)
  async updateDriverAvailability(userId: string, isOnline: boolean) {
    const user = await User.findById(userId);

    if (!user || user.role !== 'driver' || !user.isApproved || user.isBlocked) {
      return null;
    }

    user.isOnline = isOnline;
    return await user.save();
  }
};

const getMe = async (userId: string) => {

  const user = await User.findById(userId).select("-password");
  

  return {
      data: user
  }
};


export const UserServices = {
  UserService,
  getMe
}