// import { useState } from 'react';
// import { TextField, Button, Paper, Box, Typography } from '@mui/material';

// const FormComponent = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     age: '',
//     address: ''
//   });
//   const [csvOutput, setCsvOutput] = useState('');

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handlePrintData = () => {
//     // Convert form data to CSV format
//     const headers = Object.keys(formData).join(',');
//     const values = Object.values(formData).join(',');
//     const csv = `${headers}\n${values}`;
//     setCsvOutput(csv);
//   };

//   return (
//     <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
//       <Paper elevation={3} sx={{ p: 3 }}>
//         <Typography variant="h5" gutterBottom>User Details Form</Typography>
        
//         <form>
//           <TextField
//             fullWidth
//             label="Name"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             margin="normal"
//           />
          
//           <TextField
//             fullWidth
//             label="Age"
//             name="age"
//             type="number"
//             value={formData.age}
//             onChange={handleChange}
//             margin="normal"
//           />
          
//           <TextField
//             fullWidth
//             label="Address"
//             name="address"
//             multiline
//             rows={3}
//             value={formData.address}
//             onChange={handleChange}
//             margin="normal"
//           />
          
//           <Button 
//             variant="contained" 
//             onClick={handlePrintData}
//             sx={{ mt: 2 }}
//           >
//             Print Data
//           </Button>
//         </form>
//       </Paper>

//       {csvOutput && (
//         <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
//           <Typography variant="h6" gutterBottom>CSV Output:</Typography>
//           <pre style={{ 
//             backgroundColor: '#f5f5f5', 
//             padding: '16px', 
//             borderRadius: '4px',
//             whiteSpace: 'pre-wrap'
//           }}>
//             {csvOutput}
//           </pre>
//         </Paper>
//       )}
//     </Box>
//   );
// };

// export default FormComponent;







import { useState } from 'react';
import { TextField, Button, Paper, Box, Typography } from '@mui/material';
import axios from 'axios';

const FormComponent = ({ refreshTable }) => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    address: ''
  });
  const [csvOutput, setCsvOutput] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePrintData = () => {
    const headers = Object.keys(formData).join(',');
    const values = Object.values(formData).join(',');
    setCsvOutput(`${headers}\n${values}`);
  };

 const handleAddToMongoDB = async () => {
  try {
    const response = await axios.post('http://localhost:5000/api/users', formData);
    console.log('Data saved to MongoDB:', response.data);
    refreshTable();
    setFormData({ name: '', age: '', address: '' });
    setCsvOutput('');
  } catch (error) {
    console.error('Error saving to MongoDB:', error.response?.data || error.message);
    alert(`Error: ${error.response?.data?.message || error.message}`);
  }
};
  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>User Details Form</Typography>
        
        <form>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            margin="normal"
            required
          />
          
          <TextField
            fullWidth
            label="Age"
            name="age"
            type="number"
            value={formData.age}
            onChange={handleChange}
            margin="normal"
            required
          />
          
          <TextField
            fullWidth
            label="Address"
            name="address"
            multiline
            rows={3}
            value={formData.address}
            onChange={handleChange}
            margin="normal"
            required
          />
          
          <Button 
            variant="contained" 
            onClick={handlePrintData}
            sx={{ mt: 2, mr: 2 }}
          >
            Print Data
          </Button>
        </form>
      </Paper>

      {csvOutput && (
        <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
          <Typography variant="h6" gutterBottom>Readable Output:</Typography>
          <pre style={{ 
            backgroundColor: '#f5f5f5', 
            padding: '16px', 
            borderRadius: '4px',
            whiteSpace: 'pre-wrap'
          }}>
            {csvOutput}
          </pre>
          <Button 
            variant="contained" 
            color="secondary" 
            onClick={handleAddToMongoDB}
            sx={{ mt: 2 }}
            
          >
            Add to MongoDB
          </Button>
        </Paper>
      )}
    </Box>
  );
};

export default FormComponent;
