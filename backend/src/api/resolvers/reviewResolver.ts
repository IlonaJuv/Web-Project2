import { GraphQLError } from 'graphql';
import { Review } from '../../interfaces/review';
import ReviewModel from '../models/reviewModel';
import { UserIdWithToken } from '../../interfaces/user';
import { Types } from 'mongoose';

export default {
    Query: {
        reviews: async () => {
            const reviews = await ReviewModel.find();
            return reviews;
        },
        reviewById: async (_parent: undefined, args: {id: string}) => {
            const review = await ReviewModel.findById(args.id);
            return review;
        },
        reviewsBySong: async (_parent: undefined, args: {songId: string}) => {
            const reviews = await ReviewModel.find({song: args.songId});
            return reviews;
        },
        reviewsByUser: async (_parent: undefined, args: {userId: string}) => {
            const reviews = await ReviewModel.find({user: args.userId});
            return reviews;
        },
    },
    Mutation: {
        createReview: async (_parent: undefined, args: Review, user: UserIdWithToken) => {
            console.log("Review resolver");
            if (!user.token) {
                throw new GraphQLError('You are not authorized to perform this action');
            }
            args.user = user.id as unknown as Types.ObjectId;
            console.log(args);
            const newReview = new ReviewModel(args);
            return await newReview.save();
        },
        updateReview: async (_parent: undefined, args: Review, user: UserIdWithToken) => {
            if (!user.token) {
                throw new GraphQLError('You are not authorized to perform this action');
            }
            args.updatedAt = new Date();
            const review = await ReviewModel.findByIdAndUpdate(
                {_id: args.id, user: user.id},
                args,
                { new: true }
            );
            if (!review) {
                throw new GraphQLError('Not your review or review not found');
            }
            
            return review;
        },
        deleteReview: async (_parent: undefined, args: {id: string}, user: UserIdWithToken) => {
            if (!user.token) {
                throw new GraphQLError('You are not authorized to perform this action');
            }
            const review = await ReviewModel.findByIdAndRemove({
                _id: args.id,
                user: user.id,
            });
            if (!review) {
                throw new GraphQLError('Not your review or review not found');
            }
            return review;
        },
    },
};
