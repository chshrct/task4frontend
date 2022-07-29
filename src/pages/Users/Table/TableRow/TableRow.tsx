import { ChangeEventHandler, FC } from 'react';

import { StatusType } from 'api/usersApi/types';
import { useAppDispatch } from 'store';
import { toggleUserSelect } from 'store/usersSlice/usersSlice';

type PropsType = {
  checked: boolean;
  id: string;
  name: string;
  email: string;
  regDate: string;
  logDate: string;
  status: StatusType;
};

export const TableRow: FC<PropsType> = props => {
  const { email, id, checked, logDate, name, regDate, status } = props;
  const rowBgColor = checked ? { backgroundColor: '#c0c0c0' } : undefined;

  const dispatch = useAppDispatch();

  const onCheckBoxChange: ChangeEventHandler<HTMLInputElement> = (): void => {
    dispatch(toggleUserSelect(id));
  };

  return (
    <tr style={rowBgColor}>
      <td className="align-middle">
        <input
          className=""
          type="checkbox"
          checked={checked}
          onChange={onCheckBoxChange}
        />
      </td>
      <td className="align-middle">{id}</td>
      <td className="align-middle">{name}</td>
      <td className="align-middle">{email}</td>
      <td className="align-middle">{regDate}</td>
      <td className="align-middle">{logDate}</td>
      <td className="align-middle">{status}</td>
    </tr>
  );
};
