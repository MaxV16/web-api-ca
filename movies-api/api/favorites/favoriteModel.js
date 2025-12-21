import mongoose from 'mongoose'; //import mongoose for MongoDB object modeling

const Schema = mongoose.Schema; //get mongoose Schema constructor

const FavoriteSchema = new Schema({ //define schema for favorite entries
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

FavoriteSchema.index({ user: 1, movieId: 1 }, { unique: true }); //create unique compound index on user and movieId

const Favorite = mongoose.model('Favorite', FavoriteSchema); //create mongoose model named Favorite

export default Favorite; //export the Favorite model