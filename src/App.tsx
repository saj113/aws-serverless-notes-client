import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import NoteList from './screens/NoteList/NoteList';

function App() {
  const defaultTheme = createTheme();
  return (
      <ThemeProvider theme={defaultTheme}>
        <main>
          <NoteList />
        </main>
      </ThemeProvider>
  );
}

export default App;
