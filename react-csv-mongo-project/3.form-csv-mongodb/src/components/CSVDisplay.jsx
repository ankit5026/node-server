import { useState } from 'react';
import { TextField, Button, Paper, Typography, Box } from '@mui/material';

const FormComponent = ({ setCSVData }) => {
  const [formData, setFormData] = useState({ name: '', age: '', address: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setCSVData(formData); // Pass data to CSV display
  };

  return (
    <Paper elevation={3} sx={{ mb: 3 }}>
      <Box p={3}>
        <Typography variant="h5" gutterBottom>Enter Your Details</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Age"
            name="age"
            type="number"
            value={formData.age}
            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Address"
            name="address"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            margin="normal"
            multiline
            rows={3}
            required
          />
          <Button type="submit" variant="contained" sx={{ mt: 2 }}>Print Data</Button>
        </form>
      </Box>
    </Paper>
  );
};

export default FormComponent;