import Note from '../../../services/NotesService/interfaces/Note';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import * as React from 'react';
import UpdateNoteForm, { FormState } from '../../../components/UpdateNoteForm';
import NoteModal from '../../../components/NoteModal';
import { CircularProgress } from '@mui/material';
import { notesService } from '../../../services/NotesService/NotesService';

type NoteListItemProps = {
    note: Note;
    onUpdated: (note: Note) => void;
    onDeleted: (note: Note) => void;
};

const NoteListItem = ({ note, onUpdated, onDeleted }: NoteListItemProps) => {
    const [isDeleteLoading, setDeleteLoading] = React.useState<boolean>(false);
    const [open, setOpen] = React.useState<boolean>(false);
    
    const updateNote = async (formState: FormState): Promise<void> => {
        await notesService.updateNote({
            ...note,
            ...formState,
        });
        onUpdated({
            ...note,
            ...formState,
        });
    };
    const deleteNote = async () => {
        setDeleteLoading(true);
        try {
            await notesService.deleteNote({
                timestamp: note.timestamp
            });
            onDeleted(note);
        } finally {
            setDeleteLoading(false);
        }
    };
    return (
        <>
            <Card
                sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
            >
                <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                        {note.title}
                    </Typography>
                    <Typography>
                        {note.content}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" onClick={() => setOpen(true)}>Edit</Button>
                    <Button size="small" onClick={deleteNote} startIcon={isDeleteLoading ? <CircularProgress size={24} /> : null}>Delete</Button>
                </CardActions>
            </Card>
            <NoteModal isOpen={open} onClosed={() => setOpen(false)}>
                <UpdateNoteForm initialState={{...note}} onSubmitted={() => setOpen(false)} action={updateNote} />
            </NoteModal>
        </>
    );
};

export default NoteListItem;
