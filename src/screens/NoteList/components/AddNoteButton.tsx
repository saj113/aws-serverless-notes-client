import React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import NoteModal from '../../../components/NoteModal';
import UpdateNoteForm, { FormState } from '../../../components/UpdateNoteForm';
import { notesService } from '../../../services/NotesService/NotesService';
import Note from '../../../services/NotesService/interfaces/Note';

type AddNoteButtonProps = {
    onAdded: (note: Note) => void
};

const AddNoteButton = ({ onAdded }:AddNoteButtonProps) => {
    const [open, setOpen] = React.useState<boolean>(false);
    const handleOnSubmit = () => {
        setOpen(false);
        
    };
    const createNote = async (formState: FormState): Promise<void> => {
        const note = await notesService.createNote({
            ...formState,
            cat: 'cat',
        });
        onAdded(note);
    };
    return (
        <>
            <Stack
                sx={{ pt: 4 }}
                direction="row"
                justifyContent="center"
                textTransform="uppercase"
            >
                <Button onClick={() => setOpen(true)} variant="contained">Add new note</Button>
            </Stack>
            <NoteModal isOpen={open} onClosed={() => setOpen(false)}>
                <UpdateNoteForm onSubmitted={handleOnSubmit} action={createNote} />
            </NoteModal>
        </>
    );
};

export default AddNoteButton;
