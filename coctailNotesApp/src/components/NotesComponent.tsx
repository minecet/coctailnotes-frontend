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

  const { user } = sessionContext ?? {};
  const { cocktailId } = useParams<{ cocktailId: string }>();
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState('');
  const [loading, setLoading] = useState(true);
  const [editNoteId, setEditNoteId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');
  const fetchNotes = async () => {
    const response = await fetch(`/api/notes/cocktails/${cocktailId}`);
    if (response.ok) {
      const data = await response.json();
      setNotes(data);
    }
    setLoading(false);
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
  const updateNote = async (noteId: string) => {
    const response = await fetch(`/api/notes/${noteId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: editContent }),
    });
    if (response.ok) {
      const updatedNote = await response.json();
      setNotes(notes.map(note => note.id === noteId ? updatedNote : note));
      setEditNoteId(null);
      setEditContent('');
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
      <Textarea value={newNote} onChange={(e) => setNewNote(e.target.value)} placeholder="Add a note..." />
      <Button onClick={addNote} mt="sm">Add Note</Button>
      {notes.map(note => (
        <Card key={note.id} shadow="sm" padding="lg" mb="md">
          {editNoteId === note.id ? (
            <>
              <Textarea value={editContent} onChange={(e) => setEditContent(e.target.value)} />
              <Button onClick={() => updateNote(note.id)} size="xs">Save</Button>
              <Button onClick={() => setEditNoteId(null)} size="xs" variant="outline">Cancel</Button>
            </>
          ) : (
            <Group justify="space-between">
              <Text size="sm">{note.content}</Text>
              <Group>
                <Button size="xs" onClick={() => { setEditNoteId(note.id); setEditContent(note.content); }}>Edit</Button>
                <Button size="xs" color="red" onClick={() => deleteNote(note.id)}>Delete</Button>
              </Group>
            </Group>
          )}
        </Card>
      ))}
    </div>
  );
};

export default NotesComponent;
