import React from "react";

export default function Footer() {
  return (
    <footer className="mt-4">
      <div className="container text-center text-muted p-3">
        <small>
          &copy; {new Date().getFullYear()} College Info Portal. All rights
          reserved.
        </small>
      </div>
    </footer>
  );
}
