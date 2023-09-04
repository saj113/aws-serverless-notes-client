import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import * as React from 'react';
import Note from '../../services/NotesService/interfaces/Note';
import NoteListItem from './components/NoteListItem';
import { notesService } from '../../services/NotesService/NotesService';
import { useEffect } from 'react';
import AddNoteButton from './components/AddNoteButton';
import { CircularProgress } from '@mui/material';
import Stack from '@mui/material/Stack';

const NoteList = () => {
    const [isLoading, setIsLoading] = React.useState<boolean>(true);
    const [notes, setNotes] = React.useState<Note[]>([]);
    const loadNotes = async () => {
        setIsLoading(true);
        try {
            const notes = await notesService.getNotes({ limit: 100 });
            setNotes(notes);
        } catch (e) {
            alert(e);
        } finally {
            setIsLoading(false);
        }
    };
    
    const onNoteAdded = (note: Note) => {
        setNotes([note, ...notes]);
    };

    const onNoteUpdated = (note: Note) => {
        const index = notes.findIndex((n) => n.note_id === note.note_id);
        if (index !== -1) {
            const newNotes = [...notes];
            newNotes[index] = note;
            setNotes(newNotes);
        }
    };
    
    const onNoteDeleted = (note: Note) => {
        const index = notes.findIndex((n) => n.note_id === note.note_id);
        if (index !== -1) {
            const newNotes = [...notes];
            newNotes.splice(index, 1);
            setNotes(newNotes);
        }
    };

    useEffect(() => {
        loadNotes();
    }, []);
    return (
        <>
            <Container maxWidth="sm">
               <AddNoteButton onAdded={onNoteAdded} />
            </Container>
            <Container sx={{ py: 8 }} maxWidth="md">
                { isLoading && (
                    <Stack justifyContent="center" direction="row" marginTop={8}>
                        <CircularProgress size={200} className="" />
                    </Stack>
                ) }
                { !isLoading && (
                    <Grid container spacing={4}>
                        {notes.map((note) => (
                            <Grid item key={note.note_id} xs={12} sm={6} md={4}>
                                <NoteListItem note={note} onUpdated={onNoteUpdated} onDeleted={onNoteDeleted} />
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Container>
        </>
    );
};

export default NoteList;
