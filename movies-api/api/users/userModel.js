import mongoose from 'mongoose'; //import mongoose for MongoDB
import bcrypt from 'bcrypt'; //import bcrypt for password hashing

const Schema = mongoose.Schema; //get mongoose Schema constructor

const UserSchema = new Schema({ //define user schema
  username: { type: String, unique: true, required: true},
  password: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        if (v.startsWith('$2')) return true;
        return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(v);
      },
      message: 'Password must be at least 8 characters long and contain at least one letter, digit, and special character.'
    }
  },
  favorites: { type: [Number], default: [] },
  playlist: { type: [Schema.Types.Mixed], default: [] }
});

UserSchema.methods.comparePassword = async function (passw) { //instance method to compare password
    return await bcrypt.compare(passw, this.password); 
};

UserSchema.statics.findByUserName = function (username) { //static method to find user by username
  return this.findOne({ username: username });
};

UserSchema.pre('save', async function(next) { //pre-save hook to hash password
  const saltRounds = 10;
  if (this.isModified('password') || this.isNew) {
    try {
      const hash = await bcrypt.hash(this.password, saltRounds);
      this.password = hash;
      next();
  } catch (error) {
     next(error);
  }

  } else {
      next();
  }
});


export default mongoose.model('User', UserSchema); //export User model
