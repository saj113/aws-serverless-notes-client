import Note from './Note';


export type CreateNoteRequest = {
    title: string;
    content: string;
    cat: string;
}

export type GetNotesRequest = {
    limit?: number;
};

export type GetNoteByIdRequest = {
    noteId: string;
};

export type UpdateNoteRequest = {
    note_id: string;
    timestamp: number;
    title: string;
    content: string;
    cat: string;
};

export type DeleteNoteRequest = {
    timestamp: number;
};

interface INotesService {
    getNotes(request: GetNotesRequest): Promise<Note[]>;
    getNoteById(request: GetNoteByIdRequest): Promise<Note>;
    createNote(request: CreateNoteRequest): Promise<Note>;
    updateNote(request: UpdateNoteRequest): Promise<Note>;
    deleteNote(request: DeleteNoteRequest): Promise<void>;
}

export default INotesService;
