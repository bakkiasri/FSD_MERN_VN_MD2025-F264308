import { useEffect, useState } from "react";
import axios from "axios";

function UsersPagination() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1); // current page
  const usersPerPage = 5;

  // Fetch 20 users
  useEffect(() => {
    axios
      .get("https://dummyjson.com/users?limit=20")
      .then((res) => setUsers(res.data.users))
      .catch((err) => console.log(err));
  }, []);

  // Calculate slice indexes
  const start = (page - 1) * usersPerPage;
  const end = start + usersPerPage;
  const currentUsers = users.slice(start, end);

  // Go to next page
  const nextPage = () => {
    if (page < users.length / usersPerPage) {
      setPage((prev) => prev + 1);
    }
  };

  // Go to previous page
  const prevPage = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  return (
    <div style={{ maxWidth: "400px" }}>
      <h2>Users (5 per page)</h2>

      {currentUsers.map((u) => (
        <p key={u.id}>
          {u.firstName} {u.lastName}
        </p>
      ))}

      <div style={{ marginTop: "20px" }}>
        <button onClick={prevPage} disabled={page === 1}>
          Prev
        </button>

        <span style={{ margin: "0 10px" }}>Page {page}</span>

        <button
          onClick={nextPage}
          disabled={page >= users.length / usersPerPage}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default UsersPagination;
