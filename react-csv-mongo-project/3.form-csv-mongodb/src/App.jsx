import { useState } from 'react';
import { ThemeProvider, CssBaseline, Container } from '@mui/material';
import FormComponent from './components/FormComponent';
import CSVDisplay from './components/CSVDisplay';
import DataTable from './components/DataTable';
import FacebookTheme from './components/FacebookTheme';

import UserTable from './components/userTable';

function App() {
  const [csvData, setCSVData] = useState(null);

  return (
    <ThemeProvider theme={FacebookTheme}>
      <CssBaseline />
      <Container maxWidth="md" sx={{ py: 4 }}>
        <FormComponent setCSVData={setCSVData} />
        {csvData && <CSVDisplay csvData={csvData} />}
        <DataTable />
      </Container>
    </ThemeProvider>
  );
}

export default App;


// import { useState } from 'react';
// import { ThemeProvider, CssBaseline } from '@mui/material';
// import FormComponent from './components/FormComponent';
// import theme from './components/FacebookTheme';

// function App() {
//   const [refresh, setRefresh] = useState(false);

//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//       <FormComponent refreshTable={() => setRefresh(prev => !prev)} />
//       <UserTable refresh={refresh} setRefresh={setRefresh} />
//     </ThemeProvider>
//   );
// }

// export default App;