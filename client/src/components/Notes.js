import { Link } from "react-router-dom";
import pinIcon from "../images/pinIcon.png";
import threeDots from "../images/dots.png";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [query, setQuery] = useState("");
  useEffect(() => {
    document.title = "Notes";
    getNotes();
    const handleMenuClick = (e) => {
      if (e.target.localName === "img") {
        if (e.target.nextElementSibling.classList.contains("note-menu-ul")) {
          if (e.target.nextElementSibling.classList.contains("active")) {
            e.target.nextElementSibling.classList.remove("active");
          } else {
            e.target.nextElementSibling.classList.add("active");
          }
        } else {
          document.querySelectorAll(".note-menu img").forEach((img) => {
            img.nextElementSibling.classList.remove("active");
          });
        }
      } else {
        document.querySelectorAll(".note-menu img").forEach((img) => {
          img.nextElementSibling.classList.remove("active");
        });
      }
    };

    window.addEventListener("click", handleMenuClick);

    return () => {
      window.removeEventListener("click", handleMenuClick);
    };
  }, []);

  const getNotes = async () => {
    try {
      let res = await axios({
        method: "get",
        url: "https://noteflow-backend.onrender.com/api/note/get/notes/all",
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      });
      setNotes(res.data.notes);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteNote = async (noteid) => {
    try {
      if (window.confirm("Are you sure you want to delete this note?")) {
        let res = await axios({
          method: "delete",
          url: `https://noteflow-backend.onrender.com/api/note/delete/${noteid}`,
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        });

        console.log(res.data.msg);
        let newNotes = notes.filter((n) => {
          return n._id !== noteid;
        });
        setNotes(newNotes);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const pinNote = async (noteid) => {
    try {
      let res = await axios({
        method: "put",
        url: `https://noteflow-backend.onrender.com/api/note/pin/${noteid}`,
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      });
      console.log(res.data.msg);
      let newNotes = notes.map((n) => {
        if (n._id === noteid) {
          return {
            ...n,
            pinned: true,
          };
        } else {
          return n;
        }
      });

      setNotes(newNotes);
    } catch (error) {
      console.log(error);
    }
  };

  const unpinNote = async (noteid) => {
    try {
      let res = await axios({
        method: "put",
        url: `https://noteflow-backend.onrender.com/api/note/unpin/${noteid}`,
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      });
      console.log(res.data.msg);
      let newNotes = notes.map((n) => {
        if (n._id === noteid) {
          return {
            ...n,
            pinned: false,
          };
        } else {
          return n;
        }
      });

      setNotes(newNotes);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className='notes-section'>
      <h1>All Notes.</h1>
      <div className='search-bar d-flex'>
        <input
          type='search'
          name='query'
          placeholder='Search for notes..'
          onChange={(e) => setQuery(e.target.value)}
        />
        <Link to='/dashboard/create/note' title='Create new note' href='#'>
          +
        </Link>
      </div>
      <div className='notes'>
        {notes
          .filter((n) => {
            return query.toLocaleLowerCase().trim() === ""
              ? n
              : n.title.toLowerCase().includes(query.toLocaleLowerCase()) ||
                  n.description
                    .toLowerCase()
                    .includes(query.toLocaleLowerCase());
          })
          .map((n) => {
            return (
              n.pinned && (
                <div className='note d-flex' key={n._id}>
                  <Link to={`/dashboard/note/${n._id}`}>
                    <div className='note-content'>
                      {n.title && <h2 className='note-title'>{n.title}</h2>}
                      <p>
                        {n.description
                          .replace(/(<([^>]+)>)/gi, "")
                          .slice(0, 30)}
                      </p>
                    </div>
                  </Link>
                  <div className='note-icons d-flex flex-col'>
                    {n.pinned ? <img src={pinIcon} alt='' /> : <div></div>}

                    <div className='note-menu'>
                      <img src={threeDots} alt='' />
                      <ul className='note-menu-ul d-flex flex-col'>
                        <li>
                          <Link to={`/dashboard/update/note/${n._id}`}>
                            Edit
                          </Link>
                        </li>
                        <li>
                          {n.pinned ? (
                            <button onClick={() => unpinNote(n._id)}>
                              Unpin
                            </button>
                          ) : (
                            <button onClick={() => pinNote(n._id)}>Pin</button>
                          )}
                        </li>
                        <li>
                          <button onClick={() => deleteNote(n._id)}>
                            Delete
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )
            );
          })}
        {notes
          .filter((n) => {
            return query.toLocaleLowerCase().trim() === ""
              ? n
              : n.title.toLowerCase().includes(query.toLocaleLowerCase()) ||
                  n.description
                    .toLowerCase()
                    .includes(query.toLocaleLowerCase());
          })
          .map((n) => {
            return (
              !n.pinned && (
                <div className='note d-flex' key={n._id}>
                  <Link to={`/dashboard/note/${n._id}`}>
                    <div className='note-content'>
                      {n.title && <h2 className='note-title'>{n.title}</h2>}
                      {n.description.replace(/(<([^>]+)>)/gi, "").slice(0, 30)}
                    </div>
                  </Link>
                  <div className='note-icons d-flex flex-col'>
                    {n.pinned ? <img src={pinIcon} alt='' /> : <div></div>}
                    <div className='note-menu'>
                      <img src={threeDots} alt='' />
                      <ul className='note-menu-ul d-flex flex-col'>
                        <li>
                          <Link to={`/dashboard/update/note/${n._id}`}>
                            Edit
                          </Link>
                        </li>
                        <li>
                          {n.pinned ? (
                            <button onClick={() => unpinNote(n._id)}>
                              Unpin
                            </button>
                          ) : (
                            <button onClick={() => pinNote(n._id)}>Pin</button>
                          )}
                        </li>
                        <li>
                          <button onClick={() => deleteNote(n._id)}>
                            Delete
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )
            );
          })}
      </div>
    </section>
  );
}
