import INotesService, {
    CreateNoteRequest,
    DeleteNoteRequest,
    GetNoteByIdRequest,
    GetNotesRequest,
    UpdateNoteRequest
} from './interfaces/NotesService.interface';
import Note from './interfaces/Note';

const url = process.env.REACT_APP_API_URL;
const headers = {
    'Content-Type': 'application/json',
    'app_user_id': 'test_user',
    'app_user_name': 'Test User'
};

class NotesService implements INotesService {
    async createNote(request: CreateNoteRequest): Promise<Note> {
        const response = await fetch(`${url}/note`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                "Item": {
                    ...request,
                }
            })
        });
        return await response.json();
    }

    async deleteNote(request: DeleteNoteRequest): Promise<void> {
        await fetch(`${url}/note/t/${request.timestamp}`, {
            method: 'DELETE',
            headers: headers,
        });
    }

    async getNoteById(request: GetNoteByIdRequest): Promise<Note> {
        const response = await fetch(`${url}/note/n/${request.noteId}`, {
            method: 'GET',
            headers: headers,
        });

        return await response.json();
    }

    async getNotes(request: GetNotesRequest): Promise<Note[]> {
        const response = await fetch(`${url}/notes`, {
            method: 'GET',
            headers: headers,
        });

        return await response.json();
    }

    async updateNote(request: UpdateNoteRequest): Promise<Note> {
        const response = await fetch(`${url}/note`, {
            method: 'PATCH',
            headers: headers,
            body: JSON.stringify({
                Item: {
                    ...request
                }
            })
        });

        return await response.json();
    }
}

const notesService = new NotesService();
export { notesService };
