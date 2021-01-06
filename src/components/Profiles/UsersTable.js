import React, { useContext, useEffect, useState } from "react";
import { Box, DataTable } from 'grommet';
import { columns } from './Columns';
import { UserContext } from "./UserProvider";


export const UsersTable = () => {
  const { users, getUsers } = useContext(UserContext)
  const controlledColumns = columns.map(col => ({ ...col }));

  useEffect(() => {
    getUsers()
  }, []);



console.log(users)
  return (
    <>
      <Box align="center" pad="medium">
        <DataTable
          columns={[
            ...controlledColumns,
          ].map(col => ({ ...col }))}
          data={users}
          sortable
          size="medium"
        />
      </Box>
    </>
  );
};