import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import { IAuthProvider, IsActive, IUser, Role } from './user.interface';

const authProviderSchema = new Schema<IAuthProvider>({
  provider: { type: String, required: true },
  providerId: { type: String, required: true }
}, {
  versionKey: false,
  _id: false
});

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
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
    auths: [authProviderSchema], 
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: {
      transform(doc, ret) {
        delete ret.password; 
        return ret;
      }
    }
  }
);


userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  if (!this.password) {
    return next(new Error("Password is missing during save operation"));
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});


// 🔑 Compare password method
userSchema.methods.comparePassword = async function (password: string) {
  if (!this.password) return false; // password না থাকলে false
  return await bcrypt.compare(password, this.password);
};

export const User = model<IUser>('User', userSchema);
