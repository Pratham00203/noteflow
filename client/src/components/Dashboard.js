import Notes from "./Notes";
import Note from "./Note";
import NoteForm from "./NoteForm";
import Settings from "./Settings";
import { useParams, Link, useNavigate } from "react-router-dom";
import noteIcon from "../images/noteIcon.png";
import settingsIcon from "../images/setting.png";
import logoutIcon from "../images/logout.png";

export default function Dashboard({ defaultOption }) {
  const { noteid } = useParams();
  const navigate = useNavigate();

  const logout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("token");
      navigate("/login");
    }
  };

  const Component = () => {
    if (defaultOption === "Notes") {
      return <Notes />;
    } else if (defaultOption === "Settings") {
      return <Settings />;
    } else if (defaultOption === "Create Note") {
      return <NoteForm option='Create' />;
    } else if (defaultOption === "Update Note") {
      return <NoteForm option='Update' noteid={noteid} />;
    } else {
      return <Note noteid={noteid} />;
    }
  };

  return (
    <>
      <div className='dashboard'>
        <aside>
          <h1>NoteFlow.</h1>
          <ul className='d-flex flex-col'>
            <li>
              <Link to='/dashboard/notes'>
                <img src={noteIcon} alt='' /> Notes
              </Link>
            </li>

            <li>
              <Link to='/dashboard/settings'>
                <img src={settingsIcon} alt='' />
                Settings
              </Link>
            </li>
            <li>
              <button className='d-flex align-center' onClick={logout}>
                <img src={logoutIcon} alt='' />
                Logout
              </button>
            </li>
          </ul>
        </aside>
        <div className='dashboard-content'>
          <Component />
          {/* {defaultOption === "Notes" ? (
            <Notes />
          ) : defaultOption === "Settings" ? (
            <Settings />
          ) : defaultOption === "Create Note" ? (
            <NoteForm option='Create' />
          ) : defaultOption === "Update Note" ? (
            <NoteForm option='Update' noteid={noteid} />
          ) : (
            defaultOption === "Note" && <Note noteid={noteid} />
          )} */}
        </div>
      </div>
    </>
  );
}
