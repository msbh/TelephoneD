export const getTagsFromDatabase = async () => {
    return [
        { id: '1', tag: 'Spam', votes: 10 },
        { id: '2', tag: 'Telemarketer', votes: 5 },
    ];
};

export const addTagToDatabase = async (tag) => {
    console.log('Tag added:', tag);
};

export const voteTag = async (tagId, voteType) => {
    console.log(`Tag ${tagId} ${voteType === 'upvote' ? 'upvoted' : 'downvoted'}`);
};