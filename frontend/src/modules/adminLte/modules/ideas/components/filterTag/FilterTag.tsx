import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export const FilterTag = ({ setTypeName, typeName }: any) => {


  const types = [
    { id: 1, nombre: 'Desarrollo Tecnológico' },
    { id: 2, nombre: 'Monografía' },
    { id: 3, nombre: 'Emprendimiento' },
    { id: 4, nombre: 'Investigación' },
  ]

  return (
    <FormControl sx={{ m: 1, minWidth: 300 }} size="small">
      <InputLabel id="demo-select-small">Tipo</InputLabel>
      <Select
        labelId="demo-select-small"
        id="demo-select-small"
        value={typeName}
        label="Tipo"
        onChange={(e) => setTypeName(e.target.value)}
        style={{ color: '#464749' }}
      >
        <MenuItem value="">
          <em style={{ color: '#AAA' }}>Ninguno</em>
        </MenuItem>
        {types.map(({ id, nombre }) =>
        (<MenuItem
          key={id}
          value={nombre}
          style={{ color: '#333' }}
        >
          {nombre}
        </MenuItem>))
        }

      </Select>
    </FormControl>
  );
}