import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { SessionContext } from '../contexts/SessionContext';
import { Textarea, Button, Card, Text, Group, Title, Loader } from '@mantine/core';

interface Note {
  id: string;
  content: string;
  createdAt: string;
  userId: string;
}

const NotesComponent: React.FC = () => {
  const sessionContext = useContext(SessionContext);
  if (!sessionContext) {
    throw new Error("NotesComponent must be used within a SessionContextProvider");
  }

  const { user, token } = sessionContext;
  const { cocktailId } = useParams<{ cocktailId: string }>();
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchNotes = async () => {
    try {
      const response = await fetch(`/api/notes/cocktails/${cocktailId}`);
      if (response.ok) {
        const data = await response.json();
        setNotes(data);
      }
    } finally {
      setLoading(false);
    }
  };

  const deleteNote = async (noteId: string) => {
    try {
      const response = await fetch(`/api/notes/${noteId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setNotes(notes.filter(note => note.id !== noteId));
      }
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };


  const addNote = async () => {
    if (!user?.id || !cocktailId || !newNote.trim()) {
      console.error("❌ Missing user ID, cocktail ID, or content!");
      return;
    }

    try {
      const response = await fetch('/api/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
          cocktailId,
          content: newNote,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("❌ Backend error:", errorData);
        return;
      }

      const data = await response.json();
      setNotes([...notes, data]);
      setNewNote('');
    } catch (error) {
      console.error("❌ Error adding note:", error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, [cocktailId]);

  if (loading) return <Loader />;

  return (
    <div>
      <Title order={3}>Notes for this Cocktail</Title>
      <Textarea
        placeholder="Write your note here..."
        value={newNote}
        onChange={(e) => setNewNote(e.target.value)}
      />
      <Button onClick={addNote} mt="sm">Add Note</Button>
      <div style={{ marginTop: '20px' }}>
        {notes.map(note => (
          <Card key={note.id} shadow="sm" padding="lg" mb="md">
            <Group justify="space-between">
              <Text size="sm">{note.content}</Text>
              <Button color="red" size="xs" onClick={() => deleteNote(note.id)}>
                Delete
              </Button>
            </Group>
            <Text size="xs" color="gray">Created at: {new Date(note.createdAt).toLocaleString()}</Text>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default NotesComponent;
