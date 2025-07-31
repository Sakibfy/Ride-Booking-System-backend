import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';
import {  IsActive, IUser, Role } from './user.interface';




const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String,required: true,unique: true,lowercase: true, },
    password: { type: String },
    role: {
      type: String,
      enum: Object.values(Role),
      default: Role.RIDER
    },
    isBlocked: { type: Boolean, default: false },
    isApproved: { type: Boolean, default: false },
    isActive: {
      type: String,
      enum: Object.values(IsActive),
      default: IsActive.ACTIVE,
  },
    vehicleInfo: { type: String },
    totalEarnings: { type: Number, default: 0 },

   
  },
  {
    timestamps: true,
   versionKey: false
  }
);

// 🔐 Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// 🔑 Compare password method
userSchema.methods.comparePassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

export const User = model<IUserDocument>('User', userSchema);
