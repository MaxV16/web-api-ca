import React from "react"; //import React
import Table from "@mui/material/Table"; //import Table component
import TableBody from "@mui/material/TableBody"; //import TableBody component
import TableCell from "@mui/material/TableCell"; //import TableCell component
import TableContainer from "@mui/material/TableContainer"; //import TableContainer component
import TableHead from "@mui/material/TableHead"; //import TableHead component
import TableRow from "@mui/material/TableRow"; //import TableRow component
import Paper from "@mui/material/Paper"; //import Paper component
import { Link } from "react-router-dom"; //import Link for navigation
import { getMovieReviews } from "../../api/tmdb-api"; //import getMovieReviews API function
import { excerpt } from "../../util"; //import excerpt utility function
import { useQuery } from "@tanstack/react-query"; //import useQuery from React Query
import Spinner from '../spinner' //import Spinner component


export default function MovieReviews({ movie }) { //MovieReviews component
  const { data, error, isPending, isError } = useQuery({ //fetch reviews using React Query
    queryKey: ['reviews', { id: movie.id }],
    queryFn: getMovieReviews,
  });
  
  if (isPending) { //show spinner while pending
    return <Spinner />;
  }

  if (isError) { //show error if any
    return <h1>{error.message}</h1>;
  }
  
  const reviews = data.results; //extract reviews from data
  console.log("Movie Reviews:", reviews);


  return ( //render reviews table
    <TableContainer component={Paper}>
      <Table sx={{minWidth: 550}} aria-label="reviews table">
        <TableHead>
          <TableRow>
            <TableCell >Author</TableCell>
            <TableCell align="center">Excerpt</TableCell>
            <TableCell align="right">More</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reviews.map((r) => (
            <TableRow key={r.id}>
              <TableCell component="th" scope="row">
                {r.author}
              </TableCell>
              <TableCell >{excerpt(r.content) || "No excerpt available"}</TableCell>
              <TableCell >
              <Link
                  to={`/reviews/${r.id}`}
                  state={{
                      review: r,
                      movie: movie,
                  }}
                >
                  Full Review
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
