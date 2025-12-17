import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const FavoriteSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true,
    },
    movieId: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

FavoriteSchema.index({ user: 1, movieId: 1 }, { unique: true });

const Favorite = mongoose.model('Favorite', FavoriteSchema);

export default Favorite;