import { useState, useEffect } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import axios from 'axios';

const DataTable = () => {
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const response = await axios.get('http://localhost:5000/api/users');
    setUsers(response.data);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/users/${id}`);
    fetchUsers();
  };

  const handleUpdate = async () => {
    await axios.put(`http://localhost:5000/api/users/${editUser._id}`, editUser);
    fetchUsers();
    setEditUser(null);
  };

  return (
    <Paper elevation={3}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.age}</TableCell>
                <TableCell>{user.address}</TableCell>
                <TableCell>
                  <Button onClick={() => setEditUser(user)}><Edit /></Button>
                  <Button onClick={() => handleDelete(user._id)} color="error"><Delete /></Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Dialog */}
      <Dialog open={Boolean(editUser)} onClose={() => setEditUser(null)}>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            value={editUser?.name || ''}
            onChange={(e) => setEditUser({ ...editUser, name: e.target.value })}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Age"
            type="number"
            value={editUser?.age || ''}
            onChange={(e) => setEditUser({ ...editUser, age: e.target.value })}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Address"
            value={editUser?.address || ''}
            onChange={(e) => setEditUser({ ...editUser, address: e.target.value })}
            fullWidth
            margin="dense"
            multiline
            rows={3}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditUser(null)}>Cancel</Button>
          <Button onClick={handleUpdate} color="primary">Save</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default DataTable;