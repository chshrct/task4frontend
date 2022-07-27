import React, { FC } from 'react';

type PropsType = {
  isSelected: boolean;
  id: string;
  name: string;
  email: string;
  regDate: string;
  logDate: string;
  status: 'active' | 'blocked';
};

export const TableRow: FC<PropsType> = props => {
  const { email, id, isSelected, logDate, name, regDate, status } = props;
  const rowBgColor = isSelected ? { backgroundColor: '#c0c0c0' } : undefined;

  return (
    <tr style={rowBgColor}>
      <td>
        <input type="checkbox" checked={isSelected} />
      </td>
      <td>{id}</td>
      <td>{name}</td>
      <td>{email}</td>
      <td>{regDate}</td>
      <td>{logDate}</td>
      <td>{status}</td>
    </tr>
  );
};
