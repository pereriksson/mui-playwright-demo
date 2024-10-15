"use client"
import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import {useEffect, useState} from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Button, Drawer, TextField} from "@mui/material";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpwardOutlined';
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import MenuOutlined from "@mui/icons-material/MenuOutlined";

export default function Home() {
  const [dessertId, setDessertId] = useState<number|null>(null)

  return (
    <div className="layout">
      <h2>Table</h2>
      <BasicTable setDessert={setDessertId}/>
      <h2>Select</h2>
      <BasicSelect/>
      {dessertId && (
        <MyDrawer dessertId={dessertId} setDessertId={setDessertId}/>
      )}
    </div>
  );
}

type MyDrawerProps = {
  dessertId: number
  setDessertId: (id: number | null) => void
}

type Dessert = {
  id: number
  name: string
  calories: number
  fat: number
  carbs: number
  protein: number
  priority: string
}

function MyDrawer(props: MyDrawerProps) {
  const {dessertId, setDessertId} = props
  const [name, setName] = useState<string>("")
  const [calories, setCalories] = useState<string>("")
  const [fat, setFat] = useState<string>("")
  const [carbs, setCarbs] = useState<string>("")
  const [protein, setProtein] = useState<string>("")
  const [priority, setPriority] = useState<string>("")

  function updateDessert() {
    const index = desserts.findIndex(d => d.id === dessertId)
    desserts[index] = {
      id: dessertId,
      name,
      calories: parseInt(calories),
      fat: parseInt(fat),
      carbs: parseInt(carbs),
      protein: parseInt(protein),
      priority
    }

    setDessertId(null)
  }

  useEffect(() => {
    const dessert = desserts.find(d => d.id === dessertId)

    if (dessert) {
      setName(dessert.name)
      setCalories(dessert.calories.toString())
      setFat(dessert.fat.toString())
      setCarbs(dessert.carbs.toString())
      setProtein(dessert.protein.toString())
      setPriority(dessert.priority)
    }
  }, [dessertId]);

  return (
    <Drawer open={!!dessertId} onClose={()=>setDessertId(null)} role="dialog">
      <form onSubmit={updateDessert}>
          <Box sx={{marginBottom: '2rem'}}>
          <Box>
            <TextField name="name" label="Name" variant="standard" onChange={(e) => setName(e.target.value)} value={name}/>
          </Box>
          <Box>
            <TextField name="calories" label="Calories" variant="standard" onChange={(e) => setCalories(e.target.value)} value={calories}/>
          </Box>
          <Box>
            <TextField name="fat" label="Fat" variant="standard" onChange={(e) => setFat(e.target.value)} value={fat}/>
          </Box>
          <Box>
            <TextField name="carbs" label="Carbs" variant="standard" onChange={(e) => setCarbs(e.target.value)} value={carbs}/>
          </Box>
          <Box>
            <TextField name="protein" label="Protein" variant="standard" onChange={(e) => setProtein(e.target.value)} value={protein}/>
          </Box>
          <Box>
            <Select variant="standard" value={priority} onChange={(e: SelectChangeEvent) => setPriority(e.target.value)}>
              <MenuItem value="high">High</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="low">Low</MenuItem>
            </Select>
          </Box>
        </Box>
        <Button variant="contained" type="submit">Save</Button>
      </form>
    </Drawer>
  )
}

function createDessert(id: number, name: string, calories: number, fat: number, carbs: number, protein: number, priority: string) {
  return { id, name, calories, fat, carbs, protein, priority };
}

const desserts: Dessert[] = [
  createDessert(1, 'Frozen yoghurt', 159, 6.0, 24, 4.0, "high"),
  createDessert(2, 'Ice cream sandwich', 237, 9.0, 37, 4.3, "medium"),
  createDessert(3, 'Eclair', 262, 16.0, 24, 6.0, "medium"),
  createDessert(4, 'Cupcake', 305, 3.7, 67, 4.3, "medium"),
  createDessert(5, 'Gingerbread', 356, 16.0, 49, 3.9, "low")
];

function BasicSelect() {
  const [age, setAge] = useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Name</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Name"
          onChange={handleChange}
        >
          {desserts.map(dessert => (
            <MenuItem key={dessert.id} value={dessert.id}>{dessert.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

type BasicTableProps = {
  setDessert: (open: number | null) => void
}

function BasicTable(props: BasicTableProps) {
  const {setDessert} = props
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat (g)</TableCell>
            <TableCell align="right">Carbs (g)</TableCell>
            <TableCell align="right">Protein (g)</TableCell>
            <TableCell align="center">Priority</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {desserts.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 }, cursor: 'pointer' }}
              onClick={() => setDessert(row.id)}
            >
              <TableCell component="th" scope="row">{row.name}</TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
              <TableCell align="center" data-value={row.priority}>
                {row.priority === "high" && (
                  <ArrowUpwardIcon sx={{color: "red"}}/>
                )}
                {row.priority === "medium" && (
                  <MenuOutlined sx={{color: "#FDAC00"}}/>
                )}
                {row.priority === "low" && (
                  <ArrowDownwardIcon sx={{color: "green"}}/>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
