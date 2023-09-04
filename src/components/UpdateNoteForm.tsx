import React, { useState } from 'react';
import {
    TextField,
    Button,
    FormHelperText,
    CircularProgress
} from '@mui/material';
import Container from '@mui/material/Container';

export type FormState = {
    title: string;
    content: string;
};

type UpdateNoteFormProps = {
    initialState?: FormState;
    action: (formState: FormState) => Promise<void>;
    onSubmitted: () => void;
}
const UpdateNoteForm = ({ onSubmitted, action, initialState }: UpdateNoteFormProps) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [formState, setFormState] = useState<FormState>(initialState ?? {
        title: '',
        content: ''
    });
    const [errors, setErrors] = useState<FormState>({
        title: '',
        content: ''
    });

    const validateForm = () => {
        let isValid = true;
        let tempErrors: FormState = {
            title: '',
            content: ''
        };

        if (!formState.title.trim()) {
            isValid = false;
            tempErrors.title = 'Title is required';
        }

        if (!formState.content.trim()) {
            isValid = false;
            tempErrors.content = 'Content is required';
        }

        setErrors(tempErrors);
        return isValid;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (validateForm()) {
            setLoading(true);
            try {
                await action(formState);
                onSubmitted();
                setFormState({ title: '', content: '' });
            } finally {
                setLoading(false);
            }
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormState(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <Container maxWidth="sm">
            <form onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    label="Title"
                    name="title"
                    variant="outlined"
                    margin="normal"
                    value={formState.title}
                    onChange={handleInputChange}
                    error={!!errors.title}
                />
                {errors.title && <FormHelperText error>{errors.title}</FormHelperText>}

                <TextField
                    fullWidth
                    label="Content"
                    name="content"
                    variant="outlined"
                    multiline
                    rows={4}
                    margin="normal"
                    value={formState.content}
                    onChange={handleInputChange}
                    error={!!errors.content}
                />
                {errors.content && <FormHelperText error>{errors.content}</FormHelperText>}

                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '24px' }}>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={loading}
                        startIcon={loading ? <CircularProgress size={24} /> : null}
                    >
                        Submit
                    </Button>
                </div>
            </form>
        </Container>
    );
};

export default UpdateNoteForm;
