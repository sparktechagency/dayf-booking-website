import React from 'react'
import BookmarksContainer from "./_components/BookmarksContainer";

export const metadata = {
  title: "Bookmarks",
  description: "Access your bookmarks record"
};

export default function page() {
  return (
    <div><BookmarksContainer /></div>
  )
}
