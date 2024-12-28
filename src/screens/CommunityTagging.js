import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet, TextInput } from 'react-native';
import { getTagsFromDatabase, addTagToDatabase, voteTag } from '../services/tagService'; // Ensure this matches the file path

const CommunityTagging = () => {
    const [tags, setTags] = useState([]);
    const [newTag, setNewTag] = useState('');

    useEffect(() => {
        const fetchTags = async () => {
            const fetchedTags = await getTagsFromDatabase();
            setTags(fetchedTags);
        };

        fetchTags();
    }, []);

    const handleAddTag = async () => {
        await addTagToDatabase(newTag);
        setNewTag('');
        const fetchedTags = await getTagsFromDatabase();
        setTags(fetchedTags);
    };

    const handleVote = async (tagId, voteType) => {
        await voteTag(tagId, voteType);
        const fetchedTags = await getTagsFromDatabase();
        setTags(fetchedTags);
    };

    const renderItem = ({ item }) => (
        <View style={styles.tagItem}>
            <Text style={styles.tagText}>{item.tag}</Text>
            <Text style={styles.voteText}>Votes: {item.votes}</Text>
            <Button title="Upvote" onPress={() => handleVote(item.id, 'upvote')} />
            <Button title="Downvote" onPress={() => handleVote(item.id, 'downvote')} />
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Community Tagging</Text>
            <TextInput
                style={styles.input}
                placeholder="Add a new tag"
                value={newTag}
                onChangeText={setNewTag}
            />
            <Button title="Add Tag" onPress={handleAddTag} />
            <FlatList
                data={tags}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 20,
        borderRadius: 5,
    },
    tagItem: {
        backgroundColor: '#f9f9f9',
        padding: 15,
        marginBottom: 10,
        borderRadius: 5,
    },
    tagText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    voteText: {
        fontSize: 16,
        color: 'gray',
    },
});

export default CommunityTagging;