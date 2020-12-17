import React, { useEffect, useState } from "react";
import Layout from "@components/layout";
import Table, { TableCell, TableRow } from "@components/table";
import api from "@/util/api";
import { isLoggedIn } from "@/util/auth";
import redirectTo from "@/util/redirectTo";
import withAuth from "@components/withAuth";

const Home = ({ user }) => {
  const [grades, setGrades] = useState([]);

  useEffect(() => {
    api()
      .post("/api/get-all-city")
      .then((response) => {
        console.log(response.data.data.data);
        setGrades(response.data.data.data);
      });

    console.log(user);
  }, []);

  return (
    <Layout>
      <Table>
        <thead>
          <TableRow>
            <TableCell isHeader={true}>ID</TableCell>
            <TableCell isHeader={true}>Name</TableCell>
            <TableCell isHeader={true}>Created At</TableCell>
          </TableRow>
        </thead>
        <tbody>
          {grades.map((ticket, i) => (
            <TableRow key={ticket.id} isEven={(i + 1) % 2 === 0}>
              <TableCell>{ticket.id}</TableCell>
              <TableCell>{ticket.name}</TableCell>
              <TableCell>{ticket.created_at}</TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </Layout>
  );
};

export default withAuth(Home);
